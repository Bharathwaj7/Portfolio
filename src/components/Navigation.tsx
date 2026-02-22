'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'CONTACT', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems.map(item => item.href.replace('#', ''));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
          }`}
      >
        <div className="flex justify-between items-center px-8 py-4">
          <Link href="/" className="text-red-600 font-bold text-xl tracking-wider hover:text-red-500 transition-colors">
            PORTFOLIO
          </Link>
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-4 py-2 text-sm font-mono tracking-widest transition-colors duration-300 rounded-md ${activeSection === item.href.replace('#', '')
                  ? 'text-red-500'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                {item.name}
                {/* Active indicator line */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-red-600 rounded-full transition-all duration-300 ${activeSection === item.href.replace('#', '')
                    ? 'w-6 opacity-100'
                    : 'w-0 opacity-0'
                    }`}
                />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`md:hidden fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${scrolled
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
        : 'bg-black/50 backdrop-blur-sm'
        }`}>
        <div className="flex justify-between items-center px-4 py-3">
          <Link href="/" className="text-red-600 font-bold text-lg tracking-wider">
            F1
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-white rounded-sm transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white rounded-sm mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-white rounded-sm mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/5 transition-all duration-400 overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="flex flex-col py-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`py-3 font-mono text-sm tracking-widest text-center transition-colors ${activeSection === item.href.replace('#', '')
                  ? 'text-red-500 bg-white/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}