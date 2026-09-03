'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, MessageSquare, Sparkles } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#06080f] flex items-center justify-center relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-2/3 left-1/3 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[80px]" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative text-center px-6 max-w-lg"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Glowing 404 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-[120px] font-extrabold leading-none font-heading tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-300 to-zinc-600 select-none block"
            style={{ textShadow: '0 0 80px rgba(139,92,246,0.3)' }}>
            404
          </span>
        </motion.div>

        {/* Logo badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-bold mb-6"
        >
          <Sparkles size={12} className="animate-pulse" />
          SellQ AI Workspace
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-2xl font-extrabold text-white font-heading mb-3"
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-zinc-400 leading-relaxed mb-8"
        >
          The AI co-pilot searched every vector in the database and couldn't locate this page.
          It may have been moved, deleted, or never existed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-center justify-center gap-3"
        >
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-zinc-600 hover:from-violet-500 hover:to-zinc-500 text-white text-sm font-bold shadow-lg shadow-violet-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Home size={15} />
            Back to Home
          </button>
          <button
            onClick={() => router.push('/inbox')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-white text-sm font-bold transition-all hover:scale-105 active:scale-95"
          >
            <MessageSquare size={15} />
            Go to Inbox
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
