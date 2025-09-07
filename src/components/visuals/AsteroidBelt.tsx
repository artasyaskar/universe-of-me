import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Icosahedron } from '@react-three/drei';
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
  count = 500,
  speed = 0.1,
  color = '#888888',
}: AsteroidBeltProps) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = innerRadius + Math.random() * (outerRadius - innerRadius);
      const s = 0.1 + Math.random() * 0.2;
      const x = (Math.random() - 0.5) * factor;
      const y = (Math.random() - 0.5) * 0.5;
      const z = (Math.random() - 0.5) * factor;
      temp.push({ t, factor, s, x, y, z });
    }
    return temp;
  }, [count, innerRadius, outerRadius]);

  useFrame((state, delta) => {
    if (!instancedMeshRef.current) return;

    particles.forEach((particle, i) => {
      let { t, factor, s, x, y, z } = particle;
      t = particle.t += delta * speed;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const p = (t / 10) * Math.PI;

      dummy.position.set(
        x + a * factor,
        y + b * factor,
        z + Math.cos(p) * factor
      );
      dummy.scale.setScalar(s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      instancedMeshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <InstancedMesh ref={instancedMeshRef} args={[undefined, undefined, count]}>
      <Icosahedron args={[1, 0]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
    </InstancedMesh>
  );
}


