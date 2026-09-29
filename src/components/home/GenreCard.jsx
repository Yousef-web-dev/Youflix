'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function GenreCard({ genre }) {
  return (
    <Link href={`/genres?type=${genre.type}&genre=${genre.id}`} className="group relative block h-32 overflow-hidden rounded-lg sm:h-36">
      {genre.image ? (
        <Image
          src={genre.image}
          alt=""
          fill
          sizes="(max-width: 640px) 45vw, 220px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${genre.gradient}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-colors duration-300 group-hover:from-black/95" />
      <span className="absolute bottom-3 left-4 text-lg font-bold text-white drop-shadow-md sm:text-xl">
        {genre.name}
      </span>
    </Link>
  );
}