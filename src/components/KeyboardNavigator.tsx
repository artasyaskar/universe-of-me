import { useEffect } from 'react';
import { GALAXY_PLANETS } from '../data/galaxyPlanets';

interface KeyboardNavigatorProps {
  selectedPlanetId: string | null;
  onSelect: (planetId: string | null) => void;
}

export default function KeyboardNavigator({ selectedPlanetId, onSelect }: KeyboardNavigatorProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const ids = GALAXY_PLANETS.map(p => p.id);
      const currentIndex = selectedPlanetId ? ids.indexOf(selectedPlanetId) : -1;
      if (e.key === 'ArrowRight') {
        const next = ids[(currentIndex + 1 + ids.length) % ids.length];
        onSelect(next);
      } else if (e.key === 'ArrowLeft') {
        const prev = ids[(currentIndex - 1 + ids.length) % ids.length];
        onSelect(prev);
      } else if (e.key === 'Escape') {
        onSelect(null);
      } else if (e.key === 'Enter' && selectedPlanetId) {
        // re-select to ensure modal opens
        onSelect(selectedPlanetId);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedPlanetId, onSelect]);

  return null;
}


