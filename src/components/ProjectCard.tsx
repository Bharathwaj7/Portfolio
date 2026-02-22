'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProjectCard({
  title,
  description,
  tech,
  liveUrl,
  githubUrl
}: {
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass glass-hover rounded-xl overflow-hidden h-full flex flex-col group"
    >
      {/* Header gradient area */}
      <div className="h-44 bg-gradient-to-br from-red-900/60 via-gray-900 to-gray-900 relative overflow-hidden">
        {/* Animated shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <p className="text-gray-400 text-sm mb-4 flex-grow leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {tech.map((techItem, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-white/5 text-gray-400 text-xs rounded-md border border-white/5 hover:border-red-600/30 hover:text-gray-300 transition-all duration-300"
            >
              {techItem}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            href={githubUrl}
            className="block w-full bg-white/5 hover:bg-white/10 text-gray-300 py-2 px-4 rounded-lg text-center text-sm font-medium transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            GitHub
          </Link>
        </div>
      </div>
    </motion.div>
  );
}