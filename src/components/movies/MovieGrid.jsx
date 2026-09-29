import Link from 'next/link';
import MovieCard from './MovieCard';
import Pagination from '../../app/movies/Pagination';

export default function MovieGrid({ movies, page, totalPages, error, hasActiveFilters }) {
  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
        <p className="text-sm text-gray-400">Failed to load movies right now.</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
        <p className="text-base font-semibold text-white">No Movies Found</p>
        <p className="text-sm text-gray-400">Try a different search term or adjust your filters.</p>
        {hasActiveFilters && (
          <Link
            href="/movies"
            className="rounded border border-white/20 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/10"
          >
            Clear Filters
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 sm:px-8 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
