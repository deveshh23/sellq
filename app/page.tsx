'use client'
import { motion } from 'framer-motion'
import { ShieldAlert, CheckSquare } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { FloatingPaths } from '@/components/ui/background-paths'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import { GLSLHills } from '@/components/ui/glsl-hills'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { SellQStoryScroll } from '@/components/landing/SellQStoryScroll'
import { SellQCpuFeatures } from '@/components/ui/demo-cpu'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { AboutSection } from '@/components/landing/AboutSection'
import { ContactSection } from '@/components/landing/ContactSection'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="relative min-h-screen w-full bg-black selection:bg-purple-500/30 font-sans">
      
      {/* NAVIGATION BAR */}
      <LandingNavbar />
      
      {/* HERO SECTION WRAPPER */}
      <div className="relative w-full min-h-screen overflow-hidden">
        {/* BACKGROUND ELEMENTS */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
           {/* Animated SVG Lines */}
           <FloatingPaths position={1} />
           <FloatingPaths position={-1} />
           
           {/* Subtle Grid Pattern */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
           
           {/* Ambient Glows */}
           <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
           <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
           
        </div>

        {/* Interactive Cursor Spotlight */}
        <Spotlight size={600} className="z-10 mix-blend-screen opacity-50" />

        {/* CONTENT GRID */}
        <div className="relative z-10 w-full min-h-screen max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center px-6 md:px-12 xl:px-24">
        
        {/* LEFT COLUMN - Typography & CTA */}
        <div className="flex-1 flex flex-col justify-center items-start pt-32 lg:pt-0 pb-12 lg:pb-0 z-30 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 pointer-events-auto shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
            <span className="text-xs font-semibold text-white/90 tracking-widest uppercase">SellQ OS v2.0 Live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-500 mb-6 leading-[1.1] pb-2"
          >
            Autonomous <br/>
            Sales Agent.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-neutral-400 max-w-xl mb-10 leading-relaxed font-light"
          >
            The intelligent operating system for modern revenue teams. Score leads, predict churn, and let AI agents handle conversations 24/7. Turn every interaction into closed won.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 pointer-events-auto"
          >
            <Link href="/inbox">
              <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-neutral-200 text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                Start Free Trial
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - 3D Visual & Floating Cards */}
        <div className="flex-1 w-full h-[60vh] lg:h-screen relative z-20 lg:absolute lg:right-0 lg:w-[55%]">
           
           {/* The 3D Scene - Scaled to break boundaries */}
           <div className="absolute inset-0 scale-[1.2] lg:scale-[1.3] translate-x-10 lg:translate-x-16 xl:translate-x-24 origin-center pointer-events-auto">
             <SplineScene 
               scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
               className="w-full h-full cursor-grab active:cursor-grabbing"
             />
           </div>
        </div>

      </div>
      </div>
      
      {/* SECTIONS WITH GLSL BACKGROUND */}
      <div className="relative z-0 w-full">
        {/* Sticky GLSL Background */}
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none z-0">
           <GLSLHills className="opacity-60 w-full h-full" />
        </div>

      {/* DASHBOARD SCROLL ANIMATION SECTION (Transparent to show GLSL) */}
      <div id="features" className="relative z-10 w-full bg-transparent flex flex-col items-center justify-center border-t border-white/5 pt-10 -mt-[100vh]">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-4">
                One Platform. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                  Complete Revenue Intelligence.
                </span>
              </h1>
              <p className="text-neutral-400 text-base md:text-xl max-w-3xl mx-auto mt-6 font-light leading-relaxed">
                SellQ unifies AI Lead Scoring, Sentiment Analysis, Workflow Automation, AI Sales Agents, Churn Prediction and Customer Intelligence into a single platform.
              </p>
            </>
          }
        >
          {/* FAKE DASHBOARD UI */}
          <div className="flex w-full h-full text-white bg-neutral-950 font-sans">
            {/* Sidebar */}
            <div className="w-64 border-r border-white/5 hidden md:flex flex-col p-4 bg-black/40">
              <div className="flex items-center gap-2 mb-10 px-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-500/20"></div>
                <span className="font-bold text-xl tracking-wide">SellQ</span>
              </div>
              <nav className="space-y-1.5 text-sm text-neutral-400 font-medium">
                <div className="px-3 py-2.5 rounded-lg bg-white/10 text-white flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div> AI Sales Agent
                </div>
                <div className="px-3 py-2.5 rounded-lg hover:bg-white/5 transition flex items-center gap-3 cursor-pointer">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400 opacity-60"></div> AI Lead Scoring
                </div>
                <div className="px-3 py-2.5 rounded-lg hover:bg-white/5 transition flex items-center gap-3 cursor-pointer">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-60"></div> Sentiment Analysis
                </div>
                <div className="px-3 py-2.5 rounded-lg hover:bg-white/5 transition flex items-center gap-3 cursor-pointer">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-60"></div> Workflow Builder
                </div>
                <div className="px-3 py-2.5 rounded-lg hover:bg-white/5 transition flex items-center gap-3 cursor-pointer">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-60"></div> Churn Shield
                </div>
              </nav>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-6 md:p-8 flex flex-col bg-black/20">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">System Healthy</div>
                  <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:bg-white/[0.05] transition-colors">
                  <div className="text-neutral-500 text-sm font-medium mb-1">Active Leads Scored</div>
                  <div className="text-4xl font-bold tracking-tight">1,248</div>
                  <div className="text-green-400/90 text-sm mt-3 flex items-center gap-1"><span className="text-green-400">↑</span> 24% from last week</div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:bg-white/[0.05] transition-colors">
                  <div className="text-neutral-500 text-sm font-medium mb-1">AI Agent Responses</div>
                  <div className="text-4xl font-bold tracking-tight">8,592</div>
                  <div className="text-green-400/90 text-sm mt-3 flex items-center gap-1"><span className="text-green-400">↑</span> 12% automation rate</div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:bg-white/[0.05] transition-colors">
                  <div className="text-neutral-500 text-sm font-medium mb-1">Churn Risk Prevented</div>
                  <div className="text-4xl font-bold tracking-tight">34</div>
                  <div className="text-blue-400/90 text-sm mt-3 flex items-center gap-1">Protected $12,400 ARR</div>
                </div>
              </div>

              <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none"></div>
                <h3 className="text-lg font-medium text-white/90 relative z-10">AI Sentiment Heatmap</h3>
                <div className="w-full h-48 flex items-end gap-2 md:gap-3 relative z-10 mt-6">
                   {[40, 70, 45, 90, 65, 80, 100, 85, 60, 75, 95, 85].map((h, i) => (
                     <div key={i} className="flex-1 bg-gradient-to-t from-purple-600/40 to-blue-400/60 rounded-t-md hover:from-purple-500/60 hover:to-blue-300/80 transition-all cursor-crosshair group relative" style={{ height: `${h}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 whitespace-nowrap">
                          {h}% Positive
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>

      {/* STORY SCROLL SECTION */}
      <SellQStoryScroll />

      {/* NEURAL CORE CPU FEATURES SECTION (Transparent to show GLSL) */}
      <div className="relative z-10 w-full min-h-screen bg-transparent flex flex-col items-center justify-center border-t border-white/5">
        <SellQCpuFeatures />
      </div>

      </div>

      {/* DASHBOARD SCROLL ANIMATION SECTION */}
      <div className="bg-[#0a0a10] py-[100px] px-6 md:px-12 relative z-10 w-full flex justify-center border-t border-white/5">
        <div className="max-w-[1200px] w-full flex flex-col items-center">
          
          {/* SECTION HEADER */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-block bg-purple-500/15 text-[#a78bfa] text-[12px] tracking-[0.1em] uppercase border border-purple-500/30 rounded-full px-[14px] py-[4px] mb-6">
              LIVE PLATFORM
            </div>
            <h2 className="text-[48px] font-extrabold text-white tracking-[-0.03em] leading-tight mb-4">
              See SellQ in action
            </h2>
            <p className="text-[18px] text-[#9ca3af] max-w-2xl">
              Every feature works in real time. No demos. No mockups. Just the product.
            </p>
          </div>

          {/* DASHBOARD CARDS GRID */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            
            {/* CARD 1 — Unified Inbox Preview */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="col-span-1 md:col-span-2 bg-[#111118] border border-white/5 rounded-2xl p-6 h-[320px] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
                  <span className="text-white text-[14px] font-semibold">Unified Inbox</span>
                </div>
                <div className="bg-green-500/10 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded border border-green-500/20">
                  AI ACTIVE
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                {/* Item 1 */}
                <div className="flex items-start bg-purple-500/10 p-3 rounded-lg gap-3 border border-purple-500/20">
                  <div className="w-8 h-8 rounded-full bg-[#7c3aed] flex items-center justify-center text-white text-xs font-medium shrink-0">SJ</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-[13px] font-medium">Sarah Jenkins</span>
                      <span className="text-gray-400 text-[11px]">2m ago</span>
                    </div>
                    <div className="text-gray-400 text-[11px] mt-0.5">checkout keeps throwing...</div>
                    <div className="flex gap-1.5 mt-2">
                      <span className="bg-blue-500/10 text-blue-400 text-[10px] px-1.5 rounded">Email</span>
                      <span className="bg-red-500/10 text-red-400 text-[10px] px-1.5 rounded">Urgent</span>
                    </div>
                  </div>
                </div>
                
                {/* Item 2 */}
                <div className="flex items-start bg-white/5 p-3 rounded-lg gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0891b2] flex items-center justify-center text-white text-xs font-medium shrink-0">MR</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-[13px] font-medium">Marco Rossi</span>
                      <span className="text-gray-500 text-[11px]">15m ago</span>
                    </div>
                    <div className="text-gray-500 text-[11px] mt-0.5">Hi, I saw your product...</div>
                    <div className="flex gap-1.5 mt-2">
                      <span className="bg-green-500/10 text-green-400 text-[10px] px-1.5 rounded">WhatsApp</span>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start bg-white/5 p-3 rounded-lg gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#db2777] flex items-center justify-center text-white text-xs font-medium shrink-0">ER</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-[13px] font-medium">Elena Rostova</span>
                      <span className="text-gray-500 text-[11px]">1h ago</span>
                    </div>
                    <div className="text-gray-500 text-[11px] mt-0.5">Why haven't I received...</div>
                    <div className="flex gap-1.5 mt-2">
                      <span className="bg-amber-500/10 text-amber-400 text-[10px] px-1.5 rounded">SMS</span>
                      <span className="bg-red-500/10 text-red-400 text-[10px] px-1.5 rounded">Negative</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2 — Lead Score */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-1 bg-[#111118] border border-white/5 rounded-2xl p-6 h-[320px] flex flex-col"
            >
              <div className="text-white text-[14px] font-semibold mb-6">AI Lead Scoring</div>
              
              <div className="flex-1 flex flex-col items-center justify-center relative mb-6">
                <svg width="120" height="120" className="transform -rotate-90">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <motion.circle 
                    cx="60" cy="60" r="54" fill="none" stroke="#7c3aed" strokeWidth="8"
                    strokeDasharray="339"
                    initial={{ strokeDashoffset: 339 }}
                    whileInView={{ strokeDashoffset: 20 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white text-[32px] font-extrabold leading-none">94</span>
                  <span className="text-gray-400 text-[12px]">Score</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-[10px] w-20">Engagement</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '90%' }} transition={{ duration: 1 }} className="h-full bg-purple-500 rounded-full" />
                  </div>
                  <span className="text-white text-[10px] w-6 text-right">90%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-[10px] w-20">Purchase Intent</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '95%' }} transition={{ duration: 1 }} className="h-full bg-green-500 rounded-full" />
                  </div>
                  <span className="text-white text-[10px] w-6 text-right">95%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-[10px] w-20">Recency</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '98%' }} transition={{ duration: 1 }} className="h-full bg-blue-500 rounded-full" />
                  </div>
                  <span className="text-white text-[10px] w-6 text-right">98%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-[10px] w-20">Sentiment</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '72%' }} transition={{ duration: 1 }} className="h-full bg-amber-500 rounded-full" />
                  </div>
                  <span className="text-white text-[10px] w-6 text-right">72%</span>
                </div>
              </div>
            </motion.div>

            {/* CARD 3 — Revenue Intelligence */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="col-span-1 bg-[#111118] border border-white/5 rounded-2xl p-6 h-[155px] flex flex-col"
            >
              <div className="text-white text-[14px] font-semibold mb-3">Revenue Intelligence</div>
              <div className="text-purple-400 text-[28px] font-extrabold leading-none mb-1">₹32,800</div>
              <div className="text-gray-400 text-[12px] mb-4">AI-attributed this month</div>
              <div className="flex gap-2">
                <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-1 rounded">WhatsApp · Best Channel</span>
                <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-1 rounded">6–8 PM · Best Time</span>
              </div>
            </motion.div>

            {/* CARD 4 — Churn Shield */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="col-span-1 bg-[#111118] border border-red-500/20 rounded-2xl p-6 h-[145px] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert size={16} className="text-red-400" />
                  <span className="text-white text-[14px] font-semibold">Churn Shield</span>
                </div>
                <div className="text-red-400 text-[20px] font-bold leading-none mb-1">₹18,500 at risk</div>
                <div className="text-gray-400 text-[12px]">Carlos Mendez · 45% probability</div>
              </div>
              <button className="w-full bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg py-1.5 text-[12px] font-medium hover:bg-red-500/30 transition-colors">
                Send Recovery →
              </button>
            </motion.div>

            {/* CARD 5 — Promises Tracker */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="col-span-1 bg-[#111118] border border-green-500/20 rounded-2xl p-6 h-[155px] flex flex-col md:col-start-3 md:row-start-2"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare size={16} className="text-green-400" />
                <span className="text-white text-[14px] font-semibold">Promises Tracker</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-red-400 shrink-0" />
                    <span className="text-white text-[13px]">Send security link to Sarah</span>
                  </div>
                  <span className="bg-red-500/20 text-red-400 text-[9px] px-1.5 py-0.5 rounded">Overdue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-sm" />
                  </div>
                  <span className="text-gray-500 text-[13px] line-through">Share pricing deck</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM ROW — Stats strip */}
          <div className="w-full mt-8 bg-purple-500/5 border border-purple-500/10 rounded-xl p-6 md:px-8 flex flex-wrap md:flex-nowrap items-center justify-between gap-6 md:gap-0">
            <div className="flex flex-col items-center w-1/2 md:w-auto">
              <span className="text-white text-[32px] font-extrabold">
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>14</motion.span>
              </span>
              <span className="text-gray-400 text-[13px]">AI Modules</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center w-1/2 md:w-auto">
              <span className="text-white text-[32px] font-extrabold">
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>86%</motion.span>
              </span>
              <span className="text-gray-400 text-[13px]">Autonomous Rate</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center w-1/2 md:w-auto">
              <span className="text-white text-[32px] font-extrabold">
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>1.4s</motion.span>
              </span>
              <span className="text-gray-400 text-[13px]">Avg Response Time</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center w-1/2 md:w-auto">
              <span className="text-white text-[32px] font-extrabold">
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>₹32,800</motion.span>
              </span>
              <span className="text-gray-400 text-[13px]">Revenue Attributed</span>
            </div>
          </div>

        </div>
      </div>

      {/* ABOUT & CONTACT SECTIONS */}
      <AboutSection />
      <ContactSection />

      {/* FOOTER SECTION */}
      <footer className="w-full bg-[#0a0a0f] border-t border-white/5 py-12 px-6 flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-blue-600"></div>
              <span className="text-white font-bold tracking-wide">SellQ</span>
            </div>
            <p className="text-[13px] text-gray-500">© 2026 SellQ AI. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6 text-[13px] text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Features</Link>
            <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-white transition-colors">About</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
          
          <div className="text-[13px] text-gray-500">
            Built with Gemini AI + Next.js
          </div>
        </div>
      </footer>

    </main>
  )
}
