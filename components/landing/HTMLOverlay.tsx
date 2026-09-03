'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CharReveal } from './PlusXHero';
import { useRoom } from './RoomContext';

function OverlayContainer({ children, align = 'center' }: { children: React.ReactNode, align?: 'center' | 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="absolute inset-0 flex items-center px-12"
      style={{ justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end' }}
    >
      <div className={`max-w-[1100px] w-full ${align === 'center' ? 'text-center mx-auto' : align === 'left' ? 'text-left' : 'text-right'} text-shadow-[0_0_40px_rgba(0,0,0,0.8)]`}>
        {children}
      </div>
    </motion.div>
  );
}

export default function HTMLOverlay() {
  const { currentRoom, isTransitioning } = useRoom();

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <AnimatePresence mode="wait">
        {!isTransitioning && currentRoom === 0 && (
          <OverlayContainer key="room0" align="left">
            <div className="font-sans text-[11px] font-medium text-[var(--accent-purple)] tracking-[0.2em] mb-6 uppercase">AI SALES INTELLIGENCE PLATFORM</div>
            <h1 className="font-sans font-semibold text-[clamp(52px,6.5vw,96px)] tracking-[-0.04em] text-white leading-[1.05] mb-8">
              <CharReveal text="Turn Every" delay={0.4} />
              <br/>
              <CharReveal text="Conversation" delay={0.6} className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)]" />
              <br/>
              <CharReveal text="Into Revenue." delay={0.8} />
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-[17px] font-light text-[var(--text-secondary)] mb-8 max-w-[480px]">
              The AI operating system that scores leads, predicts churn, and closes deals — while you sleep.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
              <Link href="/login" className="pointer-events-auto inline-block border border-white/15 px-[32px] py-[14px] text-white hover:bg-[var(--accent-purple)]/10 hover:border-[var(--accent-purple)] transition-all rounded-md">
                Enter Dashboard →
              </Link>
            </motion.div>
          </OverlayContainer>
        )}

        {!isTransitioning && currentRoom === 1 && (
          <OverlayContainer key="room1" align="right">
            <div className="font-sans text-[11px] font-medium text-[var(--accent-purple)] tracking-[0.15em] mb-4 uppercase">AI LEAD SCORING</div>
            <h2 className="font-sans font-semibold text-[clamp(40px,5vw,72px)] tracking-[-0.03em] text-white leading-[1.05] max-w-[500px] mb-6 ml-auto">
              Know exactly who to call next.
            </h2>
            <p className="text-[17px] font-light text-[var(--text-secondary)] max-w-[400px] ml-auto">
              We dynamically score every lead based on real intent, so your team focuses only on revenue.
            </p>
          </OverlayContainer>
        )}

        {!isTransitioning && currentRoom === 2 && (
          <OverlayContainer key="room2" align="left">
            <div className="font-sans text-[11px] font-medium text-[var(--accent-blue)] tracking-[0.15em] mb-4 uppercase">AI SALES AGENT</div>
            <h2 className="font-sans font-semibold text-[clamp(40px,5vw,72px)] tracking-[-0.03em] text-white leading-[1.05] max-w-[500px] mb-6">
              Your best rep.<br/>Never sleeps.
            </h2>
            <p className="text-[17px] font-light text-[var(--text-secondary)] max-w-[400px]">
              Fully autonomous conversations that handle objections, answer questions, and book meetings directly to your calendar.
            </p>
          </OverlayContainer>
        )}

        {!isTransitioning && currentRoom === 3 && (
          <OverlayContainer key="room3" align="left">
            <div className="font-sans text-[11px] font-medium text-[var(--accent-red)] tracking-[0.15em] mb-4 uppercase">CHURN SHIELD AI</div>
            <h2 className="font-sans font-semibold text-[clamp(40px,5vw,72px)] tracking-[-0.03em] text-white leading-[1.05] max-w-[500px] mb-6">
              Stop churn<br/>before it starts.
            </h2>
            <p className="text-[17px] font-light text-[var(--text-secondary)] max-w-[400px]">
              Detect sentiment decline and risk signals up to 14 days before a customer cancels.
            </p>
          </OverlayContainer>
        )}

        {!isTransitioning && currentRoom === 4 && (
          <OverlayContainer key="room4" align="center">
            <div className="font-sans text-[11px] font-medium text-[var(--accent-purple)] tracking-[0.15em] mb-4 uppercase">WORKFLOW AUTOMATION</div>
            <h2 className="font-sans font-semibold text-[clamp(40px,5vw,72px)] tracking-[-0.03em] text-white leading-[1.05] max-w-[700px] mx-auto mb-6">
              Automate the entire sales process. No code.
            </h2>
          </OverlayContainer>
        )}

        {!isTransitioning && currentRoom === 5 && (
          <OverlayContainer key="room5" align="center">
            <div className="font-sans text-[11px] font-medium text-[var(--accent-purple)] tracking-[0.15em] mb-4 uppercase">START TODAY</div>
            <h2 className="font-sans font-semibold text-[clamp(56px,8vw,120px)] tracking-[-0.04em] text-white leading-[1.05] flex flex-col items-center mb-8">
              <CharReveal text="The future of sales" delay={0.4} />
              <CharReveal text="runs on intelligence." delay={0.6} className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)]" />
            </h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-[17px] font-light text-[var(--text-secondary)] mb-8 max-w-[480px] mx-auto">
              Join 500+ businesses already using SellQ.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="flex justify-center gap-6">
              <Link href="/login" className="pointer-events-auto inline-block border border-white px-[40px] py-[16px] text-white hover:bg-[var(--accent-purple)]/20 transition-all rounded-md">
                Open Dashboard →
              </Link>
              <button className="pointer-events-auto text-[var(--text-secondary)] hover:text-white transition-colors">See all features</button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mt-8 text-[11px] text-[var(--text-secondary)] tracking-widest">
              🔒 Free forever plan · No credit card · 99.9% uptime
            </motion.div>
          </OverlayContainer>
        )}
      </AnimatePresence>
    </div>
  );
}
