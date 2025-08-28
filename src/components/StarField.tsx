import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
  speed?: number;
}

export default function StarField({ count = 5000, speed = 0.5 }: StarFieldProps) {
  const starsRef = useRef<THREE.Points>(null);
  
  // Create star positions
  const positions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      // Create a sphere of stars
      const radius = 100 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }
    return new Float32Array(positions);
  }, [count]);

  // Animate stars
  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = clock.getElapsedTime() * 0.05 * speed;
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.03 * speed;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.2} 
        sizeAttenuation={true} 
        color="#ffffff"
        transparent
        opacity={0.8}
      />
    </points>
  );
}
