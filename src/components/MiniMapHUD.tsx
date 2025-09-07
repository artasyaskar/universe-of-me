import { memo } from 'react';
import { motion } from 'framer-motion';
import { GALAXY_PLANETS } from '../data/galaxyPlanets';
import { FiMap } from 'react-icons/fi';

interface MiniMapHUDProps {
  selectedPlanetId: string | null;
  onSelect: (planetId: string) => void;
}

const scalePosition = (pos: [number, number, number]): { x: number; y: number } => {
  const scaleFactor = 12; // Adjusted for a more compact and centered layout
  return { x: pos[0] * scaleFactor, y: pos[2] * scaleFactor };
};

const MiniMapHUD = ({ selectedPlanetId, onSelect }: MiniMapHUDProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="w-64 h-64 bg-black/30 backdrop-blur-lg rounded-full border-2 border-cyan-400/20 shadow-2xl shadow-cyan-500/10"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Central Sun representation */}
          <div className="w-4 h-4 bg-yellow-300 rounded-full shadow-[0_0_15px_5px_rgba(253,224,71,0.5)]" />

          {/* Grid lines */}
          <div className="absolute w-full h-px bg-cyan-400/10" />
          <div className="absolute h-full w-px bg-cyan-400/10" />

          {/* Planets */}
          {GALAXY_PLANETS.map((planet) => {
            const { x, y } = scalePosition(planet.position);
            const isActive = selectedPlanetId === planet.id;
            const Icon = planet.icon;

            return (
              <motion.button
                key={planet.id}
                onClick={() => onSelect(planet.id)}
                className="absolute group"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
                whileHover={{ scale: 1.2 }}
                animate={{ scale: isActive ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-black group-focus-visible:ring-white"
                  style={{
                    backgroundColor: `${planet.color}40`,
                    boxShadow: isActive ? `0 0 12px ${planet.color}` : 'none',
                  }}
                >
                  <Icon className="w-3 h-3" style={{ color: planet.color }} />
                </div>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block px-2 py-1 bg-black/70 text-white text-xs rounded-md whitespace-nowrap">
                  {planet.name}
                </div>
              </motion.button>
            );
          })}
        </div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-cyan-300/70 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
          <FiMap />
          Galaxy Map
        </div>
      </motion.div>
    </div>
  );
};

export default memo(MiniMapHUD);


