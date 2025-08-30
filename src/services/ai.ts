// --- Mock AI Service ---
// This service simulates an AI chatbot for local development.
// It uses a simple keyword-based response system and has a basic memory.

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
export const getAIResponse = async (message: string, context: AIContext = aiMemory): Promise<string> => {
  const lowerCaseMessage = message.toLowerCase();
  
  // Check for keywords in the user's message
  for (const keyword in responses) {
    if (lowerCaseMessage.includes(keyword)) {
      // If the user mentions a planet, add it to memory
      if (['frontend', 'ai', 'projects', 'about'].includes(keyword)) {
        context.visitedPlanets.add(keyword);
      }
      return responses[keyword];
    }
  }

  // Return a default response if no keywords are found
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
