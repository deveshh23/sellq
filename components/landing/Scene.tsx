'use client';
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles, Text, Float, Line, Icosahedron, Box, Torus, Sphere, PointMaterial, Points, Grid } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useRoom } from './RoomContext';

const ROOM_POSITIONS = [0, -30, -60, -90, -120, -150];

function CameraController() {
  const { camera } = useThree();
  const { currentRoom, isTransitioning, setIsTransitioning } = useRoom();

  useEffect(() => {
    // Initial position
    if (!isTransitioning) {
      camera.position.set(0, 0, ROOM_POSITIONS[currentRoom] + 10);
      return;
    }

    const targetZ = ROOM_POSITIONS[currentRoom] + 10;
    
    gsap.to(camera.position, {
      z: targetZ,
      y: 0,
      x: 0,
      duration: 1.8,
      ease: "power3.inOut",
      onComplete: () => {
        setIsTransitioning(false);
      }
    });
    
    // Motion blur / speed effect
    const prevFov = (camera as THREE.PerspectiveCamera).fov;
    gsap.to(camera, {
      fov: 75,
      duration: 0.6,
      ease: "power2.in",
      onUpdate: () => camera.updateProjectionMatrix(),
      onComplete: () => {
        gsap.to(camera, { 
          fov: prevFov, 
          duration: 0.8, 
          ease: "power2.out",
          onUpdate: () => camera.updateProjectionMatrix()
        });
      }
    });
    
  }, [currentRoom, camera]);

  return null;
}

function StarField() {
  return <Sparkles count={1000} scale={[160, 160, 180]} position={[0, 0, -80]} size={0.3} speed={0.1} opacity={0.25} color="white" />;
}

function FloorGrid() {
  return <Grid position={[0, -6, -75]} args={[200, 200]} cellSize={3} cellThickness={0.3} sectionSize={0} fadeDistance={100} fadeStrength={1} cellColor="rgba(124,58,237,0.08)" />;
}

function useGenerateCardTexture(type: 'lead' | 'churn' | 'revenue') {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, 512, 256);
    
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, 512, 256);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '24px Inter, sans-serif';

    if (type === 'lead') {
      ctx.fillText('Raj Patel · 87 AI Score', 40, 60);
      ctx.strokeStyle = '#7C3AED';
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.arc(256, 160, 60, Math.PI, 0);
      ctx.stroke();
      ctx.fillStyle = '#7C3AED';
      ctx.fillRect(40, 100, 120, 8);
      ctx.fillStyle = '#3B82F6';
      ctx.fillRect(40, 140, 90, 8);
      ctx.fillStyle = '#10B981';
      ctx.fillRect(40, 180, 100, 8);
    } else if (type === 'churn') {
      ctx.fillStyle = '#EF4444';
      ctx.fillText('Churn Shield · 2 at risk', 40, 60);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('Elena · 73% Risk', 40, 120);
      ctx.fillStyle = '#EF4444';
      ctx.fillRect(40, 160, 300, 16);
      ctx.fillStyle = 'rgba(239,68,68,0.2)';
      ctx.fillRect(340, 160, 100, 16);
    } else if (type === 'revenue') {
      ctx.fillStyle = '#10B981';
      ctx.fillText('₹47,200 Revenue', 40, 60);
      for(let i=0; i<15; i++) {
        const h = Math.random() * 100 + 20;
        ctx.fillRect(40 + i*25, 200 - h, 16, h);
      }
    }
    
    return new THREE.CanvasTexture(canvas);
  }, [type]);
}

function Room0Hero() {
  const { currentRoom } = useRoom();
  const texLead = useGenerateCardTexture('lead');
  const texChurn = useGenerateCardTexture('churn');
  const texRev = useGenerateCardTexture('revenue');
  const brainRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (brainRef.current) {
      brainRef.current.rotation.x += 0.001;
      brainRef.current.rotation.y += 0.002;
    }
  });

  if (Math.abs(0 - currentRoom) > 1) return null;

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={brainRef} position={[0, 0, -5]}>
        <icosahedronGeometry args={[3, 1]} />
        <meshBasicMaterial color="#7C3AED" wireframe transparent opacity={0.6} />
      </mesh>
      
      <pointLight position={[0, 2, -2]} color="#7C3AED" intensity={4} distance={25} />
      
      <Float floatIntensity={0.6} speed={1.5}>
        <mesh position={[-5, 1.5, -3]} rotation={[0, 0.4, 0.05]}>
          <planeGeometry args={[4, 2.5]} />
          <meshBasicMaterial map={texLead} />
        </mesh>
      </Float>

      <Float floatIntensity={0.6} speed={1.5}>
        <mesh position={[5, 0.5, -6]} rotation={[0, -0.35, -0.03]}>
          <planeGeometry args={[4, 2.5]} />
          <meshBasicMaterial map={texRev} />
        </mesh>
      </Float>

      <Float floatIntensity={0.6} speed={1.5}>
        <mesh position={[1, -2.5, -2]} rotation={[0.1, 0.1, 0]}>
          <planeGeometry args={[4, 2.5]} />
          <meshBasicMaterial map={texChurn} />
        </mesh>
      </Float>
    </group>
  );
}

