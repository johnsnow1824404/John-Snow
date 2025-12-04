import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import ScrollSpine from './components/ScrollSpine';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg selection:bg-brand-500/30 selection:text-brand-200 overflow-x-hidden">
      <ScrollSpine />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <ProjectGrid />
        <About />
        <Contact />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
}

export default App;