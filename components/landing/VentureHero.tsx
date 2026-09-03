'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export const fadeUp: any = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
export const scaleIn: any = { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
export const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export function VentureNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[rgba(8,8,16,0.85)] backdrop-blur-[20px] border-[rgba(255,255,255,0.07)] py-3' : 'bg-transparent border-transparent py-5'}`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[var(--purple-primary)] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-sans font-semibold text-white tracking-tight">SellQ</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-sans text-sm text-[var(--text-secondary)]">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#scoring" className="hover:text-white transition-colors">Lead Scoring</Link>
          <Link href="#churn" className="hover:text-white transition-colors">Churn Shield</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="font-sans text-sm text-[var(--text-secondary)] hover:text-white transition-colors hidden md:block">Sign In</Link>
          <Link href="/login" className="bg-[var(--purple-primary)] hover:bg-[#8B5CF6] text-white font-sans text-sm font-medium px-4 py-2 rounded-md transition-all hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:scale-[1.02]">
            Start Free
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

export function VentureHero() {
  const [score, setScore] = useState(0);
  const [churnRisk, setChurnRisk] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let s = 0;
      let c = 0;
      const interval = setInterval(() => {
        if (s < 87) { s += 3; setScore(s > 87 ? 87 : s); }
        if (c < 73) { c += 2; setChurnRisk(c > 73 ? 73 : c); }
        if (s >= 87 && c >= 73) clearInterval(interval);
      }, 30);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[100vh] pt-[120px] pb-[80px] overflow-hidden flex items-center">
      {/* Background Radial Glow */}
      <motion.div 
        animate={{ x: [0, 20, 0], opacity: [0.6, 1, 0.6] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[40vw] h-[40vw] bg-[rgba(124,58,237,0.12)] rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{ x: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[40%] right-[10%] w-[30vw] h-[30vw] bg-[rgba(59,130,246,0.08)] rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center relative z-10">
        
        {/* Left Column: Text */}
        <div className="flex flex-col items-start gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-2 border border-[rgba(124,58,237,0.4)] bg-[rgba(124,58,237,0.08)] rounded-full px-3 py-1.5 backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--purple-primary)] animate-pulse" />
            <span className="font-sans text-xs font-medium text-[var(--purple-light)]">✦ AI-Powered Sales Intelligence</span>
          </motion.div>

          <motion.h1 
            variants={stagger} initial="hidden" animate="visible"
            className="font-sans font-semibold text-[clamp(48px,6vw,88px)] leading-[1.05] tracking-[-0.03em] text-white"
          >
            <motion.div variants={fadeUp}>Turn Every</motion.div>
            <motion.div variants={fadeUp} className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--purple-light)] to-[var(--blue-accent)]">Conversation</motion.div>
            <motion.div variants={fadeUp}>Into Revenue.</motion.div>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
            className="font-sans text-[18px] leading-[1.7] text-[var(--text-secondary)] max-w-[540px]"
          >
            SellQ is the AI operating system that scores your leads, predicts churn before it
            happens, automates follow-ups, and closes deals — while you sleep.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col gap-4 mt-4 w-full sm:w-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login" className="flex items-center justify-center gap-2 bg-[var(--purple-primary)] hover:bg-[#8B5CF6] text-white font-sans text-[16px] font-medium px-6 py-3.5 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-[1.02]">
                Start Free Trial <span>→</span>
              </Link>
              <button onClick={() => document.getElementById('sales-agent')?.scrollIntoView({behavior: 'smooth'})} className="flex items-center justify-center gap-2 bg-transparent border border-[var(--border)] hover:bg-[rgba(255,255,255,0.05)] text-white font-sans text-[16px] font-medium px-6 py-3.5 rounded-lg transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 3L19 12L5 21V3Z" /></svg> Watch Demo
              </button>
            </div>
            <span className="font-sans text-[12px] text-[var(--text-muted)] ml-1">No credit card required · Setup in 2 minutes</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center gap-4 mt-8 pt-6 border-t border-[var(--border)] w-full max-w-[400px]"
          >
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-[var(--surface-elevated)] border-2 border-[var(--bg)] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-amber-400 text-xs">★★★★★ <span className="text-white ml-1 font-sans font-medium">4.9/5</span></div>
              <span className="font-sans text-[12px] text-[var(--text-secondary)]">Trusted by 500+ businesses</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Floating Dashboard */}
        <div className="relative w-full h-[500px] hidden md:block perspective-[1000px]">
          <div className="absolute inset-0" style={{ transform: 'rotateX(8deg) rotateY(-12deg)', transformStyle: 'preserve-3d' }}>
            
            {/* Card 1: Lead Score */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              className="absolute top-0 left-0 w-[240px] bg-[var(--surface-elevated)] border border-[var(--border-glow)] rounded-xl p-4 shadow-2xl backdrop-blur-md z-10"
              style={{ transform: 'rotate(-3deg)' }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-[10px] text-[var(--text-secondary)] font-mono">Raj Patel · Acme Corp</div>
                <div className="bg-red-500/20 text-red-500 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">HOT</div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-[32px] font-sans font-semibold text-[var(--purple-primary)] leading-none">{score}</div>
                <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-widest">AI Score</div>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-[var(--bg)] rounded-full overflow-hidden"><div className="h-full bg-[var(--purple-light)] w-[91%]" /></div>
                <div className="h-1.5 w-full bg-[var(--bg)] rounded-full overflow-hidden"><div className="h-full bg-[var(--blue-accent)] w-[78%]" /></div>
                <div className="h-1.5 w-full bg-[var(--bg)] rounded-full overflow-hidden"><div className="h-full bg-[var(--green-accent)] w-[84%]" /></div>
              </div>
            </motion.div>

            {/* Card 2: Churn Alert */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
              className="absolute top-[40px] right-0 w-[260px] bg-[var(--surface-elevated)] border border-[rgba(239,68,68,0.3)] rounded-xl p-4 shadow-2xl backdrop-blur-md z-20"
              style={{ transform: 'rotate(2deg)' }}
            >
              <div className="flex items-center gap-2 text-red-400 font-sans text-sm font-semibold mb-2">
                ⚠ Churn Shield Alert
              </div>
              <div className="text-[11px] text-[var(--text-secondary)] font-mono mb-3">Elena Rostova · {churnRisk}% churn risk</div>
              <div className="h-1.5 w-full bg-[var(--bg)] rounded-full overflow-hidden mb-3">
                <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${churnRisk}%` }} />
              </div>
              <div className="text-[10px] text-amber-400 font-sans bg-amber-400/10 p-2 rounded border border-amber-400/20">
                AI Recovery Action: Send retention offer
              </div>
            </motion.div>

            {/* Card 3: AI Reply */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
              className="absolute bottom-[40px] left-[20px] w-[280px] bg-[var(--surface-elevated)] border border-[rgba(16,185,129,0.3)] rounded-xl p-4 shadow-2xl backdrop-blur-md z-30"
              style={{ transform: 'rotate(1deg)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] text-white font-sans font-medium">AI Copilot</span>
              </div>
              <div className="bg-[var(--bg)] rounded-lg rounded-tl-none p-2.5 mb-2 border border-[var(--border)]">
                <div className="text-[11px] text-[var(--text-secondary)] font-sans">What's your enterprise pricing?</div>
              </div>
              <div className="bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] rounded-lg rounded-tr-none p-2.5 ml-4">
                <div className="text-[11px] text-[var(--purple-light)] font-sans">Our Enterprise plan starts at ₹4,999/mo with unlimited users...</div>
              </div>
            </motion.div>

            {/* Card 4: Revenue Metric */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}
              className="absolute bottom-[-20px] right-[20px] w-[200px] bg-[var(--surface-elevated)] border border-[rgba(59,130,246,0.3)] rounded-xl p-5 shadow-2xl backdrop-blur-md z-40"
              style={{ transform: 'rotate(-1.5deg)' }}
            >
              <div className="text-[11px] text-[var(--text-secondary)] font-mono uppercase tracking-wider mb-2">Revenue Attributed</div>
              <div className="text-[28px] text-green-400 font-sans font-bold leading-none mb-2">₹47,200</div>
              <div className="text-[10px] text-[var(--text-muted)] font-sans">This month · ↑ 34% vs last</div>
              <div className="flex items-end gap-1 mt-3 h-[30px]">
                {[30, 45, 25, 60, 80, 50, 90, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-500/50 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
