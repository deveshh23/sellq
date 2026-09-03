'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as any } }
};

export function HowItWorks() {
  const steps = [
    { num: "01", title: "Connect Your Channels", desc: "WhatsApp, Email, Instagram in minutes" },
    { num: "02", title: "Train Your AI", desc: "Upload your FAQs, set tone, calibrate in sandbox" },
    { num: "03", title: "Watch It Work", desc: "AI replies, scores leads, tracks promises automatically" }
  ];

  return (
    <section className="py-32 px-8 bg-black border-b border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-heading text-[48px] md:text-[64px] text-white leading-[0.9] mb-20 text-center"
        >
          UP AND RUNNING IN MINUTES
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center md:items-start text-center md:text-left relative z-10"
            >
              <div className="font-heading text-[64px] text-[#00FF94] leading-none mb-4">{step.num}</div>
              <h3 className="font-heading text-[32px] text-white tracking-wide mb-2">{step.title}</h3>
              <p className="font-mono text-sm text-[#999999]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InnovationSpotlight() {
  const innovations = [
    { title: "Conversation Revenue Attribution", color: "#FFE500", desc: "Shows how specific conversations connect to deal revenue. Best channel, best time patterns, ROI per message." },
    { title: "AI Churn Prediction Shield", color: "#00FF94", desc: "Monitors sentiment trends over time. Predicts cancellations 7–14 days before they happen." },
    { title: "AI Reply Memory (Promises Tracker)", color: "#0066FF", desc: "Extracts 'I'll get back to you by Friday' from every conversation. Shows overdue promises in a red alert list." }
  ];

  return (
    <section className="py-32 px-8 bg-black" id="product">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="font-mono text-xs text-[#FFE500] tracking-widest uppercase mb-4 block">INNOVATION</span>
          <h2 className="font-heading text-[48px] md:text-[64px] text-white leading-[0.9] mb-16">
            3 FEATURES YOU WON'T FIND ANYWHERE ELSE
          </h2>
        </motion.div>
        
        <div className="flex flex-col gap-6">
          {innovations.map((item, i) => (
            <motion.div 
              key={i}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-[#050505] border border-[#1A1A1A] p-8 md:p-12 border-l-4"
              style={{ borderLeftColor: item.color }}
            >
              <h3 className="font-heading text-[32px] md:text-[40px] text-white tracking-wide mb-4">{item.title}</h3>
              <p className="font-mono text-base md:text-lg text-[#999999] leading-relaxed max-w-3xl">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="w-full bg-[#0066FF] py-32 px-8 text-center flex flex-col items-center justify-center">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl flex flex-col items-center">
        <h2 className="font-heading text-[56px] md:text-[80px] text-white leading-[0.9] mb-6">
          STOP LOSING LEADS.<br />START CLOSING DEALS.
        </h2>
        <p className="font-mono text-lg text-white/80 mb-12 max-w-2xl">
          SellQ AI is free to start. No credit card. No setup fees. Just results.
        </p>
        <Link href="/login" className="bg-white text-black font-mono text-sm uppercase tracking-widest px-10 py-5 hover:bg-gray-200 transition-colors inline-flex items-center gap-4">
          GET STARTED FREE <span>→</span>
        </Link>
        <div className="font-mono text-[10px] text-white/60 mt-8 uppercase tracking-widest">
          SummerShip 2026 · Top 10 Finalist
        </div>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-black border-t border-[#1A1A1A] py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-heading text-2xl tracking-widest text-white">SELLQ AI</span>
          <span className="font-mono text-xs text-[#666666]">The Unified AI Inbox for Small Business</span>
        </div>
        
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-[#999999]">
          <Link href="#product" className="hover:text-white transition-colors">Product</Link>
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#FFE500] border border-[#FFE500]/30 px-3 py-1 bg-[#FFE500]/5">
          Built for SummerShip 2026
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-[#444444] uppercase tracking-widest border-t border-[#1A1A1A] pt-8">
        <span>© 2026 SellQ AI</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#999999]">Privacy</a>
          <a href="#" className="hover:text-[#999999]">Terms</a>
        </div>
      </div>
    </footer>
  );
}
