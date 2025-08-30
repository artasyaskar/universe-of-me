import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiCheckCircle, FiLock } from 'react-icons/fi';
import { getAllBadges, getUnlockedBadges } from '../services/supabase';

// Type for a single badge
type Badge = {
  id: string;
  name: string;
  description: string;
};

// --- Single Badge Item Component ---
const BadgeItem = ({ badge, isUnlocked }: { badge: Badge; isUnlocked: boolean }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-lg border ${
        isUnlocked
          ? 'bg-green-500/10 border-green-500/30'
          : 'bg-gray-700/20 border-gray-700/30'
      }`}
    >
      <div className="flex items-center">
        <div
          className={`mr-4 text-3xl ${
            isUnlocked ? 'text-green-400' : 'text-gray-500'
          }`}
        >
          {isUnlocked ? <FiCheckCircle /> : <FiLock />}
        </div>
        <div>
          <h4
            className={`font-bold ${
              isUnlocked ? 'text-white' : 'text-gray-400'
            }`}
          >
            {badge.name}
          </h4>
          <p
            className={`text-sm ${
              isUnlocked ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            {badge.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};


// --- Main Badge System Component ---
interface BadgeSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

const BadgeSystem = ({ isOpen, onClose }: BadgeSystemProps) => {
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchBadges = async () => {
        setLoading(true);
        const allBadgesRes = await getAllBadges();
        const unlockedBadgesRes = await getUnlockedBadges();
        
        if (allBadgesRes.data) setAllBadges(allBadgesRes.data);
        if (unlockedBadgesRes.data) setUnlockedIds(unlockedBadgesRes.data);
        
        setLoading(false);
      };
      fetchBadges();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <FiAward className="text-2xl text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Achievements</h3>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                &times;
              </button>
            </div>

            {/* Content */}
            <div className="p-6 h-96 overflow-y-auto">
              {loading ? (
                <div className="text-center text-gray-400">Loading achievements...</div>
              ) : (
                <div className="space-y-4">
                  {allBadges.map((badge) => (
                    <BadgeItem
                      key={badge.id}
                      badge={badge}
                      isUnlocked={unlockedIds.includes(badge.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BadgeSystem;
