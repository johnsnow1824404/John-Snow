import React, { useState } from 'react';
import { Project, Category } from '../types';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';
import { X, ExternalLink, Github, Zap } from 'lucide-react';

const categories: Category[] = ['All', 'Web App', 'Landing Page', 'Design'];

const ProjectGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-32 bg-dark-bg relative overflow-hidden">
       {/* Background Grid Accent */}
       <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>
       <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
             <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
               SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">WORKS</span>
             </h2>
             <p className="text-gray-400 max-w-xl text-lg">
               A curated collection of digital experiences, experiments, and architectural feats.
             </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-sm text-sm font-mono tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                    : 'bg-transparent border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 perspective-2000">
          {filteredProjects.map(project => (
            <div key={project.id} className="h-96">
                <ProjectCard 
                  project={project} 
                  onClick={setSelectedProject}
                />
            </div>
          ))}
        </div>
      </div>

      {/* Futuristic Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
          <div className="glass-panel w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)] relative flex flex-col md:flex-row animate-slide-up border border-neon-cyan/20">
            
            {/* Holographic scanner effect line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse shadow-[0_0_20px_#00f3ff]"></div>

            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-neon-pink/20 text-white hover:text-neon-pink rounded-full transition-all border border-white/10 hover:border-neon-pink/50"
            >
              <X size={24} />
            </button>

            <div className="md:w-3/5 h-64 md:h-auto relative overflow-hidden group">
               <img 
                 src={selectedProject.imageUrl} 
                 alt={selectedProject.title} 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-dark-card via-transparent to-transparent opacity-80 md:opacity-40"></div>
            </div>

            <div className="p-8 md:w-2/5 flex flex-col bg-dark-card/50 relative">
              {/* Decorative grid background */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-1 h-8 bg-neon-purple"></span>
                    <span className="text-neon-cyan font-mono text-sm tracking-widest uppercase">
                    Project 0{selectedProject.id}
                    </span>
                </div>
                
                <h3 className="text-4xl font-bold text-white mb-6 leading-none">{selectedProject.title}</h3>
                
                <p className="text-gray-300 mb-8 leading-relaxed font-light border-l-2 border-white/5 pl-4">
                  {selectedProject.fullDescription}
                </p>
                
                <div className="mb-8">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 hover:border-neon-cyan/50 rounded text-xs text-brand-100 font-mono transition-colors">
                        {tech}
                        </span>
                    ))}
                    </div>
                </div>
              </div>

              <div className="flex gap-4 relative z-10 pt-6 border-t border-white/5">
                {selectedProject.demoUrl && (
                  <a 
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-neon-cyan hover:bg-cyan-400 text-black py-3 rounded font-bold uppercase tracking-wide transition-all hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                  >
                    <ExternalLink size={18} />
                    Launch
                  </a>
                )}
                {selectedProject.repoUrl && (
                  <a 
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-white text-white py-3 rounded font-bold uppercase tracking-wide transition-all hover:bg-white/5"
                  >
                    <Github size={18} />
                    Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGrid;