import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiInfo, FiMail, FiGlobe } from 'react-icons/fi';

const SidebarNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: '0%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'About', path: '/about', icon: <FiInfo /> },
    { name: 'Contact', path: '/contact', icon: <FiMail /> },
    { name: 'Galaxy', path: '/galaxy', icon: <FiGlobe /> },
  ];

  return (
    <>
      {/* Hamburger Menu Button */}
      <motion.button
        onClick={toggleSidebar}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiMenu className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Sidebar Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Sidebar */}
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-72 bg-gray-900/80 backdrop-blur-lg shadow-2xl z-50"
            >
              {/* Close Button */}
              <motion.button
                onClick={toggleSidebar}
                className="absolute top-6 right-6 p-3 rounded-full text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="h-6 w-6" />
              </motion.button>

              {/* Navigation Links */}
              <motion.nav className="flex flex-col items-start p-8 mt-20 space-y-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="w-full"
                  >
                    <Link
                      to={item.path}
                      onClick={toggleSidebar}
                      className="flex items-center space-x-4 text-xl text-gray-300 hover:text-white hover:bg-purple-600/20 w-full p-3 rounded-lg transition-all duration-200"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarNav;
