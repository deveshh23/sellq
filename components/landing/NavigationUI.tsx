'use client';
import { useEffect } from 'react';
import { useRoom } from './RoomContext';
import { motion, AnimatePresence } from 'framer-motion';

const ROOM_NAMES = [
  "ENTRY / HERO",
  "AI LEAD SCORING",
  "AI SALES AGENT",
  "CHURN SHIELD",
  "WORKFLOW AUTOMATION",
  "FINAL CTA"
];

export default function NavigationUI() {
  const { currentRoom, setCurrentRoom, isTransitioning } = useRoom();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currentRoom < 5) setCurrentRoom(currentRoom + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentRoom > 0) setCurrentRoom(currentRoom - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRoom, isTransitioning, setCurrentRoom]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center pointer-events-auto">
        <div className="font-sans text-[15px] font-medium text-white">SellQ</div>
        <a href="/login" className="font-sans text-[13px] text-white/40 hover:text-white transition-colors">Skip to Dashboard →</a>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 pointer-events-auto">
        <div className="flex gap-4">
          {ROOM_NAMES.map((_, i) => (
            <button 
              key={i} 
              onClick={() => { if (!isTransitioning) setCurrentRoom(i); }}
              className={`rounded-full transition-all duration-300 ${currentRoom === i ? 'w-2 h-2 bg-white' : 'w-1 h-1 bg-white/20 hover:bg-white/50'}`}
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          {!isTransitioning ? (
            <motion.div key="name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-mono text-[11px] text-white/50">
              {ROOM_NAMES[currentRoom]}
            </motion.div>
          ) : (
            <motion.div key="flying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-mono text-[11px] text-white/50">
              → Flying to {ROOM_NAMES[currentRoom]}...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute top-1/2 left-8 -translate-y-1/2 pointer-events-auto">
        <AnimatePresence>
          {currentRoom > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 0.4, x: 0 }} exit={{ opacity: 0, x: -10 }} whileHover={{ opacity: 1, x: 4 }}
              onClick={() => { if (!isTransitioning) setCurrentRoom(currentRoom - 1); }}
              className="text-[13px] text-white font-mono uppercase tracking-widest flex items-center gap-2"
            >
              ← {ROOM_NAMES[currentRoom - 1]}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute top-1/2 right-8 -translate-y-1/2 pointer-events-auto">
        <AnimatePresence>
          {currentRoom < 5 && (
            <motion.button
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 0.4, x: 0 }} exit={{ opacity: 0, x: 10 }} whileHover={{ opacity: 1, x: -4 }}
              onClick={() => { if (!isTransitioning) setCurrentRoom(currentRoom + 1); }}
              className="text-[13px] text-white font-mono uppercase tracking-widest flex items-center gap-2"
            >
              {ROOM_NAMES[currentRoom + 1]} →
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
