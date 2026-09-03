'use client';
import React from 'react';
import { motion } from 'framer-motion';

const fadeUp: any = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export function ExhibitGallery() {
  const cards = [
    { num: '01', icon: '🧠', title: 'AI AUTO-REPLY', desc: 'REPLIES IN YOUR VOICE. GEMINI-POWERED. TONE SELECTOR.', accent: 'var(--accent-yellow)', transform: 'rotateY(12deg) translateX(-20px)' },
    { num: '02', icon: '📊', title: 'LEAD SCORING', desc: 'CIRCULAR GAUGE. HOT WARM COLD. REAL-TIME.', accent: 'var(--accent-blue)', transform: 'rotateY(6deg)' },
    { num: '03', icon: '🛡️', title: 'CHURN SHIELD', desc: 'PREDICTS CANCELLATIONS 14 DAYS EARLY.', accent: 'var(--accent-pink)', transform: 'rotateY(0deg) scale(1.05)', zIndex: 10 },
    { num: '04', icon: '🔁', title: 'PROMISES TRACKER', desc: 'EXTRACTS COMMITMENTS. OVERDUE ALERTS.', accent: 'var(--accent-yellow)', transform: 'rotateY(0deg) scale(1.05)', zIndex: 10 },
    { num: '05', icon: '📣', title: 'BROADCAST', desc: 'WHATSAPP CAMPAIGNS. AUDIENCE TARGETING. SEND.', accent: 'var(--accent-blue)', transform: 'rotateY(-6deg)' },
    { num: '06', icon: '💰', title: 'REVENUE INTEL', desc: 'ATTRIBUTION CHARTS. CHANNEL ROI. AI INSIGHTS.', accent: 'var(--accent-pink)', transform: 'rotateY(-12deg) translateX(20px)' }
  ];

  return (
    <section className="relative py-32 flex flex-col items-center bg-[var(--bg)] overflow-hidden">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16 relative z-10">
        <div className="font-mono text-[11px] text-[var(--text-dim)] tracking-[0.15em] uppercase mb-4">THE INTELLIGENCE STACK</div>
        <h2 className="font-heading font-black text-[5vw] text-white leading-[0.9] uppercase tracking-[0.05em]">
          BUILT FOR BUSINESSES<br/>THAT REPLY FIRST.
        </h2>
      </motion.div>

      {/* CSS 3D Perspective Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full flex justify-center pb-8 overflow-x-auto lg:overflow-visible px-8 scrollbar-hide"
        style={{ perspective: '1200px' }}
      >
        <div className="flex gap-5 items-center pb-8 lg:pb-0" style={{ transformStyle: 'preserve-3d' }}>
          {cards.map((card, i) => (
            <div 
              key={i}
              className="relative w-[220px] h-[280px] bg-[#111111] border border-[var(--border)] p-7 flex flex-col justify-end cursor-pointer transition-all duration-300 group shrink-0"
              style={{ transform: card.transform, zIndex: card.zIndex || 1 }}
            >
              {/* Color Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: card.accent }} />
              
              <div className="font-heading font-black text-[72px] text-[var(--text-dim)] leading-none mb-auto opacity-30">{card.num}</div>
              
              <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110 origin-left">{card.icon}</div>
              <h3 className="font-heading font-bold text-[22px] text-white uppercase tracking-[0.05em] leading-[1.1] mb-2">{card.title}</h3>
              <p className="font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-wider leading-[1.4]">{card.desc}</p>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 border border-transparent group-hover:border-white/40 transition-colors pointer-events-none" />
            </div>
          ))}
        </div>
      </motion.div>

      <div className="font-mono text-[9px] text-[var(--text-dim)] tracking-[0.2em] uppercase mt-8 relative z-10">
        2026 — AI FEATURE — UNIFIED INBOX
      </div>
    </section>
  );
}

export function ManifestoPanel() {
  return (
    <section className="bg-[var(--bg)] py-32 overflow-hidden relative">
      <div className="max-w-[900px] mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="p-[60px] md:p-[80px] border border-[var(--border)] relative bg-[rgba(20,20,20,0.4)] backdrop-blur-sm origin-center -rotate-2"
        >
          <p className="font-heading font-black text-[28px] md:text-[3.5vw] leading-[1.1] text-white uppercase tracking-[0.08em]">
            SMALL BUSINESSES LOSE CUSTOMERS EVERY DAY<br/>
            BECAUSE REPLIES ARE SLOW.<br/>
            SELLQ CHANGES THAT.<br/>
            <span className="text-[var(--accent-yellow)]">AI THAT REPLIES IN 3 SECONDS.</span><br/>
            AI THAT SCORES YOUR LEADS.<br/>
            AI THAT REMEMBERS EVERY PROMISE.<br/>
            THIS IS THE INBOX<br/>
            YOUR BUSINESS DESERVES.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function StatsBar() {
  const stats = [
    { num: "$32,800+", label: "PIPELINE TRACKED" },
    { num: "200+", label: "BUSINESSES SERVED" },
    { num: "3 SEC", label: "AVG AI REPLY TIME" },
    { num: "TOP 10", label: "SUMMERCHIP 2026" }
  ];

  return (
    <section className="w-full bg-[var(--bg)] border-y border-[var(--border)]">
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-[1400px] mx-auto">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className={`p-[40px] md:p-[60px] flex flex-col justify-center items-center text-center ${i > 0 ? 'md:border-l md:border-[var(--border)]' : ''} ${i % 2 === 1 ? 'border-l border-[var(--border)] md:border-none' : ''} ${i > 1 ? 'border-t border-[var(--border)] md:border-t-0' : ''}`}
          >
            <div className="font-heading font-black text-[48px] md:text-[72px] text-white leading-none tracking-[0.05em]">{stat.num}</div>
            <div className="font-mono text-[11px] text-[var(--text-dim)] uppercase tracking-[0.15em] mt-3">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ProcessLine() {
  const steps = [
    { num: "01", title: "CONNECT CHANNELS", desc: "WHATSAPP, EMAIL, INSTAGRAM. MINUTES TO SET UP." },
    { num: "02", title: "TRAIN YOUR AI", desc: "UPLOAD FAQS. SET TONE. CALIBRATE IN SANDBOX." },
    { num: "03", title: "WATCH IT WORK", desc: "AI REPLIES, SCORES LEADS, TRACKS PROMISES." }
  ];

  return (
    <section className="py-32 bg-[var(--bg)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 relative">
        {/* Horizontal connecting line */}
        <div className="hidden md:block absolute top-[24px] left-[16.66%] right-[16.66%] h-[1px] bg-[var(--border)]" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 relative z-10">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center px-4 bg-[var(--bg)]"
            >
              <div className="font-heading font-black text-[48px] text-white/20 leading-none bg-[var(--bg)] px-4">{step.num}</div>
              <h3 className="font-heading font-bold text-[24px] text-white uppercase tracking-[0.05em] mt-4 leading-[1.1]">{step.title}</h3>
              <p className="font-mono text-[11px] text-[var(--text-dim)] uppercase tracking-[0.08em] mt-3 leading-[1.6] max-w-[260px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
