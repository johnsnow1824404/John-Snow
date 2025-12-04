import React, { useEffect, useState } from 'react';

const ScrollSpine: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center preserve-3d">
      {/* The Central Spine Container */}
      <div className="relative h-[80vh] w-2 md:w-4 preserve-3d">
        
        {/* Back Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent blur-xl"></div>
        
        {/* The Glass Tube */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border-x border-white/10 rounded-full overflow-hidden">
          
          {/* Grid lines inside tube */}
          <div className="absolute inset-0 opacity-30" 
               style={{ 
                 backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 243, 255, .3) 25%, rgba(0, 243, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 243, 255, .3) 75%, rgba(0, 243, 255, .3) 76%, transparent 77%, transparent)',
                 backgroundSize: '100% 20px'
               }}
          ></div>

          {/* The "Ink" / Energy Fill */}
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-neon-purple via-neon-cyan to-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.8)] transition-all duration-100 ease-out"
            style={{ 
              height: `${scrollProgress * 100}%`,
              opacity: Math.max(0.2, scrollProgress + 0.2)
            }}
          >
             {/* Leading Edge Highlight */}
             <div className="absolute bottom-0 left-0 right-0 h-4 bg-white shadow-[0_0_20px_white]"></div>
          </div>
        </div>

        {/* Top Cap */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 border-2 border-neon-cyan bg-dark-bg rounded-full shadow-[0_0_20px_rgba(0,243,255,0.5)] flex items-center justify-center">
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
        </div>

        {/* Bottom Cap */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 border-2 border-neon-purple bg-dark-bg rounded-full shadow-[0_0_20px_rgba(188,19,254,0.5)] flex items-center justify-center">
            <div className="w-2 h-2 bg-neon-purple rounded-full"></div>
        </div>
        
        {/* Floating Rings around the spine */}
        <div 
            className="absolute left-1/2 -translate-x-1/2 w-16 h-16 border border-neon-cyan/30 rounded-full"
            style={{ 
                top: `${scrollProgress * 90}%`,
                transform: `translateX(-50%) rotateX(70deg) rotateY(${scrollProgress * 360}deg)`,
                transition: 'top 0.1s ease-out'
            }}
        ></div>
        
         <div 
            className="absolute left-1/2 -translate-x-1/2 w-24 h-24 border border-neon-purple/20 rounded-full"
            style={{ 
                top: `${scrollProgress * 85 + 5}%`,
                transform: `translateX(-50%) rotateX(70deg) rotateY(-${scrollProgress * 360}deg)`,
                transition: 'top 0.1s ease-out'
            }}
        ></div>

      </div>
    </div>
  );
};

export default ScrollSpine;