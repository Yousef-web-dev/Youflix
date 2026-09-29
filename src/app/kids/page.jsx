import Link from 'next/link';
import { X } from 'lucide-react';
import {
  getKidsMovies,
  getKidsSeries,
  searchMovies,
  searchSeries,
  getGenreBackdrop,
  backdropUrl,
} from '../../lib/tmdb';
import KidsHero from '../../components/kids/KidsHero';
import KidsTabs from '../../components/kids/KidsTabs';
import KidsSearch from '../../components/kids/KidsSearch';
import KidsCategories from '../../components/kids/KidsCategories';
import KidsFeatured from '../../components/kids/KidsFeatured';
import KidsSection from '../../components/kids/KidsSection';
import KidsFilters from '../../components/kids/KidsFilters';
import KidsResults from '../../components/kids/KidsResults';
import KidsErrorState from '../../components/kids/KidsErrorState';
import { KIDS_CATEGORIES } from '../../data/categories';

export const metadata = {
  title: 'Kids & Family | Youflix',
  description: 'Discover family-friendly movies, animated adventures, and series on Youflix.',
};

async function safeFetch(fetcher) {
  try {
    const data = await fetcher();
    return { data, error: null };
  } catch (err) {
    console.error('[TMDB]', err.message);
    return { data: null, error: err.message };
  }
}

function tag(results, mediaType) {
  return (results || []).map((item) => ({ ...item, media_type: mediaType }));
}

// Combine movies + series into one row, sorted by the given field (default: popularity).
function mergeTagged(movies, series, limit = 20, sortKey = 'popularity') {
  return [...tag(movies, 'movie'), ...tag(series, 'tv')]
    .sort((a, b) => (b[sortKey] ?? 0) - (a[sortKey] ?? 0))
    .slice(0, limit);
}

