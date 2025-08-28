import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            About Me
          </h1>
          <p className="text-xl text-gray-300">Get to know who I am and what I do</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Who Am I?</h2>
            <p className="text-gray-300 mb-4">
              I'm a passionate developer with a love for creating beautiful, functional, and user-friendly applications.
              With expertise in modern web technologies, I bring ideas to life through clean, efficient code and
              thoughtful user experiences.
            </p>
            <p className="text-gray-300">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
              or enjoying outdoor activities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">My Skills</h2>
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
                  <span className="text-gray-300">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-400">Experience & Education</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-purple-400">Professional Experience</h3>
              <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-700">
                <div>
                  <h4 className="font-medium">Senior Developer</h4>
                  <p className="text-gray-400 text-sm">Tech Company Inc. • 2020 - Present</p>
                  <p className="text-gray-300 mt-1">
                    Leading frontend development and implementing new features using React and TypeScript.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Full Stack Developer</h4>
                  <p className="text-gray-400 text-sm">Digital Solutions • 2018 - 2020</p>
                  <p className="text-gray-300 mt-1">
                    Developed and maintained web applications using modern JavaScript frameworks.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium text-purple-400">Education</h3>
              <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-700">
                <div>
                  <h4 className="font-medium">MSc in Computer Science</h4>
                  <p className="text-gray-400 text-sm">University of Technology • 2016 - 2018</p>
                </div>
                <div>
                  <h4 className="font-medium">BSc in Software Engineering</h4>
                  <p className="text-gray-400 text-sm">Tech Institute • 2012 - 2016</p>
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
