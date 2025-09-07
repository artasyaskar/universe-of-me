import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Starfield from '../components/visuals/Starfield';
import CtaButton from '../components/CtaButton';

const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-cosmic-dark text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 1] }}>
            <Starfield />
          </Canvas>
        </Suspense>
      </div>

      <motion.main
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-bold font-orbitron mb-4 text-shadow-glow-white"
        >
          Universe of Me
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-cosmic-light max-w-2xl mb-12"
        >
          An interactive cosmic portfolio.
        </motion.p>

        <motion.div variants={itemVariants}>
          <CtaButton
            onClick={() => navigate('/galaxy')}
            variant="primary"
            className="animate-pulse-glow"
          >
            Enter the Universe
          </CtaButton>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Home;
