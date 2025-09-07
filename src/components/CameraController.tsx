import { useRef, forwardRef, memo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';

interface CameraControllerProps {
  target: THREE.Vector3;
  isPlanetView: boolean;
}

const CameraControllerComponent = forwardRef<OrbitControlsImpl, CameraControllerProps>(
  ({ target, isPlanetView }, ref) => {
    const { camera } = useThree();
    const controlsRef = useRef<OrbitControlsImpl>(null);

    const [{ position, target: springTarget }] = useSpring({
      position: isPlanetView ? target.clone().add(new THREE.Vector3(0, 2, 5)) : new THREE.Vector3(0, 10, 25),
      target: isPlanetView ? target : new THREE.Vector3(0, 0, 0),
      config: { mass: 1, tension: 170, friction: 26, precision: 0.0001 },
    }, [isPlanetView, target]);

    useFrame(() => {
      camera.position.copy(position.get());
      if (controlsRef.current) {
        controlsRef.current.target.copy(springTarget.get());
        controlsRef.current.update();
      }
    });

    return (
      <OrbitControls
        ref={controlsRef}
        args={[camera, undefined]}
        enableZoom={true}
        enablePan={!isPlanetView}
        maxDistance={isPlanetView ? 20 : 50}
        minDistance={isPlanetView ? 3 : 10}
        autoRotate={!isPlanetView}
        autoRotateSpeed={0.3}
      />
    );
  }
);

CameraControllerComponent.displayName = 'CameraController';
export default memo(CameraControllerComponent);
