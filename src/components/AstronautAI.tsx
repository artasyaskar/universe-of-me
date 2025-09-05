import { useState, useRef, useEffect, FormEvent } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMessageSquare, FiSend } from 'react-icons/fi';
import * as THREE from 'three';
import { getAIResponse } from '../services/ai';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import soundManager from '../services/soundManager';

// Utility to merge Tailwind classes
const cn = (...inputs: any[]) => twMerge(clsx(inputs));

// --- 3D Model Component (remains the same) ---
interface AstronautModelProps {
  onClick: () => void;
}

export function AstronautModel({ onClick }: AstronautModelProps) {
  const astronautRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  useFrame(({ clock }) => {
    if (astronautRef.current) {
      astronautRef.current.position.y = 2 + Math.sin(clock.getElapsedTime()) * 0.2;
      astronautRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group
      ref={astronautRef}
      position={[-8, 0, -8]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <motion.group scale={hovered ? 1.1 : 1} transition={{ type: 'spring', stiffness: 300 }}>
        <mesh castShadow>
          <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
          <meshStandardMaterial color="#E0E0E0" roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={3}
            toneMapped={false}
            roughness={0.2}
          />
        </mesh>
      </motion.group>
    </group>
  );
}

// --- Chat UI Component (Updated with new design) ---
interface Message {
  text: string;
  sender: 'user' | 'ai';
}

interface AstronautChatUIProps {
  isOpen: boolean;
  onClose: () => void;
}

const TypingIndicator = () => (
  <motion.div
    className="flex items-center space-x-1 p-3 rounded-lg bg-gray-700/50"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.span
      className="w-2 h-2 bg-white rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
    />
    <motion.span
      className="w-2 h-2 bg-white rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
    />
    <motion.span
      className="w-2 h-2 bg-white rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
    />
  </motion.div>
);

export function AstronautChatUI({ isOpen, onClose }: AstronautChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Greetings, traveler! I am the AI guide of this universe. Ask me anything about the portfolio!",
      sender: 'ai',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    soundManager.play('send');
    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponseText = await getAIResponse(inputValue);
      const aiMessage: Message = { text: aiResponseText, sender: 'ai' };
      setTimeout(() => {
        soundManager.play('receive');
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      const errorMessage: Message = {
        text: "Sorry, I'm having trouble connecting to the stars right now. Please try again later.",
        sender: 'ai',
      };
      setTimeout(() => {
        soundManager.play('receive');
        setMessages((prev) => [...prev, errorMessage]);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-8 right-8 z-50 w-full max-w-sm font-rajdhani"
        >
          <div className="bg-black/70 backdrop-blur-2xl border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/20 flex flex-col h-[32rem]">
            {/* Header */}
            <motion.div
              className="flex justify-between items-center p-4 border-b border-white/10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <FiMessageSquare className="text-white" />
                </div>
                <h3 className="font-bold text-white tracking-wide text-lg">Astronaut Guide</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  soundManager.play('click');
                  onClose();
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX size={20} />
              </motion.button>
            </motion.div>

            {/* Message Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={cn('flex items-end gap-2', msg.sender === 'user' ? 'justify-end' : 'justify-start')}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {msg.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0"></div>
                    )}
                    <div
                      className={cn(
                        'p-3 rounded-2xl max-w-xs text-white text-base leading-snug shadow-md',
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-purple-600 to-indigo-700 rounded-br-none'
                          : 'bg-gradient-to-br from-gray-700 to-gray-800 rounded-bl-none'
                      )}
                    >
                      <p>{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <motion.div
              className="p-3 border-t border-white/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <form
                onSubmit={handleSendMessage}
                className="flex items-center bg-gray-900/50 rounded-full border border-gray-700 focus-within:border-blue-500 transition-all duration-300"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-grow bg-transparent text-white placeholder-gray-400 px-4 py-3 focus:outline-none"
                  disabled={isLoading}
                />
                <motion.button
                  type="submit"
                  className="p-3 text-white disabled:text-gray-500"
                  disabled={isLoading || !inputValue.trim()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiSend className={cn('w-5 h-5', inputValue.trim() ? 'text-blue-400' : 'text-gray-500')} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
