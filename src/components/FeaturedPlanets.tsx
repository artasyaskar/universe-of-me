import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { featuredPlanets, PlanetData } from '../data/planets';
import { FiArrowRight } from 'react-icons/fi';

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const FeaturedPlanets: React.FC = () => {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-12 font-orbitron text-white"
      >
        Discover My Universe
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredPlanets.map((planet: PlanetData, i: number) => (
          <motion.div
            key={planet.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="group"
          >
            <Link to={planet.link} className="block">
              <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-blue-500/30 h-full flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
                <div>
                  <h3 className="text-2xl font-bold font-rajdhani text-white mb-3">{planet.name}</h3>
                  <p className="text-gray-400 mb-4">{planet.description}</p>
                </div>
                <div className="flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                  <span>Explore</span>
                  <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPlanets;
