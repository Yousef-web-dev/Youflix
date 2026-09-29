'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, Check, Info } from 'lucide-react';
import { posterUrl, backdropUrl } from '../../lib/tmdb';
import { genreNames } from '../../lib/genres';
import useMyList from '../../hooks/useMyList';

const RECENT_DAYS = 30;

function isRecentRelease(dateString) {
  if (!dateString) return false;
  const days = (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24);
  return days >= 0 && days <= RECENT_DAYS;
}

/**
 * type: 'movie' (default) | 'tv' — pass 'tv' from any section that renders
 * series data (e.g. Popular Series) so My List and routing stay correct.
 */
export default function MovieCard({ item, style = 'poster', type = 'movie', rank, matchPercent, progress, remaining }) {
  const { isInList, toggle } = useMyList();

  const title = item.title || item.name;
  const dateString = item.release_date || item.first_air_date;
  const year = dateString ? dateString.slice(0, 4) : null;
  const isBackdrop = style === 'backdrop';
  const image = isBackdrop ? backdropUrl(item.backdrop_path, 'w780') : posterUrl(item.poster_path, 'w500');
  const genres = genreNames(item.genre_ids).slice(0, 2);
  const isNew = isRecentRelease(dateString);
  const inList = isInList(item.id, type);
  const detailHref = type === 'tv' ? `/series/${item.id}` : `/movies/${item.id}`;

  return (
    <motion.div
      className={`group relative shrink-0 ${isBackdrop ? 'w-72 sm:w-80 lg:w-96' : 'w-40 sm:w-52 lg:w-56'}`}
      whileHover={{ scale: 1.06, zIndex: 20 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Link href={detailHref} className="block">
        <div
          className={`relative overflow-hidden rounded-md bg-white/5 ${
            isBackdrop ? 'aspect-video' : 'aspect-[2/3]'
          }`}
        >
          {image ? (
            <Image src={image} alt={title} fill sizes="(max-width: 640px) 45vw, 260px" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-500">No image</div>
          )}

          {rank && (
            <span
              className="absolute -left-1 bottom-0 text-6xl font-black italic leading-none text-black [-webkit-text-stroke:2px_#E50914] sm:text-7xl"
              aria-hidden="true"
            >
              {rank}
            </span>
          )}

          {isNew && !rank && (
            <span className="absolute left-2 top-2 rounded bg-[#E50914] px-1.5 py-0.5 text-[10px] font-semibold text-white">
              New
            </span>
          )}

          {progress != null && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="h-full bg-[#E50914]" style={{ width: `${progress}%` }} />
            </div>
          )}

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-2.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <p className="line-clamp-1 text-sm font-semibold text-white">{title}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
              {item.vote_average > 0 && <span>★ {item.vote_average.toFixed(1)}</span>}
              {year && <span>{year}</span>}
            </div>
            {genres.length > 0 && <p className="mt-0.5 line-clamp-1 text-xs text-gray-400">{genres.join(' • ')}</p>}
            {matchPercent != null && (
              <p className="mt-1 text-xs font-semibold text-green-400">{matchPercent}% Match</p>
            )}
            {remaining && <p className="mt-1 text-xs text-gray-300">{remaining}</p>}

            <div className="mt-2 flex items-center gap-1.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  toggle(item, type);
                }}
                aria-label={inList ? 'Remove from My List' : 'Add to My List'}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:bg-white/10"
              >
                {inList ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </button>
              <Link
                href={detailHref}
                aria-label="More info"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/50 text-white"
              >
                <Info className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
