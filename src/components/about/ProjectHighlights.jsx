'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const HIGHLIGHTS = [
  'Dynamic TMDB data',
  'Responsive design',
  'Movie and series discovery',
  'Genre exploration',
  'My List',
  'Trailer discovery',
  'Dynamic detail pages',
  'URL-based filtering',
  'Modern animations',
  'Reusable components',
];

export default function ProjectHighlights() {
  return (
    <section className="border-t border-white/10 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-xl font-bold text-white sm:text-2xl">Project Highlights</h2>
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {HIGHLIGHTS.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className="flex items-center gap-2 text-sm text-gray-300"
            >
              <Check className="h-4 w-4 shrink-0 text-[#E50914]" /> {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
