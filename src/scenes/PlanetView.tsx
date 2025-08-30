import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import UIPuzzle from './MiniGames/UIPuzzle';

interface PlanetData {
  title: string;
  description: string;
  color: string;
  features: string[];
  content: React.ReactNode;
}

// Mock data for planet details
const planetData: Record<string, PlanetData> = {
  frontend: {
    title: 'Frontend Development',
    description: 'Explore my frontend development skills and projects.',
    color: '#60a5fa',
    features: [
      'React & Next.js',
      'TypeScript',
      'Tailwind CSS',
      'State Management',
      'Responsive Design'
    ],
    content: (
      <div className="space-y-4">
        <p>I specialize in building beautiful, responsive, and performant web applications using modern frontend technologies.</p>
        <p>My approach focuses on clean code, accessibility, and great user experience.</p>
      </div>
    )
  },
  ai: {
    title: 'AI & Machine Learning',
    description: 'Discover my AI projects and expertise.',
    color: '#f472b6',
    features: [
      'Machine Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Neural Networks',
      'AI Integration'
    ],
    content: (
      <div className="space-y-4">
        <p>Passionate about artificial intelligence and its applications in solving real-world problems.</p>
        <p>Experience with various ML models and frameworks to create intelligent solutions.</p>
      </div>
    )
  },
  projects: {
    title: 'My Projects',
    description: 'Check out my portfolio of completed projects.',
    color: '#34d399',
    features: [
      'Web Applications',
      'Mobile Apps',
      'Open Source',
      'Case Studies',
      'Side Projects'
    ],
    content: (
      <div className="space-y-4">
        <p>A collection of my work, from personal projects to client work.</p>
        <p>Each project comes with its own story, challenges, and solutions.</p>
      </div>
    )
  },
  about: {
    title: 'About Me',
    description: 'Get to know me better.',
    color: '#fbbf24',
    features: [
      'Background',
      'Skills',
      'Experience',
      'Education',
      'Hobbies'
    ],
    content: (
      <div className="space-y-4">
        <p>I'm a passionate developer who loves to create meaningful digital experiences.</p>
        <p>When I'm not coding, you can find me exploring new technologies or enjoying outdoor activities.</p>
      </div>
    )
  }
};

const PlanetView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const planet: PlanetData = planetData[id?.toLowerCase() || 'frontend'] || planetData['frontend'];

  useEffect(() => {
    if (!planet) {
      navigate('/galaxy');
    }
  }, [planet, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <motion.header 
        className="relative h-64 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: `${planet.color}20` }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10" />
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {planet.title}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {planet.description}
          </motion.p>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Features */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold">Key Features</h2>
            <ul className="space-y-3">
              {planet.features.map((feature: string, index: number) => (
                <motion.li 
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: planet.color }}
                  />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link 
                to="/galaxy" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white"
                style={{ backgroundColor: planet.color }}
              >
                <span>Back to Galaxy</span>
                <svg
                  className="ml-2 -mr-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            className="md:col-span-2 bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="prose prose-invert max-w-none">
              {planet.content}
              
              {/* Interactive Element */}
              <div className="mt-8">
                {id === 'frontend' && <UIPuzzle />}
                
                {id === 'ai' && (
                  <div className="p-6 rounded-xl" style={{ backgroundColor: `${planet.color}20` }}>
                    <h3 className="text-xl font-semibold mb-4">Interactive Experience</h3>
                    <p className="mb-4">Ask me anything about AI and I'll do my best to help!</p>
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Ask me about AI..."
                        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
                
                {id === 'projects' && (
                  <div className="p-6 rounded-xl" style={{ backgroundColor: `${planet.color}20` }}>
                    <h3 className="text-xl font-semibold mb-4">Interactive Experience</h3>
                    <p className="mb-4">Browse through my projects and see them in action.</p>
                  </div>
                )}

                {id === 'about' && (
                  <div className="p-6 rounded-xl" style={{ backgroundColor: `${planet.color}20` }}>
                    <h3 className="text-xl font-semibold mb-4">Interactive Experience</h3>
                    <p className="mb-4">Take a quiz to test how well you know me!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlanetView;
