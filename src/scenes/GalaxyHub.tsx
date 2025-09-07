import { Suspense, useRef, useState, useEffect, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiLinkedin, FiMail, FiAward } from 'react-icons/fi';
import { useTheme } from '../context/ThemeProvider';
import LoadingScreen from '../components/LoadingScreen';
import StarSystem from '../components/StarSystem';
import Planet from '../components/Planet';
import { AstronautModel, AstronautChatUI } from '../components/AstronautAI';
import BadgeSystem from '../components/BadgeSystem';
import { useNavigate } from 'react-router-dom';
import { GALAXY_PLANETS } from '../data/galaxyPlanets';
import CtaButton from '../components/CtaButton';
import MiniMapHUD from '../components/MiniMapHUD';
import CameraController from '../components/CameraController';
import Sun from '../components/visuals/Sun';
const ContentModal = lazy(() => import('../components/ContentModal'));
const NebulaBackdrop = lazy(() => import('../components/visuals/NebulaBackdrop'));
const Comets = lazy(() => import('../components/visuals/Comets'));
const AsteroidBelt = lazy(() => import('../components/visuals/AsteroidBelt'));
import KeyboardNavigator from '../components/KeyboardNavigator';

interface SceneProps {
  selectedPlanet: string | null;
  hoveredPlanet: string | null;
  onPlanetSelect: (planetId: string | null) => void;
  onPlanetHover: (planetId: string | null) => void;
  isPlanetView: boolean;
  onAstronautClick: () => void;
}

import { Line } from '@react-three/drei';

const Orbit = ({ radius, color, visible }: { radius: number; color: string; visible: boolean }) => {
  const points = [];
  for (let i = 0; i <= 128; i++) {
    const angle = (i / 128) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  return <Line points={points} color={color} lineWidth={2} visible={visible} dashed dashSize={0.5} gapSize={0.5} />;
};

const Scene = ({
  selectedPlanet,
  hoveredPlanet,
  isPlanetView,
  onPlanetSelect,
  onPlanetHover,
  onAstronautClick,
}: SceneProps) => {
  const selectedPlanetData = GALAXY_PLANETS.find((p) => p.id === selectedPlanet);

  return (
    <>
      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.9} luminanceSmoothing={0.9} height={400} />
      </EffectComposer>

      <ambientLight intensity={0.1} color="#a0a0ff" />
      {!isPlanetView && <Sun />}

      <NebulaBackdrop />
      <StarSystem speed={0.3} />
      <Comets />
      <AsteroidBelt />

      {GALAXY_PLANETS.map((planet) => (
        <group key={planet.id}>
          <Planet
            {...planet}
            isSelected={selectedPlanet === planet.id}
            isHovered={hoveredPlanet === planet.id}
            onClick={() => onPlanetSelect(planet.id)}
            onPointerOver={() => onPlanetHover(planet.id)}
            onPointerOut={() => onPlanetHover(null)}
          />
          <Orbit
            radius={planet.orbitRadius}
            color={planet.color}
            visible={!isPlanetView && (selectedPlanet === planet.id || hoveredPlanet === planet.id)}
          />
        </group>
      ))}

      <CameraController
        target={selectedPlanetData ? new THREE.Vector3(...selectedPlanetData.position) : new THREE.Vector3(0, 0, 0)}
        isPlanetView={isPlanetView}
      />
      <AstronautModel onClick={onAstronautClick} />
      <fog attach="fog" args={['#0a0a14', 30, 50]} />
    </>
  );
};


// Main GalaxyHub component
const GalaxyHub = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [isPlanetView, setIsPlanetView] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate();
  const { mode, setMode } = useTheme();

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
    if (isViewingPlanet) {
      try {
        import('../services/ai').then((m) => m.logPlanetVisit(planetId!));
      } catch {}
      setIsContentOpen(true);
      if (planetId === 'ai') setIsChatOpen(true);
    }
  };

  const handlePlanetHover = (planetId: string | null) => {
    setHoveredPlanet(planetId);
  };

  const selectedPlanetData = GALAXY_PLANETS.find((p) => p.id === selectedPlanet);
  const [isContentOpen, setIsContentOpen] = useState(false);

  if (!mounted) {
    return <LoadingScreen />;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          camera={{ position: [0, 10, 25], fov: 50, near: 0.1, far: 1000 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          className="z-0"
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Scene
            selectedPlanet={selectedPlanet}
            hoveredPlanet={hoveredPlanet}
            onPlanetSelect={handlePlanetSelect}
            onPlanetHover={handlePlanetHover}
            isPlanetView={isPlanetView}
            onAstronautClick={() => setIsChatOpen(true)}
          />
        </Canvas>
      </Suspense>

      <AstronautChatUI
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        selectedPlanetId={selectedPlanet}
      />
      <BadgeSystem isOpen={isBadgeModalOpen} onClose={() => setIsBadgeModalOpen(false)} />
      {/* MiniMap HUD for quick navigation */}
      <MiniMapHUD
        selectedPlanetId={selectedPlanet}
        onSelect={(id) => {
          handlePlanetSelect(id);
          setIsContentOpen(true);
        }}
      />
      <KeyboardNavigator selectedPlanetId={selectedPlanet} onSelect={handlePlanetSelect} />

      {/* Content Modal for selected planet */}
      <ContentModal
        isOpen={isContentOpen && isPlanetView}
        onClose={() => setIsContentOpen(false)}
        planet={selectedPlanetData || null}
      />

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
            <select
              aria-label="Theme mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              className="ml-2 bg-black/20 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-sm"
            >
              <option value="galaxy">Galaxy</option>
              <option value="neon">Neon Grid</option>
              <option value="minimal">Minimal</option>
            </select>
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
                    {(() => { const Icon = selectedPlanetData.icon; return <Icon />; })()}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {selectedPlanetData.name}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {selectedPlanetData.description}
                  </p>
                  <CtaButton
                    onClick={() => handlePlanetSelect(null)}
                    variant="secondary"
                    className="mx-auto md:mx-0"
                  >
                    <FiArrowLeft className="mr-2" /> Back to Galaxy
                  </CtaButton>
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
