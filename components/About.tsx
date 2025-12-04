import React from 'react';
import { SKILLS } from '../constants';
import { Database, Palette, Cpu, Box, Brain, Zap } from 'lucide-react';

const About: React.FC = () => {
  const getIcon = (category: string) => {
    switch(category) {
      case 'Frontend': return <Box className="w-5 h-5" />;
      case 'Backend': return <Database className="w-5 h-5" />;
      case 'Design': return <Palette className="w-5 h-5" />;
      case 'Tools': return <Brain className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="about" className="py-32 bg-dark-surface relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          
          {/* 3D Tesseract / Cube Animation */}
          <div className="lg:w-1/2 flex justify-center items-center perspective-1000 h-[400px]">
             <div className="relative animate-spin-slow preserve-3d cube-scene">
                {/* Outer Cube */}
                <div className="cube preserve-3d">
                   <div className="cube-face face-front bg-neon-cyan/5 border-neon-cyan/30">React</div>
                   <div className="cube-face face-back bg-neon-purple/5 border-neon-purple/30">Node</div>
                   <div className="cube-face face-right bg-neon-pink/5 border-neon-pink/30">WebGL</div>
                   <div className="cube-face face-left bg-neon-green/5 border-neon-green/30">Three.js</div>
                   <div className="cube-face face-top bg-white/5 border-white/20">Design</div>
                   <div className="cube-face face-bottom bg-white/5 border-white/20">System</div>
                </div>
                
                {/* Inner Cube (Reverse Spin) */}
                <div className="absolute inset-0 transform scale-50 animate-spin-reverse preserve-3d">
                   <div className="absolute inset-0 border border-white/40 rotate-x-0 translate-z-[50px] bg-white/10"></div>
                   <div className="absolute inset-0 border border-white/40 rotate-y-90 translate-z-[50px] bg-white/10"></div>
                   <div className="absolute inset-0 border border-white/40 rotate-x-90 translate-z-[50px] bg-white/10"></div>
                </div>
             </div>
             
             {/* Floating Platform underneath */}
             <div className="absolute bottom-10 w-48 h-48 bg-neon-cyan/20 rounded-full blur-xl transform rotate-x-[80deg] animate-pulse"></div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2">
             <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-neon-purple"></div>
                <span className="text-neon-purple font-mono tracking-widest text-sm uppercase">The Architect</span>
             </div>
             
             <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
               Forging <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">Digital Reality</span>
             </h2>
             
             <div className="space-y-6 text-gray-400 text-lg leading-relaxed mb-12 border-l border-white/10 pl-6">
               <p>
                 I don't just write code; I simulate worlds. My background blends high-performance engineering with cinematic motion design, allowing me to build web experiences that feel less like documents and more like <strong className="text-white">habitable spaces</strong>.
               </p>
               <p>
                 From WebGL shaders to scalable backend systems, I architect the full stack of the future.
               </p>
             </div>

             <div className="grid grid-cols-2 gap-4">
               {SKILLS.map((skill) => (
                 <div key={skill.name} className="group relative p-4 rounded-xl bg-white/5 border border-white/5 overflow-hidden transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative z-10 flex items-center gap-3 mb-2">
                      <div className="text-neon-cyan">{getIcon(skill.category)}</div>
                      <span className="font-bold text-white text-sm tracking-wide">{skill.name}</span>
                    </div>
                    
                    <div className="relative z-10 h-1 bg-dark-bg rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;