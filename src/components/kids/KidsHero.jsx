'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function KidsHero() {
  return (
    <div className="relative overflow-hidden px-4 pb-8 pt-28 sm:px-8 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#E50914]/20 via-[#E50914]/5 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Kids <span className="text-[#E50914]">&amp; Family</span>
        </h1>
        <p className="mt-3 text-sm text-gray-300 sm:text-base">
          Fun adventures, animated stories, and family-friendly entertainment for everyone.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/kids?type=movie"
            className="rounded-full bg-[#E50914] hover:bg-red-950 hover:text-white  px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300"
          >
            Explore Movies
          </Link>
          <Link
            href="/kids?type=tv"
            className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
          >
            Explore Series
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
