'use client';

import { LightningSplit } from '@/components/ui/lightning-split';

export function SellQLightningSplit() {
  
  const leftContent = (
    <div className="flex h-full w-full flex-col justify-center bg-black/90 p-8 md:p-16 lg:p-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-red-950/20 z-0"></div>
      <div className="relative z-10 max-w-xl mr-auto ml-4 md:ml-12 lg:ml-24 w-full">
        <h3 className="text-3xl md:text-5xl font-bold text-neutral-300 mb-8 border-b border-red-900/30 pb-6">
          Traditional Sales
        </h3>
        <ul className="space-y-6">
          {[
            "Missed Opportunities",
            "Slow Follow-Ups",
            "Manual CRM Work",
            "No Revenue Intelligence"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-4 text-xl md:text-2xl text-neutral-500 font-light">
              <div className="w-2 h-2 bg-red-500/50 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex h-full w-full flex-col justify-center bg-black p-8 md:p-16 lg:p-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 z-0"></div>
      <div className="relative z-10 max-w-xl ml-auto mr-4 md:mr-12 lg:mr-24 w-full text-right">
        <h3 className="text-3xl md:text-5xl font-bold mb-8 border-b border-blue-900/30 pb-6 inline-block w-full">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">SellQ</span>
        </h3>
        <ul className="space-y-6 flex flex-col items-end">
          {[
            "AI Lead Scoring",
            "Automated Follow-Ups",
            "Sentiment Analysis",
            "Workflow Automation",
            "Churn Shield"
          ].map((item, i) => (
            <li key={i} className="flex items-center justify-end gap-4 text-xl md:text-2xl text-white font-medium">
              {item}
              <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="relative z-20 w-full bg-black py-24 flex flex-col items-center">
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
          From Reactive Sales <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400">
            To Predictive Revenue Intelligence
          </span>
        </h2>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
          SellQ transforms customer interactions into actionable intelligence.
        </p>
      </div>

      {/* Lightning Split Slider */}
      <LightningSplit 
        leftComponent={leftContent}
        rightComponent={rightContent}
      />
    </div>
  );
}
