'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const roles = [
  'AI/ML Engineer',
  'Full Stack Developer',
  'GenAI Enthusiast',
  'Formula 1 Fan',
];

function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="text-red-500 font-mono">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative">
      {/* Hero Area */}
      <div className="min-h-screen flex flex-col items-center pt-32 md:pt-40 px-4 relative overflow-hidden">

        {/* Subtle red radial glow behind car */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-red-600/5 rounded-full blur-[60px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-6 relative z-10"
        >
          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
            <span className="text-red-600">T V L</span>{' '}
            <span className="text-white">BHARATHWAJ</span>
          </h1>

          {/* Typewriter subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 font-light tracking-wide mb-8 min-h-[2rem]"
          >
            <TypewriterText />
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            <Link
              href="#projects"
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30"
            >
              View Projects
            </Link>
            <Link
              href="#contact"
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              Contact Me
            </Link>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center justify-center gap-3"
          >
            {[
              {
                href: 'https://github.com/Bharathwaj7',
                label: 'GitHub',
                path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
              },
              {
                href: 'https://www.linkedin.com/in/tvl-bharathwaj-12a463270/',
                label: 'LinkedIn',
                path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-red-600/20 hover:border-red-600/30 text-gray-500 hover:text-red-400 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={item.path} />
                </svg>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center scroll-indicator"
        >
          <span className="text-gray-600 text-xs font-mono tracking-widest mb-2">SCROLL</span>
          <motion.svg
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-red-600"
          >
            <path d="M10 4 L10 16 M4 10 L10 16 L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>
      </div>

      {/* About Content */}
      <div className="py-20 px-4">
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass glass-hover rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-red-600 rounded-full" />
                STATS
              </h3>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 text-sm">Education</span>
                    <span className="text-red-500 text-sm font-mono">B.Tech CSE (AI/ML)</span>
                  </div>
                  <div className="text-gray-500 text-xs">VIT Chennai · 2022–2026 · CGPA: 8.72</div>
                </div>
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-gray-300 text-sm">AI / ML / GenAI</span>
                    <span className="text-red-500 text-sm font-mono">90%</span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden shimmer">
                    <motion.div className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full" initial={{ width: 0 }} whileInView={{ width: '90%' }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.1 }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-gray-300 text-sm">Frontend Development</span>
                    <span className="text-red-500 text-sm font-mono">88%</span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden shimmer">
                    <motion.div className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full" initial={{ width: 0 }} whileInView={{ width: '88%' }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-gray-300 text-sm">Backend & DevOps</span>
                    <span className="text-red-500 text-sm font-mono">85%</span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden shimmer">
                    <motion.div className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full" initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="glass glass-hover rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-red-600 rounded-full" />
                ABOUT
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                B.Tech Computer Science student at VIT Chennai, specialising in Artificial Intelligence and Machine Learning. I build intelligent systems — from AI-powered document analysis tools to terrain-aware pathfinding algorithms for lunar exploration.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                With hands-on experience in full-stack development, GenAI, and cloud platforms (Azure, AWS), I engineer solutions that are fast, scalable, and impactful. SIH24 Finalist and multiple hackathon winner with a passion for pushing boundaries.
              </p>
              <div className="flex flex-wrap gap-3">
                {['AI/ML Engineer', 'Full Stack Developer', 'GenAI & LLMs', 'Cloud (Azure/AWS)'].map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider" />
    </section>
  );
}