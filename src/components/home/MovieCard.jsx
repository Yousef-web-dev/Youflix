'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, Check, Info } from 'lucide-react';
import { posterUrl, backdropUrl } from '../../lib/tmdb';
import { genreNames } from '../../lib/genres';
import { addToMyList, removeFromMyList, isInMyList } from '../../hooks/myList';
import TrailerModal from '../../components/movies/TrailerModal'; 

const RECENT_DAYS = 30;

function isRecentRelease(dateString) {
  if (!dateString) return false;
  const days = (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24);
  return days >= 0 && days <= RECENT_DAYS;
}

export default function MovieCard({ item, style = 'poster', rank, matchPercent, progress, remaining }) {
  const [added, setAdded] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const title = item.title || item.name;
  const dateString = item.release_date || item.first_air_date;
  const year = dateString ? dateString.slice(0, 4) : null;
  const isBackdrop = style === 'backdrop';
  const image = isBackdrop ? backdropUrl(item.backdrop_path, 'w780') : posterUrl(item.poster_path, 'w500');
  const genres = genreNames(item.genre_ids).slice(0, 2);
  const isNew = isRecentRelease(dateString);
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');

  const detailHref = mediaType === 'tv' ? `/series/${item.id}` : `/movies/${item.id}`;

  useEffect(() => {
    if (item) {
      setAdded(isInMyList(item.id, mediaType));
    }
  }, [item, mediaType]);

  const handleOpenTrailer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTrailer(true);
  };

  const handleToggleList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) {
      removeFromMyList(item.id);
      setAdded(false);
    } else {
      addToMyList(item, mediaType);
      setAdded(true);
    }
    window.dispatchEvent(new Event('mylist-updated'));
  };

  return (
    <>
      <motion.div
        className={`group relative shrink-0 ${isBackdrop ? 'w-72 sm:w-80 lg:w-96' : 'w-40 sm:w-52 lg:w-56'}`}
        whileHover={{ scale: 1.06, zIndex: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="relative overflow-hidden rounded-md bg-white/5">
          <Link href={detailHref} className="block">
            <div className={`relative overflow-hidden ${isBackdrop ? 'aspect-video' : 'aspect-[2/3]'}`}>
              {image ? (
                <Image src={image} alt={title} fill sizes="(max-width: 640px) 45vw, 260px" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-500">No image</div>
              )}
            </div>
          </Link>

          {rank && (
            <span
              className="absolute -left-1 bottom-0 z-10 text-6xl font-black italic leading-none text-black [-webkit-text-stroke:2px_#E50914] sm:text-7xl pointer-events-none"
              aria-hidden="true"
            >
              {rank}
            </span>
          )}

          {isNew && !rank && (
            <span className="absolute left-2 top-2 z-10 rounded bg-[#E50914] px-1.5 py-0.5 text-[10px] font-semibold text-white pointer-events-none">
              New
            </span>
          )}

          {progress != null && (
            <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-white/20">
              <div className="h-full bg-[#E50914]" style={{ width: `${progress}%` }} />
            </div>
          )}

          {/* معلومات الكارت والأزرار (تظهر دائماً على الموبايل وبتأثير الـ Hover على الشاشات الكبيرة) */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
            <Link href={detailHref} className="block">
              <p className="line-clamp-1 text-sm font-semibold text-white hover:underline">{title}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
                {item.vote_average > 0 && <span>★ {item.vote_average.toFixed(1)}</span>}
                {year && <span>{year}</span>}
              </div>
              {genres.length > 0 && <p className="mt-0.5 line-clamp-1 text-xs text-gray-400">{genres.join(' • ')}</p>}
              {matchPercent != null && (
                <p className="mt-1 text-xs font-semibold text-green-400">{matchPercent}% Match</p>
              )}
              {remaining && <p className="mt-1 text-xs text-gray-300">{remaining}</p>}
            </Link>

            <div className="mt-2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleOpenTrailer}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-black hover:text-white hover:scale-110 hover:bg-red-900 transition-colors duration-300"
                title="Play Trailer"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
              </button>

              <button
                type="button"
                onClick={handleToggleList}
                className="flex h-7 w-7 group cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/40 text-white transition-all hover:scale-110 hover:bg-red-900 hover:text-white duration-300"
                title={added ? "Remove from My List" : "Add to My List"}
              >
                {added ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Plus className="h-3.5 w-3.5" />}
              </button>

              <Link
                href={detailHref}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/50 bg-black/40 text-white transition-all hover:scale-110 hover:bg-red-900 duration-300"
                title="More Info"
              >
                <Info className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {showTrailer && (
        <TrailerModal
          id={item.id}
          title={title}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
}