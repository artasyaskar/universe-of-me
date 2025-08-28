import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { motion } from 'framer-motion';

const HomeFooter: React.FC = () => {
  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/yourusername', color: '#c8b6ff' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/yourusername', color: '#7aa2f7' },
    { icon: <FiTwitter />, url: 'https://twitter.com/yourusername', color: '#bb9af7' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="absolute bottom-0 left-0 right-0 py-8 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex space-x-6 mb-4 sm:mb-0">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-2xl"
              whileHover={{
                scale: 1.2,
                filter: `drop-shadow(0 0 8px ${social.color})`,
                color: social.color,
              }}
              transition={{ type: 'spring', stiffness: 300 }}
              aria-label={social.url.split('/')[2]}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        <p className="text-sm text-gray-500 font-rajdhani">
          &copy; {currentYear} [Your Name]. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default HomeFooter;
