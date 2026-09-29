'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from '../../shared/ContentCard';

export default function NewPopularSection({ title, items, error, type = 'movie' }) {
  const scrollerRef = useRef(null);

  function scrollBy(direction) {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.85, behavior: 'smooth' });
  }

  if (error) {
    return (
      <section className="py-4">
        <h2 className="mb-2 px-4 text-lg font-semibold text-white sm:px-8 sm:text-xl">{title}</h2>
        <p className="px-4 text-sm text-gray-500 sm:px-8">Couldn't load this section right now.</p>
      </section>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <section className="py-4">
      <h2 className="mb-2 px-4 text-lg font-semibold text-white sm:px-8 sm:text-xl">{title}</h2>
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
          className="flex gap-3 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => {
            // تحديد النوع تلقائياً سواء كان جاي من الكارت أو مثبت للنظام
            const itemType = item.media_type || type;
            return (
              <div key={`${itemType}-${item.id}`} className="w-40 shrink-0 sm:w-48">
                <ContentCard item={item} type={itemType} />
              </div>
            );
          })}
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