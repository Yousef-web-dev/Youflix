import {
  getMovieGenres,
  getSeriesGenres,
  getMoviesByGenre,
  getSeriesByGenre,
  getGenreBackdrop,
  getSeriesGenreBackdrop,
  backdropUrl,
} from "../../lib/tmdb";
import GenresHero from "../../components/genres/GenresHero";
import GenresBrowser from "../../components/genres/GenresBrowser";
import SelectedGenreHeader from "../../components/genres/SelectedGenreHeader";
import GenreFilters from "../../components/genres/GenreFilters";
import GenreResults from "../../components/genres/GenreResults";
import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: 'Genres | Youflix',
  description: 'Explore movie and series genres on Youflix and discover your next favorite story.',
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
 
export default async function GenresPage({ searchParams }) {
  const params = await searchParams;
  const urlType = params?.type === 'tv' ? 'tv' : params?.type === 'movie' ? 'movie' : 'all';
  const selectedGenreId = params?.genre;
 
  const [movieGenresResult, seriesGenresResult] = await Promise.all([
    safeFetch(getMovieGenres),
    safeFetch(getSeriesGenres),
  ]);
 
  const baseGenres = [
    ...(movieGenresResult.data || []).map((g) => ({ ...g, type: 'movie' })),
    ...(seriesGenresResult.data || []).map((g) => ({ ...g, type: 'tv' })),
  ];
 
  // Fetch one representative backdrop per genre in parallel — cached for an
  // hour by tmdbFetch, so this only ever hits TMDB fresh once per hour.
  const allGenres = await Promise.all(
    baseGenres.map(async (genre) => {
      const path =
        genre.type === 'tv' ? await getSeriesGenreBackdrop(genre.id) : await getGenreBackdrop(genre.id);
      return { ...genre, image: backdropUrl(path, 'w500') };
    })
  );
 
  let selectedResults = null;
  let selectedGenreName = null;
 
  if (selectedGenreId) {
    const type = urlType === 'all' ? 'movie' : urlType;
    const genreMeta = allGenres.find((g) => g.type === type && String(g.id) === String(selectedGenreId));
    selectedGenreName = genreMeta?.name || 'Selected';
 
    const options = { page: 1, sort_by: params?.sort || 'popularity.desc' };
    if (params?.rating) options['vote_average.gte'] = params.rating;
    if (params?.language) options.with_original_language = params.language;
    if (params?.year) {
      if (type === 'tv') options.first_air_date_year = params.year;
      else options.primary_release_year = params.year;
    }
 
    const result = await safeFetch(async () => {
      const data =
        type === 'tv' ? await getSeriesByGenre(selectedGenreId, options) : await getMoviesByGenre(selectedGenreId, options);
      return { results: data.results.map((item) => ({ ...item, media_type: type })), total_pages: data.total_pages };
    });
 
    selectedResults = { ...result, type };
  }
 
  const resultsKey = `${selectedResults?.type}-${selectedGenreId}-${params?.year || ''}-${params?.rating || ''}-${params?.language || ''}-${params?.sort || ''}`;
 
  return (
    <PageTransition>
          <div className="pb-16">
      <GenresHero />
      <GenresBrowser allGenres={allGenres} />
 
      {selectedResults && (
        <div className="mt-2">
          <SelectedGenreHeader genreName={selectedGenreName} type={selectedResults.type} />
          <div className="mb-4 px-4 sm:px-8">
            <GenreFilters type={selectedResults.type} />
          </div>
          <GenreResults
            key={resultsKey}
            initialResults={selectedResults.data?.results}
            initialTotalPages={selectedResults.data?.total_pages}
            initialError={selectedResults.error}
            type={selectedResults.type}
            genreId={selectedGenreId}
          />
        </div>
      )}
    </div>
    </PageTransition>
  );
}