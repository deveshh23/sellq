'use client';
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { expoEase, CharReveal } from './PlusXHero';

export function PlusXNumber() {
  const [inView, setInView] = useState(false);
  const ref = React.useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (inView) {
      let current = 0;
      const i = setInterval(() => {
        current += 0.05;
        if (current >= 2.4) { current = 2.4; clearInterval(i); }
        setCount(current);
      }, 20);
      return () => clearInterval(i);
    }
  }, [inView]);

  return (
    <section ref={ref} className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-[var(--bg)]">
      <div className="flex flex-col items-center z-10 text-center">
        <div className="font-mono font-semibold text-[clamp(96px,14vw,200px)] tracking-[-0.05em] text-white leading-none">
          ₹{count.toFixed(1)} Cr
        </div>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1, delay: 0.3 }}
          className="font-sans text-[18px] font-light text-[var(--text-secondary)] mt-4 max-w-[400px]"
        >
          in revenue protected by Churn Shield AI last quarter
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-[60px] flex gap-6 md:gap-12 font-mono text-[13px] text-white/30 text-center"
      >
        <div>3,847 leads scored</div>
        <div className="w-[1px] h-4 bg-white/10" />
        <div>1,294 meetings booked</div>
        <div className="w-[1px] h-4 bg-white/10" />
        <div>12,000+ hours saved</div>
      </motion.div>
    </section>
  );
}

export function PlusXProblem() {
  return (
    <section className="relative w-full h-[100vh] flex items-center bg-[var(--bg)]">
      <div className="glow-blob bg-[var(--accent-red)] w-[500px] h-[500px] opacity-[0.10] top-0 left-1/2 -translate-x-1/2" />
      
      <div className="max-w-[1100px] mx-auto w-full px-12 grid md:grid-cols-2 gap-24 items-center z-10">
        <div>
          <div className="font-sans text-[11px] font-medium text-[var(--accent-red)] tracking-[0.15em] mb-6 uppercase">THE PROBLEM</div>
          <h2 className="font-sans font-semibold text-[clamp(48px,6vw,88px)] tracking-[-0.03em] text-white leading-[1.05] flex flex-col">
            <CharReveal text="You're losing deals" delay={0.1} />
            <CharReveal text="you never knew" delay={0.3} />
            <CharReveal text="you had." delay={0.5} />
          </h2>
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} viewport={{ once: true }}
            className="font-sans text-[17px] font-light text-[var(--text-secondary)] mt-6 max-w-[440px] leading-[1.8]"
          >
            Leads go cold. Follow-ups get forgotten. CRMs become graveyards. And by the time you notice — the customer has already signed with someone else.
          </motion.p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { t: "62 leads went cold this month", b: "CRITICAL" },
            { t: "47 follow-ups overdue", b: "WARNING" },
            { t: "4.2 hour avg response time", b: "WARNING" },
            { t: "₹18,500 at churn risk today", b: "CRITICAL" }
          ].map((row, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8 + (i * 0.15), ease: expoEase as any }} viewport={{ once: true }}
              className={`bg-[#0A0A0A] border border-white/5 border-l-2 p-5 flex justify-between items-center ${row.b === 'CRITICAL' ? 'border-l-[var(--accent-red)]' : 'border-l-amber-500'}`}
            >
              <div className="font-mono text-[14px] text-white">{row.t}</div>
              <div className={`text-[10px] font-mono px-2 py-0.5 rounded ${row.b === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>{row.b}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlusXLeadScoring() {
  const [inView, setInView] = useState(false);
  const ref = React.useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full h-[100vh] flex items-center bg-[var(--bg)]">
      <div className="glow-blob bg-[var(--accent-purple)] w-[500px] h-[500px] opacity-[0.12] left-0 top-1/2 -translate-y-1/2" />
      
      <div className="max-w-[1100px] mx-auto w-full px-12 flex justify-between items-center z-10">
        <div className="w-[40%]">
          <div className="font-sans text-[11px] font-medium text-white/50 tracking-[0.15em] mb-6 uppercase">AI LEAD SCORING</div>
          <h2 className="font-sans font-semibold text-[clamp(40px,5vw,72px)] tracking-[-0.03em] text-white leading-[1.05] flex flex-col mb-6">
            <CharReveal text="Know exactly" delay={0.1} />
            <CharReveal text="who to call next." delay={0.3} />
          </h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} viewport={{ once: true }} className="font-sans text-[17px] font-light text-[var(--text-secondary)] max-w-[380px] leading-[1.8] mb-8">
            SellQ analyzes every signal to surface exactly which accounts are ready to buy.
          </motion.p>
          <div className="flex flex-col gap-3 font-sans text-[14px] font-light text-[var(--text-secondary)]">
            {["— Intent detection from conversation keywords", "— Engagement scoring across all channels", "— Recency and response-velocity tracking", "— AI-generated \"why this score\" explanation"].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 + (i * 0.15) }} viewport={{ once: true }}>{f}</motion.div>
            ))}
          </div>
        </div>

        <div className="w-[60%] flex justify-end">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: expoEase as any }} viewport={{ once: true }} className="w-[380px] bg-[#0A0A0A] border border-white/5 p-8 shadow-[0_0_60px_rgba(124,58,237,0.1)] relative">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-[16px] text-white font-medium">Raj Patel</div>
                <div className="text-[13px] text-[var(--text-secondary)]">Acme Corp · Enterprise</div>
              </div>
              <div className="bg-red-500 text-white text-[10px] px-2 py-1 rounded font-mono font-bold">HOT</div>
            </div>

            <div className="flex flex-col items-center mb-10">
              <div className="relative w-[180px] h-[180px]">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="url(#purp)" strokeWidth="6" strokeLinecap="round" strokeDasharray="283" strokeDashoffset={inView ? 283 * (1 - 0.87) : 283} style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                  <defs><linearGradient id="purp"><stop offset="0%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#3B82F6"/></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-[40px] text-white">{inView ? 87 : 0}</span>
                  <span className="font-sans text-[12px] text-[var(--text-secondary)]">AI Score</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {[ {l: "Purchase Intent", v: 91, c: "bg-[var(--accent-purple)]"}, {l: "Engagement", v: 78, c: "bg-[var(--accent-blue)]"}, {l: "Recency", v: 84, c: "bg-[var(--accent-green)]"}, {l: "Sentiment", v: 72, c: "bg-amber-500"} ].map((b, i) => (
                <div key={i}>
                  <div className="flex justify-between font-mono text-[11px] text-[var(--text-secondary)] mb-1.5 uppercase"><span>{b.l}</span><span>{b.v}%</span></div>
                  <div className="w-full h-1 bg-white/5 overflow-hidden"><div className={`h-full ${b.c}`} style={{ width: inView ? `${b.v}%` : '0%', transition: `width 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${1 + (i*0.1)}s` }} /></div>
                </div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 0.8, delay: 1.6 }} className="bg-[rgba(124,58,237,0.06)] border border-[rgba(124,58,237,0.2)] rounded-lg p-4 font-sans text-[12px] text-[var(--accent-purple-light)] leading-relaxed">
              ✦ Visited pricing page 3× · Mentioned 'budget approval' · Recommend: Send proposal today
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
