
export interface PlanetData {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

export const featuredPlanets: PlanetData[] = [
  {
    id: 'frontend',
    name: 'Frontend Planet',
    description: 'A world of creativity and user interfaces, built with React and TailwindCSS.',
    image: '/thumbnails/frontend.png', // Placeholder path
    link: '/planet/frontend',
  },
  {
    id: 'ai',
    name: 'AI Planet',
    description: 'My home, a fascinating place where logic and learning come together.',
    image: '/thumbnails/ai.png', // Placeholder path
    link: '/planet/ai',
  },
  {
    id: 'projects',
    name: 'Project Galaxy',
    description: 'A collection of my work, showcasing my skills and passion for development.',
    image: '/thumbnails/projects.png', // Placeholder path
    link: '/galaxy',
  },
];
