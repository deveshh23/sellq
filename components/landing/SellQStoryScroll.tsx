'use client';

import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

export function SellQStoryScroll() {
  return (
    <div className="relative z-30 w-full bg-black">
      <FlowArt aria-label="SellQ Story Scroll">
        
        {/* SECTION 1 */}
        <FlowSection aria-label="The Problem" style={{ backgroundColor: '#2a0a0a', color: '#fff' }}>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-red-500/80 mb-4">01 — The Problem</p>
          <hr className="my-[2vw] border-none border-t border-red-500/20" />
          <div className="mt-8 md:mt-16">
            <h2 className="text-5xl md:text-7xl lg:text-[7vw] leading-[1.1] font-bold tracking-tight mb-12">
              Missed Leads.<br />
              Lost Revenue.<br />
              <span className="text-red-400">Disconnected Teams.</span>
            </h2>
            <div className="text-xl md:text-3xl lg:text-[2.5vw] font-light text-neutral-300 leading-snug space-y-8 max-w-4xl">
              <p>Businesses lose opportunities because customer conversations are scattered across multiple platforms.</p>
              <p>Sales teams waste time manually tracking leads and following up.</p>
              <p className="font-medium text-red-300">Revenue leaks through the cracks.</p>
            </div>
          </div>
        </FlowSection>

        {/* SECTION 2 */}
        <FlowSection aria-label="The Chaos" style={{ backgroundColor: '#09090b', color: '#fff' }}>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-neutral-500 mb-4">02 — The Chaos</p>
          <hr className="my-[2vw] border-none border-t border-white/10" />
          <div className="mt-8 md:mt-16">
            <h2 className="text-5xl md:text-7xl lg:text-[7vw] leading-[1.1] font-bold tracking-tight mb-12">
              Too Many Tools.<br />
              No Intelligence.<br />
              <span className="text-neutral-500">No Prioritization.</span>
            </h2>
            <div className="text-xl md:text-3xl lg:text-[2.5vw] font-light text-neutral-300 leading-snug space-y-8 max-w-4xl">
              <p>CRMs store data. <span className="font-semibold text-white">They do not think.</span></p>
              <p>Teams struggle to identify:</p>
              <ul className="space-y-4 text-neutral-400 pl-4 border-l-2 border-neutral-800">
                <li>• Which leads are ready to buy</li>
                <li>• Which customers are at risk</li>
                <li>• Which conversations need attention</li>
              </ul>
              <p className="italic text-neutral-500">Everything becomes reactive.</p>
            </div>
          </div>
        </FlowSection>

        {/* SECTION 3 */}
        <FlowSection aria-label="Meet SellQ" style={{ backgroundColor: '#1e0a3c', color: '#fff' }}>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-purple-400 mb-4">03 — Meet SellQ</p>
          <hr className="my-[2vw] border-none border-t border-purple-500/30" />
          <div className="mt-8 md:mt-16">
            <h2 className="text-5xl md:text-7xl lg:text-[6.5vw] leading-[1.1] font-bold tracking-tight mb-12">
              The AI Revenue<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Intelligence OS.</span>
            </h2>
            <div className="text-xl md:text-3xl lg:text-[2.5vw] font-light text-purple-100 leading-snug space-y-8 max-w-4xl">
              <p>SellQ connects customer interactions, analyzes sentiment, predicts buying intent and automates engagement.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div className="border border-purple-500/20 bg-purple-900/20 p-6 rounded-2xl text-lg md:text-2xl text-purple-200">
                  <strong className="block text-white mb-2">One platform.</strong>
                </div>
                <div className="border border-purple-500/20 bg-purple-900/20 p-6 rounded-2xl text-lg md:text-2xl text-purple-200">
                  <strong className="block text-white mb-2">One intelligence layer.</strong>
                </div>
                <div className="border border-purple-500/20 bg-purple-900/20 p-6 rounded-2xl text-lg md:text-2xl text-purple-200">
                  <strong className="block text-white mb-2">Complete visibility.</strong>
                </div>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* SECTION 4 */}
        <FlowSection aria-label="AI In Action" style={{ backgroundColor: '#02122c', color: '#fff' }}>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-blue-400 mb-4">04 — AI In Action</p>
          <hr className="my-[2vw] border-none border-t border-blue-500/30" />
          <div className="mt-8 md:mt-16">
            <h2 className="text-5xl md:text-7xl lg:text-[7vw] leading-[1.1] font-bold tracking-tight mb-12 text-blue-100">
              Predict.<br />
              Engage.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">Automate.</span>
            </h2>
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              <ul className="text-2xl md:text-4xl lg:text-[2.5vw] font-semibold text-cyan-100 space-y-4">
                <li className="flex items-center gap-4"><div className="w-3 h-3 rounded-full bg-cyan-400"></div> AI Lead Scoring</li>
                <li className="flex items-center gap-4"><div className="w-3 h-3 rounded-full bg-blue-400"></div> AI Sentiment Analysis</li>
                <li className="flex items-center gap-4"><div className="w-3 h-3 rounded-full bg-indigo-400"></div> AI Sales Agent</li>
                <li className="flex items-center gap-4"><div className="w-3 h-3 rounded-full bg-purple-400"></div> Workflow Automation</li>
              </ul>
              <div className="text-xl md:text-3xl lg:text-[2vw] font-light text-blue-200 leading-snug space-y-8 max-w-xl">
                <p>SellQ continuously analyzes customer behavior and recommends the next best action.</p>
                <p className="text-white font-medium">Turn conversations into revenue opportunities.</p>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* SECTION 5 */}
        <FlowSection aria-label="The Future" style={{ backgroundColor: '#000000', color: '#fff' }}>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-cyan-400 mb-4">05 — The Future</p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div className="mt-8 md:mt-16 pb-24">
            <h2 className="text-5xl md:text-7xl lg:text-[6vw] leading-[1.1] font-bold tracking-tight mb-12">
              Revenue Intelligence.<br />
              <span className="text-neutral-400">Predictive. Autonomous.</span>
            </h2>
            <div className="text-xl md:text-3xl lg:text-[2.2vw] font-light text-neutral-300 leading-snug space-y-8 max-w-5xl">
              <p>AI doesn't replace teams. <span className="text-white font-medium">It amplifies them.</span></p>
              <p>SellQ helps businesses:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-12">
                <div className="p-4 border border-white/10 rounded-xl bg-white/5">Close deals faster</div>
                <div className="p-4 border border-white/10 rounded-xl bg-white/5">Retain customers longer</div>
                <div className="p-4 border border-white/10 rounded-xl bg-white/5">Reduce manual effort</div>
                <div className="p-4 border border-white/10 rounded-xl bg-white/5 text-cyan-400 font-medium">Increase revenue</div>
              </div>
              <p className="text-2xl md:text-5xl lg:text-[3.5vw] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 pt-8">
                The Future Of Revenue Runs On Intelligence.
              </p>
            </div>
          </div>
        </FlowSection>

      </FlowArt>
    </div>
  );
}
