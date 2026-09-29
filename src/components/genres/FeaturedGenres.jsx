'use client';

import { motion } from 'framer-motion';
import GenreCard from './GenreCard';

const FEATURED_NAMES = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Science Fiction', 'Thriller', 'Adventure'];

export default function FeaturedGenres({ genres }) {
  const featured = FEATURED_NAMES.map((name) => genres.find((g) => g.name.includes(name)))
    .filter(Boolean)
    .slice(0, 8);

  if (featured.length === 0) return null;

  return (
    <section className="py-4">
      <h2 className="mb-3 text-lg font-semibold text-white sm:text-xl">Popular Genres</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {featured.map((genre, index) => (
<motion.div
  key={`${genre.type}-${genre.id}-${index}`}
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.05 }}
>
            <GenreCard genre={genre} index={index} withDescription />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
