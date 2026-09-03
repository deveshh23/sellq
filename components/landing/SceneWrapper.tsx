'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./Scene'), { 
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="font-sans text-white text-[15px] font-medium tracking-wide">SellQ</div>
        <div className="w-[120px] h-[1px] bg-white/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-[var(--accent-purple)] w-1/2 animate-pulse" />
        </div>
      </div>
    </div>
  )
});

export default function SceneWrapper() {
  return <Scene />;
}
