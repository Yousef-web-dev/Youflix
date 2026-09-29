'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SeriesCard from './SeriesCard';

export default function SimilarSeries({ title, items }) {
  const scrollerRef = useRef(null);

  function scrollBy(direction) {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.85, behavior: 'smooth' });
  }

  if (!items || items.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-semibold text-white">{title}</h2>
      <div className="group/row relative">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label={`Scroll ${title} left`}
          className="absolute left-0 top-0 z-10 hidden h-full w-10 items-center justify-center bg-gradient-to-r from-black/70 to-transparent text-white opacity-0 transition-opacity group-hover/row:opacity-100 sm:flex"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div key={item.id} className="w-40 shrink-0 sm:w-48">
              <SeriesCard series={item} />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label={`Scroll ${title} right`}
          className="absolute right-0 top-0 z-10 hidden h-full w-10 items-center justify-center bg-gradient-to-l from-black/70 to-transparent text-white opacity-0 transition-opacity group-hover/row:opacity-100 sm:flex"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
