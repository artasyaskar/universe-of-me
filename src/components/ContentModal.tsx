import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiX, FiUser, FiCode, FiBriefcase, FiMail } from 'react-icons/fi';

interface TabDef { key: string; label: string; icon: React.ComponentType<any>; }

const TABS: TabDef[] = [
  { key: 'about', label: 'About', icon: FiUser },
  { key: 'skills', label: 'Skills', icon: FiCode },
  { key: 'projects', label: 'Projects', icon: FiBriefcase },
  { key: 'contact', label: 'Contact', icon: FiMail },
];

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  accent: string;
  content: Partial<Record<'about' | 'skills' | 'projects' | 'contact', React.ReactNode>>;
}

const ContentModal = ({ isOpen, onClose, title, accent, content }: ContentModalProps) => {
  const [active, setActive] = useState<string>('about');
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-end md:items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0 translate-y-6 md:translate-y-0 md:scale-95" enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0 translate-y-6 md:translate-y-0 md:scale-95"
          >
            <Dialog.Panel className="w-full max-w-4xl rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Dialog.Title className="text-xl md:text-2xl font-bold" style={{ color: accent }}>{title}</Dialog.Title>
                <button aria-label="Close" onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 p-4 border-b md:border-b-0 md:border-r border-white/10">
                  <nav className="flex md:flex-col gap-2">
                    {TABS.map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => setActive(key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${active === key ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'}`}
                        aria-current={active === key ? 'page' : undefined}
                      >
                        <Icon className="w-4 h-4" /> {label}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="flex-1 p-6 prose prose-invert max-w-none">
                  {content[active as keyof typeof content] ?? <p className="text-white/70">Coming soon.</p>}
                  {active === 'projects' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="card">
                        <h4 className="text-lg font-semibold mb-2">Project Showcase</h4>
                        <video className="w-full rounded-lg" autoPlay muted loop playsInline>
                          <source src="/demo.mp4" type="video/mp4" />
                        </video>
                      </div>
                      <div className="card">
                        <h4 className="text-lg font-semibold mb-2">3D Model</h4>
                        <img src="/model-preview.png" alt="3D model preview" className="w-full rounded-lg" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ContentModal;


