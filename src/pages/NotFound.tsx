import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            404
          </h1>
          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-300 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-gray-400 mb-6">
            Let's get you back on track. Here are some helpful links:
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Go to Home
            </Link>
            <Link
              to="/galaxy"
              className="px-6 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-lg font-medium hover:bg-gray-600/50 transition-colors"
            >
              Explore Galaxy
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-500">
              If you think this is a mistake, please let me know at{' '}
              <a 
                href="mailto:your.email@example.com" 
                className="text-blue-400 hover:underline"
              >
                your.email@example.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
