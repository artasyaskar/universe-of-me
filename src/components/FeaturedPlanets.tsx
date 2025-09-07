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
        className="text-4xl font-bold text-center mb-12 font-orbitron text-gradient-purple"
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
            className="group tilt"
          >
            <Link to={planet.link} className="block">
              <div className="relative glass border-gradient rounded-2xl overflow-hidden h-full flex flex-col justify-between transform transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-fuchsia-500 via-indigo-500 to-cyan-400" />
                <div className="relative p-6 space-y-4 tilt-inner">
                  <div className="h-40 w-full rounded-xl bg-gradient-to-br from-black/40 to-black/10 border border-white/10 flex items-center justify-center text-sm text-gray-400">
                    {planet.image ? 'Preview' : 'No Image'}
                  </div>
                  <h3 className="text-2xl font-bold font-rajdhani text-white">{planet.name}</h3>
                  <p className="text-gray-300">{planet.description}</p>
                </div>
                <div className="relative p-6 pt-0 flex items-center text-blue-300 font-semibold group-hover:text-white transition-colors">
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
