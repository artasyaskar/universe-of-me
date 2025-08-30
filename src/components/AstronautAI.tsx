import { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMessageSquare, FiSend } from 'react-icons/fi';
import * as THREE from 'three';
import { getAIResponse } from '../services/ai';

// --- 3D Model Component (remains the same) ---
interface AstronautModelProps {
  onClick: () => void;
}

export function AstronautModel({ onClick }: AstronautModelProps) {
  const astronautRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (astronautRef.current) {
      astronautRef.current.position.y = 2 + Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <group
      ref={astronautRef}
      position={[-8, 0, -8]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <mesh castShadow>
        <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.5} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
}

// --- Chat UI Component (Updated with logic) ---

// Define the structure of a message
interface Message {
  text: string;
  sender: 'user' | 'ai';
}

interface AstronautChatUIProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AstronautChatUI({ isOpen, onClose }: AstronautChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Greetings, traveler! I am the AI guide of this universe. Ask me anything!",
      sender: 'ai',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user's message to the chat
    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Get AI response from our mock service
    const aiResponseText = await getAIResponse(inputValue);
    const aiMessage: Message = { text: aiResponseText, sender: 'ai' };

    // Simulate a short delay for the AI response
    setTimeout(() => {
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed bottom-8 right-8 z-50 w-full max-w-sm"
        >
          <div className="bg-black/60 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl flex flex-col h-[28rem]">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <FiMessageSquare className="text-white" />
                </div>
                <h3 className="font-bold text-white tracking-wide">Astronaut Guide</h3>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <FiX size={20} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-grow p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`p-3 rounded-lg max-w-xs text-sm text-white ${
                      msg.sender === 'user' ? 'bg-indigo-600/70' : 'bg-blue-600/50'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-blue-600/50 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center bg-gray-900/50 rounded-full border border-transparent focus-within:border-blue-500 transition-colors"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-grow bg-transparent text-white placeholder-gray-400 px-4 py-2 focus:outline-none"
                  disabled={isLoading}
                />
                <button type="submit" className="p-3 text-white hover:text-blue-400 transition-colors" disabled={isLoading}>
                  <FiSend className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
