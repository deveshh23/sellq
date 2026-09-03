'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Clock, Send, BarChart, BellRing, Settings2, Sparkles, Check, ChevronDown, ChevronRight, Loader2, X, MessageSquare } from 'lucide-react';
import { useFollowUpStore } from '../../../store/followUpStore';
import { useToast } from '../../../components/shared/ToastProvider';
import Switch from '../../../components/ui/Switch';

export default function FollowUpsPage() {
  const { followUps, updateFollowUp } = useFollowUpStore();
  const { toast } = useToast();

  const [sendingId, setSendingId] = useState<string | null>(null);
  const [showSent, setShowSent] = useState(false);

  // Settings state
  const [rules, setRules] = useState({
    noReply: true,
    postMeeting: true,
    inactiveLead: false,
    weeklyCheckin: true,
  });

  useEffect(() => {
    document.title = "Follow-Ups — SellQ AI";
  }, []);

  const pending = followUps.filter(f => f.status === 'pending');
  const sent = followUps.filter(f => f.status === 'sent');

  const handleSendNow = (id: string, contactName: string) => {
    setSendingId(id);
    setTimeout(() => {
      updateFollowUp(id, { status: 'sent', sentAt: new Date().toISOString() });
      setSendingId(null);
      toast({
        type: 'system',
        title: 'Follow-Up Dispatched',
        description: `Message sent to ${contactName} successfully.`,
      });
    }, 1000);
  };

  const handleDismiss = (id: string) => {
    updateFollowUp(id, { status: 'dismissed' });
    toast({
      type: 'system',
      title: 'Follow-Up Dismissed',
      description: `Item removed from automation queue.`,
    });
  };

  const getTriggerLabel = (type: string) => {
    switch(type) {
      case 'no_reply': return { text: 'No reply in 2 hours', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
      case 'post_demo': return { text: 'Post demo follow-up', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
      case 'lead_inactive': return { text: 'Lead went quiet', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
      default: return { text: 'Manual', color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' };
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-8 gap-8 scrollbar-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide font-heading flex items-center gap-3">
            <RefreshCw className="text-amber-500" size={32} />
            Follow-Up Automation
          </h1>
          <p className="text-zinc-400 mt-1">
            AI automatically schedules and drafts follow-ups based on conversation patterns.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
          <RefreshCw size={16} /> New Follow-Up
        </button>
      </div>

      {/* Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
        <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 flex items-center justify-between group overflow-hidden relative">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent" />
          <div>
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Pending Items</div>
            <div className="text-3xl font-bold text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]">{pending.length}</div>
          </div>
          <Clock size={32} className="text-amber-500/50" />
        </div>
        
        <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 flex items-center justify-between overflow-hidden relative">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent" />
          <div>
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Sent Today</div>
            <div className="text-3xl font-bold text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">7</div>
          </div>
          <Send size={32} className="text-emerald-500/50" />
        </div>

        <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 flex items-center justify-between overflow-hidden relative">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-zinc-500/10 to-transparent" />
          <div>
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Reply Rate</div>
            <div className="text-3xl font-bold text-zinc-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.3)]">34%</div>
          </div>
          <BarChart size={32} className="text-zinc-500/50" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Timeline View */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Clock size={16} className="text-amber-400" /> Upcoming Automation Queue
          </h3>
          
          <div className="relative pl-6 border-l-2 border-white/10 space-y-8">
            <AnimatePresence>
              {pending.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-zinc-500 py-4">No pending follow-ups in queue.</motion.div>
              )}
              {pending.map((item, idx) => {
                const label = getTriggerLabel(item.triggerType);
                const isSending = sendingId === item.id;
                
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className="relative"
                  >
                    {/* Glowing Timeline Dot */}
                    <div className="absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-zinc-900 border-2 border-amber-500 z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                    </div>

                    {/* Card */}
                    <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-amber-500/30 transition-colors shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center text-sm font-bold text-amber-400">
                            {item.contactName.substring(0,2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">{item.contactName}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-zinc-400">{item.channel}</span>
                              <span className={`text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider font-bold ${label.color}`}>
                                {label.text}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-bold text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg">
                          {new Date(item.scheduledAt).toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-4 mb-4 relative">
                        <div className="absolute -top-2 left-4 px-2 bg-zinc-900 text-[9px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1 border border-white/5 rounded">
                          <Sparkles size={10} /> AI Draft
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed italic pr-4">"{item.aiMessage}"</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleSendNow(item.id, item.contactName)}
                          disabled={isSending}
                          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all disabled:opacity-50"
                        >
                          {isSending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                          {isSending ? 'Sending...' : 'Send Now'}
                        </button>
                        <button className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-300 text-xs font-bold transition-colors">
                          Edit & Send
                        </button>
                        <div className="flex-1" />
                        <button onClick={() => handleDismiss(item.id)} className="p-2 text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Sent Section */}
          <div className="mt-12">
            <button 
              onClick={() => setShowSent(!showSent)} 
              className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider hover:text-amber-400 transition-colors"
            >
              {showSent ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              Completed Follow-Ups ({sent.length})
            </button>
            
            <AnimatePresence>
              {showSent && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-3 overflow-hidden">
                  {sent.map(item => {
                    const label = getTriggerLabel(item.triggerType);
                    return (
                      <div key={item.id} className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                            <Check size={14} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                              {item.contactName}
                              <span className={`text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider font-bold ${label.color}`}>
                                {label.text}
                              </span>
                            </div>
                            <div className="text-[10px] text-zinc-500 mt-1">Sent at {new Date(item.sentAt || '').toLocaleString()} via {item.channel}</div>
                          </div>
                        </div>
                        {Math.random() > 0.5 && (
                          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                            <MessageSquare size={10} /> Reply Received
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Col: Settings */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 sticky top-0">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
              <Settings2 size={20} className="text-zinc-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Automation Rules</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white mb-1">Auto-Follow No Reply</div>
                  <div className="text-[10px] text-zinc-400 leading-relaxed">Schedule check-in if customer goes silent for 2 hours during active chat.</div>
                </div>
                <Switch checked={rules.noReply} onCheckedChange={c => setRules({...rules, noReply: c})} />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white mb-1">Post-Meeting Sync</div>
                  <div className="text-[10px] text-zinc-400 leading-relaxed">Generate thank you note and action items 24 hours after a scheduled meeting.</div>
                </div>
                <Switch checked={rules.postMeeting} onCheckedChange={c => setRules({...rules, postMeeting: c})} />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white mb-1">Inactive Lead Re-engagement</div>
                  <div className="text-[10px] text-zinc-400 leading-relaxed">Draft casual reach-out if a qualified lead hasn't responded in 3 days.</div>
                </div>
                <Switch checked={rules.inactiveLead} onCheckedChange={c => setRules({...rules, inactiveLead: c})} />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white mb-1">Weekly Hot Lead Check-in</div>
                  <div className="text-[10px] text-zinc-400 leading-relaxed">Queue recurring weekly nudges for contacts with intent score {'>'} 80.</div>
                </div>
                <Switch checked={rules.weeklyCheckin} onCheckedChange={c => setRules({...rules, weeklyCheckin: c})} />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <button className="w-full py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-300 text-xs font-bold transition-colors">
                Advanced Rule Builder
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
