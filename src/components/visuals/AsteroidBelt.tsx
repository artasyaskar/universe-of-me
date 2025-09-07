import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidBeltProps {
  innerRadius?: number;
  outerRadius?: number;
  count?: number;
  speed?: number;
  color?: string;
}

export default function AsteroidBelt({ innerRadius = 8, outerRadius = 14, count = 400, speed = 0.2, color = '#94a3b8' }: AsteroidBeltProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rocks = useMemo(() => {
    const items = new Array(count).fill(0).map(() => {
      const r = innerRadius + Math.random() * (outerRadius - innerRadius);
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 0.8;
      const scale = Math.random() * 0.15 + 0.03;
      return { r, angle, y, scale };
    });
    return items;
  }, [count, innerRadius, outerRadius]);

  useFrame((_, delta) => {
    rocks.forEach((rock, i) => {
      rock.angle += speed * delta * (0.5 + Math.random() * 0.5);
      const x = Math.cos(rock.angle) * rock.r;
      const z = Math.sin(rock.angle) * rock.r;
      const m = groupRef.current?.children[i] as THREE.Mesh | undefined;
      if (m) {
        m.position.set(x, rock.y, z);
        m.rotation.x += 0.01;
        m.rotation.y += 0.02;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {rocks.map((rock, i) => (
        <mesh key={i} scale={rock.scale} castShadow receiveShadow>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} roughness={0.9} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}


