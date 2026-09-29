export function CardSkeleton() {
  return (
    <div className="w-36 shrink-0 sm:w-44">
      <div className="skeleton-shimmer aspect-[2/3] rounded-lg" />
      <div className="skeleton-shimmer mt-2 h-3 w-3/4 rounded-full" />
      <div className="skeleton-shimmer mt-1.5 h-2.5 w-1/2 rounded-full" />
    </div>
  );
}

export function RowSkeleton({ count = 6 }) {
  return (
    <div className="flex gap-3 overflow-hidden px-4 sm:px-8" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}