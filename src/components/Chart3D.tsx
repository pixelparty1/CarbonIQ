import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface Chart3DProps {
  data: ChartData[];
  title: string;
}

function AnimatedBar({ position, scale, color, label }: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  label: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 + position[1];
    }
  });

  return (
    <group>
      <Box ref={meshRef} position={position} scale={scale}>
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </Box>
      <Text
        position={[position[0], -1.5, position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function Chart3DScene({ data, title }: Chart3DProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 5, 0]} color="#2ecc71" intensity={0.5} />
      
      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#2ecc71"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {title}
      </Text>
      
      {data.map((item, index) => (
        <AnimatedBar
          key={item.label}
          position={[(index - data.length / 2 + 0.5) * 1.5, item.value / maxValue * 2, 0]}
          scale={[0.8, item.value / maxValue * 4, 0.8]}
          color={item.color}
          label={item.label}
        />
      ))}
      
      {/* Base grid */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial 
          color="#1a1a1a" 
          transparent 
          opacity={0.3}
          wireframe
        />
      </mesh>
    </>
  );
}

export function Chart3D({ data, title }: Chart3DProps) {
  return (
    <div className="w-full h-[300px] glass-card rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <Chart3DScene data={data} title={title} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxDistance={15}
          minDistance={5}
        />
      </Canvas>
    </div>
  );
}