import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { USER_INFO } from '../constants';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Typewriter state
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const skills = ["Web Developer", "Designer", "Frontend Engineer", "Creative Technologist"];
  const period = 2000;

  // Parallax Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter Logic
  useEffect(() => {
    let ticker = setTimeout(() => {
      tick();
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [text, isDeleting]);

  const tick = () => {
    let i = loopNum % skills.length;
    let fullText = skills[i];
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setTypingSpeed(prev => prev / 1.5); // Speed up deleting
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(period); // Pause at end
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(100); // Reset speed
    } else if (!isDeleting && updatedText !== fullText) {
        setTypingSpeed(100 + Math.random() * 50); // Humanize typing
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-dark-bg"
    >
      {/* Background Atmosphere - "Minimal Bright" Spotlight Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large, soft glowing center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-brand-500/10 via-white/5 to-neon-purple/5 rounded-full blur-[100px] opacity-70"></div>
        
        {/* Vignette to keep edges dark for text contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_20%,rgba(3,3,5,1)_80%)] z-10"></div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Typography */}
        <div className="order-2 lg:order-1 text-center lg:text-left relative z-30">
             <div className="inline-block px-3 py-1 mb-4 border border-neon-cyan/30 rounded-full bg-neon-cyan/5 text-neon-cyan text-xs font-mono tracking-widest">
                AVAILABLE FOR HIRE
             </div>
             
             <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
                HELLO, I'M <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple drop-shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                    {USER_INFO.name.toUpperCase()}
                </span>
             </h1>

             <div className="h-8 mb-8 flex items-center justify-center lg:justify-start">
                <span className="text-xl md:text-2xl font-mono text-gray-300">
                    I build <span className="text-neon-cyan font-bold">{text}</span>
                    <span className="animate-cursor-blink ml-1 border-r-2 border-neon-cyan h-6 inline-block align-middle"></span>
                </span>
             </div>
             
             <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                 <a 
                    href="#projects" 
                    onClick={(e) => scrollToSection(e, 'projects')}
                    className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider rounded-sm hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center gap-2"
                >
                    View Portfolio <ArrowRight size={18} />
                </a>
                 <a 
                    href="#contact" 
                    onClick={(e) => scrollToSection(e, 'contact')}
                    className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-wider rounded-sm hover:bg-white/5 hover:border-neon-cyan transition-all duration-300"
                >
                    Contact Me
                </a>
             </div>
        </div>

        {/* Right Side: Stylized 3D Avatar Scene */}
        <div className="order-1 lg:order-2 h-[400px] lg:h-[600px] w-full flex items-center justify-center perspective-1000">
            <div 
                className="relative preserve-3d animate-float"
                style={{ 
                    transform: `rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * -5}deg)`,
                    transition: 'transform 0.1s ease-out'
                }}
            >
                {/* 3D Scene Wrapper - Scaled for responsiveness */}
                <div className="scale-[0.6] md:scale-[0.8] lg:scale-100 preserve-3d">
                    
                    {/* Shadow Blob */}
                    <div className="absolute top-[250px] left-1/2 -translate-x-1/2 w-80 h-32 bg-black/60 blur-2xl rounded-[100%] transform rotate-x-90 translate-z-[-100px]"></div>

                    {/* --- THE DESK --- */}
                    <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-[380px] h-[20px] bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl preserve-3d transform translate-z-[50px] rotate-x-[15deg]">
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 opacity-70 rounded-2xl"></div>
                        
                        {/* Desk Legs (Visual lines) */}
                        <div className="absolute top-4 left-4 w-2 h-[100px] bg-white/20 transform rotate-x-[-15deg]"></div>
                        <div className="absolute top-4 right-4 w-2 h-[100px] bg-white/20 transform rotate-x-[-15deg]"></div>
                    </div>

                    {/* --- LAPTOP --- */}
                    <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[140px] h-[90px] bg-[#333] rounded-md transform rotate-x-[75deg] translate-z-[60px] preserve-3d shadow-xl border-b border-white/20">
                        {/* Screen */}
                        <div className="absolute top-0 w-full h-full bg-[#222] rounded-md transform rotate-x-[-105deg] origin-bottom preserve-3d border border-white/20">
                            {/* Screen Glow */}
                            <div className="absolute inset-[2px] bg-black rounded-sm overflow-hidden flex flex-col p-2">
                                <div className="text-[6px] text-neon-green font-mono leading-tight opacity-90">
                                  {`import { Future } from 'react';\n\nfunction Portfolio() {\n  return <Awesome />;\n}`}
                                </div>
                                <div className="mt-auto w-full h-1 bg-neon-cyan rounded-full animate-pulse"></div>
                            </div>
                            {/* Back Logo */}
                            <div className="absolute inset-0 flex items-center justify-center backface-hidden transform rotate-y-180 translate-z-[-1px] bg-[#444] rounded-md">
                                <div className="w-6 h-6 border-2 border-white/30 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- COFFEE MUG & STEAM --- */}
                    <div className="absolute top-[80px] right-[80px] w-[30px] h-[30px] preserve-3d transform translate-z-[70px]">
                       <div className="w-full h-full bg-white rounded-full shadow-lg border-2 border-gray-100 flex items-center justify-center relative">
                          <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-3 h-4 border-2 border-white rounded-r-lg"></div>
                          <div className="w-[20px] h-[20px] bg-[#3e2723] rounded-full"></div>
                       </div>
                       {/* Steam Particles */}
                       <div className="absolute -top-4 left-1/2 w-2 h-2 bg-white/50 rounded-full blur-[2px] animate-steam" style={{ animationDelay: '0s' }}></div>
                       <div className="absolute -top-6 left-1/2 w-2 h-2 bg-white/40 rounded-full blur-[2px] animate-steam" style={{ animationDelay: '0.5s', left: '40%' }}></div>
                    </div>

                    {/* --- THE AVATAR --- */}
                    <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 preserve-3d transform translate-z-0">
                        
                        {/* HEAD */}
                        <div className="absolute -top-[110px] left-1/2 -translate-x-1/2 w-[80px] h-[90px] preserve-3d animate-float-delayed">
                             {/* Face */}
                             <div className="absolute inset-0 bg-[#ffdbac] border border-black/5 rounded-2xl transform translate-z-[40px] overflow-hidden">
                                 {/* Hair (Front) */}
                                 <div className="absolute top-0 w-full h-[25px] bg-[#1a1a1a]"></div>
                                 <div className="absolute top-[20px] left-[10px] w-[15px] h-[10px] bg-[#1a1a1a] rounded-b-full"></div>
                                 
                                 {/* Eyes */}
                                 <div className="absolute top-[45px] left-[20px] w-[12px] h-[12px] bg-[#222] rounded-full">
                                    <div className="absolute top-0.5 right-0.5 w-[4px] h-[4px] bg-white rounded-full"></div>
                                 </div>
                                 <div className="absolute top-[45px] right-[20px] w-[12px] h-[12px] bg-[#222] rounded-full">
                                    <div className="absolute top-0.5 right-0.5 w-[4px] h-[4px] bg-white rounded-full"></div>
                                 </div>
                                 
                                 {/* Glasses */}
                                 <div className="absolute top-[40px] left-[10px] w-[60px] h-[22px] border-2 border-neon-cyan/80 rounded-lg bg-neon-cyan/5 shadow-[0_0_10px_rgba(0,243,255,0.2)]"></div>
                                 <div className="absolute top-[48px] left-[38px] w-[4px] h-[2px] bg-neon-cyan/80"></div>

                                 {/* Smile */}
                                 <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[20px] h-[8px] border-b-2 border-black/40 rounded-b-full"></div>
                             </div>
                             
                             {/* Back/Sides of Head */}
                             <div className="absolute inset-0 bg-[#1a1a1a] rounded-2xl transform translate-z-[-40px] rotate-y-180"></div>
                             <div className="absolute inset-y-0 left-0 w-[80px] bg-[#1a1a1a] transform rotate-y-[-90deg] origin-left rounded-2xl"></div>
                             <div className="absolute inset-y-0 right-0 w-[80px] bg-[#1a1a1a] transform rotate-y-[90deg] origin-right rounded-2xl"></div>
                             <div className="absolute inset-x-0 top-0 h-[80px] bg-[#1a1a1a] transform rotate-x-[90deg] origin-top rounded-t-2xl"></div>
                        </div>

                        {/* TORSO */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[120px] preserve-3d">
                             {/* Hoodie Front */}
                             <div className="absolute inset-0 bg-[#2d3748] rounded-3xl transform translate-z-[35px] flex items-center justify-center border-t border-white/10">
                                 {/* Hoodie Strings */}
                                 <div className="absolute top-2 left-[35px] w-1 h-12 bg-gray-400 rounded-full"></div>
                                 <div className="absolute top-2 right-[35px] w-1 h-12 bg-gray-400 rounded-full"></div>
                                 {/* Logo */}
                                 <div className="w-10 h-10 border-2 border-white/20 rounded-lg flex items-center justify-center">
                                     <span className="text-white/30 font-bold text-xs">DEV</span>
                                 </div>
                             </div>
                             {/* Hoodie Back */}
                             <div className="absolute inset-0 bg-[#2d3748] rounded-3xl transform translate-z-[-35px]"></div>
                             {/* Sides */}
                             <div className="absolute inset-y-0 left-0 w-[70px] bg-[#1a202c] transform rotate-y-[-90deg] origin-left rounded-3xl"></div>
                             <div className="absolute inset-y-0 right-0 w-[70px] bg-[#1a202c] transform rotate-y-[90deg] origin-right rounded-3xl"></div>
                             <div className="absolute inset-x-0 top-0 h-[70px] bg-[#2d3748] transform rotate-x-[90deg] origin-top rounded-t-3xl"></div>
                        </div>

                        {/* ARMS */}
                        <div className="absolute top-[20px] left-[-65px] w-[35px] h-[100px] bg-[#2d3748] rounded-full transform rotate-z-[25deg] rotate-x-[40deg] shadow-lg">
                             <div className="absolute bottom-0 w-full h-[30px] bg-[#ffdbac] rounded-full border border-black/5"></div>
                        </div>
                        <div className="absolute top-[20px] right-[-65px] w-[35px] h-[100px] bg-[#2d3748] rounded-full transform rotate-z-[-25deg] rotate-x-[40deg] shadow-lg">
                             <div className="absolute bottom-0 w-full h-[30px] bg-[#ffdbac] rounded-full border border-black/5"></div>
                        </div>

                        {/* CHAIR BACK */}
                        <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[150px] h-[180px] bg-[#000] rounded-t-[40px] border-4 border-neon-purple/50 transform translate-z-[-90px] shadow-[0_0_30px_rgba(188,19,254,0.3)] flex flex-col items-center justify-start pt-8">
                             {/* Headrest hole */}
                             <div className="w-[80px] h-[20px] bg-[#222] rounded-full mb-4"></div>
                             {/* Pattern */}
                             <div className="w-full h-full bg-[linear-gradient(45deg,transparent_45%,rgba(188,19,254,0.2)_50%,transparent_55%)] bg-[length:20px_20px]"></div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Rising Code Symbols - Positioned around the avatar */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div 
                    key={i}
                    className="absolute text-neon-cyan/60 font-mono font-bold animate-bubble-rise select-none shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                    style={{
                        left: `${40 + Math.random() * 20}%`, // Concentrated near center
                        bottom: '20%',
                        fontSize: `${16 + Math.random() * 24}px`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${3 + Math.random() * 3}s`
                    }}
                    >
                        {['< >', '{ }', ';', '</>', '&&', '||', '[]'][i % 7]}
                    </div>
                ))}
            </div>

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-20">
         <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2">Scroll</p>
         <div className="animate-bounce text-white/30">
             <ChevronDown size={20} />
         </div>
      </div>

    </section>
  );
};

export default Hero;