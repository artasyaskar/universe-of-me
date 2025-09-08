import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CometsProps {
  count?: number;
  radius?: number;
  speed?: number;
  color?: string;
}

export default function Comets({ count = 12, radius = 40, speed = 6, color = '#93c5fd' }: CometsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const trails = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      angle: Math.random() * Math.PI * 2,
      height: (Math.random() - 0.5) * 10,
      distance: radius * (0.6 + Math.random() * 0.6),
      len: 0.6 + Math.random() * 0.8,
      speed: (0.2 + Math.random() * 0.6) * (speed / 10),
    }));
  }, [count, radius, speed]);

  useFrame((_, delta) => {
    trails.forEach((t, i) => {
      t.angle += t.speed * delta;
      const x = Math.cos(t.angle) * t.distance;
      const z = Math.sin(t.angle) * t.distance;
      const child = groupRef.current?.children[i] as THREE.Mesh | undefined;
      if (child) {
        child.position.set(x, t.height, z);
        child.rotation.y = Math.atan2(z, x) + Math.PI / 2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {trails.map((t, idx) => (
        <mesh key={idx}>
          <cylinderGeometry args={[0.02, 0.2, t.len, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}


