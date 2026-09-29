"use client";

import { motion } from "framer-motion";

export default function AboutIntro() {
  return (
    <section className="px-4 py-10 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          What is Youflix?
        </h2>
        <p className="mt-3 text-sm text-gray-300 sm:text-base">
          Youflix is a movie and series discovery experience where you can
          explore content through Movies, Series, Genres, Trending, New &amp;
          Popular, Top Rated, Search, and My List. The content is powered by
          real TMDB data.
        </p>
        <p className="mt-3 text-sm text-gray-400 sm:text-base">
          Youflix is a discovery platform, not a streaming service — it helps
          you find what to watch next, not watch it directly.
        </p>
      </motion.div>
    </section>
  );
}
