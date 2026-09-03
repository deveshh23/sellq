'use client';
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { expoEase, CharReveal } from './PlusXHero';

export function PlusXSalesAgent() {
  const [step, setStep] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      setStep(0);
      const timers = [
        setTimeout(() => setStep(1), 0),
        setTimeout(() => setStep(2), 800),
        setTimeout(() => setStep(3), 1800),
        setTimeout(() => setStep(4), 2400),
        setTimeout(() => setStep(5), 4000),
        setTimeout(() => setStep(6), 4800),
        setTimeout(() => setStep(7), 5400),
        setTimeout(() => setStep(8), 7000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [inView]);

  return (
    <section ref={ref} className="relative w-full h-[100vh] flex items-center bg-[var(--bg)]">
      <div className="glow-blob bg-[var(--accent-blue)] w-[400px] h-[400px] opacity-[0.10] right-0 top-1/2 -translate-y-1/2" />
      
      <div className="max-w-[1100px] mx-auto w-full px-12 flex justify-between items-center z-10">
        
        {/* Chat UI */}
        <div className="w-[45%] flex flex-col gap-5 h-[400px] justify-center">
          <StepReveal step={step} min={1}><div className="self-start text-white bg-[#0A0A0A] border border-white/10 text-[14px] px-5 py-3 rounded-2xl font-sans max-w-[85%]">What are your enterprise pricing options?</div></StepReveal>
          <StepReveal step={step} min={2} max={4}><div className="self-end text-[var(--accent-purple-light)] text-[11px] font-mono flex items-center gap-2 tracking-widest"><div className="flex gap-1"><div className="w-1 h-1 bg-current rounded-full animate-bounce"/><div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{animationDelay:'0.1s'}}/><div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{animationDelay:'0.2s'}}/></div>SellQ analyzing...</div></StepReveal>
          <StepReveal step={step} min={3}><div className="self-end text-amber-500 text-[11px] font-mono tracking-widest uppercase">Intent: Pricing inquiry · Score +12pts</div></StepReveal>
          <StepReveal step={step} min={4}><div className="self-end bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] text-[var(--accent-purple-light)] text-[14px] px-5 py-3 rounded-2xl font-sans max-w-[85%]">Our Enterprise plan starts at ₹4,999/mo with unlimited users...</div></StepReveal>
          <StepReveal step={step} min={5}><div className="self-start text-white bg-[#0A0A0A] border border-white/10 text-[14px] px-5 py-3 rounded-2xl font-sans max-w-[85%] mt-4">Can we schedule a demo this week?</div></StepReveal>
          <StepReveal step={step} min={6}><div className="self-end text-[var(--accent-green)] text-[11px] font-mono tracking-widest uppercase">Booking intent detected 🎯</div></StepReveal>
          <StepReveal step={step} min={7}><div className="self-end bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] text-[var(--accent-purple-light)] text-[14px] px-5 py-3 rounded-2xl font-sans max-w-[85%]">Absolutely! I've found 3 open slots for you...</div></StepReveal>
          <StepReveal step={step} min={8}><div className="self-end bg-[rgba(16,185,129,0.1)] text-[var(--accent-green)] border border-[rgba(16,185,129,0.2)] text-[11px] px-2 py-1 rounded font-mono uppercase tracking-widest">Appointment created ✓</div></StepReveal>
        </div>

        <div className="w-[45%]">
          <div className="font-sans text-[11px] font-medium text-white/50 tracking-[0.15em] mb-6 uppercase">AI SALES AGENT</div>
          <h2 className="font-sans font-semibold text-[clamp(40px,5vw,72px)] tracking-[-0.03em] text-white leading-[1.05] flex flex-col mb-6">
            <CharReveal text="Your best rep." delay={0.1} />
            <CharReveal text="Never sleeps." delay={0.3} />
          </h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} viewport={{ once: true }} className="font-sans text-[17px] font-light text-[var(--text-secondary)] leading-[1.8] mb-8">
            The AI Sales Agent reads every conversation, detects buying intent, and handles objections autonomously.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function StepReveal({ children, step, min, max = 999 }: { children: React.ReactNode, step: number, min: number, max?: number }) {
  if (step < min || step >= max) return null;
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: expoEase as any }} className="w-full flex flex-col">{children}</motion.div>;
}

