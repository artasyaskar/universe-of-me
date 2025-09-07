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
import CtaButton from '../components/CtaButton';

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
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-galaxy-900 text-white overflow-hidden">
      {/* Ambient orbs */}
      <div className="orb orb-purple -top-32 -left-32" />
      <div className="orb orb-blue -top-24 -right-24" />
      <div className="orb orb-teal bottom-0 left-1/3" />

      {/* 3D Background with cinematic starfield */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 2], fov: 55 }} dpr={Math.min(window.devicePixelRatio, 2)}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[6, 6, 6]} intensity={1.2} />
          <StarSystem speed={0.6} />
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
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-400 blur opacity-60 animate-pulse-slow" />
            <div className="relative w-40 h-40 rounded-full p-1 bg-gradient-to-br from-purple-500 to-blue-500">
              <img
                src={portfolioConfig.profileImage}
                alt="Profile Avatar"
                className="w-full h-full rounded-full object-cover border-4 border-gray-900"
              />
            </div>
          </div>
        </motion.div>

        {/* Cinematic Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-black font-orbitron mb-4 text-gradient-purple"
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

        {/* Glowing CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="/galaxy">
            <CtaButton variant="primary" className="btn-gradient shadow-[0_0_40px_rgba(124,58,237,0.35)]">Explore My Universe</CtaButton>
          </Link>
          <Link to="/contact">
            <CtaButton variant="secondary" className="btn-outline">Contact Me</CtaButton>
          </Link>
        </motion.div>
      </motion.main>

      {/* About Me and Skills Section */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* About Me */}
          <div>
            <h2 className="text-3xl font-bold font-orbitron mb-4 text-gradient-blue">
              About Me
            </h2>
            <p className="text-lg text-gray-300 font-rajdhani">
              {portfolioConfig.aboutMe}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-3xl font-bold font-orbitron mb-4 text-gradient-purple">
              Skills
            </h2>
            <div className="flex flex-wrap gap-4">
              {portfolioConfig.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="glass border-gradient px-4 py-2 text-gray-200 font-rajdhani"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

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
