import { Project, Skill } from './types';

export const USER_INFO = {
  name: "Jhon Snow",
  role: "Creative Technologist & 3D Web Architect",
  bio: "I architect immersive digital realities. Blending high-performance engineering with cinematic motion to define the next era of the web.",
  email: "jhon.snow@future.tech",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neon Horizon',
    category: 'Web App',
    description: 'A WebGL-powered metaverse commerce platform.',
    fullDescription: 'Neon Horizon represents the future of shopping. Using Three.js and React Fiber, users can navigate a virtual cyberpunk city to purchase real-world items. Features real-time multiplayer interactions and spatial audio.',
    imageUrl: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&auto=format&fit=crop',
    technologies: ['React Three Fiber', 'WebGL', 'Socket.io', 'Zustand'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Aether Interface',
    category: 'Design',
    description: 'Holographic dashboard system for autonomous drone fleets.',
    fullDescription: 'A conceptual UI kit designed for high-stakes environments. The interface utilizes glassmorphism and depth maps to present complex telemetry data in an intuitive 3D space.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    technologies: ['Figma', 'Spline', 'React', 'D3.js'],
    demoUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '3',
    title: 'Void Zero',
    category: 'Landing Page',
    description: 'Award-winning experiential landing page for AI startup.',
    fullDescription: 'Focusing on the concept of "Software 2.0", this landing page uses scroll-triggered shader animations to tell the story of neural networks evolving.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    technologies: ['GLSL', 'Next.js', 'Framer Motion', 'Tailwind'],
    repoUrl: 'https://github.com',
    featured: false,
  },
  {
    id: '4',
    title: 'CyberBank',
    category: 'Web App',
    description: 'DeFi protocol visualization with real-time particle data.',
    fullDescription: 'Visualizes blockchain transactions as flowing energy streams. This dashboard provides deep analytics for decentralized finance protocols with a retro-futuristic aesthetic.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
    technologies: ['React', 'Ethers.js', 'Canvas API', 'GraphQL'],
    demoUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '5',
    title: 'Echoes of Time',
    category: 'Landing Page',
    description: 'Immersive storytelling experience for a sci-fi novel.',
    fullDescription: 'A parallax-heavy narrative website that changes atmosphere and audio based on scroll depth. Optimized for both desktop and mobile VR browsers.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    technologies: ['Vue.js', 'GSAP', 'Howler.js'],
    demoUrl: 'https://example.com',
    featured: false,
  }
];

export const SKILLS: Skill[] = [
  { name: 'WebGL / Three.js', icon: 'Box', level: 98, category: 'Frontend' },
  { name: 'React Ecosystem', icon: 'Code', level: 95, category: 'Frontend' },
  { name: 'Shader Programming', icon: 'Cpu', level: 85, category: 'Design' },
  { name: 'Node.js Architecture', icon: 'Server', level: 90, category: 'Backend' },
  { name: 'Futuristic UI', icon: 'PenTool', level: 92, category: 'Design' },
  { name: 'AI Integration', icon: 'Brain', level: 88, category: 'Tools' },
];