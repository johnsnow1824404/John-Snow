import React, { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on cursor position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10; // Max 10 deg rotation
    const rotateX = ((centerY - y) / centerY) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      className="perspective-1000 h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        onClick={() => onClick(project)}
        className="relative h-full bg-dark-card border border-white/5 rounded-xl overflow-hidden cursor-pointer transform-gpu transition-all duration-200 ease-out group"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
          boxShadow: isHovered 
            ? '0 20px 40px rgba(0, 243, 255, 0.15), 0 0 0 1px rgba(0, 243, 255, 0.3)' 
            : '0 10px 20px rgba(0,0,0,0.2)'
        }}
      >
        {/* Image Container with Parallax Overlay */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/20 to-transparent opacity-90" />
          
          {/* Holographic Overlay on Hover */}
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-neon-cyan/20 via-transparent to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
          />
          
          <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white flex items-center justify-center">
                <ArrowUpRight size={20} />
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 relative z-10 transform translate-z-10 group-hover:translate-z-20 transition-transform">
          <div className="flex justify-between items-center mb-3">
             <span className="text-xs font-mono text-neon-cyan bg-neon-cyan/10 px-2 py-1 rounded border border-neon-cyan/20">
               {project.category}
             </span>
             {project.featured && (
                <span className="w-2 h-2 bg-neon-purple rounded-full shadow-[0_0_10px_#bc13fe]"></span>
             )}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
            {project.title}
          </h3>
          
          <p className="text-dark-muted text-sm line-clamp-2 mb-4 group-hover:text-gray-300 transition-colors">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {project.technologies.slice(0, 3).map(tech => (
              <span key={tech} className="text-[10px] uppercase tracking-wider text-gray-400">
                #{tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;