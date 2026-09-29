'use client';

import { motion } from 'framer-motion';

export default function NewPopularHeader() {
  return (
    <div className="relative overflow-hidden px-4 pb-8 pt-28 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#E50914]/15 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative"
      >
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          New <span className="text-[#E50914]">&amp;</span> Popular
        </h1>
        <p className="mt-2 max-w-xl text-sm text-gray-400 sm:text-base">
          Discover the latest releases, trending titles, and popular movies and series.
        </p>
      </motion.div>
    </div>
  );
}
