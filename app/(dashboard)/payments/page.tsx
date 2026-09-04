'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  RefreshCw,
  ExternalLink,
  Zap,
  Loader2,
} from 'lucide-react';
import { PaymentAttempt, PaymentStatus } from '../../../types';
import { formatCurrency, formatTime } from '../../../lib/utils';

const STATUS_FILTERS: { key: 'all' | PaymentStatus; label: string }[] = [
  { key: 'all', label: 'All Attempts' },
  { key: 'pending', label: 'Pending' },
  { key: 'paid', label: 'Paid' },
  { key: 'failed', label: 'Failed' },
];

export default function PaymentsPage() {
  const [attempts, setAttempts] = useState<PaymentAttempt[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | PaymentStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulatingFailure, setIsSimulatingFailure] = useState(false);

  const fetchAttempts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/payments/list');
      const data = await res.json();
      const attempts: PaymentAttempt[] = data.attempts || [];
      setAttempts(attempts);
    } catch (e) {
      console.error('Failed to fetch payment attempts:', e);
      setAttempts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'Payments — SellQ';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchAttempts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    let result = attempts;
    if (activeFilter !== 'all') {
      result = result.filter((a) => a.status === activeFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          (a.productName || a.productId).toLowerCase().includes(q) ||
          a.errorMessage?.toLowerCase().includes(q) ||
          a.razorpayLinkId?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [attempts, activeFilter, searchQuery]);

  const handleSimulateFailure = async () => {
    if (!confirm('Simulate a payment link failure? This creates a failed audit entry.')) return;
    setIsSimulatingFailure(true);
    try {
      const res = await fetch('/api/payments/create-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: `conv-demo-${Date.now()}`,
          productId: 'prod_simulate_failure',
        }),
      });
      await res.json();
      await fetchAttempts();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulatingFailure(false);
    }
  };

  const getStatusChip = (status: PaymentStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock size={10} /> Pending
          </span>
        );
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={10} /> Paid
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle size={10} /> Failed
          </span>
        );
    }
  };

  const formatAmount = (amountPaise: number) => {
    if (amountPaise === 0) return '—';
    return formatCurrency(amountPaise / 100);
  };

  const stats = {
    total: attempts.length,
    pending: attempts.filter((a) => a.status === 'pending').length,
    paid: attempts.filter((a) => a.status === 'paid').length,
    failed: attempts.filter((a) => a.status === 'failed').length,
  };

  return (
    <div className="flex flex-col h-full p-8 overflow-y-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 mb-2 font-heading">
            <CreditCard className="text-emerald-500" size={32} />
            Payments Audit Trail
          </h1>
          <p className="text-zinc-400">
            Every payment link attempt — created, pending, paid, or failed. Auditable end-to-end.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSimulateFailure}
            disabled={isSimulatingFailure}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-all text-xs font-bold uppercase tracking-wider disabled:opacity-50"
          >
            {isSimulatingFailure ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Zap size={14} />
            )}
            Simulate Failure
          </button>
          <button
            onClick={fetchAttempts}
            disabled={isLoading}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
        <StatCard label="Total Attempts" value={stats.total} icon={CreditCard} color="text-violet-400" />
        <StatCard label="Pending" value={stats.pending} icon={Clock} color="text-amber-400" />
        <StatCard label="Paid" value={stats.paid} icon={CheckCircle2} color="text-emerald-400" />
        <StatCard label="Failed" value={stats.failed} icon={AlertCircle} color="text-rose-400" />
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.04] rounded-xl p-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === f.key
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by product or error..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 text-zinc-300 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Attempts Table */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-950/50 border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Conversation</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Razorpay Link</th>
                <th className="px-6 py-4">Error</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                      {isLoading ? 'Loading payment attempts...' : 'No payment attempts found. Create a payment to get started.'}
                    </td>
                  </tr>
                ) : (
                  filtered
                    .slice()
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((attempt) => (
                      <motion.tr
                        key={attempt.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-400">
                          {formatTime(attempt.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-300 font-mono">
                          {attempt.conversationId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <span className="text-sm font-medium text-white">
                              {attempt.productName || attempt.productId}
                            </span>
                            {attempt.productId === 'prod_simulate_failure' && (
                              <span className="ml-1 text-[9px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.25 rounded">TEST</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                          {formatAmount(attempt.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusChip(attempt.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-500">
                          {attempt.razorpayLinkId ? (
                            <a
                              href={attempt.razorpayPaymentLinkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-violet-400 hover:text-violet-300"
                            >
                              {attempt.razorpayLinkId}
                              <ExternalLink size={10} />
                            </a>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="px-6 py-4 max-w-xs text-xs text-rose-400 truncate">
                          {attempt.errorMessage || '—'}
                        </td>
                      </motion.tr>
                    ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3.5 p-4 rounded-xl border border-white/5 bg-zinc-900/40 shadow-lg"
    >
      <div className={`p-2.5 rounded-lg bg-white/5 ${color}`}>
        {React.createElement(icon, { size: 18 })}
      </div>
      <div>
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">{label}</span>
        <p className="text-2xl font-bold text-white leading-none mt-1">{value}</p>
      </div>
    </motion.div>
  );
}
