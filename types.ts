export type Category = 'All' | 'Web App' | 'Landing Page' | 'Design';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: Category;
  imageUrl: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: string; // Lucide icon name or simple string identifier
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}