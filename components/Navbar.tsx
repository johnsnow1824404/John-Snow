import React, { useState, useEffect } from 'react';
import { Menu, X, Hexagon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Work', id: 'projects' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${
      scrolled ? 'bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 group cursor-pointer">
              <div className="relative">
                <Hexagon className="h-10 w-10 text-neon-cyan group-hover:text-neon-purple transition-colors duration-500" strokeWidth={1.5} />
                <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-white">JS</div>
              </div>
              <div className="hidden sm:block">
                <span className="font-black text-xl tracking-tight text-white block leading-none">JHON</span>
                <span className="font-light text-sm tracking-[0.2em] text-gray-400 block leading-none group-hover:text-neon-cyan transition-colors">SNOW</span>
              </div>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-gray-300 hover:text-white relative group text-sm font-medium tracking-wide uppercase cursor-pointer"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-neon-cyan transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className="bg-white/5 border border-white/10 hover:border-neon-cyan hover:bg-neon-cyan/10 text-white px-6 py-2 rounded text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_0_transparent] hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] cursor-pointer"
              >
                Connect
              </a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors relative z-[101]"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-bg/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
          <div className="px-4 pt-4 pb-8 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="block text-2xl font-black text-white hover:text-neon-cyan uppercase tracking-tighter cursor-pointer"
              >
                {link.name}
              </a>
            ))}
             <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="block text-neon-purple font-bold mt-8 cursor-pointer"
              >
                INITIATE CONTACT ->
              </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;