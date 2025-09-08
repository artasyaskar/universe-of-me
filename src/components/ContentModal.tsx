import { Fragment } from 'react';
import { Dialog, Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { PlanetData } from '../data/galaxyPlanets';
import Timeline from './content/Timeline';
import CodeSnippet from './content/CodeSnippet';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planet: PlanetData | null;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ContentModal = ({ isOpen, onClose, planet }: ContentModalProps) => {
  if (!planet) return null;

  const contentKeys = Object.keys(planet.content || {});

  const renderContent = (key: string) => {
    if (planet.type === 'timeline' && key === 'timeline') {
      return <Timeline items={planet.content?.timeline} />;
    }
    // Add more content type renderings here
    if (key === 'code') {
      return <CodeSnippet language={planet.content?.code.language} code={planet.content?.code.snippet} />;
    }
    return <p className="text-gray-400">{planet.content?.[key]}</p>;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
              exit={{ scale: 0.9, y: 20, transition: { duration: 0.3, ease: 'easeIn' } }}
              className="relative z-10 w-full max-w-3xl p-8 bg-cosmic-dark/80 backdrop-blur-xl border border-neon-purple/20 rounded-2xl shadow-2xl shadow-neon-purple/10"
            >
              <Dialog.Title className="text-3xl font-bold font-orbitron text-white mb-2 flex items-center">
                {(() => {
                  const IconComponent = planet.icon;
                  return <IconComponent className="w-8 h-8 mr-4" style={{ color: planet.color }} />;
                })()}
                {planet.name}
              </Dialog.Title>
              <Dialog.Description className="text-gray-400 mb-6">{planet.description}</Dialog.Description>

              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close"
              >
                <FiX className="w-6 h-6" />
              </button>

              {contentKeys.length > 0 && (
                <Tab.Group>
                  <Tab.List className="flex p-1 space-x-1 bg-white/5 rounded-xl mb-6">
                    {contentKeys.map((key) => (
                      <Tab as={Fragment} key={key}>
                        {({ selected }) => (
                          <button
                            className={classNames(
                              'w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg transition-colors',
                              'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-700 focus-visible:ring-white',
                              selected
                                ? 'bg-white/20 shadow'
                                : 'text-gray-300 hover:bg-white/[0.12] hover:text-white'
                            )}
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </button>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels>
                    {contentKeys.map((key) => (
                      <Tab.Panel key={key} className="focus:outline-none">
                        {renderContent(key)}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              )}
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ContentModal;
