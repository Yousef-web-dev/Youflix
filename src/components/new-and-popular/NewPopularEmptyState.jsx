import Link from 'next/link';

export default function NewPopularEmptyState({ hasActiveFiltersOrQuery }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
      <p className="text-base font-semibold text-white">No results found</p>
      <p className="text-sm text-gray-400">Try another search or change your filters.</p>
      {hasActiveFiltersOrQuery && (
        <Link
          href="/new-and-popular"
          className="rounded border border-white/20 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/10"
        >
          Reset Filters
        </Link>
      )}
    </div>
  );
}
