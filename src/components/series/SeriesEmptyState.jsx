import Link from 'next/link';

export default function SeriesEmptyState({ hasActiveFilters }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
      <p className="text-base font-semibold text-white">No Series Found</p>
      <p className="text-sm text-gray-400">Try a different search term or adjust your filters.</p>
      {hasActiveFilters && (
        <Link
          href="/series"
          className="rounded border border-white/20 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/10"
        >
          Clear Filters
        </Link>
      )}
    </div>
  );
}