function Room1LeadScoring() {
  const { currentRoom } = useRoom();
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef1.current) ringRef1.current.rotation.z += 0.005;
    if (ringRef2.current) ringRef2.current.rotation.z -= 0.003;
  });

  const spheres = Array.from({length:4}).map((_, i) => ({
    speed: 0.5 + Math.random(), offset: i * Math.PI / 2, color: ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B'][i]
  }));

  if (Math.abs(1 - currentRoom) > 1) return null;

  return (
    <group position={[0, 0, -30]}>
      <mesh ref={ringRef1} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[2.5, 0.04, 16, 100]} />
        <meshBasicMaterial color="#7C3AED" />
      </mesh>
      <mesh ref={ringRef2} rotation={[Math.PI/3, 0, 0]}>
        <torusGeometry args={[1.5, 0.03, 16, 100]} />
        <meshBasicMaterial color="#3B82F6" />
      </mesh>
      
      <Text position={[0, 0, 0]} fontSize={3} color="white">87</Text>
      <pointLight position={[0, 2, 2]} color="#7C3AED" intensity={5} distance={20} />

      {spheres.map((s, i) => (
        <AnimatedOrbitSphere key={i} speed={s.speed} offset={s.offset} color={s.color} />
      ))}
    </group>
  );
}

function AnimatedOrbitSphere({ speed, offset, color }: { speed: number, offset: number, color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.x = Math.cos(t * speed + offset) * 3;
      ref.current.position.z = Math.sin(t * speed + offset) * 3;
      ref.current.position.y = Math.sin(t * speed * 0.5 + offset) * 1;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function Room2SalesAgent() {
  const { currentRoom } = useRoom();
  if (Math.abs(2 - currentRoom) > 1) return null;

  return (
    <group position={[0, 0, -60]}>
      <mesh position={[-3, 0.5, -5]} rotation={[0, 0.3, 0]}>
        <planeGeometry args={[3.5, 2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
      <mesh position={[3, -0.5, -3]} rotation={[0, -0.3, 0]}>
        <planeGeometry args={[3.5, 2]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.15} />
      </mesh>
      <pointLight position={[0, 0, -3]} color="#3B82F6" intensity={4} distance={20} />
      {/* Particles could go here, simplified for performance */}
    </group>
  );
}

function Room3ChurnShield() {
  const { currentRoom } = useRoom();
  const ringRef = useRef<THREE.Mesh>(null);
  const shieldRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime()) * 0.1;
      ringRef.current.scale.set(scale, scale, scale);
    }
    if (shieldRef.current) shieldRef.current.rotation.y += 0.01;
  });

  if (Math.abs(3 - currentRoom) > 1) return null;

  return (
    <group position={[0, 0, -90]}>
      <mesh ref={shieldRef}>
        <coneGeometry args={[2, 4, 6]} />
        <meshBasicMaterial color="#EF4444" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[4, 0.02, 16, 100]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.3} />
      </mesh>
      <pointLight color="#EF4444" intensity={6} distance={25} />
    </group>
  );
}

function Room4Workflow() {
  const { currentRoom } = useRoom();
  if (Math.abs(4 - currentRoom) > 1) return null;

  return (
    <group position={[0, 0, -120]}>
      {[-6, -3, 0, 3, 6].map((x, i) => (
        <group key={i}>
          <Box position={[x, i===1?0.5:i===3?-0.5:0, i===1||i===3?-2:-3]} args={[0.8, 0.8, 0.8]}>
            <meshBasicMaterial color={['#3B82F6', '#F59E0B', '#7C3AED', '#F59E0B', '#10B981'][i]} />
          </Box>
          <pointLight position={[x, i===1?0.5:i===3?-0.5:0, i===1||i===3?-2:-3]} color={['#3B82F6', '#F59E0B', '#7C3AED', '#F59E0B', '#10B981'][i]} intensity={2} distance={10} />
        </group>
      ))}
    </group>
  );
}

function Room5CTA() {
  const { currentRoom } = useRoom();
  const sphereRef = useRef<THREE.Mesh>(null);
  useFrame(() => { if (sphereRef.current) sphereRef.current.rotation.y -= 0.005; });

  if (Math.abs(5 - currentRoom) > 1) return null;

  return (
    <group position={[0, 0, -150]}>
      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.06} />
      </mesh>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[4, 16, 16]} />
        <meshBasicMaterial color="#7C3AED" wireframe transparent opacity={0.15} />
      </mesh>
      <Sparkles count={400} scale={20} size={0.6} speed={0.5} opacity={0.8} color="#7C3AED" />
      <pointLight position={[-2, 2, 2]} color="#7C3AED" intensity={8} distance={30} />
      <pointLight position={[2, -2, 2]} color="#3B82F6" intensity={8} distance={30} />
      <Text position={[0, 2, 5]} fontSize={2} color="white">SellQ</Text>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.1} />
        
        <CameraController />
        <StarField />
        <FloorGrid />
        
        <Room0Hero />
        <Room1LeadScoring />
        <Room2SalesAgent />
        <Room3ChurnShield />
        <Room4Workflow />
        <Room5CTA />
      </Canvas>
    </div>
  );
}
