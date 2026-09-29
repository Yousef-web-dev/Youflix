import GenreResultsSkeleton from '../../components/genres/GenreResultsSkeleton';

export default function LoadingGenres() {
  return (
    <div className="px-4 pb-16 pt-28 sm:px-8">
      <div className="skeleton-shimmer mb-6 h-8 w-48 rounded" />
      <GenreResultsSkeleton />
    </div>
  );
}
