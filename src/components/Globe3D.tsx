import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function RotatingGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Load textures with error handling
  let earthTexture, bumpMap, specularMap;
  try {
    earthTexture = useLoader(
      THREE.TextureLoader,
      "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
    );
    bumpMap = useLoader(
      THREE.TextureLoader,
      "https://threejs.org/examples/textures/planets/earth_bump_2048.jpg"
    );
    specularMap = useLoader(
      THREE.TextureLoader,
      "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg"
    );
  } catch (error) {
    console.warn("Failed to load some textures:", error);
  }

  // Rotation
  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
    if (glowRef.current) glowRef.current.rotation.y += delta * 0.1;
  });

  // Function to convert lat/lon to 3D position on globe
  function latLonToVector3(lat: number, lon: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  // Example emission hotspots
  const emissionCoords = [
    { lat: 28.6, lon: 77.2 }, // Delhi
    { lat: 40.7, lon: -74.0 }, // New York
    { lat: 35.6, lon: 139.7 }, // Tokyo
    { lat: -23.5, lon: -46.6 } // São Paulo
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[0, 0, 0]} color="#00aaff" intensity={0.5} />

      {/* Globe */}
      <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
        <meshPhongMaterial
          map={earthTexture}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specularMap={specularMap}
          specular={new THREE.Color("grey")}
          color={earthTexture ? undefined : "#2B6CB0"} // Fallback color if texture fails to load
        />
      </Sphere>

      {/* Atmosphere Glow */}
      <Sphere ref={glowRef} args={[2.2, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#00aaff"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Emission Hotspots */}
      {emissionCoords.map((coord, i) => {
        const pos = latLonToVector3(coord.lat, coord.lon, 2.02);
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="red" />
          </mesh>
        );
      })}

      {/* Stars */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </>
  );
}

function LoadingFallback() {
  return null; // Transparent loading state
}

export function Globe3D() {
  return (
    <div className="w-full h-[400px] lg:h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        style={{ background: "black" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <RotatingGlobe />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxDistance={10}
            minDistance={4}
            rotateSpeed={0.5}
            zoomSpeed={0.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}