import {
  getPopularMovies,
  getTrendingMovies,
  getMovieGenres,
  searchMovies,
  discoverMovies,
} from "../../lib/tmdb";
import MoviesHeader from "../../components/movies/MoviesHeader";
import MovieSearch from "../../components/movies/MovieSearch";
import MovieFilters from "../../components/movies/MovieFilters";
import ContentRow from "../../components/movies/ContentRow";
import MovieGrid from "../../components/movies/MovieGrid";

export const metadata = {
  title: "Explore Movies | Youflix",
  description:
    "Search, filter, and discover movies from every genre on Youflix.",
  openGraph: {
    title: "Explore Movies | Youflix",
    description:
      "Search, filter, and discover movies from every genre on Youflix.",
    type: "website",
  },
};

async function safeFetch(fetcher) {
  try {
    const data = await fetcher();
    return { data, error: null };
  } catch (err) {
    console.error("[TMDB]", err.message);
    return { data: null, error: err.message };
  }
}

export default async function MoviesPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.query || "";
  const page = Number(params?.page) || 1;
  const hasActiveFilters = Boolean(
    params?.genre ||
    params?.year ||
    params?.rating ||
    params?.language ||
    params?.sort,
  );

  const genresResult = await safeFetch(getMovieGenres);

  const resultsResult = query
    ? await safeFetch(() => searchMovies(query, page))
    : await safeFetch(() =>
        discoverMovies(
          {
            genre: params?.genre,
            year: params?.year,
            rating: params?.rating,
            language: params?.language,
            sort: params?.sort,
          },
          page,
        ),
      );

  const showCuratedRows = !query && !hasActiveFilters;
  const [popular, trending] = showCuratedRows
    ? await Promise.all([
        safeFetch(getPopularMovies),
        safeFetch(getTrendingMovies),
      ])
    : [
        { data: null, error: null },
        { data: null, error: null },
      ];

  return (
    <div className="pb-16">
      <MoviesHeader />

      <div className="mb-6 flex flex-col gap-3 px-4 sm:px-8">
        <MovieSearch />
        <MovieFilters genres={genresResult.data || []} />
      </div>

      {showCuratedRows && (
        <>
          <ContentRow
            title="Popular Movies"
            items={popular.data}
            error={popular.error}
          />
          <ContentRow
            title="Trending Now"
            items={trending.data}
            error={trending.error}
          />
          <h2 className="mb-2 px-4 pt-4 text-lg font-semibold text-white sm:px-8 sm:text-xl">
            All Movies
          </h2>
        </>
      )}

      <MovieGrid
        movies={resultsResult.data?.results}
        page={page}
        totalPages={Math.min(resultsResult.data?.total_pages || 1, 500)}
        error={resultsResult.error}
        hasActiveFilters={hasActiveFilters || Boolean(query)}
      />
    </div>
  );
}
