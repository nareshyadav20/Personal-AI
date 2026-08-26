import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';

function AnimatedOrb({ isLoading }) {
  const sphereRef = useRef();

  useFrame((state, delta) => {
    if (sphereRef.current) {
      // Rotation speed increases when generating content
      const speed = isLoading ? 2.5 : 0.6;
      sphereRef.current.rotation.x += delta * speed * 0.15;
      sphereRef.current.rotation.y += delta * speed * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1}>
      <Sphere ref={sphereRef} args={[1, 64, 64]} scale={2.0}>
        <MeshDistortMaterial
          color={isLoading ? '#17c2a4' : '#2f3030'}
          attach="material"
          distort={isLoading ? 0.5 : 0.35}
          speed={isLoading ? 3 : 1.2}
          roughness={0.4}
          metalness={0.6}
          wireframe={true}
        />
      </Sphere>
    </Float>
  );
}

export default function ThreeBackground({ isLoading }) {
  return (
    <div
      className="three-background-layer"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} color="#17c2a4" intensity={1.2} />
        
        {/* Floating 3D AI Orb */}
        <AnimatedOrb isLoading={isLoading} />
        
        {/* Background 3D Stars/Particle Space */}
        <Stars radius={50} depth={50} count={1500} factor={3} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}