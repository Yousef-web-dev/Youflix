const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

const API_KEY = process.env.TMDB_API_KEY;

export const posterUrl = (path, size = 'w500') => (path ? `${IMAGE_BASE}/${size}${path}` : null);
export const backdropUrl = (path, size = 'original') => (path ? `${IMAGE_BASE}/${size}${path}` : null);

async function tmdbFetch(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error('Missing TMDB_API_KEY. Add it to .env.local.');
  }

  const query = new URLSearchParams({ api_key: API_KEY, language: 'en-US', ...params });
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}?${query}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB request failed: ${endpoint} (${res.status})`);
  }

  return res.json();
}

export async function getTrending() {
  const data = await tmdbFetch('/trending/all/week');
  return data.results ?? [];
}

export async function getPopularMovies() {
  const data = await tmdbFetch('/movie/popular');
  return data.results ?? [];
}

export async function getPopularSeries() {
  const data = await tmdbFetch('/tv/popular');
  return data.results ?? [];
}

export async function getTopRated() {
  const data = await tmdbFetch('/movie/top_rated');
  return data.results ?? [];
}

export async function getNewReleases() {
  const data = await tmdbFetch('/movie/now_playing');
  return data.results ?? [];
}

export async function getRecommended() {
  const data = await tmdbFetch('/movie/top_rated', { page: 2 });
  return data.results ?? [];
}

export async function getFeaturedHero() {
  const trending = await getTrending();
  return trending.find((item) => item.backdrop_path) ?? trending[0] ?? null;
}

export async function getMovieDetails(id, mediaType = 'movie') {
  return tmdbFetch(`/${mediaType}/${id}`, { append_to_response: 'videos,credits' });
}

export async function getGenreBackdrop(genreId) {
  const data = await tmdbFetch('/discover/movie', {
    with_genres: genreId,
    sort_by: 'popularity.desc',
  });
  return data.results?.[0]?.backdrop_path ?? null;
}

// --- الإضافات الجديدة اللي صفحة movies محتاجاها ---
export const getTrendingMovies = async () => (await tmdbFetch('/trending/movie/week')).results ?? [];
export const getTopRatedMovies = async () => (await tmdbFetch('/movie/top_rated')).results ?? [];
export const getNowPlayingMovies = async () => (await tmdbFetch('/movie/now_playing')).results ?? [];
export const getUpcomingMovies = async () => (await tmdbFetch('/movie/upcoming')).results ?? [];

export async function getMovieGenres() {
  const data = await tmdbFetch('/genre/movie/list');
  return data.genres ?? [];
}

export async function searchMovies(query, page = 1) {
  return tmdbFetch('/search/movie', { query, page, include_adult: false });
}

export async function discoverMovies(filters = {}, page = 1) {
  const params = { page, sort_by: filters.sort || 'popularity.desc' };
  if (filters.genre) params.with_genres = filters.genre;
  if (filters.year) params.primary_release_year = filters.year;
  if (filters.rating) params['vote_average.gte'] = filters.rating;
  if (filters.language) params.with_original_language = filters.language;
  return tmdbFetch('/discover/movie', params);
}

export async function getMovieVideos(id) {
  const data = await tmdbFetch(`/movie/${id}/videos`);
  return data.results ?? [];
}


// --- الإضافات الجديدة اللي صفحة series محتاجاها ---

export const getTrendingSeries = async () => (await tmdbFetch('/trending/tv/week')).results ?? [];
export const getTopRatedSeries = async () => (await tmdbFetch('/tv/top_rated')).results ?? [];
export const getAiringTodaySeries = async () => (await tmdbFetch('/tv/airing_today')).results ?? [];
export const getOnTheAirSeries = async () => (await tmdbFetch('/tv/on_the_air')).results ?? [];

export async function getSeriesGenres() {
  const data = await tmdbFetch('/genre/tv/list');
  return data.genres ?? [];
}

export async function searchSeries(query, page = 1) {
  return tmdbFetch('/search/tv', { query, page, include_adult: false });
}

export async function discoverSeries(filters = {}, page = 1) {
  const params = { page, sort_by: filters.sort || 'popularity.desc' };
  if (filters.genre) params.with_genres = filters.genre;
  if (filters.year) params.first_air_date_year = filters.year;
  if (filters.rating) params['vote_average.gte'] = filters.rating;
  if (filters.language) params.with_original_language = filters.language;
  return tmdbFetch('/discover/tv', params);
}

// Reuses the generic getMovieDetails(id, mediaType) already in this file.
export async function getSeriesDetails(id) {
  return getMovieDetails(id, 'tv');
}

export async function getSeriesCredits(id) {
  return tmdbFetch(`/tv/${id}/credits`);
}

export async function getSeriesVideos(id) {
  const data = await tmdbFetch(`/tv/${id}/videos`);
  return data.results ?? [];
}

export async function getSimilarSeries(id) {
  const data = await tmdbFetch(`/tv/${id}/similar`);
  return data.results ?? [];
}

export async function getRecommendedSeries(id) {
  const data = await tmdbFetch(`/tv/${id}/recommendations`);
  return data.results ?? [];
}

// /trending/all already tags each item with its own media_type — no manual tagging needed.
export const getTrendingAll = async () => (await tmdbFetch('/trending/all/week')).results ?? [];

// No single "popular all" TMDB endpoint exists — merge the two and re-sort by popularity.
export async function getPopularAll() {
  const [movies, series] = await Promise.all([getPopularMovies(), getPopularSeries()]);
  const tagged = [
    ...movies.map((m) => ({ ...m, media_type: 'movie' })),
    ...series.map((s) => ({ ...s, media_type: 'tv' })),
  ];
  return tagged.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}


// Add to the end of lib/tmdb.js

export async function getMoviesByGenre(genreId, options = {}) {
  const params = {
    page: options.page || 1,
    sort_by: options.sort_by || 'popularity.desc',
    with_genres: genreId,
  };
  if (options.primary_release_year) params.primary_release_year = options.primary_release_year;
  if (options['vote_average.gte']) params['vote_average.gte'] = options['vote_average.gte'];
  if (options.with_original_language) params.with_original_language = options.with_original_language;
  if (options['release_date.gte']) params['release_date.gte'] = options['release_date.gte'];
  if (options['release_date.lte']) params['release_date.lte'] = options['release_date.lte'];
  return tmdbFetch('/discover/movie', params);
}

export async function getSeriesByGenre(genreId, options = {}) {
  const params = {
    page: options.page || 1,
    sort_by: options.sort_by || 'popularity.desc',
    with_genres: genreId,
  };
  if (options.first_air_date_year) params.first_air_date_year = options.first_air_date_year;
  if (options['vote_average.gte']) params['vote_average.gte'] = options['vote_average.gte'];
  if (options.with_original_language) params.with_original_language = options.with_original_language;
  if (options['first_air_date.gte']) params['first_air_date.gte'] = options['first_air_date.gte'];
  if (options['first_air_date.lte']) params['first_air_date.lte'] = options['first_air_date.lte'];
  return tmdbFetch('/discover/tv', params);
}
export async function getSeriesGenreBackdrop(genreId) {
  const data = await tmdbFetch('/discover/tv', {
    with_genres: genreId,
    sort_by: 'popularity.desc',
  });
  return data.results?.[0]?.backdrop_path ?? null;
}




// Add to the end of lib/tmdb.js

// Official TMDB genre IDs — Animation, Family, Adventure, Comedy, Fantasy (movies)
const KIDS_MOVIE_GENRE_IDS = [16, 10751, 12, 35, 14];
// Animation, Family, Kids, Comedy (series) — TV has its own dedicated "Kids" genre (10762)
const KIDS_SERIES_GENRE_IDS = [16, 10751, 10762, 35];

export async function getKidsMovies(options = {}) {
  const params = {
    page: options.page || 1,
    sort_by: options.sort_by || 'popularity.desc',
    with_genres: options.genre || KIDS_MOVIE_GENRE_IDS.join('|'),
  };
  if (options.primary_release_year) params.primary_release_year = options.primary_release_year;
  if (options['vote_average.gte']) params['vote_average.gte'] = options['vote_average.gte'];
  if (options['vote_count.gte']) params['vote_count.gte'] = options['vote_count.gte'];
  if (options.with_original_language) params.with_original_language = options.with_original_language;
  if (options['release_date.lte']) params['release_date.lte'] = options['release_date.lte'];
  return tmdbFetch('/discover/movie', params);
}

export async function getKidsSeries(options = {}) {
  const params = {
    page: options.page || 1,
    sort_by: options.sort_by || 'popularity.desc',
    with_genres: options.genre || KIDS_SERIES_GENRE_IDS.join('|'),
  };
  if (options.first_air_date_year) params.first_air_date_year = options.first_air_date_year;
  if (options['vote_average.gte']) params['vote_average.gte'] = options['vote_average.gte'];
  if (options['vote_count.gte']) params['vote_count.gte'] = options['vote_count.gte'];
  if (options.with_original_language) params.with_original_language = options.with_original_language;
  if (options['first_air_date.lte']) params['first_air_date.lte'] = options['first_air_date.lte'];
  return tmdbFetch('/discover/tv', params);
}
