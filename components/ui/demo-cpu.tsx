"use client";

import { CpuArchitecture } from "@/components/ui/cpu-architecture"
import { motion } from "framer-motion"

export const SellQCpuFeatures = () => {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center py-20 z-20">
      
      {/* Title block */}
      <div className="text-center z-10 mb-8 max-w-3xl px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Neural Core</span>
        </h2>
        <p className="text-neutral-400 text-lg">
          Data flows seamlessly through the SellQ architecture. Incoming messages are instantly routed, scored, and processed by autonomous AI agents in real-time.
        </p>
      </div>

      {/* Main CPU Container - using aspect-ratio to perfectly align HTML to SVG viewBox (200x100 = 2:1) */}
      <div className="relative w-full max-w-5xl aspect-[2/1] mt-10 flex items-center justify-center">
        {/* Glow behind the CPU */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 bg-purple-600/10 blur-[100px] rounded-full" />
        </div>
        
        {/* CPU SVG Component */}
        <CpuArchitecture 
          text="CORE" 
          className="w-full h-full text-white/20 absolute inset-0" 
        />
        
        {/* Floating Feature Tags connected to the traces */}
        {/* Top Left (Path 1 starts at 10,20 -> 5%, 20%) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute text-left pointer-events-none"
          style={{ top: '15%', left: '4%' }}
        >
          <div className="text-blue-400 font-mono text-xs md:text-sm mb-1">DATA INGESTION</div>
          <div className="text-white/60 text-[10px] md:text-xs w-24 md:w-32">Omnichannel stream from Email & Social</div>
        </motion.div>

        {/* Bottom Left (Path 8 starts at 30,30 -> 15%, 30%) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute text-left pointer-events-none"
          style={{ top: '35%', left: '10%' }}
        >
          <div className="text-purple-400 font-mono text-xs md:text-sm mb-1">INTENT SCORING</div>
          <div className="text-white/60 text-[10px] md:text-xs w-24 md:w-32">Real-time NLP sentiment analysis</div>
        </motion.div>

        {/* Top Right (Path 2 starts at 180,10 -> 90%, 10%) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute text-right pointer-events-none"
          style={{ top: '2%', right: '8%' }}
        >
          <div className="text-teal-400 font-mono text-xs md:text-sm mb-1">GENERATIVE LLM</div>
          <div className="text-white/60 text-[10px] md:text-xs w-24 md:w-32 ml-auto">Crafting personalized context-aware replies</div>
        </motion.div>

        {/* Bottom Right (Path 4 starts at 170,80 -> 85%, 80%) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute text-right pointer-events-none"
          style={{ top: '85%', right: '12%' }}
        >
          <div className="text-emerald-400 font-mono text-xs md:text-sm mb-1">ACTION ENGINE</div>
          <div className="text-white/60 text-[10px] md:text-xs w-24 md:w-32 ml-auto">Executing CRM updates & scheduling</div>
        </motion.div>

      </div>
    </div>
  );
};