export default async function KidsPage({ searchParams }) {
  const params = await searchParams;
  const urlType = params?.type === 'movie' || params?.type === 'tv' ? params.type : 'all';
  const query = params?.query || '';
  const genre = params?.genre;

  // ---------- Mode 1: search ----------
  if (query) {
    const result = await safeFetch(async () => {
      if (urlType === 'movie') {
        const data = await searchMovies(query, 1);
        return { results: tag(data.results, 'movie'), total_pages: data.total_pages };
      }
      if (urlType === 'tv') {
        const data = await searchSeries(query, 1);
        return { results: tag(data.results, 'tv'), total_pages: data.total_pages };
      }
      const [m, s] = await Promise.all([searchMovies(query, 1), searchSeries(query, 1)]);
      return { results: mergeTagged(m.results, s.results, 40), total_pages: 1 };
    });

    return (
      <div className="pb-16">
        <KidsHero />
        <div className="mb-4 flex flex-col gap-4 px-4 sm:px-8">
          <KidsTabs />
          <KidsSearch />
        </div>
        <h2 className="mb-3 px-4 text-lg font-semibold text-white sm:px-8 sm:text-xl">Search Results</h2>
        <KidsResults
          key={`search-${urlType}-${query}`}
          initialResults={result.data?.results}
          initialTotalPages={result.data?.total_pages}
          initialError={result.error}
          type={urlType}
          query={query}
        />
      </div>
    );
  }

  // ---------- Mode 2: a selected category ----------
  if (genre) {
    const type = urlType === 'tv' ? 'tv' : 'movie';
    const category = KIDS_CATEGORIES.find((c) => String(c.id) === String(genre));
    const categoryName = category?.name || 'Selected';

    const options = { page: 1, genre, sort_by: params?.sort || 'popularity.desc' };
    if (params?.rating) options['vote_average.gte'] = params.rating;
    if (params?.language) options.with_original_language = params.language;
    if (params?.year) {
      if (type === 'tv') options.first_air_date_year = params.year;
      else options.primary_release_year = params.year;
    }

    const result = await safeFetch(async () => {
      const data = type === 'tv' ? await getKidsSeries(options) : await getKidsMovies(options);
      return { results: tag(data.results, type), total_pages: data.total_pages };
    });

    const resultsKey = `${type}-${genre}-${params?.year || ''}-${params?.rating || ''}-${params?.language || ''}-${params?.sort || ''}`;

    return (
      <div className="pb-16">
        <KidsHero />
        <div className="mb-4 flex flex-col gap-4 px-4 sm:px-8">
          <KidsTabs />
          <KidsSearch />
        </div>

        <div className="mb-3 flex items-center justify-between px-4 sm:px-8">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            {categoryName} {type === 'tv' ? 'Series' : 'Movies'}
          </h2>
          <Link
            href="/kids"
            aria-label="Clear selected category"
            className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" /> Reset
          </Link>
        </div>

        <div className="mb-4 px-4 sm:px-8">
          <KidsFilters type={type} />
        </div>

        <KidsResults
          key={resultsKey}
          initialResults={result.data?.results}
          initialTotalPages={result.data?.total_pages}
          initialError={result.error}
          type={type}
          genre={genre}
        />
      </div>
    );
  }

  // ---------- Mode 3: default curated view ----------
  const wantMovies = urlType !== 'tv';
  const wantSeries = urlType !== 'movie';
  const skip = Promise.resolve({ data: null, error: null });
  const ratedOptions = { sort_by: 'vote_average.desc', 'vote_count.gte': 200 };

  const [
    popularMovies,
    popularSeries,
    animationMovies,
    animationSeries,
    familyMovies,
    familySeries,
    comedyMovies,
    comedySeries,
    ratedMovies,
    ratedSeries,
    ...categoryBackdrops
  ] = await Promise.all([
    wantMovies ? safeFetch(() => getKidsMovies({})) : skip,
    wantSeries ? safeFetch(() => getKidsSeries({})) : skip,
    wantMovies ? safeFetch(() => getKidsMovies({ genre: 16 })) : skip,
    wantSeries ? safeFetch(() => getKidsSeries({ genre: 16 })) : skip,
    wantMovies ? safeFetch(() => getKidsMovies({ genre: 10751 })) : skip,
    wantSeries ? safeFetch(() => getKidsSeries({ genre: 10751 })) : skip,
    wantMovies ? safeFetch(() => getKidsMovies({ genre: 35 })) : skip,
    wantSeries ? safeFetch(() => getKidsSeries({ genre: 35 })) : skip,
    wantMovies ? safeFetch(() => getKidsMovies(ratedOptions)) : skip,
    wantSeries ? safeFetch(() => getKidsSeries(ratedOptions)) : skip,
    ...KIDS_CATEGORIES.map((c) => safeFetch(() => getGenreBackdrop(c.id))),
  ]);

  const categoryImages = {};
  KIDS_CATEGORIES.forEach((c, i) => {
    const path = categoryBackdrops[i]?.data;
    categoryImages[c.id] = path ? backdropUrl(path, 'w500') : null;
  });

  const popularMovieItems = tag(popularMovies.data?.results, 'movie');
  const popularSeriesItems = tag(popularSeries.data?.results, 'tv');

  // Featured: the most popular real title (with a backdrop) for the selected type.
  const featuredPool = [...popularMovieItems, ...popularSeriesItems].sort(
    (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)
  );
  const featured = featuredPool.find((item) => item.backdrop_path) || featuredPool[0] || null;

  const allFailed =
    (!wantMovies || popularMovies.error) && (!wantSeries || popularSeries.error) && !featured;

  return (
    <div className="pb-16">
      <KidsHero />

      <div className="mb-4 flex flex-col gap-4 px-4 sm:px-8">
        <KidsTabs />
        <KidsSearch />
      </div>

      {allFailed ? (
        <KidsErrorState />
      ) : (
        <>
          <KidsFeatured item={featured} />
          <KidsCategories images={categoryImages} />

          {wantMovies && <KidsSection title="Popular Kids Movies" items={popularMovieItems} />}
          {wantSeries && <KidsSection title="Popular Kids Series" items={popularSeriesItems} />}

          <KidsSection
            title="Animation Adventures"
            items={mergeTagged(animationMovies.data?.results, animationSeries.data?.results)}
          />
          <KidsSection
            title="Family Favorites"
            items={mergeTagged(familyMovies.data?.results, familySeries.data?.results)}
          />
          <KidsSection title="Comedy" items={mergeTagged(comedyMovies.data?.results, comedySeries.data?.results)} />
          <KidsSection
            title="Highly Rated"
            items={mergeTagged(ratedMovies.data?.results, ratedSeries.data?.results, 20, 'vote_average')}
          />
        </>
      )}
    </div>
  );
}
