import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface PlanetProps {
  position: [number, number, number];
  size?: number;
  color: string;
  name: string;
  speed?: number;
  onClick?: () => void;
  isSelected?: boolean;
  orbitRadius?: number;
  orbitSpeed?: number;
  rotationSpeed?: number;
  id?: string;
  ring?: boolean;
  ringColor?: string;
  ringSize?: number;
}

export default function Planet({
  position,
  size = 1,
  color,
  name,
  speed = 0.5,
  onClick,
  isSelected = false,
  orbitRadius = 0,
  orbitSpeed = 0.2,
  ring = false,
  ringColor = '#ffffff',
  ringSize = 1.5,
}: PlanetProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Generate random features for the planet
  const features = useMemo(() => ({
    rotationSpeed: (Math.random() * 0.5 + 0.5) * speed,
  }), [speed]);

  // Animate planet
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Rotate the planet
      meshRef.current.rotation.y = clock.getElapsedTime() * features.rotationSpeed;

      // If planet has an orbit, move it along the orbit
      if (orbitRef.current && orbitRadius > 0) {
        const time = clock.getElapsedTime() * orbitSpeed;
        orbitRef.current.position.x = Math.sin(time) * orbitRadius;
        orbitRef.current.position.z = Math.cos(time) * orbitRadius;
      }
    }
  });

  const glowScale = hovered || isSelected ? 1.2 : 1;

  return (
    <group position={position} ref={orbitRef}>
      <group>
        {/* Planet */}
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={glowScale}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered || isSelected ? 1.5 : 0.5}
            roughness={0.7}
            metalness={0.3}
            toneMapped={false}
          />
        </mesh>

        {/* Ring */}
        {ring && (
          <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * ringSize * 0.8, size * ringSize, 64]} />
            <meshStandardMaterial
              color={ringColor}
              emissive={isSelected ? ringColor : undefined}
              emissiveIntensity={isSelected ? 0.3 : 0}
              opacity={0.5}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}
      </group>

      {/* Planet label */}
      {(hovered || isSelected) && (
        <Text
          position={[0, size * 2, 0]}
          color="white"
          fontSize={0.5}
          maxWidth={5}
          lineHeight={1}
          letterSpacing={0.1}
          textAlign="center"
          font="https://fonts.gstatic.com/s/orbitron/v25/yMJMMIlzdpv1Qf1BwM1csTg.woff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="black"
          outlineOpacity={0.8}
        >
          {name}
        </Text>
      )}
    </group>
  );
}
