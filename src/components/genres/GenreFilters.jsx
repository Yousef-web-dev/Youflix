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

export default function GenreFilters({ type }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sorts = [
    { label: 'Popularity', value: 'popularity.desc' },
    { label: 'Rating', value: 'vote_average.desc' },
    { label: 'Release Date', value: type === 'tv' ? 'first_air_date.desc' : 'release_date.desc' },
    { label: 'Title A-Z', value: type === 'tv' ? 'name.asc' : 'title.asc' },
  ];

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

  function resetFilters() {
    const params = new URLSearchParams(searchParams.toString());
    ['year', 'rating', 'language', 'sort', 'page'].forEach((key) => params.delete(key));
    router.push(`${pathname}?${params.toString()}`);
  }

  const hasActiveFilters = ['year', 'rating', 'language', 'sort'].some((key) => searchParams.get(key));
  const selectClass = 'rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-white focus:outline-none';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={searchParams.get('year') || ''}
        onChange={(event) => updateParam('year', event.target.value)}
        aria-label={type === 'tv' ? 'Filter by first air year' : 'Filter by release year'}
        className={selectClass}
      >
        <option value="">{type === 'tv' ? 'Any First Air Year' : 'Any Year'}</option>
        {YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get('rating') || ''}
        onChange={(event) => updateParam('rating', event.target.value)}
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
        aria-label="Sort by"
        className={selectClass}
      >
        {sorts.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={resetFilters}
          className="rounded-lg border border-white/15 px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/10"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
