'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import { HUD } from './HUD'

export const ROOMS = [
  { id: 0, name: 'SellQ HQ', subtitle: 'LOBBY', color: '#7C3AED', z: 0 },
  { id: 1, name: 'Lead Scoring Chamber', subtitle: 'AI LEAD SCORING', color: '#3B82F6', z: -35 },
  { id: 2, name: 'Sentiment Intelligence Lab', subtitle: 'SENTIMENT AI', color: '#8B5CF6', z: -70 },
  { id: 3, name: 'Sales Agent Command Center', subtitle: 'AI SALES AGENT', color: '#06B6D4', z: -105 },
  { id: 4, name: 'Workflow Automation Factory', subtitle: 'WORKFLOW BUILDER', color: '#F59E0B', z: -140 },
  { id: 5, name: 'Churn Shield Vault', subtitle: 'CHURN SHIELD AI', color: '#EF4444', z: -175 },
  { id: 6, name: 'Multi-Tenant Galaxy', subtitle: 'MULTI-TENANT SAAS', color: '#10B981', z: -210 },
  { id: 7, name: 'Intelligence Nexus', subtitle: 'REVENUE INTELLIGENCE', color: '#F97316', z: -245 },
]

export default function Museum() {
  const [currentRoom, setCurrentRoom] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const isTransRef = useRef(false)
  const lastScrollRef = useRef(0)

  const navigate = useCallback((direction: 'next' | 'prev' | number) => {
    if (isTransRef.current) return
    
    setCurrentRoom((prev) => {
      let target: number
      if (typeof direction === 'number') {
        target = direction
      } else {
        target = direction === 'next'
          ? Math.min(prev + 1, ROOMS.length - 1)
          : Math.max(prev - 1, 0)
      }
      
      if (target === prev) return prev
      
      isTransRef.current = true
      setTransitioning(true)
      setTimeout(() => {
        isTransRef.current = false
        setTransitioning(false)
      }, 2000)
      
      return target
    })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate('next')
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Allow default scroll to not freeze the page if needed, but we prevent default to hijack
      e.preventDefault()
      const now = Date.now()
      if (now - lastScrollRef.current < 1500) return 
      lastScrollRef.current = now
      if (e.deltaY > 0) navigate('next')
      else if (e.deltaY < 0) navigate('prev')
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [navigate])

  return (
    <>
      <Canvas
        style={{ position: 'fixed', inset: 0, zIndex: 1 }}
        camera={{ position: [0, 1.5, 10], fov: 60, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        shadows={false}
      >
        <Scene currentRoom={currentRoom} transitioning={transitioning} rooms={ROOMS} />
      </Canvas>
      <HUD
        currentRoom={currentRoom}
        rooms={ROOMS}
        transitioning={transitioning}
        navigate={navigate}
      />
    </>
  )
}
