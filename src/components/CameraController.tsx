import { useRef, forwardRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';

interface CameraControllerProps {
  target?: THREE.Vector3;
  isPlanetView?: boolean;
}

const CameraController = forwardRef<OrbitControlsImpl, CameraControllerProps>(
  ({ target = new THREE.Vector3(0, 0, 0), isPlanetView = false }, ref) => {
    const { camera } = useThree();
    const internalControlsRef = useRef<OrbitControlsImpl>(null);

    useFrame(() => {
      if (internalControlsRef.current) {
        if (isPlanetView) {
          // Smoothly move camera to the planet
          camera.position.lerp(target.clone().add(new THREE.Vector3(0, 2, 5)), 0.05);
          internalControlsRef.current.target.lerp(target, 0.05);
        } else {
          // Smoothly return to galaxy view
          camera.position.lerp(new THREE.Vector3(0, 10, 25), 0.05);
          internalControlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
        }
        internalControlsRef.current.update();
      }
    });

    return (
      <OrbitControls
        ref={ref || internalControlsRef}
        args={[camera, undefined]}
        enableZoom={true}
        enablePan={!isPlanetView}
        maxDistance={50}
        minDistance={5}
        target={target}
      />
    );
  }
);

CameraController.displayName = 'CameraController';
export default CameraController;
