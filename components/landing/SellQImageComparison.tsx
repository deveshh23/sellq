'use client';

import { ImageComparison } from "@/components/ui/image-comparison-slider";

export function SellQImageComparison() {
  return (
    <div className="w-full relative z-20 py-24 bg-transparent border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Traditional CRM vs SellQ
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 font-light">
            Transform reactive sales workflows into predictive revenue intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Highlights */}
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col space-y-6">
            <h3 className="text-xl font-semibold text-neutral-300 border-b border-white/10 pb-4">Traditional CRM</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                <span className="text-neutral-400">Manual Follow-Ups</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                <span className="text-neutral-400">No Lead Scoring</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                <span className="text-neutral-400">No Sentiment Analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                <span className="text-neutral-400">No Churn Prediction</span>
              </li>
            </ul>
          </div>

          {/* Center Slider */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <ImageComparison
                beforeImage="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop"
                afterImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                altBefore="Traditional CRM Screenshot"
                altAfter="SellQ Dashboard Screenshot"
            />
          </div>

          {/* Right Highlights */}
          <div className="lg:col-span-3 order-3 flex flex-col space-y-6">
            <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-4 flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">SellQ</span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                <span className="text-neutral-200">AI Lead Scoring</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                <span className="text-neutral-200">AI Sentiment Analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                <span className="text-neutral-200">AI Sales Agent</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                <span className="text-neutral-200">Workflow Automation</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
                <span className="text-neutral-200">Churn Shield</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
