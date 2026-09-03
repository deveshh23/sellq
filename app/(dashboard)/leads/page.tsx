'use strict';
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, TrendingUp, Flame, Users, CalendarDays,
  LayoutGrid, Table2, Download, ArrowUpDown, ExternalLink,
  Mail, MessageSquare, PhoneCall, Sun, Snowflake, Building2
} from 'lucide-react';
import LeadKanban from '../../../components/leads/LeadKanban';
import { useLeads } from '../../../lib/hooks/useLeads';
import { formatCurrency, formatTime } from '../../../lib/utils';
import { Lead } from '../../../types';

type ViewMode = 'kanban' | 'table';
type PriorityFilter = 'all' | 'hot' | 'warm' | 'cold';
type SortKey = 'contactName' | 'dealValue' | 'confidence' | 'dateCreated';

export default function LeadsPage() {
  const { leads, leadsByPriority, thisWeekLeads, totalPipelineValue } = useLeads();
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('dateCreated');
  const [sortAsc, setSortAsc] = useState(false);

  React.useEffect(() => {
    document.title = "Lead Pipeline — SellQ AI";
  }, []);

  function AnimatedCounter({ value, delay = 0 }: { value: number; delay?: number }) {
    const [count, setCount] = useState(0);

    React.useEffect(() => {
      let start = 0;
      const duration = 1000;
      const interval = 20;
      const steps = duration / interval;
      const increment = value / steps;
      
      const timeout = setTimeout(() => {
        const timer = setInterval(() => {
          start += increment;
          if (start >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, interval);
        return () => clearInterval(timer);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }, [value, delay]);

    return <>{formatCurrency(Math.floor(count))}</>;
  }

  const filteredLeads = useMemo(() => {
    let filtered = priorityFilter === 'all' ? leads : leads.filter(l => l.priority === priorityFilter);
    filtered = [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'contactName') cmp = a.contactName.localeCompare(b.contactName);
      else if (sortKey === 'dealValue') cmp = a.dealValue - b.dealValue;
      else if (sortKey === 'confidence') cmp = a.confidence - b.confidence;
      else cmp = new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
      return sortAsc ? cmp : -cmp;
    });
    return filtered;
  }, [leads, priorityFilter, sortKey, sortAsc]);

  const stats = [
    { label: 'Total Leads', value: leads.length, icon: Users, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { label: 'Hot Leads', value: leadsByPriority.hot.length, icon: Flame, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { label: 'Converted', value: leads.filter(l => l.status === 'won').length, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'This Week', value: thisWeekLeads.length, icon: CalendarDays, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  ];

  const filterTabs: { label: string; value: PriorityFilter; emoji?: string }[] = [
    { label: 'All', value: 'all' },
    { label: 'Hot', value: 'hot', emoji: '🔥' },
    { label: 'Warm', value: 'warm', emoji: '🌤' },
    { label: 'Cold', value: 'cold', emoji: '❄' },
  ];

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Company', 'Email', 'Channel', 'Priority', 'Status', 'Deal Value', 'Confidence', 'Summary', 'Date Created'];
    const rows = filteredLeads.map(l => [
      l.contactName, l.companyName || '', l.contactEmail, l.channel, l.priority, l.status,
      l.dealValue.toString(), l.confidence.toString(), `"${l.summary}"`, l.dateCreated
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'sellq-leads.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return <PhoneCall size={12} className="text-emerald-400" />;
      case 'sms': return <MessageSquare size={12} className="text-cyan-400" />;
      default: return <Mail size={12} className="text-blue-400" />;
    }
  };

  const getPriorityBadge = (priority: Lead['priority']) => {
    switch (priority) {
      case 'hot':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/20 shadow-[0_0_6px_rgba(244,63,94,0.15)]"><Flame size={9} />Hot</span>;
      case 'warm':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/20"><Sun size={9} />Warm</span>;
      case 'cold':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-sky-500/15 text-sky-400 border border-sky-500/20"><Snowflake size={9} />Cold</span>;
    }
  };

  const getStatusBadge = (status: Lead['status']) => {
    const styles: Record<Lead['status'], string> = {
      new: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
      contacted: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
      qualified: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
      won: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
      lost: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
    };
    return <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${styles[status]}`}>{status}</span>;
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden gap-6">

      {/* Stat Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`flex items-center gap-3.5 p-4 rounded-xl border ${stat.border} bg-zinc-900/40 shadow-lg`}
          >
            <div className={`p-2.5 rounded-lg ${stat.bg}`}>
              <stat.icon size={18} className={stat.color} />
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">{stat.label}</span>
              <p className="text-xl font-bold text-white leading-none mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Header Row: Filters + View Toggle + Pipeline Value */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          {/* Title */}
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-white font-heading tracking-wide">Lead Pipeline</h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles size={10} /> AI Detect
            </span>
          </div>

          {/* Priority Filters */}
          <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.04] rounded-xl p-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setPriorityFilter(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  priorityFilter === tab.value
                    ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {tab.emoji && <span className="mr-1">{tab.emoji}</span>}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Pipeline Value */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-zinc-900/40 text-xs">
            <TrendingUp size={14} className="text-emerald-400" />
            <span className="text-zinc-500 font-medium">Pipeline:</span>
            <span className="font-bold text-white"><AnimatedCounter value={totalPipelineValue} /></span>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.04] rounded-xl p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-violet-500/15 text-violet-300' : 'text-zinc-500 hover:text-white'}`}
              title="Kanban View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-violet-500/15 text-violet-300' : 'text-zinc-500 hover:text-white'}`}
              title="Table View"
            >
              <Table2 size={16} />
            </button>
          </div>

          {/* CSV Export */}
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs font-medium text-zinc-400 hover:bg-white/[0.04] hover:text-white transition-all"
          >
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'kanban' ? (
            <motion.div
              key="kanban"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="h-full"
            >
              <LeadKanban />
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="h-full overflow-auto rounded-xl border border-white/[0.04] bg-zinc-950/30"
            >
              <table className="w-full text-left">
                <thead className="sticky top-0 z-10 bg-zinc-900/80 backdrop-blur-lg border-b border-white/[0.04]">
                  <tr>
                    {[
                      { key: 'contactName' as SortKey, label: 'Contact' },
                      { key: 'dealValue' as SortKey, label: 'Deal Value' },
                      { key: 'confidence' as SortKey, label: 'Confidence' },
                      { key: 'dateCreated' as SortKey, label: 'Created' },
                    ].map((col) => (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key)}
                        className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 cursor-pointer hover:text-white transition-colors select-none"
                      >
                        <div className="flex items-center gap-1.5">
                          {col.label}
                          <ArrowUpDown size={10} className={sortKey === col.key ? 'text-violet-400' : 'text-zinc-600'} />
                        </div>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Priority</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Status</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Channel</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {filteredLeads.map((lead, i) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-[10px] font-bold text-zinc-300 shrink-0">
                            {lead.contactName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white">{lead.contactName}</div>
                            <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                              {lead.companyName && <><Building2 size={9} /> {lead.companyName}</>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-sm font-bold text-white">{formatCurrency(lead.dealValue)}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${lead.confidence >= 80 ? 'bg-emerald-500' : lead.confidence >= 60 ? 'bg-amber-500' : 'bg-zinc-500'}`}
                              style={{ width: `${lead.confidence}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-zinc-400 font-medium">{lead.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-[10px] text-zinc-400">{formatTime(lead.dateCreated)}</td>
                      <td className="px-4 py-3.5">{getPriorityBadge(lead.priority)}</td>
                      <td className="px-4 py-3.5">{getStatusBadge(lead.status)}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          {getChannelIcon(lead.channel)}
                          <span className="text-[10px] text-zinc-500 capitalize">{lead.channel}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <button className="p-1.5 rounded-md text-zinc-500 opacity-0 group-hover:opacity-100 hover:bg-violet-500/10 hover:text-violet-400 transition-all">
                          <ExternalLink size={12} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {filteredLeads.length === 0 && (
                <div className="py-16 text-center text-sm text-zinc-500">No leads match the current filter.</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
