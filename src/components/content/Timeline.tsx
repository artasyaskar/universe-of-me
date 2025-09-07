import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative border-l-2 border-purple-400/30 ml-4 pl-8 py-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="mb-12 relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="absolute -left-[38px] top-1 w-4 h-4 bg-purple-400 rounded-full border-2 border-cosmic-dark" />
          <p className="text-sm font-semibold text-purple-300 mb-1">{item.year}</p>
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-gray-400">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
