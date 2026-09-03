'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AmbientOrbs } from './GalleryChrome';

export function VirtualHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] overflow-hidden">
      <AmbientOrbs />
      
      {/* Reflective Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent to-[var(--floor)]">
        <div className="absolute w-[140%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.6)] to-transparent top-[40%] -left-[20%] -rotate-6 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-[rgba(10,10,10,0.9)] to-transparent">
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold text-[22px] tracking-[0.2em] text-white">SELLQ</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--compass-dot)] animate-pulse" />
        </div>
        <div className="flex items-center gap-6 font-mono text-[11px] tracking-[0.15em] uppercase text-white">
          <Link href="/login" className="hover:text-[var(--text-dim)] transition-colors">Login</Link>
          <span className="text-[var(--border)]">|</span>
          <Link href="/login" className="hover:text-[var(--text-dim)] transition-colors">Get Started Free</Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="font-mono text-[11px] text-[var(--text-dim)] tracking-[0.2em] mb-8 uppercase"
        >
          SummerShip Challenge 2026 · Top 10 Finalist
        </motion.div>

        <h1 className="font-heading font-black text-[12vw] md:text-[7vw] leading-[0.88] text-white uppercase tracking-[0.05em] flex flex-col items-center w-full">
          {["EVERY CONVERSATION.", "ONE INBOX.", "ZERO CHAOS."].map((line, i) => (
            <motion.span 
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block w-full text-center"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="font-mono text-[13px] text-[var(--text-dim)] max-w-[480px] mt-10 leading-relaxed"
        >
          SellQ unifies all your customer messages into one AI-powered inbox.
          Auto-reply in your brand voice. Score leads. Predict churn.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <Link href="/login" className="bg-white text-black font-heading font-bold text-[14px] tracking-[0.15em] px-8 py-3.5 uppercase hover:bg-gray-200 transition-colors">
            Start Free →
          </Link>
          <button className="bg-transparent border border-[var(--border)] text-white font-heading font-bold text-[14px] tracking-[0.15em] px-8 py-3.5 uppercase hover:bg-white/5 transition-colors">
            Watch Demo
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="font-mono text-[10px] text-[var(--text-dim)] mt-12 tracking-[0.15em] uppercase"
        >
          200+ Businesses · $32,800 Pipeline · 3 Sec AI Reply Time
        </motion.div>
      </div>
    </section>
  );
}
