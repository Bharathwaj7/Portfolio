'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="text-red-600">4</span>
            <span className="text-white">0</span>
            <span className="text-red-600">4</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">CHECKERED FLAG</h2>
          <p className="text-gray-400 text-lg mb-8">
            Looks like you&apos;ve taken a wrong turn in the pit lane. The page you&apos;re looking for has crossed the finish line.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Return to Grid
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <div className="flex justify-center space-x-4 text-gray-600">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}