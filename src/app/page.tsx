'use client';

import { useState, useEffect } from 'react';
import F1Scene from '@/components/F1Scene';
import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import HUD from '@/components/HUD';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Persistent animated particle background */}
      <AnimatedBackground />
      {/* 3D Scene — hero only, fades out slowly on scroll */}
      {scrollY < 1000 && (
        <div
          className="fixed inset-0 z-0"
          style={{ opacity: scrollY < 200 ? 1 : Math.max(0, 1 - (scrollY - 200) / 800) }}
        >
          <F1Scene scrollY={scrollY} />
        </div>
      )}

      {/* HUD Overlay (fades out after hero) */}
      <HUD scrollY={scrollY} />

      {/* Navigation */}
      <Navigation />

      {/* Content Sections */}
      <main className="relative z-10 pt-16">
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 checkered">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-red-600 font-bold text-lg tracking-wider">PORTFOLIO</span>
              <p className="text-gray-600 text-xs mt-1">Engineered for performance</p>
            </div>
            <div className="flex gap-6">
              {['About', 'Projects', 'Experience', 'Skills', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-500 hover:text-gray-300 text-xs font-mono tracking-wider transition-colors"
                >
                  {item.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-600 text-xs font-mono">
              © {new Date().getFullYear()} T V L Bharathwaj — Built with Next.js & Three.js
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}