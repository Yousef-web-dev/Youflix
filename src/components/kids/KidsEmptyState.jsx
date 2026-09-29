import Link from 'next/link';

export default function KidsEmptyState({ isSearch }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
      <p className="text-base font-semibold text-white">No titles found.</p>
      <p className="text-sm text-gray-400">
        {isSearch ? 'Try searching for another movie or series.' : 'Try another category or adjust your filters.'}
      </p>
      <Link
        href="/kids"
        className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/10"
      >
        {isSearch ? 'Clear Search' : 'Reset'}
      </Link>
    </div>
  );
}
