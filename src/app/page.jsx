import {
  getFeaturedHero,
  getTrending,
  getPopularMovies,
  getPopularSeries,
  getTopRated,
  getNewReleases,
  getRecommended,
} from '../lib/tmdb';
import HeroSection from '../components/home/HeroSection';
import ContinueWatching from '../components/home/ContinueWatching';
import TrendingNow from '../components/home/TrendingNow';
import PopularMovies from '../components/home/PopularMovies';
import PopularSeries from '../components/home/PopularSeries';
import TopRated from '../components/home/TopRated';
import RecommendedForYou from '../components/home/RecommendedForYou';
import NewReleases from '../components/home/NewReleases';
import BrowseByGenre from '../components/home/BrowseByGenre';

// Wraps each TMDB call so one failing endpoint shows an ErrorState in its own
// row instead of crashing the whole page.
async function safeFetch(fetcher) {
  try {
    const data = await fetcher();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

export default async function HomePage() {
  const [hero, trending, popularMovies, popularSeries, topRated, newReleases, recommended] = await Promise.all([
    safeFetch(getFeaturedHero),
    safeFetch(getTrending),
    safeFetch(getPopularMovies),
    safeFetch(getPopularSeries),
    safeFetch(getTopRated),
    safeFetch(getNewReleases),
    safeFetch(getRecommended),
  ]);

  return (
    <>
      <HeroSection item={hero.data} />

      <div className="relative z-10 -mt-16 space-y-2 pb-16 sm:-mt-24">
        <ContinueWatching items={trending.data?.slice(0, 6)} error={trending.error} />
        <TrendingNow items={trending.data} error={trending.error} />
        <PopularMovies items={popularMovies.data} error={popularMovies.error} />
        <PopularSeries items={popularSeries.data} error={popularSeries.error} />
        <TopRated items={topRated.data} error={topRated.error} />
        <RecommendedForYou items={recommended.data} error={recommended.error} />
        <NewReleases items={newReleases.data} error={newReleases.error} />
        <BrowseByGenre />
      </div>
    </>
  );
}
