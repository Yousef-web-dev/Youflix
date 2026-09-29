import {
  getTrendingAll,
  getPopularMovies,
  getPopularSeries,
  getNowPlayingMovies,
  getUpcomingMovies,
  getAiringTodaySeries,
  getOnTheAirSeries,
  getTopRatedMovies,
  getTopRatedSeries,
  getMovieGenres,
  getSeriesGenres,
  searchMovies,
  searchSeries,
  discoverMovies,
  discoverSeries,
} from "../../lib/tmdb";
import NewPopularHeader from "../../components/new-and-popular/NewPopularHeader";
import NewPopularTabs from "../../components/new-and-popular/NewPopularTabs";
import NewPopularSearch from "../../components/new-and-popular/NewPopularSearch";
import NewPopularFilters from "../../components/new-and-popular/NewPopularFilters";
import NewPopularSection from "../../components/new-and-popular/NewPopularSection";
import NewPopularGrid from "../../components/new-and-popular/NewPopularGrid";
import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: "New & Popular | Youflix",
  description:
    "Discover new releases, trending movies, popular series, and top-rated content on Youflix.",
  openGraph: {
    title: "New & Popular | Youflix",
    description:
      "Discover new releases, trending movies, popular series, and top-rated content on Youflix.",
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

function tag(results, mediaType) {
  return (results || []).map((item) => ({ ...item, media_type: mediaType }));
}

export default async function NewPopularPage({ searchParams }) {
  const params = await searchParams;
  const urlType = params?.type;
  const activeType =
    urlType === "movies" || urlType === "series" ? urlType : "all";
  const query = params?.query || "";
  const page = Number(params?.page) || 1;
  const hasActiveFilters =
    activeType !== "all" &&
    Boolean(
      params?.genre ||
      params?.year ||
      params?.rating ||
      params?.language ||
      params?.sort,
    );

  const [movieGenresResult, seriesGenresResult] = await Promise.all([
    safeFetch(getMovieGenres),
    safeFetch(getSeriesGenres),
  ]);

  let resultsResult = { data: null, error: null };
  let showResultsGrid = false;
  let showPagination = false;

  if (query) {
    showResultsGrid = true;
    if (activeType === "movies") {
      resultsResult = await safeFetch(async () => {
        const data = await searchMovies(query, page);
        return {
          results: tag(data.results, "movie"),
          total_pages: data.total_pages,
        };
      });
      showPagination = true;
    } else if (activeType === "series") {
      resultsResult = await safeFetch(async () => {
        const data = await searchSeries(query, page);
        return {
          results: tag(data.results, "tv"),
          total_pages: data.total_pages,
        };
      });
      showPagination = true;
    } else {
      resultsResult = await safeFetch(async () => {
        const [m, s] = await Promise.all([
          searchMovies(query, 1),
          searchSeries(query, 1),
        ]);
        const merged = [
          ...tag(m.results, "movie"),
          ...tag(s.results, "tv"),
        ].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
        return { results: merged, total_pages: 1 };
      });
      showPagination = false;
    }
  } else if (hasActiveFilters) {
    showResultsGrid = true;
    showPagination = true;
    if (activeType === "movies") {
      resultsResult = await safeFetch(async () => {
        const data = await discoverMovies(
          {
            genre: params?.genre,
            year: params?.year,
            rating: params?.rating,
            language: params?.language,
            sort: params?.sort,
          },
          page,
        );
        return {
          results: tag(data.results, "movie"),
          total_pages: data.total_pages,
        };
      });
    } else {
      resultsResult = await safeFetch(async () => {
        const data = await discoverSeries(
          {
            genre: params?.genre,
            year: params?.year,
            rating: params?.rating,
            language: params?.language,
            sort: params?.sort,
          },
          page,
        );
        return {
          results: tag(data.results, "tv"),
          total_pages: data.total_pages,
        };
      });
    }
  }

  const showCurated = !showResultsGrid;
  let curated = null;

  if (showCurated) {
    const [
      trending,
      popularMovies,
      popularSeries,
      nowPlaying,
      upcoming,
      airingToday,
      onTheAir,
      topRatedMovies,
      topRatedSeries,
    ] = await Promise.all([
      safeFetch(getTrendingAll),
      safeFetch(getPopularMovies),
      safeFetch(getPopularSeries),
      safeFetch(getNowPlayingMovies),
      safeFetch(getUpcomingMovies),
      safeFetch(getAiringTodaySeries),
      safeFetch(getOnTheAirSeries),
      safeFetch(getTopRatedMovies),
      safeFetch(getTopRatedSeries),
    ]);
    curated = {
      trending,
      popularMovies,
      popularSeries,
      nowPlaying,
      upcoming,
      airingToday,
      onTheAir,
      topRatedMovies,
      topRatedSeries,
    };
  }

  const trendingItems =
    curated &&
    (activeType === "series"
      ? curated.trending.data?.filter((item) => item.media_type === "tv")
      : activeType === "movies"
        ? curated.trending.data?.filter((item) => item.media_type === "movie")
        : curated.trending.data);

  const discoverMoreItems =
    curated &&
    [
      ...(curated.popularMovies.data || [])
        .slice(0, 5)
        .map((m) => ({ ...m, media_type: "movie" })),
      ...(curated.trending.data || [])
        .slice(0, 5)
        .map((t) => ({ ...t, media_type: t.media_type || "movie" })),
    ].filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id),
    ); // تصفية العناصر المكررة لمنع مشاكل الـ Keys

  return (
    <PageTransition>
          <div className="pb-16">
      <NewPopularHeader />

      <div className="mb-4 flex flex-col gap-4 px-4 sm:px-8">
        <NewPopularTabs />
        <NewPopularSearch />
        <NewPopularFilters
          type={activeType}
          movieGenres={movieGenresResult.data || []}
          seriesGenres={seriesGenresResult.data || []}
        />
      </div>

      {showCurated && curated && (
        <>
          <NewPopularSection
            title="Trending Now"
            items={trendingItems}
            error={curated.trending.error}
            type="movie"
          />

          {activeType !== "series" && (
            <>
              <NewPopularSection
                title="Popular Movies"
                items={curated.popularMovies.data}
                error={curated.popularMovies.error}
                type="movie"
              />
              <NewPopularSection
                title="Now Playing"
                items={curated.nowPlaying.data}
                error={curated.nowPlaying.error}
                type="movie"
              />
              <NewPopularSection
                title="Coming Soon"
                items={curated.upcoming.data}
                error={curated.upcoming.error}
                type="movie"
              />
              <NewPopularSection
                title="Top Rated Movies"
                items={curated.topRatedMovies.data}
                error={curated.topRatedMovies.error}
                type="movie"
              />
            </>
          )}

          {activeType !== "movies" && (
            <>
              <NewPopularSection
                title="Popular Series"
                items={curated.popularSeries.data}
                error={curated.popularSeries.error}
                type="tv"
              />
              <NewPopularSection
                title="Airing Today"
                items={curated.airingToday.data}
                error={curated.airingToday.error}
                type="tv"
              />
              <NewPopularSection
                title="On The Air"
                items={curated.onTheAir.data}
                error={curated.onTheAir.error}
                type="tv"
              />
              <NewPopularSection
                title="Top Rated Series"
                items={curated.topRatedSeries.data}
                error={curated.topRatedSeries.error}
                type="tv"
              />
            </>
          )}

          {activeType === "all" && (
            <NewPopularSection
              title="Discover More"
              items={discoverMoreItems}
              error={null}
              type="movie"
            />
          )}
        </>
      )}

      {showResultsGrid && (
        <NewPopularGrid
          items={resultsResult.data?.results}
          error={resultsResult.error}
          page={page}
          totalPages={Math.min(resultsResult.data?.total_pages || 1, 500)}
          showPagination={showPagination}
          hasActiveFiltersOrQuery={hasActiveFilters || Boolean(query)}
        />
      )}
    </div>
    </PageTransition>
  );
}
