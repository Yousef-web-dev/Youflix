'use client';

import { motion } from 'framer-motion';

export default function GenresHero() {
  return (
    <div className="relative overflow-hidden px-4 pb-6 pt-24 sm:px-8 sm:pb-8 sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#E50914]/15 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative"
      >
        <h1 className="text-2xl font-black text-white sm:text-3xl">
          Explore <span className="text-[#E50914]">Genres</span>
        </h1>
        <p className="mt-1.5 max-w-md text-sm text-gray-400">Discover movies and series that match your mood.</p>
      </motion.div>
    </div>
  );
}
