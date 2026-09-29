export default function MyListSkeleton() {
  return (
    <div className="px-4 pb-16 pt-28 sm:px-8">
      <div className="skeleton-shimmer mb-6 h-8 w-48 rounded" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i}>
            <div className="skeleton-shimmer aspect-[2/3] rounded-lg" />
            <div className="skeleton-shimmer mt-2 h-3 w-3/4 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
