'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { ROOMS } from './Museum'

interface HUDProps {
  currentRoom: number
  rooms: typeof ROOMS
  transitioning: boolean
  navigate: (dir: 'next' | 'prev' | number) => void
}

const ROOM_CONTENT = [
  {
    eyebrow: 'AI REVENUE INTELLIGENCE',
    headline: 'Turn Every\nConversation\nInto Revenue.',
    body: 'The AI operating system that scores leads, predicts churn, and closes deals.',
    cta: 'Enter Dashboard →',
    ctaHref: '/dashboard'
  },
  {
    eyebrow: 'AI LEAD SCORING',
    headline: 'Know exactly\nwho to call next.',
    body: 'AI analyzes every signal — intent, engagement, recency — and ranks every lead in real time.',
    stats: ['87 avg score', '91% intent accuracy', '3× conversion rate']
  },
  {
    eyebrow: 'SENTIMENT INTELLIGENCE',
    headline: 'Read between\nevery line.',
    body: 'Real-time sentiment analysis across every conversation. Know how customers feel before they say it.',
    stats: ['+67% positive today', '12 urgent flags', '94% accuracy']
  },
  {
    eyebrow: 'AI SALES AGENT',
    headline: 'Your best rep.\nNever sleeps.',
    body: 'Handles 142 conversations daily. Replies in 1.2s. Books appointments autonomously.',
    stats: ['142 handled today', '1.2s response', '8 deals assisted']
  },
  {
    eyebrow: 'WORKFLOW AUTOMATION',
    headline: 'Automate the entire\nsales process.',
    body: 'Build powerful automations in minutes. Trigger → Condition → Action. No code required.',
    stats: ['12,000+ hours saved', '47 active workflows', '99.2% success rate']
  },
  {
    eyebrow: 'CHURN SHIELD AI',
    headline: 'Stop churn\nbefore it starts.',
    body: 'Detects cancellation signals 14 days early. Generates personalized recovery strategies instantly.',
    stats: ['₹2.4Cr protected', '73% avg risk score', '67% recovery rate']
  },
  {
    eyebrow: 'MULTI-TENANT SAAS',
    headline: 'One platform.\nUnlimited businesses.',
    body: 'Switch between workspaces in one click. Each with isolated data, custom roles, and analytics.',
    stats: ['3 workspaces', 'Isolated data', 'Custom branding']
  },
  {
    eyebrow: 'INTELLIGENCE NEXUS',
    headline: 'The future of sales\nruns on intelligence.',
    body: 'Join 500+ businesses already using SellQ to close more deals on autopilot.',
    cta: 'Start Free Trial →',
    ctaHref: '/dashboard'
  }
]

function RoomContent({ room, rooms }: { room: number, rooms: typeof ROOMS }) {
  const content = ROOM_CONTENT[room]
  const roomData = rooms[room]
  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', color: roomData.color, textTransform: 'uppercase' }}>
        {content.eyebrow}
      </div>
      <h2 style={{ fontSize: 'clamp(36px, 4vw, 64px)', fontWeight: 600, color: '#fff', whiteSpace: 'pre-line', lineHeight: 1.1, marginTop: 12 }}>
        {content.headline}
      </h2>
      <p style={{ fontSize: 16, color: '#6B7280', marginTop: 16, lineHeight: 1.7 }}>
        {content.body}
      </p>
      {content.stats && (
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          {content.stats.map((stat, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${roomData.color}40`, color: '#fff', padding: '6px 12px', borderRadius: 20, fontSize: 12, fontFamily: 'monospace' }}>
              {stat}
            </div>
          ))}
        </div>
      )}
      {content.cta && (
        <a href={content.ctaHref} style={{ pointerEvents: 'auto', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 24px', color: '#fff', fontSize: 14, textDecoration: 'none', display: 'inline-block', marginTop: 24, borderRadius: 6, transition: 'border-color 0.2s' }}>
          {content.cta}
        </a>
      )}
    </div>
  )
}

export function HUD({ currentRoom, rooms, transitioning, navigate }: HUDProps) {
  const room = rooms[currentRoom]
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '20px 28px', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontSize: 16, fontWeight: 500 }}>SellQ</span>
        <a href="/dashboard" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none', pointerEvents: 'auto' }}>Skip to Dashboard →</a>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentRoom}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}
        >
          <div style={{ fontSize: 10, letterSpacing: '0.2em', color: room.color, textTransform: 'uppercase', marginBottom: 2 }}>{room.subtitle}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>
            ROOM {currentRoom + 1} / {rooms.length}
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div key={currentRoom}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.6, duration: 0.7 }}}
          exit={{ opacity: 0, x: -20, transition: { duration: 0.3 }}}
          style={{ position: 'absolute', left: 60, top: '50%', transform: 'translateY(-50%)', maxWidth: 380, pointerEvents: 'none' }}
        >
          <RoomContent room={currentRoom} rooms={ROOMS} />
        </motion.div>
      </AnimatePresence>

      {currentRoom > 0 && (
        <motion.button
          whileHover={{ x: -4, opacity: 1 }}
          onClick={() => !transitioning && navigate('prev')}
          style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 13, pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <span style={{ fontSize: 24 }}>←</span>
          <span style={{ fontSize: 10, letterSpacing: '0.1em', color: rooms[currentRoom-1]?.color }}>
            {rooms[currentRoom-1]?.subtitle}
          </span>
        </motion.button>
      )}

      {currentRoom < rooms.length - 1 && (
        <motion.button
          whileHover={{ x: 4, opacity: 1 }}
          onClick={() => !transitioning && navigate('next')}
          style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 13, pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <span style={{ fontSize: 24 }}>→</span>
          <span style={{ fontSize: 10, letterSpacing: '0.1em', color: rooms[currentRoom+1]?.color }}>
            {rooms[currentRoom+1]?.subtitle}
          </span>
        </motion.button>
      )}

      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, alignItems: 'center' }}>
        {rooms.map((r, i) => (
          <motion.button key={i}
            onClick={() => !transitioning && navigate(i)}
            animate={{ width: i === currentRoom ? 24 : 6, background: i === currentRoom ? r.color : 'rgba(255,255,255,0.2)' }}
            transition={{ duration: 0.3 }}
            style={{ height: 6, borderRadius: 3, border: 'none', cursor: 'pointer', padding: 0, pointerEvents: 'auto' }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentRoom}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', letterSpacing: '0.1em' }}
        >
          {room.subtitle} / {room.name.toUpperCase()}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
