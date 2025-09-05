import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import StarSystem from '../components/StarSystem';
import CtaButton from '../components/CtaButton';
import { FiMail, FiGithub } from 'react-icons/fi';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white p-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <StarSystem />
        </Canvas>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-bold font-orbitron mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Contact Me
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-300 font-rajdhani">
            Get in touch for any questions or opportunities
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 font-rajdhani">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 font-rajdhani">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1 font-rajdhani">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <CtaButton type="submit" variant="primary" className="w-full">
              Send Message
            </CtaButton>
          </form>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <h2 className="text-2xl font-semibold font-orbitron mb-6 text-blue-400">Or reach out directly</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:your.email@example.com"
              className="flex items-center text-gray-300 hover:text-white transition-colors font-rajdhani"
            >
              <FiMail className="w-6 h-6 mr-2" />
              your.email@example.com
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-white transition-colors font-rajdhani"
            >
              <FiGithub className="w-6 h-6 mr-2" />
              github.com/yourusername
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
