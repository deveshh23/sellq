'use strict';
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, MessageSquare, ShieldAlert, Cpu, Timer, Users, Zap, TrendingUp
} from 'lucide-react';
import { useLeads } from '../../../lib/hooks/useLeads';
import { useInboxStore } from '../../../store/inboxStore';
import StatCard from '../../../components/analytics/StatCard';
import ActivityChart from '../../../components/analytics/ActivityChart';
import ChannelBreakdown from '../../../components/analytics/ChannelBreakdown';
import AIHandledGauge from '../../../components/analytics/AIHandledGauge';
import ResponseDistribution from '../../../components/analytics/ResponseDistribution';
import RecentLeads from '../../../components/analytics/RecentLeads';
import RevenueIntelligence from '../../../components/analytics/RevenueIntelligence';

// Simulated analytics data
const initialSparkline = [
  { value: 30 }, { value: 40 }, { value: 35 }, { value: 50 },
  { value: 49 }, { value: 60 }, { value: 70 }, { value: 95 }
];

const mockActivityData = [
  { day: 'Mon', total: 120, aiHandled: 95 },
  { day: 'Tue', total: 150, aiHandled: 125 },
  { day: 'Wed', total: 180, aiHandled: 155 },
  { day: 'Thu', total: 190, aiHandled: 162 },
  { day: 'Fri', total: 220, aiHandled: 185 },
  { day: 'Sat', total: 140, aiHandled: 120 },
  { day: 'Sun', total: 160, aiHandled: 138 },
];

const mockChannelData = [
  { name: 'whatsapp', value: 648, color: '#10b981' },
  { name: 'instagram', value: 382, color: '#ec4899' },
  { name: 'website', value: 218, color: '#3b82f6' },
];

const mockResponseTimeData = [
  { bucket: '<1s', count: 420, color: '#10b981', glowColor: 'emerald' },
  { bucket: '1-3s', count: 280, color: '#3b82f6', glowColor: 'blue' },
  { bucket: '3-10s', count: 90, color: '#f59e0b', glowColor: 'amber' },
  { bucket: '>10s', count: 25, color: '#ef4444', glowColor: 'rose' },
];

export default function AnalyticsPage() {
  const { leads } = useLeads();
  const { conversations } = useInboxStore();
  const [isLoading, setIsLoading] = useState(true);

  // Simulated skeleton loader for visual premium feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // Compute live / mock metrics
  const totalMessagesToday = 1248 + conversations.reduce((sum, c) => sum + c.messages.length, 0);
  const leadsCount = leads.length;
  
  useEffect(() => {
    document.title = "Analytics — SellQ AI";
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full overflow-y-auto p-8 gap-6 scrollbar-none">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between shrink-0">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-4 w-72 bg-white/5 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-white/5 rounded-lg animate-pulse" />
        </div>

        {/* Stats Row Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl border border-white/[0.04] bg-zinc-950/20 animate-pulse" />
          ))}
        </div>

        {/* Charts Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 h-80 rounded-2xl border border-white/[0.04] bg-zinc-950/20 animate-pulse" />
          <div className="lg:col-span-2 h-80 rounded-2xl border border-white/[0.04] bg-zinc-950/20 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto p-8 gap-6 scrollbar-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-white tracking-wide font-heading">Performance Analytics</h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 text-[10px] font-bold uppercase tracking-wider">
              <Cpu size={10} className="animate-spin-slow" />
              <span>AI Co-Pilot Running</span>
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time latency metrics, channel breakdown metrics, and autonomous agent performance stats.
          </p>
        </div>

        {/* Top summary badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-zinc-900/40 text-[10px] font-semibold text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          System Health: 99.98%
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <StatCard
          name="Total Messages Today"
          value={totalMessagesToday}
          trend="+14.2%"
          trendType="up"
          icon={MessageSquare}
          sparklineData={initialSparkline}
          color="text-violet-400"
          glowColor="group-hover:from-violet-500/[0.03]"
          index={0}
        />
        <StatCard
          name="AI Handled Rate"
          value={86}
          suffix="%"
          trend="+3.1%"
          trendType="up"
          icon={Cpu}
          sparklineData={[
            { value: 75 }, { value: 78 }, { value: 80 }, { value: 82 },
            { value: 85 }, { value: 84 }, { value: 86 }, { value: 86 }
          ]}
          color="text-emerald-400"
          glowColor="group-hover:from-emerald-500/[0.03]"
          index={1}
        />
        <StatCard
          name="Leads Captured"
          value={leadsCount}
          trend="+18.5%"
          trendType="up"
          icon={Zap}
          sparklineData={[
            { value: 2 }, { value: 4 }, { value: 3 }, { value: 5 },
            { value: 6 }, { value: 8 }, { value: 7 }, { value: leadsCount }
          ]}
          color="text-amber-400"
          glowColor="group-hover:from-amber-500/[0.03]"
          index={2}
        />
        <StatCard
          name="Avg Response Time"
          value={940}
          suffix="ms"
          trend="-24.8%"
          trendType="up" // Response time going down is good! So up/positive trend indicator
          icon={Timer}
          sparklineData={[
            { value: 1200 }, { value: 1100 }, { value: 1050 }, { value: 990 },
            { value: 980 }, { value: 950 }, { value: 940 }, { value: 940 }
          ]}
          color="text-cyan-400"
          glowColor="group-hover:from-cyan-500/[0.03]"
          index={3}
        />
      </div>

      {/* Row 2: Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ActivityChart data={mockActivityData} />
        </div>
        <div className="lg:col-span-2">
          <ChannelBreakdown data={mockChannelData} />
        </div>
      </div>

      {/* Row 3: Gauges & Latency Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIHandledGauge value={86} />
        <ResponseDistribution data={mockResponseTimeData} />
      </div>

      {/* Row 4: Recent Lead Activity */}
      <div className="w-full">
        <RecentLeads leads={leads} />
      </div>

      {/* Feature 1: Revenue Intelligence */}
      <RevenueIntelligence />

    </div>
  );
}
