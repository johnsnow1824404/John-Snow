import React from 'react';
import { USER_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} {USER_INFO.name}. All rights reserved.
        </p>
        <p className="text-gray-600 text-xs flex items-center gap-1">
          Built with React & <span className="text-brand-500">Tailwind</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;