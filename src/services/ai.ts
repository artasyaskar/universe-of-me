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
export const getAIResponse = async (message: string, context: AIContext = aiMemory): Promise<string> => {
  const endpoint = (import.meta as any).env?.VITE_AI_ENDPOINT as string | undefined;
  const apiKey = (import.meta as any).env?.VITE_AI_API_KEY as string | undefined;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify({ message, context: { visitedPlanets: Array.from(context.visitedPlanets) } }),
      });
      if (!res.ok) throw new Error('Bad response');
      const data = await res.json();
      if (typeof data?.reply === 'string') return data.reply;
    } catch (e) {
      // fall back to mock
    }
  }

  const lowerCaseMessage = message.toLowerCase();
  for (const keyword in responses) {
    if (lowerCaseMessage.includes(keyword)) {
      if (['frontend', 'ai', 'projects', 'about'].includes(keyword)) {
        context.visitedPlanets.add(keyword);
      }
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
