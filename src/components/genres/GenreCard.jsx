import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Film } from 'lucide-react';
import { getGenreDescription } from '../../app/genres/genreDescriptions';

export default function GenreCard({ genre, withDescription = false, isActive = false }) {
  const href = `/genres?type=${genre.type}&genre=${genre.id}`;

  return (
    <Link
      href={href}
      className={`group relative flex h-28 flex-col justify-end overflow-hidden rounded-lg bg-[#141414] p-4 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:h-32 ${
        isActive ? 'ring-2 ring-[#E50914]' : ''
      }`}
    >
      {genre.image ? (
        <Image
          src={genre.image}
          alt=""
          fill
          sizes="(max-width: 640px) 45vw, 220px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-black">
          <Film className="h-6 w-6 text-white/10" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-colors duration-300 group-hover:from-black/95" />

      <div className="relative flex items-center justify-between gap-2">
        <span className="text-base font-bold text-white drop-shadow sm:text-lg">{genre.name}</span>
        <ArrowRight className="h-4 w-4 shrink-0 text-white/80 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
      {withDescription && (
        <p className="relative mt-1 line-clamp-2 text-xs text-white/80">{getGenreDescription(genre.name)}</p>
      )}

      <span className="absolute right-2 top-2 z-10 rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold text-white/90">
        {genre.type === 'tv' ? 'Series' : 'Movie'}
      </span>
    </Link>
  );
}