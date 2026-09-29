import {
  getPopularSeries,
  getTrendingSeries,
  getTopRatedSeries,
  getAiringTodaySeries,
  getOnTheAirSeries,
  getSeriesGenres,
  searchSeries,
  discoverSeries,
} from "../../lib/tmdb";
import SeriesHeader from "../../components/series/SeriesHeader";
import SeriesSearch from "../../components/series/SeriesSearch";
import SeriesFilters from "../../components/series/SeriesFilters";
import SeriesRow from "../../components/series/SeriesRow";
import SeriesGrid from "../../components/series/SeriesGrid";

export const metadata = {
  title: "Explore Series | Youflix",
  description:
    "Search, filter, and discover series from every genre on Youflix.",
  openGraph: {
    title: "Explore Series | Youflix",
    description:
      "Search, filter, and discover series from every genre on Youflix.",
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

export default async function SeriesPage({ searchParams }) {
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

  const genresResult = await safeFetch(getSeriesGenres);

  const resultsResult = query
    ? await safeFetch(() => searchSeries(query, page))
    : await safeFetch(() =>
        discoverSeries(
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
  const [popular, trending, topRated, airingToday, onTheAir] = showCuratedRows
    ? await Promise.all([
        safeFetch(getPopularSeries),
        safeFetch(getTrendingSeries),
        safeFetch(getTopRatedSeries),
        safeFetch(getAiringTodaySeries),
        safeFetch(getOnTheAirSeries),
      ])
    : [
        { data: null, error: null },
        { data: null, error: null },
        { data: null, error: null },
        { data: null, error: null },
        { data: null, error: null },
      ];

  return (
    <>
      <div className="pb-16">
        <SeriesHeader />

        <div className="mb-6 flex flex-col gap-3 px-4 sm:px-8">
          <SeriesSearch />
          <SeriesFilters genres={genresResult.data || []} />
        </div>

        {showCuratedRows && (
          <>
            <SeriesRow
              title="Popular Series"
              items={popular.data}
              error={popular.error}
            />
            <SeriesRow
              title="Trending Series"
              items={trending.data}
              error={trending.error}
            />
            <SeriesRow
              title="Top Rated"
              items={topRated.data}
              error={topRated.error}
            />
            <SeriesRow
              title="Airing Today"
              items={airingToday.data}
              error={airingToday.error}
            />
            <SeriesRow
              title="On The Air"
              items={onTheAir.data}
              error={onTheAir.error}
            />
            <h2 className="mb-2 px-4 pt-4 text-lg font-semibold text-white sm:px-8 sm:text-xl">
              All Series
            </h2>
          </>
        )}

        <SeriesGrid
          series={resultsResult.data?.results}
          page={page}
          totalPages={Math.min(resultsResult.data?.total_pages || 1, 500)}
          error={resultsResult.error}
          hasActiveFilters={hasActiveFilters || Boolean(query)}
        />
      </div>
    </>
  );
}
