import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NebulaBackdropProps {
  radius?: number;
  colorA?: string;
  colorB?: string;
}

// Simple shader-like gradient using large sphere with additive material
export default function NebulaBackdrop({ radius = 200, colorA = '#312e81', colorB = '#0ea5e9' }: NebulaBackdropProps) {
  const material = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(colorA),
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [colorA]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mix = (Math.sin(t * 0.1) + 1) / 2;
    const c = new THREE.Color(colorA).lerp(new THREE.Color(colorB), mix);
    material.color = c;
  });

  return (
    <mesh>
      <sphereGeometry args={[radius, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}


