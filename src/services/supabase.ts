import { createClient } from '@supabase/supabase-js';

// --- Supabase Client Initialization ---
// The client is initialized using environment variables.
// IMPORTANT: You will need to create a `.env` file in the root of your project
// and add your Supabase URL and Anon Key to it.
//
// .env file contents:
// VITE_SUPABASE_URL=YOUR_PROJECT_URL
// VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Mock data for local development if Supabase keys are not provided
const mockStars = [
  { id: 1, position: [100, 100, -100], note: 'First star from the mock data!' },
  { id: 2, position: [-120, -80, -150], note: 'Exploring the cosmos.' },
  { id: 3, position: [80, -150, -200], note: 'What a cool portfolio!' },
  { id: 4, position: [-50, 180, -250], note: 'Hello from the other side.' },
];

// Initialize the client only if the keys are provided
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (!supabase) {
  console.warn(
    'Supabase environment variables not found. Using mock data. ' +
    'Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect to your Supabase instance.'
  );
}

// --- API Functions ---

/**
 * Fetches all stars from the 'stars' table.
 * If Supabase is not configured, it returns mock data.
 */
export const getStars = async () => {
  if (!supabase) {
    return { data: mockStars, error: null };
  }

  const { data, error } = await supabase
    .from('stars')
    .select('id, position, note')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching stars:', error);
    return { data: null, error };
  }

  return { data, error };
};

// --- Badge System ---

// Mock data for all possible badges
const mockBadges = [
  { id: 'ui-explorer', name: 'UI Explorer', description: 'Discovered the UI Puzzle.' },
  { id: 'ai-tinkerer', name: 'AI Tinkerer', description: 'Chatted with the AI Guide.' },
  { id: 'trivia-master', name: 'Trivia Master', description: 'Completed the About Me quiz.' },
  { id: 'cosmic-voyager', name: 'Cosmic Voyager', description: 'Visited every planet.' },
];

let unlockedBadges: string[] = [];

/**
 * Fetches the IDs of all unlocked badges.
 */
export const getUnlockedBadges = async (): Promise<{ data: string[]; error: null }> => {
  if (!supabase) {
    return { data: unlockedBadges, error: null };
  }
  // This would be a real DB call, e.g., from a 'user_badges' table
  const { data, error } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', 'mock_user'); // In a real app, you'd have user auth

  if (error) {
    console.error('Error fetching badges:', error);
    return { data: [], error: null }; // Return empty on error
  }
  
  return { data: data.map(b => b.badge_id), error: null };
};

/**
 * Unlocks a badge for the user.
 * @param {string} badgeId - The ID of the badge to unlock.
 */
export const unlockBadge = async (badgeId: string): Promise<{ data: any; error: null }> => {
  if (!supabase) {
    if (!unlockedBadges.includes(badgeId)) {
      unlockedBadges.push(badgeId);
      console.log(`Mock unlockBadge: Unlocked '${badgeId}'. Current badges:`, unlockedBadges);
    }
    return { data: { badge_id: badgeId }, error: null };
  }

  const { data, error } = await supabase
    .from('user_badges')
    .insert([{ user_id: 'mock_user', badge_id: badgeId }]);

  if (error) {
    console.error(`Error unlocking badge ${badgeId}:`, error);
  }
  
  return { data, error: null };
};

/**
 * Fetches the details of all possible badges.
 */
export const getAllBadges = async (): Promise<{ data: typeof mockBadges, error: null }> => {
  // In a real app, this might come from a 'badges' table
  return { data: mockBadges, error: null };
};

/**
 * Adds a new star to the 'stars' table.
 * This is a placeholder for a future feature.
 * @param {object} starData - The data for the new star.
 */
export const addStar = async (starData: { position: [number, number, number]; note: string }) => {
  if (!supabase) {
    console.log('Mock addStar called with:', starData);
    // Add to mock data for local testing
    const newStar = { id: mockStars.length + 1, ...starData };
    mockStars.push(newStar);
    return { data: [newStar], error: null };
  }

  const { data, error } = await supabase
    .from('stars')
    .insert([starData])
    .select();

  if (error) {
    console.error('Error adding star:', error);
    return { data: null, error };
  }

  return { data, error };
};
