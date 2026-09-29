import Link from 'next/link';
import { X } from 'lucide-react';

export default function SelectedGenreHeader({ genreName, type }) {
  return (
    <div className="mb-3 flex items-center justify-between px-4 sm:px-8">
      <h2 className="text-lg font-semibold text-white sm:text-xl">
        {genreName} {type === 'tv' ? 'Series' : 'Movies'}
      </h2>
      <Link
        href="/genres"
        aria-label="Clear selected genre"
        className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white"
      >
        <X className="h-4 w-4" /> Reset
      </Link>
    </div>
  );
}
