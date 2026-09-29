"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <div className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#E50914]/15 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <h1 className="text-3xl font-black text-white sm:text-5xl">
          About <span className="text-[#E50914]">Youflix</span>
        </h1>
        <p className="mt-3 text-base text-gray-300 sm:text-lg">
          Your place to discover movies, series, and stories worth watching.
        </p>
        <p className="mt-4 text-sm text-gray-400 sm:text-base">
          Youflix is a modern movie and series discovery platform built to make
          finding your next favorite story simple, fast, and enjoyable.
        </p>
      </motion.div>
    </div>
  );
}
