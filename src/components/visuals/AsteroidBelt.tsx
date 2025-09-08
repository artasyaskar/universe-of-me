import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

interface AsteroidBeltProps {
  innerRadius?: number;
  outerRadius?: number;
  count?: number;
  speed?: number;
  color?: string;
}

const dummy = new THREE.Object3D();

export default function AsteroidBelt({
  innerRadius = 10,
  outerRadius = 18,
  count = 200, // Reduced from 500 to improve performance
  speed = 0.1,
  color = '#888888',
}: AsteroidBeltProps) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = Math.max(innerRadius + Math.random() * (outerRadius - innerRadius), 0.1);
      const s = Math.max(0.1 + Math.random() * 0.2, 0.01);
      const x = (Math.random() - 0.5) * factor;
      const y = (Math.random() - 0.5) * 0.5;
      const z = (Math.random() - 0.5) * factor;
      
      // Validate all values to prevent NaN
      if (isFinite(t) && isFinite(factor) && isFinite(s) && isFinite(x) && isFinite(y) && isFinite(z)) {
        temp.push({ t, factor, s, x, y, z });
      }
    }
    return temp;
  }, [count, innerRadius, outerRadius]);

  useFrame((_, delta) => {
    if (!instancedMeshRef.current || !isFinite(delta) || delta > 0.1) return; // Skip frame if delta is too large

    // Only update every few frames to reduce performance impact
    const frameCount = Math.floor(Date.now() / 16) % 3; // Update every 3rd frame
    if (frameCount !== 0) return;

    particles.forEach((particle, i) => {
      let { t, factor, s, x, y, z } = particle;
      t = particle.t += delta * speed;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const p = (t / 10) * Math.PI;

      const posX = x + a * factor;
      const posY = y + b * factor;
      const posZ = z + Math.cos(p) * factor;

      // Validate position values before setting
      if (isFinite(posX) && isFinite(posY) && isFinite(posZ) && isFinite(s)) {
        dummy.position.set(posX, posY, posZ);
        dummy.scale.setScalar(s);
        dummy.rotation.set(s * 5, s * 5, s * 5);
        dummy.updateMatrix();
        instancedMeshRef.current!.setMatrixAt(i, dummy.matrix);
      }
    });
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, count]}>
      <Icosahedron args={[1, 0]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
    </instancedMesh>
  );
}


