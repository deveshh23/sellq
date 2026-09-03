'use client';
import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, scaleIn, stagger } from './VentureHero';

export function VentureSalesAgent() {
  const [step, setStep] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      setStep(0);
      const timers = [
        setTimeout(() => setStep(1), 0),
        setTimeout(() => setStep(2), 800),
        setTimeout(() => setStep(3), 1600),
        setTimeout(() => setStep(4), 2200),
        setTimeout(() => setStep(5), 3000),
        setTimeout(() => setStep(6), 3500),
        setTimeout(() => setStep(7), 4500),
        setTimeout(() => setStep(8), 5000)
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [inView]);

  return (
    <section className="py-[120px] bg-[var(--bg)] border-y border-[var(--border)]" id="sales-agent">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center" ref={ref}>
        
        {/* Left UI Mockup */}
        <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-6 shadow-2xl relative min-h-[460px] flex flex-col justify-end">
          <div className="absolute top-0 left-0 w-full h-[60px] border-b border-[var(--border)] flex items-center px-4 bg-[var(--surface)] rounded-t-2xl z-10">
            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/50" /></div>
            <div className="mx-auto font-mono text-[11px] text-[var(--text-muted)]">Sales Agent Inbox</div>
          </div>
          
          <div className="flex flex-col gap-4 pt-[80px]">
            <AnimatePresence step={step} min={1}><div className="self-start bg-[var(--bg)] border border-[var(--border)] text-white text-[13px] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] font-sans">Hi, what are your catering packages?</div></AnimatePresence>
            
            <AnimatePresence step={step} min={2} max={3}><div className="self-end text-[11px] text-[var(--text-muted)] font-mono flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[var(--purple-light)] animate-pulse" /> SellQ AI analyzing...</div></AnimatePresence>
            
            <AnimatePresence step={step} min={3}><div className="self-end bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.3)] text-[var(--purple-light)] text-[10px] px-3 py-2 rounded-lg max-w-[80%] font-mono uppercase tracking-wider mb-[-8px]">Intent: Pricing · Sentiment: Positive · +12pts</div></AnimatePresence>
            
            <AnimatePresence step={step} min={4} max={5}><div className="self-end bg-[var(--surface)] border border-[var(--green-accent)] text-white text-[13px] px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] font-sans relative"><div className="absolute -top-2 -right-2 bg-[var(--green-accent)] text-[9px] px-1.5 py-0.5 rounded font-mono font-bold text-black">SUGGESTION</div>Hi! Thanks for reaching out 😊 Our packages start from ₹850/person...</div></AnimatePresence>
            
            <AnimatePresence step={step} min={6}><div className="self-end bg-[var(--purple-primary)] text-white text-[13px] px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] font-sans">Hi! Thanks for reaching out 😊 Our packages start from ₹850/person...</div></AnimatePresence>
            
            <AnimatePresence step={step} min={7}><div className="self-start bg-[var(--bg)] border border-[var(--border)] text-white text-[13px] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] font-sans mt-2">That sounds great! Can we schedule a call?</div></AnimatePresence>

            <AnimatePresence step={step} min={8}><div className="self-start bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] text-[var(--green-accent)] text-[10px] px-3 py-2 rounded-lg max-w-[80%] font-mono uppercase tracking-wider">Buying signal detected 🎯 — Recommend: Offer appointment</div></AnimatePresence>
          </div>
        </motion.div>

        {/* Right Text */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-start md:order-last order-first">
          <div className="font-sans text-xs font-semibold text-[var(--purple-light)] border border-[var(--purple-primary)]/30 bg-[var(--purple-primary)]/10 rounded-full px-3 py-1 mb-6">AI Sales Agent</div>
          <h2 className="font-sans font-semibold text-[clamp(32px,4vw,48px)] tracking-[-0.02em] text-white mb-6 leading-[1.1]">Your best sales rep. Available 24/7.</h2>
          <p className="font-sans text-[16px] text-[var(--text-secondary)] max-w-[500px] leading-[1.7] mb-8">
            The AI Sales Agent reads every conversation, detects buying intent, suggests
            the perfect response, handles objections, and books appointments — all autonomously.
          </p>
          <ul className="space-y-4 font-sans text-[15px] text-[var(--text-primary)]">
            {["Instant AI response suggestions", "Objection handling playbooks", "Tone and persona customization", "Autonomous booking and follow-up"].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[var(--purple-light)] mt-0.5">✦</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}

function AnimatePresence({ children, step, min, max = 999 }: { children: React.ReactNode, step: number, min: number, max?: number }) {
  if (step < min || step >= max) return null;
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col">{children}</motion.div>;
}

export function VentureMetrics() {
  const metrics = [
    { num: "₹2.4 Cr", label: "Revenue saved by Churn Shield this quarter", icon: "🛡", color: "text-[var(--green-accent)]" },
    { num: "3,847", label: "Leads converted with AI scoring this month", icon: "📈", color: "text-[var(--purple-light)]" },
    { num: "1,294", label: "Appointments auto-scheduled by AI", icon: "📅", color: "text-[var(--blue-accent)]" },
    { num: "12,000+", label: "Hours of manual work automated", icon: "⏱", color: "text-[var(--amber-accent)]" },
    { num: "1.2s", label: "Average AI response time", icon: "⚡", color: "text-[var(--green-accent)]" },
    { num: "4.9/5", label: "Customer satisfaction across all workspaces", icon: "★", color: "text-[var(--amber-accent)]" }
  ];

  return (
    <section className="py-[120px] bg-[var(--bg)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--purple-primary)] to-transparent opacity-[0.02]" />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-sans font-semibold text-[clamp(32px,4vw,56px)] tracking-[-0.02em] text-white mb-4">Real results. Real intelligence.</h2>
          <p className="font-sans text-[18px] text-[var(--text-secondary)]">What SellQ delivers for sales teams every single day.</p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid md:grid-cols-3 gap-6">
          {metrics.map((m, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--purple-primary)]/50 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center text-xl">{m.icon}</div>
                <div className="bg-[rgba(16,185,129,0.1)] text-[var(--green-accent)] font-mono text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">↑ {i%2===0?'34%':'2.1×'}</div>
              </div>
              <div className="font-mono text-[36px] text-white font-medium mb-2 group-hover:text-[var(--purple-light)] transition-colors">{m.num}</div>
              <div className="font-sans text-[14px] text-[var(--text-secondary)] leading-relaxed">{m.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 pt-8 border-t border-[var(--border)] flex justify-center">
          <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-widest text-center">
            Powered by Gemini AI · Built on Supabase · Deployed on Vercel
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function VentureCTA() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden py-[120px]">
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[rgba(124,58,237,0.1)] rounded-full blur-[120px] pointer-events-none"
      />
      
      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-sans text-xs font-semibold text-[var(--text-secondary)] tracking-widest uppercase mb-6">
          ✦ Start today. See results in 48 hours.
        </motion.div>
        
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-sans font-semibold text-[clamp(52px,7vw,96px)] leading-[1.05] tracking-[-0.03em] text-white mb-8">
          The future of sales<br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--purple-light)] to-[var(--blue-accent)]">runs on intelligence.</span>
        </motion.h2>
        
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-sans text-[18px] text-[var(--text-secondary)] max-w-[600px] leading-[1.7] mb-12">
          Join 500+ businesses already using SellQ to score leads, prevent churn,
          and close deals on autopilot. No credit card. No setup fees.
        </motion.p>
        
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
          <Link href="/login" className="flex justify-center items-center gap-2 bg-[var(--purple-primary)] hover:bg-[#8B5CF6] text-white font-sans text-[18px] font-medium px-8 py-4 rounded-lg transition-all hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:scale-[1.04] group">
            Start Free Trial <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <button className="flex justify-center items-center bg-transparent border border-white hover:bg-[rgba(255,255,255,0.1)] text-white font-sans text-[18px] font-medium px-8 py-4 rounded-lg transition-all">
            Schedule a Demo
          </button>
        </motion.div>
        
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-sans text-[14px] text-[var(--text-muted)]">
          🔒 SOC 2 Ready · GDPR Compliant · 99.9% Uptime · Free forever plan
        </motion.div>
      </div>
    </section>
  );
}

export function VentureFooter() {
  return (
    <footer className="bg-[var(--bg)] border-t border-[var(--border)] py-8 px-6 relative z-10">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[var(--purple-primary)] flex items-center justify-center"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <span className="font-sans font-semibold text-white tracking-tight">SellQ</span>
          <span className="font-sans text-[12px] text-[var(--text-muted)] ml-2">© 2026</span>
        </div>
        <div className="flex gap-6 font-sans text-[13px] text-[var(--text-secondary)]">
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
