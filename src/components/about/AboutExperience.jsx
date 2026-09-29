"use client";

import { motion } from "framer-motion";

export default function AboutExperience() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 px-4 py-16 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#E50914]/10 via-black to-black" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <h2 className="text-2xl font-black text-white sm:text-3xl">
          Made for Movie &amp; Series Lovers
        </h2>
        <p className="mt-3 text-sm text-gray-300 sm:text-base">
          From trending titles to hidden gems, Youflix gives you a simple way to
          explore the world of movies and series.
        </p>
      </motion.div>
    </section>
  );
}
