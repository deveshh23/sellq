'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface RoomProps {
  position: [number, number, number]
  active: boolean
}

function useGenerateCardTexture(text: string, subtitle?: string) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d')!;
    
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, 512, 320);
    
    ctx.strokeStyle = '#7C3AED';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, 512, 320);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.fillText(text, 40, 80);

    if (subtitle) {
      ctx.fillStyle = '#A78BFA';
      ctx.font = '24px Inter, sans-serif';
      ctx.fillText(subtitle, 40, 130);
    }

    ctx.fillStyle = '#7C3AED';
    ctx.fillRect(40, 180, 200, 16);
    ctx.fillStyle = '#3B82F6';
    ctx.fillRect(40, 220, 300, 16);

    return new THREE.CanvasTexture(canvas);
  }, [text, subtitle]);
}

export default function Lobby({ position, active }: RoomProps) {
  const groupRef = useRef<THREE.Group>(null)
  const orbRef = useRef<THREE.Mesh>(null)

  const card1 = useGenerateCardTexture('Raj Patel', 'AI Score: 87')
  const card2 = useGenerateCardTexture('₹47,200 Revenue')
  const card3 = useGenerateCardTexture('Churn Shield', '2 at risk')

  useFrame(() => {
    if (orbRef.current) {
      orbRef.current.rotation.x += 0.003
      orbRef.current.rotation.y += 0.005
    }
  })

  return (
    <group position={position} ref={groupRef}>
      <mesh ref={orbRef} position={[0, 0, -5]}>
        <icosahedronGeometry args={[2.5, 2]} />
        <meshBasicMaterial color="#7C3AED" wireframe />
      </mesh>
      
      <pointLight position={[0, 2, -5]} color="#7C3AED" intensity={8} distance={20} />

      <Float floatIntensity={0.8} speed={1.5}>
        <mesh position={[-5, 1, -5]} rotation={[0, 0.4, 0]}>
          <planeGeometry args={[3.5, 2.2]} />
          <meshBasicMaterial map={card1} />
        </mesh>
      </Float>

      <Float floatIntensity={0.8} speed={1.5}>
        <mesh position={[5, 0, -7]} rotation={[0, -0.35, 0]}>
          <planeGeometry args={[3.5, 2.2]} />
          <meshBasicMaterial map={card2} />
        </mesh>
      </Float>

      <Float floatIntensity={0.8} speed={1.5}>
        <mesh position={[0, -2, -4]} rotation={[0.1, 0, 0]}>
          <planeGeometry args={[3.5, 2.2]} />
          <meshBasicMaterial map={card3} />
        </mesh>
      </Float>

      <Sparkles count={80} scale={5} size={1.2} color="#7C3AED" position={[0, 0, -5]} />

      <Text position={[0, 4.5, -5]} fontSize={0.35} color="rgba(255,255,255,0.3)">
        SELLQ HQ
      </Text>

      <pointLight position={[0, 3, -3]} color="#7C3AED" intensity={6} distance={25} />
    </group>
  )
}
