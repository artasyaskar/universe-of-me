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

interface StarSystemProps {
  speed?: number;
}

export default function StarSystem({ speed = 0.1 }: StarSystemProps) {
  const starsRef = useRef<THREE.Points>(null);
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
    if (loading || stars.length === 0) {
      return new Float32Array(0);
    }
    // Flatten the array of position arrays into a single Float32Array
    const pos = stars.flatMap(star => star.position);
    return new Float32Array(pos);
  }, [stars, loading]);

  // Animate stars
  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = clock.getElapsedTime() * 0.02 * speed;
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.01 * speed;
    }
  });

  // Don't render anything if there are no stars
  if (loading || positions.length === 0) {
    return null;
  }

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          needsUpdate={true} // Important when the array is updated
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        sizeAttenuation={true}
        color="#ffffff"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
