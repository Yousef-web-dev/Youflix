import NewPopularSkeleton from '../../components/new-and-popular/NewPopularSkeleton';

export default function LoadingNewPopular() {
  return (
    <div className="px-4 pb-16 pt-28 sm:px-8">
      <div className="skeleton-shimmer mb-6 h-8 w-64 rounded" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <NewPopularSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
