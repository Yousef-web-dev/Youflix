'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutCTA() {
  return (
    <section className="border-t border-white/10 px-4 py-14 text-center sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-black text-white sm:text-3xl">Ready to Discover Something New?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
          Explore movies and series and find your next favorite story.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/movies"
            className="rounded bg-[#E50914] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-950 duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Explore Movies
          </Link>
          <Link
            href="/series"
            className="rounded border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Explore Series
          </Link>
          <Link
            href="/genres"
            className="rounded px-5 py-2.5 text-sm font-semibold text-gray-300 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Explore Genres
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
