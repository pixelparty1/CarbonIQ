import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Text, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

interface PodiumProps {
  position: [number, number, number];
  height: number;
  color: string;
  rank: number;
  company: string;
  emissions: number;
}

function PodiumStep({ position, height, color, rank, company, emissions }: PodiumProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + rank) * 0.05 + position[1];
    }
  });

  const crownPositions = {
    1: "👑",
    2: "🥈", 
    3: "🥉"
  };

  return (
    <group>
      {/* Podium base */}
      <Box 
        ref={meshRef} 
        position={position} 
        scale={[1.5, height, 1.5]}
      >
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.8}
          metalness={0.3}
          roughness={0.2}
        />
      </Box>
      
      {/* Glow effect */}
      <Box 
        position={[position[0], position[1], position[2]]} 
        scale={[1.6, height * 1.1, 1.6]}
      >
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Box>
      
      {/* Rank text */}
      <Text
        position={[position[0], position[1] + height + 0.5, position[2] + 0.8]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        #{rank}
      </Text>
      
      {/* Crown/Medal */}
      <Text
        position={[position[0], position[1] + height + 1.2, position[2]]}
        fontSize={1.2}
        anchorX="center"
        anchorY="middle"
      >
        {crownPositions[rank as keyof typeof crownPositions] || "🏆"}
      </Text>
      
      {/* Company name */}
      <Text
        position={[position[0], position[1] + height + 2, position[2]]}
        fontSize={0.3}
        color="#2ecc71"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        textAlign="center"
      >
        {company}
      </Text>
      
      {/* Emissions */}
      <Text
        position={[position[0], position[1] + height + 2.5, position[2]]}
        fontSize={0.25}
        color="#00aaff"
        anchorX="center"
        anchorY="middle"
      >
        {emissions} tons CO₂
      </Text>
    </group>
  );
}

function Podium3DScene({ topCompanies }: { topCompanies: any[] }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 5, 0]} color="#2ecc71" intensity={0.8} />
      <pointLight position={[-5, 3, 5]} color="#00aaff" intensity={0.6} />
      
      {/* Title */}
      <Text
        position={[0, 6, 0]}
        fontSize={0.6}
        color="#2ecc71"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        Carbon Leaders Podium
      </Text>
      
      {/* Podium steps */}
      {topCompanies.slice(0, 3).map((company, index) => {
        const positions: [number, number, number][] = [
          [0, 1.5, 0],    // 1st place - center, tallest
          [-2.5, 1, 0],   // 2nd place - left, medium
          [2.5, 0.5, 0]   // 3rd place - right, shortest
        ];
        
        const heights = [3, 2, 1];
        const colors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // Gold, Silver, Bronze
        
        return (
          <PodiumStep
            key={company.id}
            position={positions[index]}
            height={heights[index]}
            color={colors[index]}
            rank={index + 1}
            company={company.name}
            emissions={company.emissions}
          />
        );
      })}
      
      {/* Base platform */}
      <Box position={[0, -1, 0]} scale={[8, 0.2, 4]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          transparent 
          opacity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>
      
      {/* Sparkle effects */}
      {Array.from({ length: 15 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 6 + 2,
            (Math.random() - 0.5) * 6,
          ]}
        >
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
      ))}
    </>
  );
}

export function Podium3D({ topCompanies }: { topCompanies: any[] }) {
  return (
    <div className="w-full h-[500px] glass-card rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 4, 10], fov: 60 }}>
        <Podium3DScene topCompanies={topCompanies} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxDistance={20}
          minDistance={6}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}