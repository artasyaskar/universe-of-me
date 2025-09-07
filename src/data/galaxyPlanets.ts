import { FiCode, FiCpu, FiGlobe, FiInfo, FiTrendingUp } from 'react-icons/fi';

export type PlanetType = 'default' | 'timeline';

export interface PlanetData {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  size: number;
  color: string;
  position: [number, number, number];
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  ring?: boolean;
  ringColor?: string;
  ringSize?: number;
  type?: PlanetType;
  content?: {
    [key: string]: any;
  };
}

export const GALAXY_PLANETS: PlanetData[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Explore my frontend development projects and skills',
    icon: FiCode,
    size: 1.2,
    color: '#60a5fa',
    position: [12, 0, 0],
    orbitRadius: 12,
    orbitSpeed: 0.1,
    rotationSpeed: 0.5,
    ring: true,
    ringColor: '#3b82f6',
    ringSize: 1.8,
    type: 'default',
  },
  {
    id: 'ai',
    name: 'AI & ML',
    description: 'Discover my work in Artificial Intelligence and Machine Learning',
    icon: FiCpu,
    size: 1.4,
    color: '#f472b6',
    position: [-8, 0, 8],
    orbitRadius: 10,
    orbitSpeed: 0.15,
    rotationSpeed: 0.4,
    ring: true,
    ringColor: '#ec4899',
    ringSize: 2.0,
    type: 'default',
  },
  {
    id: 'timeline',
    name: 'Career Timeline',
    description: 'A journey through my career and education milestones',
    icon: FiTrendingUp,
    size: 1.1,
    color: '#a78bfa',
    position: [0, 0, 14],
    orbitRadius: 14,
    orbitSpeed: 0.08,
    rotationSpeed: 0.3,
    type: 'timeline',
    content: {
      timeline: [
        { year: '2023', title: 'Lead Frontend Developer', description: 'Led the development of a major e-commerce platform.' },
        { year: '2021', title: 'Senior Software Engineer', description: 'Worked on a large-scale data visualization dashboard.' },
        { year: '2019', title: 'Bachelor\'s Degree in CS', description: 'Graduated from the University of Technology.' },
      ],
    },
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Check out my portfolio of completed projects',
    icon: FiGlobe,
    size: 1.3,
    color: '#34d399',
    position: [0, 0, -10],
    orbitRadius: 10,
    orbitSpeed: 0.12,
    rotationSpeed: 0.3,
    ring: true,
    ringColor: '#10b981',
    ringSize: 2.2,
    type: 'default',
  },
  {
    id: 'about',
    name: 'About Me',
    description: 'Learn more about my background and skills',
    icon: FiInfo,
    size: 1.1,
    color: '#fbbf24',
    position: [-12, 0, -4],
    orbitRadius: 12.5,
    orbitSpeed: 0.18,
    rotationSpeed: 0.6,
    ring: true,
    ringColor: '#f59e0b',
    ringSize: 1.6,
    type: 'default',
  },
];
