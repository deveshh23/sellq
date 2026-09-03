'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export const expoEase = [0.16, 1, 0.3, 1];

export const CharReveal = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: expoEase as any, delay: delay + (index * 0.02) }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export function PlusXNavbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 py-8 px-12 flex items-center justify-between pointer-events-auto"
    >
      <Link href="/" className="font-sans font-medium text-[15px] text-white tracking-wide">SellQ</Link>
      <Link href="/login" className="font-sans text-[13px] text-white hover:underline underline-offset-4 transition-all">Dashboard →</Link>
    </motion.nav>
  );
}

export function PlusXHero() {
  return (
    <section className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-[var(--bg)] overflow-hidden">
      {/* PURE GLOW */}
      <div className="glow-blob bg-[var(--accent-purple)] w-[800px] h-[800px] opacity-[0.12] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-[800px] w-full px-6">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 0.6 }}
          className="font-sans text-[11px] tracking-[0.2em] uppercase text-white mb-8 font-medium"
        >
          AI SALES INTELLIGENCE PLATFORM
        </motion.div>

        <h1 className="font-sans font-semibold text-[clamp(64px,8vw,112px)] leading-[1.05] tracking-[-0.04em] text-white mb-8 flex flex-col items-center">
          <CharReveal text="Turn every" delay={0.2} />
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-[var(--accent-purple)] via-[var(--accent-purple-light)] to-[var(--accent-blue)]">
            <CharReveal text="conversation" delay={0.4} />
          </span>
          <CharReveal text="into revenue." delay={0.6} />
        </h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
          className="font-sans text-[18px] font-light text-[var(--text-secondary)] leading-[1.8] max-w-[520px] mb-12"
        >
          The AI operating system that scores leads, prevents churn, and closes deals — while you sleep.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: expoEase as any }}
        >
          <Link href="/login" className="font-sans text-[15px] text-white px-[32px] py-[14px] border border-white/15 rounded-md hover:bg-white/5 hover:border-white/30 transition-all duration-200 inline-block">
            Open Dashboard →
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 flex flex-col items-center gap-3"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-1/2 bg-white"
            />
          </div>
          <span className="font-sans text-[11px] text-[var(--text-muted)]">Scroll to explore</span>
        </motion.div>
      </div>

      {/* Decorative background cards peeking in */}
      <motion.div 
        initial={{ x: -100, opacity: 0, rotate: -8 }} animate={{ x: 0, opacity: 0.35, rotate: -8 }} transition={{ duration: 1.5, delay: 1, ease: expoEase as any }}
        className="absolute left-[-5%] top-[40%] w-[220px] bg-[#0A0A0A] border border-white/10 p-4 rounded-xl shadow-[0_0_40px_rgba(124,58,237,0.15)] blur-[0.5px]"
      >
        <div className="w-full h-24 border border-[var(--accent-purple)]/30 rounded-full flex items-center justify-center mb-2">
          <span className="font-mono text-2xl text-[var(--accent-purple-light)]">87</span>
        </div>
        <div className="text-[10px] text-white/50 font-mono text-center">Raj Patel · AI Score</div>
      </motion.div>

      <motion.div 
        initial={{ x: 100, opacity: 0, rotate: 6 }} animate={{ x: 0, opacity: 0.35, rotate: 6 }} transition={{ duration: 1.5, delay: 1.2, ease: expoEase as any }}
        className="absolute right-[-5%] top-[30%] w-[220px] bg-[#0A0A0A] border border-white/10 p-4 rounded-xl shadow-[0_0_40px_rgba(239,68,68,0.15)] blur-[0.5px]"
      >
        <div className="w-full h-2 bg-red-500/20 rounded-full mb-2 overflow-hidden"><div className="w-[73%] h-full bg-red-500" /></div>
        <div className="text-[10px] text-white/50 font-mono text-center">Elena · 73% Risk</div>
      </motion.div>

    </section>
  );
}
