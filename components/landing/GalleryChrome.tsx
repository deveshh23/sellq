'use client';
import React from 'react';

export function Crosshairs() {
  return (
    <div className="hidden lg:block">
      <div className="fixed top-6 left-6 w-6 h-6 z-50 pointer-events-none before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-[var(--crosshair)] before:top-1/2 before:left-0 after:content-[''] after:absolute after:w-[1px] after:h-full after:bg-[var(--crosshair)] after:left-1/2 after:top-0" />
      <div className="fixed top-6 right-6 w-6 h-6 z-50 pointer-events-none before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-[var(--crosshair)] before:top-1/2 before:left-0 after:content-[''] after:absolute after:w-[1px] after:h-full after:bg-[var(--crosshair)] after:left-1/2 after:top-0" />
      <div className="fixed bottom-6 left-6 w-6 h-6 z-50 pointer-events-none before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-[var(--crosshair)] before:top-1/2 before:left-0 after:content-[''] after:absolute after:w-[1px] after:h-full after:bg-[var(--crosshair)] after:left-1/2 after:top-0" />
      <div className="fixed bottom-6 right-6 w-6 h-6 z-50 pointer-events-none before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-[var(--crosshair)] before:top-1/2 before:left-0 after:content-[''] after:absolute after:w-[1px] after:h-full after:bg-[var(--crosshair)] after:left-1/2 after:top-0" />
    </div>
  );
}

export function Compass() {
  return (
    <div className="hidden lg:flex fixed bottom-8 left-8 w-[100px] h-[100px] rounded-full bg-[rgba(20,20,20,0.9)] border border-[var(--border)] z-50 items-center justify-center">
      <div className="absolute w-1 h-1 bg-[var(--compass-dot)] rounded-full z-10" />
      <div className="absolute w-[80%] h-[80%] rounded-full border border-white/20 border-dashed" />
      <div className="text-[7px] text-[var(--text-dim)] font-mono tracking-[0.15em] absolute bottom-3">SELLQ</div>
      <div className="absolute top-2 text-[8px] text-[var(--text-dim)]">N</div>
    </div>
  );
}

export function HeadingBar() {
  return (
    <div className="hidden lg:flex fixed bottom-8 left-1/2 -translate-x-1/2 flex-col items-center z-50 w-[300px]">
      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-[var(--compass-dot)] mb-1" />
      <div className="text-[9px] text-[var(--text-dim)] font-mono tracking-[0.1em] flex justify-between w-full">
        <span>N</span><span>NE</span><span>E</span><span>SE</span><span className="text-white">S</span><span>SW</span><span>W</span><span>NW</span><span>N</span>
      </div>
    </div>
  );
}

export function InfoWidget() {
  return (
    <div className="hidden lg:flex fixed bottom-8 right-8 w-[90px] h-[90px] rounded-full bg-[rgba(20,20,20,0.9)] border border-[var(--border)] z-50 flex-col items-center justify-center gap-1">
      <div className="text-[#FF8800] text-sm leading-none">ⓘ</div>
      <div className="text-[10px] text-white font-mono tracking-widest mt-1">INFO</div>
      <div className="text-[7px] text-[var(--text-dim)] font-mono tracking-[0.15em] text-center leading-tight">SCROLL TO<br/>EXPLORE</div>
    </div>
  );
}

export function AmbientOrbs() {
  return (
    <>
      <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 bg-white rounded-full blur-[2px] shadow-[0_0_12px_4px_rgba(255,255,255,0.3)] animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[30%] right-[25%] w-1.5 h-1.5 bg-white rounded-full blur-[2px] shadow-[0_0_12px_4px_rgba(255,255,255,0.3)] animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[60%] left-[15%] w-1.5 h-1.5 bg-white rounded-full blur-[2px] shadow-[0_0_12px_4px_rgba(255,255,255,0.3)] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[75%] right-[15%] w-1.5 h-1.5 bg-white rounded-full blur-[2px] shadow-[0_0_12px_4px_rgba(255,255,255,0.3)] animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[40%] left-[70%] w-1.5 h-1.5 bg-white rounded-full blur-[2px] shadow-[0_0_12px_4px_rgba(255,255,255,0.3)] animate-float" style={{ animationDelay: '1.5s' }} />
    </>
  );
}

export function GalleryChrome() {
  return (
    <>
      <Crosshairs />
      <Compass />
      <HeadingBar />
      <InfoWidget />
    </>
  );
}
