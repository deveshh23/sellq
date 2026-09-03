'use client';
import React from 'react';
import { motion } from 'framer-motion';

const fadeUp: any = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export function InnovationCards() {
  const cards = [
    { title: "CONVERSATION REVENUE ATTRIBUTION", color: "var(--accent-yellow)", desc: "Connects specific conversations to deal revenue. Shows best channel, best time, ROI per message. You know exactly where your money comes from." },
    { title: "AI CHURN PREDICTION SHIELD", color: "var(--accent-blue)", desc: "Monitors sentiment trends across conversations. Flags at-risk customers 7–14 days before they cancel. Auto-generates recovery messages." },
    { title: "AI REPLY MEMORY (PROMISES TRACKER)", color: "var(--accent-pink)", desc: "Extracts every commitment made in conversations (\"I'll call you Friday\"). Tracks fulfillment. Alerts you when you're overdue. Never ghost a customer again." }
  ];

  return (
    <section className="py-24 px-8 bg-[var(--bg)]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mb-16">
          <div className="font-mono text-[11px] text-[var(--text-dim)] tracking-[0.15em] uppercase mb-3">INNOVATION — 3 EXCLUSIVE FEATURES</div>
          <h2 className="font-heading font-black text-[40px] md:text-[56px] text-white leading-[0.9] uppercase tracking-[0.05em]">
            YOU WON'T FIND THESE ANYWHERE ELSE.
          </h2>
        </motion.div>
        
        <div className="flex flex-col gap-[2px]">
          {cards.map((item, i) => (
            <motion.div 
              key={i}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.1 }}
              className="bg-[#0D0D0D] border border-[var(--border)] p-[48px] md:p-[60px] grid md:grid-cols-[1fr_2fr] gap-8 md:gap-[60px] hover:bg-[#141414] transition-colors duration-300"
              style={{ borderLeft: `4px solid ${item.color}` }}
            >
              <h3 className="font-heading font-black text-[32px] md:text-[40px] text-white uppercase tracking-[0.05em] leading-[1.05]">{item.title}</h3>
              <p className="font-mono text-[13px] md:text-[14px] text-[var(--text-dim)] uppercase tracking-[0.05em] leading-[1.8] max-w-[600px] flex items-center">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative w-full bg-[var(--bg)] py-[160px] px-8 flex flex-col items-center justify-center overflow-hidden border-t border-[var(--border)]">
      {/* Targeting Rings */}
      <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[900px] h-[900px] border border-white/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
      
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative z-10 flex flex-col items-center text-center">
        <div className="font-mono text-[11px] text-[var(--text-dim)] tracking-[0.2em] uppercase mb-8">
          SELLQ AI · UNIFIED INBOX · 2026
        </div>
        
        <h2 className="font-heading font-black text-[48px] md:text-[6vw] text-white leading-[0.9] tracking-[0.05em] uppercase mb-8">
          STOP LOSING LEADS.<br/>START CLOSING DEALS.
        </h2>
        
        <p className="font-mono text-[13px] text-[var(--text-dim)] uppercase tracking-[0.1em] max-w-[400px] mb-12 leading-relaxed">
          FREE TO START. NO CREDIT CARD.<br/>JUST RESULTS.
        </p>
        
        <a href="/login" className="bg-white text-black font-heading font-bold text-[16px] tracking-[0.15em] px-[48px] py-[18px] uppercase hover:bg-gray-200 transition-colors">
          GET STARTED FREE →
        </a>
        
        <div className="font-mono text-[10px] text-[var(--text-dim)] mt-12 tracking-[0.15em] uppercase">
          SUMMERCHIP CHALLENGE 2026 · TOP 10 FINALIST
        </div>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--bg)] border-t border-[var(--border)] pt-12 pb-6 px-8 relative z-50">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
        <div className="flex flex-col items-center lg:items-start gap-2">
          <span className="font-heading font-bold text-[22px] tracking-[0.2em] text-white uppercase">SELLQ</span>
          <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-wider">THE UNIFIED AI INBOX FOR SMALL BUSINESS</span>
        </div>
        
        <div className="flex gap-8 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
          <a href="#product" className="hover:text-white transition-colors">PRODUCT</a>
          <a href="#features" className="hover:text-white transition-colors">FEATURES</a>
          <a href="#pricing" className="hover:text-white transition-colors">PRICING</a>
          <a href="#docs" className="hover:text-white transition-colors">DOCS</a>
        </div>
        
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
          BUILT FOR SUMMERCHIP 2026
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto border-t border-[var(--border)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[9px] text-[var(--text-dim)] uppercase tracking-[0.15em]">
        <span>© 2026 SELLQ AI</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
          <a href="#" className="hover:text-white transition-colors">TERMS</a>
        </div>
      </div>
    </footer>
  );
}
