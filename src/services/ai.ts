// --- AI Service ---
// Tries a remote endpoint if configured, falls back to a local mock.

interface AIContext {
  visitedPlanets: Set<string>;
}

// Simple "memory" for our mock AI
const aiMemory: AIContext = {
  visitedPlanets: new Set(),
};

// A dictionary of keyword-based responses
const responses: Record<string, string> = {
  'hello': 'Hello there, cosmic traveler! How can I help you explore this universe?',
  'help': 'Of course! You can click on any planet to learn more about it, or just ask me questions about technology, AI, or the creator of this universe.',
  'planet': 'This universe has several planets representing different skills and projects. Which one are you curious about?',
  'frontend': 'Ah, the Frontend Planet! A place of great creativity and user interfaces. I hear there\'s a fun puzzle there.',
  'ai': 'The AI Planet is my home! It\'s a fascinating place where logic and learning come together.',
  'secret': 'A secret, you ask? I hear that if you visit all the planets, something special might happen... but that\'s just a rumor, of course.',
  'default': "That's a fascinating question. While my core programming is focused on this universe, I can tell you that the possibilities are as vast as the cosmos itself.",
};

/**
 * Simulates fetching a response from an AI model.
 * @param {string} message - The user's message.
 * @param {AIContext} context - The current context of the conversation.
 * @returns {Promise<string>} - A simulated AI response.
 */
export const getAIResponse = async (message: string, planetId?: string | null): Promise<string> => {
  const context = {
    visitedPlanets: Array.from(aiMemory.visitedPlanets),
    currentPlanet: planetId,
  };

  const endpoint = (import.meta as any).env?.VITE_AI_ENDPOINT as string | undefined;
  if (endpoint) {
    // If a real AI endpoint is configured, use it
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context }),
      });
      if (!res.ok) throw new Error('AI service responded with an error.');
      const data = await res.json();
      return data.reply || "I seem to be at a loss for words.";
    } catch (error) {
      console.error("AI service connection failed:", error);
      // Fallback to mock AI if the endpoint fails
    }
  }

  // Mock AI Logic
  const lowerCaseMessage = message.toLowerCase();

  if (planetId) {
    if (lowerCaseMessage.includes('tell me about') || lowerCaseMessage.includes('what is')) {
      const planetResponses: Record<string, string> = {
        frontend: "The Frontend Planet is a hub of user interface design and web technologies. It showcases projects built with React, Three.js, and other modern tools.",
        ai: "This is my home, the AI & ML Planet. It represents the brain of the portfolio, featuring experiments in machine learning and neural networks.",
        timeline: "The Timeline Planet chronicles the journey of this universe's creator, marking significant milestones in their career and education.",
        projects: "The Projects Planet is a galaxy of its own, containing a diverse collection of completed works, from web apps to 3D experiences.",
        about: "The 'About Me' planet provides insight into the creator's skills, background, and passions. It's the personal core of this universe.",
      };
      return planetResponses[planetId] || `I don't have specific information about this planet right now, but it seems interesting!`;
    }
  }
  
  for (const keyword in responses) {
    if (lowerCaseMessage.includes(keyword)) {
      return responses[keyword];
    }
  }

  return responses['default'];
};

/**
 * Updates the AI's memory that a planet has been visited.
 * @param {string} planetId - The ID of the planet that was visited.
 */
export const logPlanetVisit = (planetId: string) => {
  aiMemory.visitedPlanets.add(planetId);
  console.log(`AI Memory: Logged visit to ${planetId}. Visited planets:`, Array.from(aiMemory.visitedPlanets));
};
