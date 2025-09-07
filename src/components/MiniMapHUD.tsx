import { memo } from 'react';
import { FiCircle, FiMapPin } from 'react-icons/fi';
import { GALAXY_PLANETS } from '../data/galaxyPlanets';

interface MiniMapHUDProps {
  selectedPlanetId: string | null;
  onSelect: (planetId: string) => void;
}

const scalePosition = (pos: [number, number, number]): { x: number; y: number } => {
  const scale = 4; // compress galaxy coords to minimap space
  return { x: pos[0] / scale, y: pos[2] / scale };
};

const MiniMapHUD = ({ selectedPlanetId, onSelect }: MiniMapHUDProps) => {
  return (
    <div className="fixed right-4 bottom-4 z-40">
      <div className="relative w-56 h-56 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.35), transparent 60%)' }} />
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-white/10" />
          ))}
        </div>
        <div className="absolute inset-0 p-3">
          <div className="relative w-full h-full">
            {GALAXY_PLANETS.map((p) => {
              const { x, y } = scalePosition(p.position);
              const isActive = selectedPlanetId === p.id;
              return (
                <button
                  key={p.id}
                  title={p.name}
                  onClick={() => onSelect(p.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform ${isActive ? 'scale-110' : 'hover:scale-110'}`}
                  aria-label={`Navigate to ${p.name}`}
                  style={{ left: `calc(50% + ${x * 10}px)`, top: `calc(50% + ${y * 10}px)` }}
                >
                  <span
                    className="block w-3 h-3 rounded-full shadow-[0_0_12px]"
                    style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}` }}
                  />
                </button>
              );
            })}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/60">
              <FiCircle />
            </div>
          </div>
        </div>
        <div className="absolute left-3 top-3 text-xs text-white/70 flex items-center gap-1">
          <FiMapPin className="w-3 h-3" /> Map
        </div>
      </div>
    </div>
  );
};

export default memo(MiniMapHUD);


