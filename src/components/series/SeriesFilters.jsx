'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 40 }, (_, i) => CURRENT_YEAR - i);
const RATINGS = [
  { label: 'Any Rating', value: '' },
  { label: '9+', value: '9' },
  { label: '8+', value: '8' },
  { label: '7+', value: '7' },
  { label: '6+', value: '6' },
];
const LANGUAGES = [
  { label: 'Any Language', value: '' },
  { label: 'English', value: 'en' },
  { label: 'Arabic', value: 'ar' },
  { label: 'French', value: 'fr' },
  { label: 'Spanish', value: 'es' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Hindi', value: 'hi' },
];
const SORTS = [
  { label: 'Popularity', value: 'popularity.desc' },
  { label: 'Latest', value: 'first_air_date.desc' },
  { label: 'Top Rated', value: 'vote_average.desc' },
];

export default function SeriesFilters({ genres }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasQuery = Boolean(searchParams.get('query'));
  const hasActiveFilters = ['genre', 'year', 'rating', 'language', 'sort'].some((key) => searchParams.get(key));

  function updateParam(key, val) {
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set(key, val);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());
    ['genre', 'year', 'rating', 'language', 'sort'].forEach((key) => params.delete(key));
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  }

  const selectClass =
    'rounded-lg border cursor-pointer border-white/15 bg-white/5 px-3 py-2 text-sm text-red-500/70 focus:border-white focus:outline-none disabled:opacity-40';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={searchParams.get('genre') || ''}
        onChange={(event) => updateParam('genre', event.target.value)}
        disabled={hasQuery}
        aria-label="Filter by genre"
        className={selectClass}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get('year') || ''}
        onChange={(event) => updateParam('year', event.target.value)}
        disabled={hasQuery}
        aria-label="Filter by first air year"
        className={selectClass}
      >
        <option value="">Any Year</option>
        {YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get('rating') || ''}
        onChange={(event) => updateParam('rating', event.target.value)}
        disabled={hasQuery}
        aria-label="Filter by minimum rating"
        className={selectClass}
      >
        {RATINGS.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get('language') || ''}
        onChange={(event) => updateParam('language', event.target.value)}
        disabled={hasQuery}
        aria-label="Filter by language"
        className={selectClass}
      >
        {LANGUAGES.map((l) => (
          <option key={l.value} value={l.value}>
            {l.label}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get('sort') || 'popularity.desc'}
        onChange={(event) => updateParam('sort', event.target.value)}
        disabled={hasQuery}
        aria-label="Sort by"
        className={selectClass}
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      {(hasActiveFilters || hasQuery) && (
        <button
          type="button"
          onClick={hasQuery ? () => router.push(pathname) : clearFilters}
          className="rounded-lg border border-white/15 px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10"
        >
          Clear {hasQuery ? 'Search' : 'Filters'}
        </button>
      )}

      {hasQuery && (
        <p className="w-full text-xs text-gray-500">
          Filters are disabled while searching — clear the search to filter by genre, year, rating, or language.
        </p>
      )}
    </div>
  );
}
