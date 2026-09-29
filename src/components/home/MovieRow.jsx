// src/components/home/MovieRow.jsx
'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ErrorState from './ErrorState';
import { RowSkeleton } from './Skeleton';
import MovieCard from './MovieCard';

// إعدادات الـ Animation للـ Container عشان الكروت تدخل ورا بعضها بسلاسة
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // المسافة الزمنية بين ظهور كل كارت واللي قبله
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 300, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' } 
  },
};

export default function MovieRow({ title, items, error, loading, variant = 'poster', showRank = false, showMatch = false, progressList = [] }) {
  const scrollerRef = useRef(null);

  function scrollBy(direction) {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.85, behavior: 'smooth' });
  }

  return (
    <section className="py-4 overflow-hidden">
      <h2 className="mb-2 px-4 text-lg font-semibold text-white sm:px-8 sm:text-xl">{title}</h2>

      {error && <ErrorState />}
      {!error && loading && <RowSkeleton />}

      {!error && !loading && items?.length > 0 && (
        <div className="group/row relative">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label={`Scroll ${title} left`}
            className="absolute left-0 top-0 z-10 hidden h-full w-10 items-center justify-center bg-gradient-to-r from-black/70 to-transparent text-white opacity-0 transition-opacity group-hover/row:opacity-100 sm:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* استخدام motion.div مع whileInView عشان يشتغل أول ما الكروت تظهر على الشاشة */}
          <motion.div
            ref={scrollerRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }} // الـ Animation هيشتغل مرة واحدة أول ما 20% من الـ Row يبان
            className="flex gap-3 overflow-x-auto scroll-smooth px-4 pb-2 overflow-y-hidden sm:px-8"
          >
            {items.map((item, index) => {
              const progressData = progressList[index];
              return (
                <motion.div key={item.id} variants={itemVariants} className="shrink-0">
                  <MovieCard 
                    item={item} 
                    style={variant}
                    rank={showRank ? index + 1 : undefined}
                    matchPercent={showMatch ? Math.min(99, Math.round((item.vote_average || 7) * 10 + 5)) : undefined}
                    progress={progressData?.progress}
                    remaining={progressData?.remaining}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label={`Scroll ${title} right`}
            className="absolute right-0 top-0 z-10 hidden h-full w-10 items-center justify-center bg-gradient-to-l from-black/70 to-transparent text-white opacity-0 transition-opacity group-hover/row:opacity-100 sm:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}