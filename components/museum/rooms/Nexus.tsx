'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface RoomProps {
  position: [number, number, number]
  active: boolean
}

export default function Nexus({ position, active }: RoomProps) {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  
  useFrame(() => {
    if (outerRef.current) outerRef.current.rotation.y -= 0.001
    if (innerRef.current) innerRef.current.rotation.y += 0.002
  })

  const features = Array.from({length: 8}).map((_, i) => ({
    color: ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316'][i],
    orbit: 6 + Math.random() * 2,
    speed: 0.2 + Math.random() * 0.3,
    offset: Math.random() * Math.PI * 2,
    yDir: (Math.random() - 0.5) * 4
  }))

  return (
    <group position={position}>
      <mesh position={[0, 0, -5]}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#F97316" transparent opacity={0.04} />
      </mesh>
      
      <mesh ref={outerRef} position={[0, 0, -5]}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshBasicMaterial color="#F97316" wireframe transparent opacity={0.12} />
      </mesh>

      <mesh ref={innerRef} position={[0, 0, -5]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.06} />
      </mesh>

      <Sparkles position={[0, 0, -5]} count={500} scale={16} size={0.8} color="#7C3AED" opacity={0.9} />
      <Sparkles position={[0, 0, -5]} count={200} scale={12} size={0.5} color="#F97316" opacity={0.8} />

      {features.map((f, i) => (
        <FeatureOrbiter key={i} {...f} />
      ))}

      <Text position={[0, 2, -5]} fontSize={2.5} color="white" material-emissive="white" material-emissiveIntensity={0.4}>
        SellQ
      </Text>
      <Text position={[0, 0.5, -5]} fontSize={0.3} color="rgba(255,255,255,0.5)">
        THE FUTURE OF SALES INTELLIGENCE
      </Text>

      <pointLight position={[0, 5, -5]} color="#7C3AED" intensity={10} />
      <pointLight position={[0, -5, -5]} color="#F97316" intensity={10} />
      <pointLight position={[5, 0, -5]} color="#3B82F6" intensity={10} />
      <pointLight position={[-5, 0, -5]} color="#10B981" intensity={10} />
    </group>
  )
}

function FeatureOrbiter({ color, orbit, speed, offset, yDir }: any) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset
      ref.current.position.x = Math.cos(t) * orbit
      ref.current.position.z = -5 + Math.sin(t) * orbit
      ref.current.position.y = Math.sin(t * 1.5) * yDir
      
      ref.current.rotation.x += 0.01
      ref.current.rotation.y += 0.01
    }
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
