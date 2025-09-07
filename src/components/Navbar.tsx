import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Galaxy', to: '/galaxy' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];
  return (
    <nav className="fixed w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl glass border-gradient">
          <div className="flex items-center justify-between h-16 px-4">
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="text-2xl font-black text-gradient-purple">
                Universe of Me
              </Link>
            </motion.div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <Link
                        to={item.to}
                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? 'text-white bg-white/10 shadow-[0_0_20px_rgba(147,51,234,0.25)]'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.label}
                        {isActive && (
                          <span className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-fuchsia-400/70 to-transparent" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
