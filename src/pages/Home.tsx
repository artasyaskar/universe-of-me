import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowRight } from 'react-icons/fi';

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    'Full-Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Tech Explorer'
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 300 + 50 + 'px',
              height: Math.random() * 300 + 50 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              filter: 'blur(40px)',
              opacity: 0.1 + Math.random() * 0.1,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `pulse ${Math.random() * 10 + 10}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="py-6 px-4 sm:px-8 lg:px-16 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Portfolio
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex space-x-6"
          >
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <Link to="/galaxy" className="text-purple-400 hover:text-pink-400 transition-colors">
              Interactive Galaxy
            </Link>
          </motion.div>
        </nav>

        {/* Hero Section */}
        <motion.main 
          className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-purple-900/50 text-purple-300">
              Welcome to my digital universe
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Hi, I'm <span className="text-white">[Your Name]</span>
            </span>
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="h-12 mb-8 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentRole}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xl sm:text-2xl text-gray-300"
              >
                {roles[currentRole]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mb-12"
          >
            I craft exceptional digital experiences with modern web technologies, 
            blending beautiful design with clean, efficient code.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Link
              to="/galaxy"
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                Explore My Universe
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
            
            <a
              href="#contact"
              className="px-8 py-4 rounded-full border-2 border-purple-500 text-purple-300 font-medium hover:bg-purple-900/30 transition-colors duration-300 hover:border-purple-400 hover:text-white"
            >
              Contact Me
            </a>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex justify-center space-x-6"
          >
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
              <FiGithub className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FiLinkedin className="h-6 w-6" />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FiTwitter className="h-6 w-6" />
            </a>
            <a href="mailto:youremail@example.com" className="text-gray-400 hover:text-pink-400 transition-colors">
              <FiMail className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.main>
        
        {/* Animated Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
          <div className="w-8 h-14 border-2 border-purple-500/50 rounded-full mx-auto flex justify-center p-1">
            <motion.div 
              className="w-1 h-3 bg-purple-400 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Add more sections here */}
      <section id="about" className="min-h-screen pt-20 px-4 sm:px-8 lg:px-16">
        {/* About section content */}
      </section>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0% { transform: scale(1) rotate(0deg); }
            100% { transform: scale(1.2) rotate(5deg); }
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #8b5cf6, #ec4899);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #7c3aed, #db2777);
          }
        `
      }} />
    </div>
  );
};

export default Home;
