'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Clock, Loader2, AlertCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePaymentProposalStore } from '../../store/paymentProposalStore';
import { useInboxStore } from '../../store/inboxStore';
import { useToast } from '../shared/ToastProvider';
import { Conversation } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface PaymentPanelProps {
  conversation: Conversation;
}

export default function PaymentPanel({ conversation }: PaymentPanelProps) {
  const { toast } = useToast();
  const activeProposal = usePaymentProposalStore((s) =>
    s.getActiveProposal(conversation.id)
  );
  const clearProposal = usePaymentProposalStore((s) => s.clearProposal);
  const addProposal = usePaymentProposalStore((s) => s.addProposal);
  const updateStatus = usePaymentProposalStore((s) => s.updateStatus);
  const updateAIDraft = useInboxStore((s) => s.updateConversationAIDraft);
  const [isCreating, setIsCreating] = useState(false);

  if (!activeProposal) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3 shrink-0"
      >
        <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <CreditCard size={14} className="text-zinc-500" />
              Payment Proposals
            </div>
            <span className="text-[10px] text-zinc-500">No active proposal</span>
          </div>

          <button
            onClick={() =>
              addProposal({
                conversationId: conversation.id,
                productId: 'prod_simulate_failure',
                draftMessage: 'I can send you a payment link for the AI Strategy Consulting Session — want me to go ahead?',
              })
            }
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10 text-[10px] font-bold uppercase tracking-wider text-rose-300 transition-colors"
          >
            <Zap size={12} className="text-rose-400" />
            Simulate Failure (Demo)
          </button>
        </div>
      </motion.div>
    );
  }

  const handleConfirm = async () => {
    if (!activeProposal) return;
    setIsCreating(true);
    updateStatus(activeProposal.id, 'processing');

    try {
      const res = await fetch('/api/payments/create-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: conversation.id,
          productId: activeProposal.productId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create payment link');
      }

      clearProposal(conversation.id);
      toast({
        type: 'success',
        title: 'Payment Link Created',
        description: `Razorpay link ready. Amount: ${formatCurrency(data.amount / 100)}`,
      });

      // Open the link in a new tab
      if (data.paymentLinkUrl) {
        window.open(data.paymentLinkUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (error: unknown) {
      const errorMsg =
        typeof (error as { message?: string })?.message === 'string'
          ? (error as { message: string }).message
          : 'Failed to create payment link';

      updateStatus(activeProposal.id, 'failed');
      clearProposal(conversation.id);

      // Draft a recovery message in the AI draft area
      updateAIDraft(
        conversation.id,
        'Something went wrong creating that link, let me try again — I can also send you a manual invoice. Would you prefer that, or I can retry the payment link?'
      );

      toast({
        type: 'error',
        title: 'Payment Link Failed',
        description: errorMsg,
      });
    } finally {
      setIsCreating(false);
    }
  };

  const statusIcon = {
    proposed: <Clock size={12} className="text-zinc-400" />,
    processing: <Loader2 size={12} className="text-emerald-400 animate-spin" />,
    sent: <CheckCircle2 size={12} className="text-emerald-400" />,
    failed: <AlertCircle size={12} className="text-rose-400" />,
    dismissed: <AlertCircle size={12} className="text-zinc-500" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 shrink-0"
    >
      <div className="bg-gradient-to-br from-emerald-500/10 via-zinc-900/40 to-transparent border border-emerald-500/30 rounded-xl p-4 shadow-[0_0_20px_rgba(34,197,94,0.08)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <CreditCard size={14} className="text-emerald-400" />
            AI Payment Proposal
          </div>
          <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            {formatCurrency(activeProposal.amountPaise / 100)}
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-2.5 bg-zinc-950/30 rounded-lg border border-white/5">
            <p className="text-xs text-zinc-300 italic leading-relaxed">
              &quot;{activeProposal.draftMessage}&quot;
            </p>
          </div>

          <div className="flex items-center justify-between text-[9px] text-zinc-500">
            <span className="flex items-center gap-1">
              {statusIcon[activeProposal.status]}
              <span className="capitalize">{activeProposal.status}</span>
            </span>
            <span>Product: {activeProposal.productName}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleConfirm}
              disabled={isCreating || activeProposal.status === 'processing'}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 text-[10px] font-bold uppercase tracking-wider disabled:opacity-50 transition-all shadow-[0_0_10px_rgba(34,197,94,0.3)]"
            >
              {isCreating ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <CreditCard size={12} />
              )}
              Confirm &amp; Send Link
            </button>
            <button
              onClick={() => clearProposal(conversation.id)}
              disabled={isCreating}
              className="flex-1 flex items-center justify-center py-2 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-wider transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
