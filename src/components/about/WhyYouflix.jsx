"use client";

import { motion } from "framer-motion";

const REASONS = [
  "Simple discovery",
  "Clean UI",
  "Fast browsing",
  "Organized content",
  "Personalized My List",
  "Modern experience",
];

export default function WhyYouflix() {
  return (
    <section className="border-t border-white/10 px-4 py-10 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Why Youflix?
        </h2>
        <p className="mt-3 text-sm text-gray-300 sm:text-base">
          Finding something good to watch shouldn&apos;t feel complicated.
          Youflix brings movies and series into one clean, cinematic experience
          so you can discover what fits your mood faster.
        </p>
        <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-400 sm:grid-cols-2">
          {REASONS.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E50914]" /> {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
