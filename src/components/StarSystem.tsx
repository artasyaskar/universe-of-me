import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getStars } from '../services/supabase';

// Define the type for a single star
interface Star {
  id: number;
  position: [number, number, number];
  note: string | null;
}

// Function to generate random stars
const generateRandomStars = (count: number, radius: number): Float32Array => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * (Math.random() * 0.5 + 0.5); // Distribute stars more evenly
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
};

interface StarSystemProps {
  speed?: number;
}

export default function StarSystem({ speed = 0.1 }: StarSystemProps) {
  const starsRef = useRef<THREE.Points>(null);
  const bgStarsRef = useRef<THREE.Points>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch stars from the service when the component mounts
  useEffect(() => {
    const fetchStars = async () => {
      setLoading(true);
      const { data, error } = await getStars();
      if (data && !error) {
        setStars(data);
      }
      setLoading(false);
    };
    fetchStars();
  }, []);

  // Create star positions from the fetched data
  const positions = useMemo(() => {
    if (loading || stars.length === 0) return new Float32Array(0);
    const pos = stars.flatMap(star => star.position);
    return new Float32Array(pos);
  }, [stars, loading]);

  // Generate background stars
  const bgStarPositions = useMemo(() => generateRandomStars(3000, 150), []);

  // Animate stars
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (starsRef.current) {
      starsRef.current.rotation.y = elapsedTime * 0.01 * speed;
    }
    if (bgStarsRef.current) {
      bgStarsRef.current.rotation.y = elapsedTime * 0.005 * speed;
    }
  });

  return (
    <>
      {/* Background Stars */}
      <points ref={bgStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={bgStarPositions.length / 3}
            array={bgStarPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          sizeAttenuation
          color="#aaa"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Interactive Stars (only if loaded) */}
      {!loading && positions.length > 0 && (
        <points ref={starsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
              needsUpdate
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.3}
            sizeAttenuation
            color="#ffffff"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </>
  );
}
