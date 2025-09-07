import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useControls } from 'leva';
import { planetVertexShader, planetFragmentShader } from './visuals/shaders';

interface PlanetProps {
  id?: string;
  name: string;
  size?: number;
  color: string;
  position: [number, number, number];
  orbitRadius?: number;
  orbitSpeed?: number;
  rotationSpeed?: number;
  ring?: boolean;
  ringColor?: string;
  ringSize?: number;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export default function Planet({
  name,
  size = 1,
  color,
  position,
  orbitRadius = 0,
  orbitSpeed = 0.2,
  rotationSpeed = 0.5,
  ring = false,
  ringColor = '#ffffff',
  ringSize = 1.5,
  isSelected = false,
  isHovered = false,
  onClick,
  onPointerOver,
  onPointerOut,
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);

  const { glowPower, glowMultiplier } = useControls(
    'Planet Shaders',
    {
      glowPower: { value: 3.0, min: 0.1, max: 10.0, step: 0.1 },
      glowMultiplier: { value: 1.5, min: 0.1, max: 5.0, step: 0.1 },
    },
    { collapsed: true }
  );

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uGlowPower: { value: glowPower },
        uGlowMultiplier: { value: glowMultiplier },
        uHover: { value: isHovered || isSelected ? 1.0 : 0.0 },
      },
      vertexShader: planetVertexShader,
      fragmentShader: planetFragmentShader,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
  }, [color, glowPower, glowMultiplier, isHovered, isSelected]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
    }
    if (orbitRef.current && orbitRadius > 0) {
      const time = clock.getElapsedTime() * orbitSpeed;
      orbitRef.current.position.x = Math.sin(time) * orbitRadius;
      orbitRef.current.position.z = Math.cos(time) * orbitRadius;
    }
  });

  const scale = isHovered || isSelected ? 1.15 : 1;

  return (
    <group position={position} ref={orbitRef}>
      <group
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
          <sphereGeometry args={[size, 64, 64]} />
          <primitive object={shaderMaterial} />
        </mesh>

        {isHovered && (
          <Html distanceFactor={10}>
            <div className="bg-black/50 text-white text-xs p-2 rounded-md backdrop-blur-sm">
              {name}
            </div>
          </Html>
        )}

        {ring && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * ringSize * 0.8, size * ringSize, 128]} />
            <meshStandardMaterial
              color={ringColor}
              opacity={0.7}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}
