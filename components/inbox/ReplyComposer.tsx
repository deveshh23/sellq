'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Send, RefreshCw, Smile, ArrowUpRight, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAIModeStore } from '../../store/aiModeStore';
import { useInboxStore } from '../../store/inboxStore';
import { usePaymentProposalStore } from '../../store/paymentProposalStore';
import { useToast } from '../shared/ToastProvider';
import { useAIReply } from '../../lib/hooks/useAIReply';
import { Conversation } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { Button } from '../ui/Button';

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayed('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(prev => prev + text.charAt(i));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <>
      {displayed}
      {isTyping && <span className="inline-block w-1.5 h-3 ml-0.5 bg-zinc-400 animate-pulse" />}
    </>
  );
}

interface ReplyComposerProps {
  conversation: Conversation;
  onSend: (content: string) => void;
}

export function ReplyComposer({ conversation, onSend }: ReplyComposerProps) {
  const [content, setContent] = useState('');
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const { settings, updateSettings } = useAIModeStore();
  const { isGenerating, generateReply } = useAIReply();
  const { toast } = useToast();
  const activeProposal = usePaymentProposalStore((s) =>
    s.getActiveProposal(conversation.id)
  );
  const clearProposal = usePaymentProposalStore((s) => s.clearProposal);
  const updateProposalStatus = usePaymentProposalStore((s) => s.updateStatus);
  const updateAIDraft = useInboxStore((s) => s.updateConversationAIDraft);

  const handleSend = () => {
    if (!content.trim()) return;
    onSend(content);
    setContent('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAIDraft = async (toneOverride?: string) => {
    const draft = await generateReply(conversation.id, conversation.lastMessage, toneOverride);
    if (draft) {
      // We don't auto-fill content so they can see the draft banner above!
      // Or we can fill it. Let's show the draft banner above and let them insert it.
    }
  };

  const handleToneChange = async (newTone: typeof settings.tone) => {
    updateSettings({ tone: newTone });
    // If a draft is already showing, immediately regenerate it with the new tone
    if (conversation.aiDraft) {
      handleAIDraft(newTone);
    }
  };

  const insertDraft = () => {
    if (conversation.aiDraft) {
      setContent(conversation.aiDraft);
    }
  };

  const handleConfirmPayment = async () => {
    if (!activeProposal) return;

    setIsCreatingLink(true);
    updateProposalStatus(activeProposal.id, 'processing');

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

      // Send the AI's proposed message first (so the customer sees what's happening)
      onSend(activeProposal.draftMessage);

      // Send the payment link URL as an agent message
      setTimeout(() => {
        const linkMessage = `Here's your payment link for ${activeProposal.productName}:\n${data.paymentLinkUrl}`;
        onSend(linkMessage);
      }, 300);

      clearProposal(conversation.id);

      toast({
        type: 'success',
        title: 'Payment Link Created',
        description: `Link sent to ${conversation.contactName}.`,
      });
    } catch (error: any) {
      const errorMsg = error.message || 'Unknown error';
      updateProposalStatus(activeProposal.id, 'failed');

      // Draft a recovery message for the agent to review
      updateAIDraft(
        conversation.id,
        `Something went wrong creating that link, let me try again — I can also send you a manual invoice. Would you prefer that, or I can retry the payment link?`
      );

      clearProposal(conversation.id);

      toast({
        type: 'error',
        title: 'Payment Link Failed',
        description: errorMsg,
      });
    } finally {
      setIsCreatingLink(false);
    }
  };

  const tones: { id: typeof settings.tone; label: string; icon: string }[] = [
    { id: 'professional', label: 'Professional', icon: '💼' },
    { id: 'casual', label: 'Casual', icon: '🍃' },
    { id: 'empathetic', label: 'Empathetic', icon: '❤️' },
    { id: 'persuasive', label: 'Persuasive', icon: '⚡' },
  ];

  return (
    <div className="border-t border-white/5 bg-zinc-950/40 p-4 space-y-4 shrink-0 relative">
      
      {/* Payment Proposal Banner — human-gated, AI never calls the API directly */}
      {activeProposal && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-md flex flex-col gap-3 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard size={14} className="text-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-white">AI Payment Proposal</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              {formatCurrency(activeProposal.amountPaise / 100)}
            </span>
          </div>
          <p className="text-xs text-zinc-300 italic leading-relaxed">
            "{activeProposal.draftMessage}"
          </p>
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              disabled={isCreatingLink}
              onClick={handleConfirmPayment}
              className="flex-1 flex items-center justify-center gap-1 text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
            >
              {isCreatingLink ? (
                <RefreshCw size={12} className="animate-spin" />
              ) : (
                <CreditCard size={12} />
              )}
              Confirm &amp; Send Link
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => clearProposal(conversation.id)}
              className="flex items-center justify-center text-xs font-medium text-zinc-500 hover:text-zinc-300 border border-white/5 bg-white/5"
            >
              Not now
            </Button>
          </div>
        </motion.div>
      )}

      {/* AI Draft Banner */}
      {conversation.aiDraft && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="p-3.5 rounded-xl border border-zinc-500/30 bg-zinc-950/10 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-zinc-500/5 blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-zinc-400 animate-pulse" />
              <span className="text-xs font-semibold text-zinc-200">AI Suggested Draft ({settings.tone})</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={insertDraft}
                className="text-[10px] font-bold text-white bg-zinc-600 hover:bg-zinc-500 transition-colors px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <span>Use Draft</span>
                <ArrowUpRight size={10} />
              </button>
            </div>
          </div>
          <p className="text-xs text-zinc-300 italic leading-relaxed bg-zinc-950/30 p-2 rounded-lg border border-white/5 min-h-[40px]">
            &quot;<TypewriterText text={conversation.aiDraft} />&quot;
          </p>
        </motion.div>
      )}

      {/* Input Text Area */}
      <div className="relative rounded-xl border border-white/10 bg-zinc-950/60 p-2 focus-within:ring-1 focus-within:ring-zinc-500 focus-within:border-zinc-500 transition-all">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Reply to ${conversation.contactName}...`}
          className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-500 outline-none resize-none px-2 pt-1 pb-10 min-h-[70px] max-h-[200px]"
        />

        {/* Action triggers bottom left */}
        <div className="absolute bottom-2 left-3 flex items-center gap-3">
          <button className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">
            <Smile size={16} />
          </button>
        </div>

        {/* Send triggers bottom right */}
        <div className="absolute bottom-2 right-3 flex items-center gap-2">
          {/* Tone Selector dropdown/bar inside composer */}
          <div className="flex items-center gap-1 mr-2 bg-zinc-900 border border-white/5 rounded-lg p-0.5">
            {tones.map((t) => (
              <button
                key={t.id}
                onClick={() => handleToneChange(t.id)}
                title={`${t.label} Tone`}
                className={`text-xs px-2 py-1 rounded-md transition-all cursor-pointer ${
                  settings.tone === t.id
                    ? 'bg-zinc-600 text-white font-medium'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="mr-1">{t.icon}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            disabled={isGenerating}
            onClick={() => handleAIDraft()}
            className="flex items-center gap-1 text-zinc-400 hover:text-zinc-300 border border-zinc-500/20 bg-zinc-500/5 cursor-pointer"
          >
            {isGenerating ? (
              <RefreshCw size={12} className="animate-spin" />
            ) : (
              <Sparkles size={12} />
            )}
            <span className="text-xs">Draft</span>
          </Button>

          <Button
            variant="default"
            size="sm"
            disabled={!content.trim()}
            onClick={handleSend}
            className="flex items-center gap-1 cursor-pointer"
          >
            <Send size={12} />
            <span className="text-xs">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReplyComposer;
