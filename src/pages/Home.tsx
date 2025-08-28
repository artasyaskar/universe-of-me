import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import StarField from '../components/StarField';
import SidebarNav from '../components/SidebarNav';
import HomeFooter from '../components/HomeFooter';
import { FiArrowRight } from 'react-icons/fi';

const Home: React.FC = () => {
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
          <StarField />
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
              src="https://i.pravatar.cc/160?u=a042581f4e29026704d"
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
          Hi, I’m [Your Name]
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-300 font-rajdhani max-w-2xl mb-10"
        >
          Problem Solver | Crafting Exceptional Digital Experiences
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/galaxy"
            className="group relative inline-block px-8 py-4 text-lg font-bold text-white uppercase tracking-wider overflow-hidden rounded-md bg-purple-600/80 backdrop-blur-sm border-2 border-purple-500"
          >
            <span className="relative z-10 flex items-center">
              Explore My Universe
              <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 scale-150 blur-xl"></div>
          </Link>

          <Link
            to="/contact"
            className="group relative inline-block px-8 py-4 text-lg font-bold text-white uppercase tracking-wider overflow-hidden rounded-md bg-transparent border-2 border-blue-500"
          >
            <span className="relative z-10">Contact Me</span>
            <div className="absolute inset-0 bg-blue-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 scale-150 blur-md"></div>
          </Link>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
};

export default Home;
