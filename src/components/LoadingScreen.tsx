import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const dotVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '100%',
    },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut',
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="relative w-24 h-24"
          variants={containerVariants}
          initial="start"
          animate="end"
        >
          {/* Orbit paths */}
          <motion.div className="absolute w-full h-full border-2 border-blue-500/30 rounded-full" style={{ rotate: 45 }} />
          <motion.div className="absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-purple-500/30 rounded-full" style={{ rotate: -45 }} />
          
          {/* Nucleus */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"
            style={{ x: '-50%', y: '-50%' }}
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: ['0 0 10px #6366f1', '0 0 20px #a855f7', '0 0 10px #6366f1'],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Orbiting electrons/planets */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full"
            style={{ originX: '50%', originY: '48px' /* (24 * 4) / 2 */ }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full"
            style={{ originX: '48px', originY: '50%' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
        
        <motion.p
          className="mt-8 text-xl font-medium text-white font-orbitron"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Loading Universe...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;
