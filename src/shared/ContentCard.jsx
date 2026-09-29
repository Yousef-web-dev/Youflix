'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Check, Plus, Info } from 'lucide-react';
import { posterUrl } from '../lib/tmdb';
import useMyList from '../hooks/useMyList';
import TrailerModal from '../components/new-and-popular/TrailerModal';

export default function ContentCard({ item, type = 'movie' }) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { isInList, toggle } = useMyList();

  if (!item) return null;

  const title = item.title || item.name || 'Untitled';
  const dateString = item.release_date || item.first_air_date;
  const year = dateString ? dateString.slice(0, 4) : null;
  const image = posterUrl(item.poster_path, 'w500');
  const inList = item.id ? isInList(item.id, type) : false;
  const href = type === 'tv' ? `/series/${item.id}` : `/movies/${item.id}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03, zIndex: 10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="group relative"
      >
        <Link href={href} className="block">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-white/5 shadow-md transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/60">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 200px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-500">No image</div>
            )}

            <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-gray-200">
              {type === 'tv' ? 'Series' : 'Movie'}
            </span>

            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-3 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
              <p className="line-clamp-2 text-sm font-semibold text-white">{title}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
                {item.vote_average > 0 && <span>★ {item.vote_average.toFixed(1)}</span>}
                {year && <span>{year}</span>}
              </div>

              <div className="mt-2 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setTrailerOpen(true);
                  }}
                  aria-label="Watch trailer"
                  className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-red-900 hover:text-white  cursor-pointer  bg-white text-black transition-all duration-300"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    toggle(item, type);
                  }}
                  aria-label={inList ? 'Remove from My List' : 'Add to My List'}
                  className="flex h-7 w-7 items-center justify-center rounded-full border hover:bg-red-900 border-white/50 text-white transition-all duration-300"
                >
                  {inList ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Plus className="h-3.5 w-3.5" />}
                </button>
                
                {/* تم تعديل زرار More info من Link إلى div/span أو اترك الضغط العام للكارد */}
                <div
                  aria-label="More info"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/50 hover:bg-red-900 text-white transition-all duration-300"
                >
                  <Info className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {trailerOpen && <TrailerModal id={item.id} type={type} title={title} onClose={() => setTrailerOpen(false)} />}
    </>
  );
}