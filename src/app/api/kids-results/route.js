import { NextResponse } from 'next/server';
import { getKidsMovies, getKidsSeries, searchMovies, searchSeries } from '../../../components/lib/tmdb';

function tag(results, mediaType) {
  return (results || []).map((item) => ({ ...item, media_type: mediaType }));
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const genre = searchParams.get('genre');
  const query = searchParams.get('query');
  const page = Number(searchParams.get('page')) || 1;

  try {
    if (query) {
      if (type === 'movie') {
        const data = await searchMovies(query, page);
        return NextResponse.json({ results: tag(data.results, 'movie'), total_pages: data.total_pages });
      }
      if (type === 'tv') {
        const data = await searchSeries(query, page);
        return NextResponse.json({ results: tag(data.results, 'tv'), total_pages: data.total_pages });
      }
      const [m, s] = await Promise.all([searchMovies(query, 1), searchSeries(query, 1)]);
      const merged = [...tag(m.results, 'movie'), ...tag(s.results, 'tv')].sort(
        (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)
      );
      return NextResponse.json({ results: merged, total_pages: 1 });
    }

    const options = { page, sort_by: searchParams.get('sort') || 'popularity.desc' };
    if (genre) options.genre = genre;
    const rating = searchParams.get('rating');
    const language = searchParams.get('language');
    const year = searchParams.get('year');
    if (rating) options['vote_average.gte'] = rating;
    if (language) options.with_original_language = language;
    if (year) {
      if (type === 'tv') options.first_air_date_year = year;
      else options.primary_release_year = year;
    }

    const data = type === 'tv' ? await getKidsSeries(options) : await getKidsMovies(options);
    const results = tag(data.results, type === 'tv' ? 'tv' : 'movie');
    return NextResponse.json({ results, total_pages: data.total_pages });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
