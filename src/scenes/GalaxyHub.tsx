import { Suspense, useRef, useState, useEffect, forwardRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Text } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiArrowLeft, FiGlobe, FiCode, FiCpu, FiInfo, FiGithub, FiLinkedin, FiMail, FiAward } from 'react-icons/fi';
import LoadingScreen from '../components/LoadingScreen';
import StarSystem from '../components/StarSystem';
import Planet from '../components/Planet';
import { AstronautModel, AstronautChatUI } from '../components/AstronautAI';
import BadgeSystem from '../components/BadgeSystem';
import { useNavigate } from 'react-router-dom';

// Planet data configuration (assuming it's defined above as before)
const PLANETS = [
  { id: 'frontend', name: 'Frontend', description: 'Explore my frontend development projects and skills', icon: <FiCode className="text-2xl" />, size: 1.2, color: '#60a5fa', position: [8, 0, 0] as [number, number, number], orbitRadius: 10, orbitSpeed: 0.1, rotationSpeed: 0.5, ring: true, ringColor: '#3b82f6', ringSize: 1.8, },
  { id: 'ai', name: 'AI & ML', description: 'Discover my work in Artificial Intelligence and Machine Learning', icon: <FiCpu className="text-2xl" />, size: 1.4, color: '#f472b6', position: [-6, 0, 6] as [number, number, number], orbitRadius: 8, orbitSpeed: 0.15, rotationSpeed: 0.4, ring: true, ringColor: '#ec4899', ringSize: 2.0, },
  { id: 'projects', name: 'Projects', description: 'Check out my portfolio of completed projects', icon: <FiGlobe className="text-2xl" />, size: 1.3, color: '#34d399', position: [0, 0, 8] as [number, number, number], orbitRadius: 9, orbitSpeed: 0.12, rotationSpeed: 0.3, ring: true, ringColor: '#10b981', ringSize: 2.2, },
  { id: 'about', name: 'About Me', description: 'Learn more about my background and skills', icon: <FiInfo className="text-2xl" />, size: 1.1, color: '#fbbf24', position: [0, 0, -8] as [number, number, number], orbitRadius: 7, orbitSpeed: 0.18, rotationSpeed: 0.6, ring: true, ringColor: '#f59e0b', ringSize: 1.6, },
];

// Camera controller component with proper type handling and ref forwarding
const CameraController = forwardRef<OrbitControlsImpl, { target?: THREE.Vector3, isPlanetView?: boolean }>(
  function CameraControllerInner() {
    return null; // Return null as a fallback
  }
);
CameraController.displayName = 'CameraController';

// Scene component props
interface SceneProps {
  selectedPlanet: string | null;
  onPlanetSelect: (planetId: string | null) => void;
  isPlanetView: boolean;
  onAstronautClick: () => void;
}

// Scene component with all required props
const Scene = ({ selectedPlanet, isPlanetView, onAstronautClick, onPlanetSelect }: SceneProps) => {
  useThree(); // Keep the hook call but don't destructure unused camera
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const handlePlanetClick = (planetId: string, _position: [number, number, number]) => {
    onPlanetSelect(planetId);
  };

  // --- Array Filtering Method ---
  const sceneElements = [
    // Glowing center orb
    !isPlanetView ? (
      <mesh position={[0, 0, 0]} key="center-orb">
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#4f46e5"
          emissiveIntensity={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>
    ) : null,

    // Planets, their orbits, and labels
    ...PLANETS.flatMap((planet) => {
      const isSelected = selectedPlanet === planet.id;
      return [
        <Planet
          key={planet.id}
          position={planet.position}
          size={planet.size}
          color={planet.color}
          name={planet.name}
          speed={planet.rotationSpeed}
          orbitRadius={planet.orbitRadius}
          orbitSpeed={planet.orbitSpeed}
          isSelected={isSelected}
          onClick={() => handlePlanetClick(planet.id, planet.position)}
          ring={planet.ring}
          ringColor={planet.ringColor}
          ringSize={planet.ringSize}
        />,
        !isPlanetView ? (
          <mesh key={`orbit-${planet.id}`} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.orbitRadius * 0.95, planet.orbitRadius * 1.05, 128]} />
            <meshBasicMaterial color={planet.color} transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
        ) : null,
        !isPlanetView ? (
          <Text
            key={`label-${planet.id}`}
            position={[planet.position[0] * 1.2, planet.position[1] + planet.size * 1.5, planet.position[2] * 1.2]}
            fontSize={0.5} color="white" anchorX="center" anchorY="middle"
            outlineWidth={0.01} outlineColor="#000000" outlineOpacity={0.8}
          >
            {planet.name}
          </Text>
        ) : null,
      ];
    }),
  ].filter(Boolean);


  return (
    <>
      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.8} luminanceSmoothing={0.9} height={300} />
        
        {/* Lights and Static elements */}
        <ambientLight intensity={0.2} color="#40407a" />
        <directionalLight position={[10, 20, 15]} intensity={1.5} color="#ffffff" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <pointLight position={[0, 5, 5]} intensity={2} color="#4f46e5" distance={30} decay={1.5} />
        <pointLight position={[0, -5, -5]} intensity={1} color="#f472b6" distance={30} decay={1.5} />
        <StarSystem speed={0.5} />
        <mesh position={[0, 0, 0]} visible={!isPlanetView}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#4f46e5" transparent opacity={0.3} />
        </mesh>
        
        {/* Render the filtered array of dynamic elements */}
        <group>
          {sceneElements}
        </group>

        <CameraController ref={controlsRef} target={new THREE.Vector3(0, 0, 0)} isPlanetView={isPlanetView} />
        <AstronautModel onClick={onAstronautClick} />
        <fog attach="fog" args={['#0f172a', 25, 40]} />
      </EffectComposer>
    </>
  );
};


