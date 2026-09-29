'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Film, Tv } from 'lucide-react';
import { posterUrl } from '../../lib/tmdb';

export default function MyListCard({ item, onRemove }) {
  const href = item.type === 'tv' ? `/series/${item.id}` : `/movies/${item.id}`;
  const date = item.release_date || item.first_air_date;
  const year = date ? date.slice(0, 4) : null;
  const image = posterUrl(item.poster_path, 'w500');

  return (
    <div className="group relative">
      <Link href={href} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-white/5 shadow-md">
          {image ? (
            <Image
              src={image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 200px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-500">
              {item.type === 'tv' ? <Tv className="h-8 w-8" /> : <Film className="h-8 w-8" />}
              <span className="text-[10px]">No image</span>
            </div>
          )}

          <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-gray-200">
            {item.type === 'tv' ? 'Series' : 'Movie'}
          </span>

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-2.5 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
            <p className="line-clamp-2 text-sm font-semibold text-white">{item.title}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
              {item.vote_average > 0 && <span>★ {item.vote_average.toFixed(1)}</span>}
              {year && <span>{year}</span>}
            </div>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => onRemove(item.id, item.type)}
        aria-label={`Remove ${item.title} from My List`}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white opacity-100 transition-colors duration-300 hover:bg-[#E50914] sm:opacity-0 sm:group-hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
