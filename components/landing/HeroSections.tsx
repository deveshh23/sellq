'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageSquare, Mail, Camera } from 'lucide-react';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md border-b border-[#1A1A1A] bg-black/50"
    >
      <div className="flex items-center gap-2">
        <span className="font-heading text-2xl tracking-widest text-white">SELLQ</span>
        <div className="w-2 h-2 rounded-full bg-[#00FF94] shadow-[0_0_8px_#00FF94]" />
      </div>
      <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-wider text-[#999999]">
        <Link href="#product" className="hover:text-white transition-colors">Product</Link>
        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        <Link href="#docs" className="hover:text-white transition-colors">Docs</Link>
      </div>
      <div className="flex items-center gap-4 font-mono text-sm uppercase">
        <Link href="/login" className="text-white hover:text-[#00FF94] transition-colors">Login</Link>
        <Link href="/login" className="bg-[#0066FF] text-white px-5 py-2 hover:bg-blue-600 transition-colors">Start Free</Link>
      </div>
    </motion.nav>
  );
}

export function Hero() {
  const headline = "EVERY CONVERSATION. ONE INBOX. ZERO CHAOS.";
  const words = headline.split(" ");
  
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-black text-white">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#00FF94] rounded-full blur-[150px] opacity-5 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0066FF] rounded-full blur-[150px] opacity-[0.08] pointer-events-none translate-x-1/3 translate-y-1/3" />
      
      <div className="w-full max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#00FF94]"
          >
            <span>AI-Powered Inbox</span>
            <span className="w-1 h-1 bg-[#00FF94] rounded-full" />
            <span>SummerShip 2026 Finalist</span>
          </motion.div>
          
          <h1 className="font-heading text-[56px] lg:text-[96px] leading-[0.9] tracking-wide flex flex-wrap gap-x-4">
            {words.map((word, i) => (
              <motion.span 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" as any }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="font-mono text-lg text-[#999999] max-w-lg leading-relaxed mt-4"
          >
            SellQ unifies all your customer messages into one AI-powered inbox. Auto-reply, score leads, predict churn — before it's too late.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 mt-6 font-mono text-sm uppercase tracking-wide"
          >
            <Link href="/login" className="bg-[#0066FF] text-white px-8 py-4 hover:bg-blue-600 transition-colors">
              Start Free — No Card Needed
            </Link>
            <button className="border border-white text-white px-8 py-4 hover:bg-white/10 transition-colors">
              Watch Demo
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="font-mono text-[10px] text-[#666666] mt-4 uppercase tracking-widest"
          >
            ★★★★★ Trusted by 200+ small businesses · Top 10 SummerShip 2026
          </motion.div>
        </div>
        
        {/* Right Column: Floating Dashboard */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="lg:col-span-5 relative"
        >
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full aspect-[4/5] bg-[#050505] border border-[#1A1A1A] rounded-xl overflow-hidden shadow-[0_0_60px_rgba(0,255,148,0.15)] flex flex-col"
          >
            {/* Mockup Header */}
            <div className="h-12 border-b border-[#1A1A1A] flex items-center px-4 gap-2 bg-[#0A0A0A]">
              <div className="w-3 h-3 rounded-full bg-[#333333]" />
              <div className="w-3 h-3 rounded-full bg-[#333333]" />
              <div className="w-3 h-3 rounded-full bg-[#333333]" />
              <div className="ml-auto font-mono text-[10px] text-[#666666] uppercase">Inbox Overview</div>
            </div>
            
            {/* Mockup Messages */}
            <div className="flex-1 p-4 flex flex-col gap-3">
              {[
                { name: 'David Kim', text: 'Can we book a table for Friday?', icon: MessageSquare, color: 'text-[#00FF94]', bg: 'bg-[#00FF94]/10', time: '2m ago' },
                { name: 'Sarah Jenkins', text: 'Checkout is throwing a 500 error!', icon: Mail, color: 'text-[#FFE500]', bg: 'bg-[#FFE500]/10', time: '14m ago' },
                { name: 'Elena Rostova', text: 'Do you have the red dress in size M?', icon: Camera, color: 'text-[#0066FF]', bg: 'bg-[#0066FF]/10', time: '1h ago' }
              ].map((msg, idx) => (
                <div key={idx} className="bg-[#0A0A0A] border border-[#1A1A1A] p-3 rounded-lg flex items-start gap-3">
                  <div className={`p-2 rounded ${msg.bg} ${msg.color}`}>
                    <msg.icon size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs text-white">{msg.name}</span>
                      <span className="font-mono text-[9px] text-[#666]">{msg.time}</span>
                    </div>
                    <p className="font-mono text-[10px] text-[#999] truncate">{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {/* AI Draft Suggestion Box */}
              <div className="mt-auto border border-[#00FF94]/30 bg-[#00FF94]/5 p-3 rounded-lg border-dashed">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
                  <span className="font-mono text-[9px] text-[#00FF94] uppercase tracking-wider">AI Draft Ready (Professional)</span>
                </div>
                <div className="h-2 bg-[#1A1A1A] rounded w-full mb-1" />
                <div className="h-2 bg-[#1A1A1A] rounded w-3/4" />
              </div>
            </div>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}

export function Marquee() {
  const items = [
    "AI AUTO-REPLY", "LEAD SCORING", "CHURN PREDICTION", "PROMISES TRACKER", 
    "WHATSAPP BROADCAST", "REVENUE ATTRIBUTION", "VOICE AGENT", "WORKFLOW AUTOMATION"
  ];
  
  return (
    <div className="w-full border-y border-[#222222] bg-[#111111] overflow-hidden py-3 flex">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span className="font-mono text-sm text-white mx-6 tracking-widest uppercase">{item}</span>
            <span className="w-1.5 h-1.5 bg-[#00FF94] rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
