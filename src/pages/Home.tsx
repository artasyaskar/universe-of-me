import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { portfolioConfig } from '../config';
import StarSystem from '../components/StarSystem';
import SidebarNav from '../components/SidebarNav';
import HomeFooter from '../components/HomeFooter';
import { AstronautModel, AstronautChatUI } from '../components/AstronautAI';
import FeaturedPlanets from '../components/FeaturedPlanets';
import { FiArrowRight } from 'react-icons/fi';

const Home: React.FC = () => {
  const [isChatOpen, setChatOpen] = useState(false);

  const handleAstronautClick = () => {
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95],
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-galaxy-900 text-white overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <StarSystem />
          <AstronautModel onClick={handleAstronautClick} />
        </Canvas>
      </div>

      {/* Navigation */}
      <SidebarNav />

      {/* Main Content */}
      <motion.main
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-br from-purple-500 to-blue-500 relative">
            <div className="absolute inset-0 rounded-full bg-purple-500/50 blur-xl"></div>
            <img
              src={portfolioConfig.profileImage}
              alt="Profile Avatar"
              className="w-full h-full rounded-full object-cover border-4 border-gray-900"
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold font-orbitron mb-4 text-shadow-glow-purple"
        >
          Hi, I’m {portfolioConfig.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-300 font-rajdhani max-w-2xl mb-10"
        >
          {portfolioConfig.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/galaxy"
            className="cta-button cta-button-primary group"
          >
            <span className="relative z-10 flex items-center">
              Explore My Universe
              <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
            </span>
          </Link>

          <Link
            to="/contact"
            className="cta-button cta-button-secondary group"
          >
            <span className="relative z-10">Contact Me</span>
          </Link>
        </motion.div>
      </motion.main>

      {/* Featured Planets Section */}
      <FeaturedPlanets />

      {/* Chat UI */}
      <AstronautChatUI isOpen={isChatOpen} onClose={handleCloseChat} />

      {/* Footer */}
      <HomeFooter />
    </div>
  );
};

export default Home;
