'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import GenreTabs from './GenreTabs';
import GenreSearch from './GenreSearch';
import FeaturedGenres from './FeaturedGenres';
import GenresGrid from './GenresGrid';

export default function GenresBrowser({ allGenres }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  const urlType = searchParams.get('type');
  const activeType = urlType === 'movie' || urlType === 'tv' ? urlType : 'all';
  const selectedGenreId = searchParams.get('genre');

  const typeFiltered = useMemo(() => {
    if (activeType === 'all') return allGenres;
    return allGenres.filter((g) => g.type === activeType);
  }, [allGenres, activeType]);

  const searched = useMemo(() => {
    if (!query.trim()) return typeFiltered;
    const q = query.trim().toLowerCase();
    return typeFiltered.filter((g) => g.name.toLowerCase().includes(q));
  }, [typeFiltered, query]);

  // A genre is selected: keep just the tabs so the user can switch type,
  // and let the selected genre's results render immediately below instead
  // of being pushed under the full browsing sections.
  if (selectedGenreId) {
    return (
      <div className="px-4 sm:px-8">
        <GenreTabs />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8">
      <GenreTabs />

      <div className="my-4">
        <GenreSearch value={query} onChange={setQuery} />
      </div>

      {!query.trim() && <FeaturedGenres genres={typeFiltered} />}

      <section className="py-4">
        <h2 className="mb-3 text-lg font-semibold text-white sm:text-xl">Browse All Genres</h2>
        <GenresGrid genres={searched} selectedGenreId={selectedGenreId} selectedType={activeType} />
      </section>
    </div>
  );
}