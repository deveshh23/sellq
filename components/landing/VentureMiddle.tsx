'use client';
import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, scaleIn, stagger } from './VentureHero';

export function VentureProblem() {
  const problems = [
    { icon: "X", metric: "-62 leads this month", color: "text-red-400", title: "Lost Leads", sub: "Leads went cold before first follow-up" },
    { icon: "⚠", metric: "47 overdue", color: "text-amber-400", title: "Missed Follow-Ups", sub: "3+ day response gaps killing conversion" },
    { icon: "∅", metric: "No insights", color: "text-[var(--text-muted)]", title: "No Visibility", sub: "You don't know which deals are hot" },
    { icon: "⏱", metric: "6.2 hrs/week", color: "text-amber-400", title: "Manual CRM", sub: "Wasted on data entry, not selling" },
    { icon: "🛡", metric: "₹2.4L revenue lost", color: "text-red-400", title: "Churn Blindspot", sub: "Customers left without a warning signal" },
    { icon: "✉", metric: "4.2 hour avg", color: "text-[var(--text-muted)]", title: "Slow Responses", sub: "Customers expect replies in minutes" }
  ];

  return (
    <section className="py-[120px] bg-[var(--bg)] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[rgba(239,68,68,0.03)] blur-[100px] pointer-events-none rounded-full" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="flex flex-col items-center text-center mb-16">
          <div className="font-sans text-xs font-semibold text-red-400 border border-red-500/30 bg-red-500/10 rounded-full px-3 py-1 mb-6">The Problem</div>
          <h2 className="font-sans font-semibold text-[clamp(32px,4vw,56px)] tracking-[-0.02em] text-white max-w-[800px] leading-[1.1] mb-6">
            Sales teams are losing deals they never knew they had.
          </h2>
          <p className="font-sans text-[16px] text-[var(--text-secondary)] max-w-[600px] leading-[1.7]">
            Leads go cold. Follow-ups get forgotten. CRMs are graveyards. And by the time you
            notice, the customer has already moved on.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid md:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <motion.div 
              key={i} variants={fadeUp}
              className="bg-[var(--surface)] border border-[rgba(239,68,68,0.15)] rounded-xl p-6 backdrop-blur-[12px] flex flex-col items-start shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-md bg-[var(--surface-elevated)] flex items-center justify-center font-mono ${p.color}`}>{p.icon}</div>
                <h3 className="font-sans font-medium text-[16px] text-white">{p.title}</h3>
              </div>
              <div className={`font-mono text-[18px] font-medium ${p.color} mb-2`}>{p.metric}</div>
              <div className="font-sans text-[14px] text-[var(--text-secondary)] leading-relaxed">{p.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function VentureAIBrain() {
  const nodes = [
    { label: "Lead Scoring" }, { label: "Sentiment AI" }, { label: "Sales Agent" }, { label: "Appointments" },
    { label: "Follow-Ups" }, { label: "CRM Intel" }, { label: "Churn Shield" }, { label: "Workflows" }
  ];

  return (
    <section className="py-[120px] bg-[var(--bg)] border-y border-[var(--border)] overflow-hidden relative">
      <div className="max-w-[1000px] mx-auto px-6 flex flex-col items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center text-center mb-24">
          <div className="font-sans text-xs font-semibold text-[var(--purple-light)] border border-[var(--purple-primary)]/30 bg-[var(--purple-primary)]/10 rounded-full px-3 py-1 mb-6">The Solution</div>
          <h2 className="font-sans font-semibold text-[clamp(32px,4vw,56px)] tracking-[-0.02em] text-white mb-6">One AI brain. Every revenue signal.</h2>
          <p className="font-sans text-[16px] text-[var(--text-secondary)] max-w-[600px] leading-[1.7]">
            SellQ connects across your entire customer journey — from first message to closed deal.
          </p>
        </motion.div>

        {/* CSS/SVG Brain Diagram */}
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center mb-16">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
            {nodes.map((_, i) => {
              const angle = (i * (360 / 8)) * (Math.PI / 180);
              const x2 = 250 + Math.cos(angle) * 180;
              const y2 = 250 + Math.sin(angle) * 180;
              return (
                <motion.line 
                  key={`line-${i}`} x1="250" y1="250" x2={x2} y2={y2} stroke="rgba(124,58,237,0.3)" strokeWidth="1" strokeDasharray="5,5"
                  initial={{ strokeDashoffset: 100 }} whileInView={{ strokeDashoffset: 0 }} transition={{ duration: 1, delay: 0.5 + (i * 0.1) }} viewport={{ once: true }}
                />
              );
            })}
          </svg>

          {nodes.map((n, i) => {
            const angle = (i * (360 / 8)) * (Math.PI / 180);
            const x = Math.cos(angle) * 180;
            const y = Math.sin(angle) * 180;
            return (
              <motion.div 
                key={`node-${i}`} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 1 + (i * 0.1), duration: 0.4 }} viewport={{ once: true }}
                className="absolute bg-[var(--surface-elevated)] border border-[var(--border)] px-3 py-1.5 rounded-full text-[11px] font-mono text-[var(--text-secondary)] shadow-lg hover:border-[var(--purple-primary)] transition-colors cursor-default whitespace-nowrap"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {n.label}
              </motion.div>
            );
          })}

          <motion.div 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
            className="relative z-10 w-[120px] h-[120px] rounded-full bg-[var(--surface-elevated)] border-2 border-[var(--purple-primary)] flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.3)]"
          >
            <div className="absolute inset-0 rounded-full border border-[var(--purple-light)] animate-ping opacity-20" />
            <span className="font-sans font-semibold text-white text-center text-sm">SellQ<br/>AI</span>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 1.5 }} className="flex flex-wrap justify-center gap-3">
          {["8 AI modules", "Real-time processing", "Zero manual work"].map((t, i) => (
            <div key={i} className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[12px] font-mono text-[var(--text-secondary)]">
              {t}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function VentureLeadScoring() {
  const [inView, setInView] = useState(false);
  const ref = React.useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-[120px] bg-[var(--bg)]" id="scoring">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Text */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-start">
          <div className="font-sans text-xs font-semibold text-[var(--purple-light)] border border-[var(--purple-primary)]/30 bg-[var(--purple-primary)]/10 rounded-full px-3 py-1 mb-6">AI Lead Scoring</div>
          <h2 className="font-sans font-semibold text-[clamp(32px,4vw,48px)] tracking-[-0.02em] text-white mb-6 leading-[1.1]">Know exactly who to call next.</h2>
          <p className="font-sans text-[16px] text-[var(--text-secondary)] max-w-[500px] leading-[1.7] mb-8">
            SellQ analyzes every signal — message frequency, keyword intent, sentiment 
            shifts, response speed — and gives every lead a real-time AI score.
          </p>
          <ul className="space-y-4 font-sans text-[15px] text-[var(--text-primary)]">
            {["Intent detection from conversation keywords", "Engagement scoring across all channels", "Recency and response-velocity tracking", "AI-generated \"why this score\" explanation"].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[var(--purple-light)] mt-0.5">✦</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right UI */}
        <motion.div ref={ref} variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-8 backdrop-blur-[12px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--purple-primary)] opacity-[0.05] blur-[80px]" />
          
          <div className="flex justify-between items-center border-b border-[var(--border)] pb-4 mb-6 relative z-10">
            <span className="font-sans font-medium text-white">Raj Patel · Acme Corp</span>
            <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-1 rounded font-mono font-bold uppercase tracking-widest">HOT</span>
          </div>

          <div className="flex flex-col items-center justify-center mb-8 relative z-10">
            <div className="relative w-[160px] h-[160px] flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="6" />
                <circle 
                  cx="50" cy="50" r="45" fill="none" stroke="url(#scoreGrad)" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={inView ? (2 * Math.PI * 45) * (1 - 0.87) : (2 * Math.PI * 45)}
                  style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--amber-accent)" />
                    <stop offset="100%" stopColor="var(--green-accent)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex flex-col items-center text-center mt-2">
                <span className="font-sans font-bold text-[48px] text-white leading-none">{inView ? 87 : 0}</span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-1">AI Score</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 relative z-10 mb-8">
            {[ {label:"Purchase Intent", val:91, col:"bg-[var(--purple-light)]"}, {label:"Engagement Score", val:78, col:"bg-[var(--blue-accent)]"}, {label:"Recency", val:84, col:"bg-[var(--green-accent)]"}, {label:"Sentiment", val:72, col:"bg-[var(--amber-accent)]"} ].map((bar, i) => (
              <div key={i}>
                <div className="flex justify-between font-mono text-[11px] text-[var(--text-secondary)] mb-1.5 uppercase"><span>{bar.label}</span><span>{bar.val}%</span></div>
                <div className="w-full h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                  <div className={`h-full ${bar.col} transition-all duration-1000`} style={{ width: inView ? `${bar.val}%` : '0%', transitionDelay: `${0.2 + (i*0.1)}s` }} />
                </div>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 1 }} className="bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.3)] rounded-lg p-4 mb-6 relative z-10">
            <p className="font-sans text-[13px] text-[var(--purple-light)] leading-relaxed">
              <span className="font-bold">✦ AI Analysis:</span> Raj has visited your pricing page 3× this week and mentioned
              'budget approval' in his last message. <strong className="text-white">Recommend: Send proposal today.</strong>
            </p>
          </motion.div>

          <button className="w-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--purple-primary)] text-white font-sans font-medium text-sm py-3 rounded-lg transition-all relative z-10">
            Generate Proposal →
          </button>
        </motion.div>

      </div>
    </section>
  );
}
