'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Clock, Sparkles } from 'lucide-react';

const heatmapData = [
  { day: 'Mon', times: [2100, 4300, 6500, 1200] },
  { day: 'Tue', times: [1800, 3900, 8200, 900] },
  { day: 'Wed', times: [2400, 4800, 7100, 1100] },
  { day: 'Thu', times: [1900, 4100, 7800, 1500] },
  { day: 'Fri', times: [2800, 5200, 8900, 2100] },
  { day: 'Sat', times: [3500, 6100, 4200, 3100] },
  { day: 'Sun', times: [3100, 5800, 3800, 2800] },
];
const timeLabels = ['Morning', 'Afternoon', 'Evening', 'Night'];

export default function RevenueIntelligence() {
  const [animatedRevenue, setAnimatedRevenue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 32800;
    const duration = 1500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedRevenue(end);
        clearInterval(timer);
      } else {
        setAnimatedRevenue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  const getHeatmapColor = (value: number) => {
    const max = 8900;
    const ratio = value / max;
    if (ratio < 0.2) return 'bg-emerald-500/10';
    if (ratio < 0.4) return 'bg-emerald-500/30';
    if (ratio < 0.6) return 'bg-emerald-500/50';
    if (ratio < 0.8) return 'bg-emerald-500/70';
    return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-zinc-500/20 text-zinc-400 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <Trophy size={20} />
        </div>
        <h2 className="text-xl font-bold text-white">Revenue Intelligence</h2>
      </div>

      {/* Row 1: Attribution Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">AI-Attributed Revenue</div>
          <div className="text-3xl font-bold text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            ₹{animatedRevenue.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            Best Converting Channel <Flame size={14} className="text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-white">WhatsApp</div>
        </div>
        
        <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
          <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            Best Time to Reach <Clock size={14} className="text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">6–8 PM</div>
        </div>
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Bar Chart */}
        <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-6">Revenue by Channel</h3>
          <div className="flex-1 flex items-end gap-6 h-[200px] mt-auto">
            {[
              { name: 'WhatsApp', value: 18400, color: 'bg-emerald-500', max: 20000 },
              { name: 'Email', value: 9800, color: 'bg-blue-500', max: 20000 },
              { name: 'SMS', value: 4600, color: 'bg-zinc-500', max: 20000 }
            ].map((bar, idx) => (
              <div key={bar.name} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{bar.value.toLocaleString()}
                </span>
                <div className="w-full bg-zinc-800 rounded-t-xl h-full flex items-end overflow-hidden">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(bar.value / bar.max) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.2, ease: "easeOut" }}
                    className={`w-full rounded-t-xl ${bar.color}`}
                  />
                </div>
                <span className="text-xs text-zinc-400 font-semibold">{bar.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Heatmap */}
        <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 flex flex-col">
          <h3 className="text-sm font-semibold text-white mb-4">Conversion Heatmap</h3>
          <div className="flex flex-1 gap-2">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-around text-[10px] text-zinc-500 font-medium py-4">
              {timeLabels.map(l => <span key={l}>{l}</span>)}
            </div>
            {/* Grid */}
            <div className="flex-1 flex justify-between gap-1">
              {heatmapData.map((col, x) => (
                <div key={col.day} className="flex-1 flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-500 font-medium text-center mb-1">{col.day}</span>
                  {col.times.map((val, y) => (
                    <div 
                      key={`${x}-${y}`} 
                      className={`flex-1 rounded-sm transition-all cursor-pointer relative group ${getHeatmapColor(val)}`}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-zinc-800 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity">
                        {col.day} {timeLabels[y]}: ₹{val.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight Card */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 border-l-4 border-l-zinc-500 flex gap-4 items-start shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-500/5 to-transparent pointer-events-none" />
        <div className="p-2 bg-zinc-500/20 text-zinc-400 rounded-full shrink-0">
          <Sparkles size={16} />
        </div>
        <div className="relative z-10">
          <h4 className="text-sm font-bold text-white mb-1">AI Growth Insight</h4>
          <p className="text-sm text-zinc-300 leading-relaxed max-w-4xl">
            SellQ detected that WhatsApp messages sent between 6–8 PM on weekdays generate 3.2x more revenue than Email at any time. Shifting 30% of your Email outreach to WhatsApp evening slots could generate an additional <span className="text-emerald-400 font-bold">₹12,400</span> this month.
          </p>
        </div>
      </div>
    </div>
  );
}
