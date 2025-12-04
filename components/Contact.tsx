import React from 'react';
import { Mail, Linkedin, Github, Twitter, MapPin } from 'lucide-react';
import { USER_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-dark-bg relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's work together</h2>
          <p className="text-dark-muted max-w-xl mx-auto">
            Have a project in mind? I'm always open to discussing new opportunities, creative ideas, or just having a chat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-500/10 rounded-lg text-brand-400">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Email Me</h4>
                <a href={`mailto:${USER_INFO.email}`} className="text-gray-400 hover:text-brand-400 transition-colors">
                  {USER_INFO.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-500/10 rounded-lg text-brand-400">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                <p className="text-gray-400">San Francisco, CA (Remote available)</p>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect with me</h4>
              <div className="flex gap-4">
                <a href={USER_INFO.social.github} className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <Github size={20} />
                </a>
                <a href={USER_INFO.social.linkedin} className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href={USER_INFO.social.twitter} className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          <form className="bg-dark-card p-8 rounded-2xl border border-white/5 shadow-xl">
             <div className="space-y-6">
               <div>
                 <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                 <input 
                   type="text" 
                   id="name" 
                   className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                   placeholder="Your Name"
                 />
               </div>
               <div>
                 <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                 <input 
                   type="email" 
                   id="email" 
                   className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                   placeholder="your@email.com"
                 />
               </div>
               <div>
                 <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                 <textarea 
                   id="message" 
                   rows={4}
                   className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all resize-none"
                   placeholder="Tell me about your project..."
                 ></textarea>
               </div>
               <button 
                 type="submit" 
                 className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-brand-500/20"
                 onClick={(e) => e.preventDefault()} // Prevent submission for demo
               >
                 Send Message
               </button>
             </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;