// Main GalaxyHub component (assuming it's defined below as before)
const GalaxyHub = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [isPlanetView, setIsPlanetView] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setLoading(false);
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
    }, 2000);
    return () => clearTimeout(timer);
  }, [controls]);

  const handlePlanetSelect = (planetId: string | null) => {
    setSelectedPlanet(planetId);
    const isViewingPlanet = !!planetId;
    setIsPlanetView(isViewingPlanet);
    setShowNav(!isViewingPlanet);
  };

  const selectedPlanetData = PLANETS.find(p => p.id === selectedPlanet);

  if (!mounted) {
    return <LoadingScreen />;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Suspense fallback={<LoadingScreen />}>
        <Canvas 
          camera={{ position: [0, 10, 25], fov: 50, near: 0.1, far: 1000 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          className="z-0"
        >
          <Scene 
            selectedPlanet={selectedPlanet}
            onPlanetSelect={handlePlanetSelect}
            isPlanetView={isPlanetView}
            onAstronautClick={() => setIsChatOpen(true)}
          />
        </Canvas>
      </Suspense>

      <AstronautChatUI isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <BadgeSystem isOpen={isBadgeModalOpen} onClose={() => setIsBadgeModalOpen(false)} />

      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6"
        initial={{ y: -100 }}
        animate={{ y: showNav ? 0 : -100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white text-2xl font-bold bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            Universe of Me
          </motion.button>
          <div className="flex space-x-4">
            <motion.a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2, scale: 1.1 }} className="text-white p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <FiGithub className="w-6 h-6" />
            </motion.a>
            <motion.a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2, scale: 1.1 }} className="text-white p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <FiLinkedin className="w-6 h-6" />
            </motion.a>
            <motion.a href="mailto:your.email@example.com" whileHover={{ y: -2, scale: 1.1 }} className="text-white p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <FiMail className="w-6 h-6" />
            </motion.a>
            <motion.button onClick={() => setIsBadgeModalOpen(true)} whileHover={{ y: -2, scale: 1.1 }} className="text-white p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <FiAward className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isPlanetView && selectedPlanetData && (
          <motion.div 
            className="fixed bottom-0 left-0 right-0 z-40 p-6 md:p-8"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-black/70 to-gray-900/80 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${selectedPlanetData.color}44, ${selectedPlanetData.color}22)`, border: `2px solid ${selectedPlanetData.color}88`, boxShadow: `0 0 20px ${selectedPlanetData.color}44` }}
                  >
                    {selectedPlanetData.icon}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {selectedPlanetData.name}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {selectedPlanetData.description}
                  </p>
                  <motion.button
                    onClick={() => handlePlanetSelect(null)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 flex items-center mx-auto md:mx-0"
                  >
                    <FiArrowLeft className="mr-2" /> Back to Galaxy
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading && (
          <motion.div 
            className="absolute inset-0 bg-gray-900 flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-xl font-medium text-white">Initializing the Universe...</p>
              <p className="text-gray-400 mt-2">Loading cosmic wonders</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-gray-300 text-sm bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
        <p>Click on a planet to explore</p>
        <p className="text-xs mt-1">Drag to rotate • Scroll to zoom • Click a planet to select</p>
      </div>
    </div>
  );
};

export default GalaxyHub;
