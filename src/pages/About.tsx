import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import StarSystem from '../components/StarSystem';

const About: React.FC = () => {
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
      <div className="relative z-10 max-w-4xl mx-auto py-12">
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
            About Me
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-300 font-rajdhani">
            Get to know who I am and what I do
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants} className="card">
            <h2 className="text-2xl font-semibold font-orbitron mb-4 text-blue-400">Who Am I?</h2>
            <p className="text-gray-300 mb-4 font-rajdhani">
              I'm a passionate developer with a love for creating beautiful, functional, and user-friendly applications.
              With expertise in modern web technologies, I bring ideas to life through clean, efficient code and
              thoughtful user experiences.
            </p>
            <p className="text-gray-300 font-rajdhani">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
              or enjoying outdoor activities.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="card">
            <h2 className="text-2xl font-semibold font-orbitron mb-4 text-purple-400">My Skills</h2>
            <div className="space-y-4">
              {[
                'Frontend Development (React, TypeScript, Tailwind CSS)',
                'Backend Development (Node.js, Python, Go)',
                'UI/UX Design',
                'Database Design & Management',
                'Cloud Computing & DevOps',
                'AI & Machine Learning'
              ].map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <span className="text-gray-300 font-rajdhani">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 card">
          <h2 className="text-2xl font-semibold font-orbitron mb-6 text-center text-blue-400">Experience & Education</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium font-orbitron text-purple-400">Professional Experience</h3>
              <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-700">
                <div>
                  <h4 className="font-medium font-rajdhani">Senior Developer</h4>
                  <p className="text-gray-400 text-sm font-rajdhani">Tech Company Inc. • 2020 - Present</p>
                  <p className="text-gray-300 mt-1 font-rajdhani">
                    Leading frontend development and implementing new features using React and TypeScript.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium font-rajdhani">Full Stack Developer</h4>
                  <p className="text-gray-400 text-sm font-rajdhani">Digital Solutions • 2018 - 2020</p>
                  <p className="text-gray-300 mt-1 font-rajdhani">
                    Developed and maintained web applications using modern JavaScript frameworks.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium font-orbitron text-purple-400">Education</h3>
              <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-700">
                <div>
                  <h4 className="font-medium font-rajdhani">MSc in Computer Science</h4>
                  <p className="text-gray-400 text-sm font-rajdhani">University of Technology • 2016 - 2018</p>
                </div>
                <div>
                  <h4 className="font-medium font-rajdhani">BSc in Software Engineering</h4>
                  <p className="text-gray-400 text-sm font-rajdhani">Tech Institute • 2012 - 2016</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