export function PlusXChurnShield() {
  const [inView, setInView] = useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full h-[100vh] flex items-center bg-[var(--bg)]">
      <div className="glow-blob bg-[var(--accent-red)] w-[500px] h-[500px] opacity-[0.15] left-0 top-1/2 -translate-y-1/2" />
      
      <div className="max-w-[1100px] mx-auto w-full px-12 flex justify-between items-center z-10">
        <div className="w-[50%]">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: expoEase as any }} viewport={{ once: true }} className="w-[400px] bg-[#0A0A0A] border border-white/5 p-8 shadow-[0_0_60px_rgba(239,68,68,0.15)] relative overflow-hidden flex flex-col">
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/5"><div className="w-full bg-[var(--accent-red)] transition-all duration-1500 ease-out" style={{ height: inView ? '73%' : '0%', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', transitionDelay: '0.2s', marginTop: 'auto' }} /></div>
            
            <div className="font-mono text-[11px] text-[var(--accent-red)] tracking-[0.1em] mb-4">⚠ CRITICAL INTERVENTION</div>
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <span className="text-[15px] text-white">Elena Rostova</span>
              <span className="text-[12px] text-[var(--accent-red)] font-mono">73% churn prob.</span>
            </div>

            <div className="space-y-3 mb-8">
              {["⚠ 3 complaints in 7 days", "⚠ Sentiment: Neutral → Frustrated", "⚠ Mentioned Freshdesk twice", "⚠ Response exceeded 4 hours"].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -10 }} transition={{ duration: 0.5, delay: 0.8 + (i*0.1) }} className="text-[13px] text-[var(--text-secondary)] pl-4 border-l border-white/10">{s}</motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 0.5, delay: 1.4 }} className="bg-[rgba(124,58,237,0.04)] border border-[rgba(124,58,237,0.15)] p-4 rounded-lg mb-6">
              <div className="text-[13px] text-[var(--accent-purple-light)] leading-relaxed">✦ AI recommends: Send 20% retention offer + apologize for support delays</div>
            </motion.div>
            
            <div className="flex justify-between items-center pr-4">
              <div className="text-[11px] font-mono text-[var(--accent-green)]">Recovery prob: {inView ? 67 : 0}%</div>
              <button className="border border-[var(--accent-red)] text-[var(--accent-red)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] transition-colors text-[13px] px-4 py-2 font-mono uppercase tracking-widest">Send Recovery</button>
            </div>
          </motion.div>
        </div>

        <div className="w-[45%]">
          <div className="font-sans text-[11px] font-medium text-[var(--accent-red)] tracking-[0.15em] mb-6 uppercase">CHURN SHIELD AI</div>
          <h2 className="font-sans font-semibold text-[clamp(40px,5vw,72px)] tracking-[-0.03em] text-white leading-[1.05] flex flex-col mb-6">
            <CharReveal text="Stop churn" delay={0.1} />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500"><CharReveal text="before it starts." delay={0.3} /></span>
          </h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} viewport={{ once: true }} className="font-sans text-[17px] font-light text-[var(--text-secondary)] leading-[1.8] mb-8 max-w-[400px]">
            When a customer is about to leave, you know 14 days before they do. One click to send an AI recovery strategy.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export function PlusXCTA() {
  return (
    <section className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-[var(--bg)] text-center px-12">
      <div className="glow-blob bg-[var(--accent-purple)] w-[700px] h-[700px] opacity-[0.20] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="z-10 flex flex-col items-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sans text-[11px] font-medium text-white/50 tracking-[0.2em] mb-8 uppercase">START TODAY</motion.div>
        
        <h2 className="font-sans font-semibold text-[clamp(56px,8vw,120px)] tracking-[-0.04em] text-white leading-[1.05] flex flex-col items-center mb-8">
          <CharReveal text="The future of sales" delay={0.2} />
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-[var(--accent-purple)] via-[var(--accent-purple-light)] to-[var(--accent-blue)]">
            <CharReveal text="runs on intelligence." delay={0.4} />
          </span>
        </h2>
        
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} viewport={{ once: true }} className="font-sans text-[18px] font-light text-[var(--text-secondary)] leading-[1.8] max-w-[500px] mb-12">
          Join 500+ businesses already using SellQ. No credit card. No setup fees. Results in 48 hours.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: expoEase as any }} viewport={{ once: true }} className="mb-6">
          <Link href="/login" className="font-sans text-[16px] text-white px-[40px] py-[16px] border border-white/20 rounded-md hover:bg-[rgba(124,58,237,0.15)] hover:border-[rgba(124,58,237,0.5)] transition-all duration-300 inline-block hover:scale-[1.03]">
            Open Dashboard →
          </Link>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} viewport={{ once: true }} className="font-sans text-[11px] text-white/25 tracking-[0.05em]">
          🔒 Free forever plan · No credit card · 99.9% uptime
        </motion.div>
      </div>

      <div className="absolute bottom-6 font-mono text-[10px] text-white/20 uppercase tracking-widest z-10">
        © 2026 SellQ · Privacy · Terms
      </div>
    </section>
  );
}
