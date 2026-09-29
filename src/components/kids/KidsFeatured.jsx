'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, Check, Info } from 'lucide-react';
import { backdropUrl } from '../../lib/tmdb';
import useMyList from '../../hooks/useMyList';
import TrailerModal from '../../components/movies/TrailerModal';

export default function KidsFeatured({ item }) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { isInList, toggle } = useMyList();

  if (!item) return null;

  const title = item.title || item.name;
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);
  const href = item.media_type === 'tv' ? `/series/${item.id}` : `/movies/${item.id}`;
  const inList = isInList(item.id, item.media_type);

  return (
    <section className="px-4 sm:px-8" aria-labelledby="kids-featured-heading">
      <h2 id="kids-featured-heading" className="mb-3 text-lg font-semibold text-white sm:text-xl">
        Featured for the Family
      </h2>
      <div className="relative overflow-hidden rounded-3xl">
        <div className="relative h-[38vh] min-h-[260px] w-full sm:h-[44vh]">
          {item.backdrop_path ? (
            <Image src={backdropUrl(item.backdrop_path)} alt="" fill priority className="object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#1a1a1a] via-black to-[#141414]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
          <span className="mb-2 inline-block rounded-full border border-white/30 px-2.5 py-0.5 text-[11px] font-semibold text-white">
            {item.media_type === 'tv' ? 'Series' : 'Movie'}
          </span>
          <h3 className="max-w-lg text-xl font-black text-white sm:text-3xl">{title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-300">
            {item.vote_average > 0 && <span className="text-green-400">★ {item.vote_average.toFixed(1)}</span>}
            {year && <span>{year}</span>}
          </div>
          <p className="mt-2 line-clamp-2 max-w-lg text-sm text-gray-200">
            {item.overview || 'Discover this title on Youflix.'}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setTrailerOpen(true)}
              className="flex items-center gap-2 ho rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-red-900 cursor-pointer hover:text-white"
            >
              <Play className="h-4 w-4 fill-current" />
              Watch Trailer 
            </button>
            <button
              type="button"
              onClick={() => toggle(item, item.media_type)}
              className="flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              {inList ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {inList ? 'In My List' : 'My List'}
            </button>
            <Link
              href={href}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:text-white"
            >
              <Info className="h-4 w-4" />
              View Details
            </Link>
          </div>
        </div>
      </div>

      {trailerOpen && (
        <TrailerModal id={item.id} type={item.media_type} title={title} onClose={() => setTrailerOpen(false)} />
      )}
    </section>
  );
}
