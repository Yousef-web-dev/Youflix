'use client';

import Link from 'next/link';
import { Bookmark, SearchX } from 'lucide-react';

export default function MyListEmptyState({ reason = 'empty' }) {
  if (reason === 'search') {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
        <SearchX className="h-10 w-10 text-gray-600" />
        <p className="text-base font-semibold text-white">No matching results found</p>
        <p className="text-sm text-gray-400">Try a different search term.</p>
      </div>
    );
  }

  if (reason === 'movies') {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
        <p className="text-base font-semibold text-white">No saved movies found</p>
        <Link
          href="/movies"
          className="rounded border border-white/20 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/10"
        >
          Explore Movies
        </Link>
      </div>
    );
  }

  if (reason === 'series') {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
        <p className="text-base font-semibold text-white">No saved series found</p>
        <Link
          href="/series"
          className="rounded border border-white/20 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/10"
        >
          Explore Series
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-20 text-center">
      <Bookmark className="h-12 w-12 text-gray-600" />
      <div>
        <p className="text-lg font-semibold text-white">Your List Is Empty</p>
        <p className="mt-1 text-sm text-gray-400">Start adding movies and series to build your personal watchlist.</p>
      </div>
      <div className="flex gap-3">
        <Link
          href="/movies"
          className="rounded bg-[#E50914] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#f6121d]"
        >
          Explore Movies
        </Link>
        <Link
          href="/series"
          className="rounded border border-white/30 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Explore Series
        </Link>
      </div>
    </div>
  );
}
