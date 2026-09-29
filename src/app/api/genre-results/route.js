import { NextResponse } from 'next/server';
import { getMoviesByGenre, getSeriesByGenre } from '../../../lib/tmdb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') === 'tv' ? 'tv' : 'movie';
  const genre = searchParams.get('genre');
  const page = Number(searchParams.get('page')) || 1;

  if (!genre) {
    return NextResponse.json({ error: 'Missing genre' }, { status: 400 });
  }

  const options = { page, sort_by: searchParams.get('sort') || 'popularity.desc' };
  const rating = searchParams.get('rating');
  const language = searchParams.get('language');
  const year = searchParams.get('year');
  if (rating) options['vote_average.gte'] = rating;
  if (language) options.with_original_language = language;
  if (year) {
    if (type === 'tv') options.first_air_date_year = year;
    else options.primary_release_year = year;
  }

  try {
    const data = type === 'tv' ? await getSeriesByGenre(genre, options) : await getMoviesByGenre(genre, options);
    const results = data.results.map((item) => ({ ...item, media_type: type }));
    return NextResponse.json({ results, total_pages: data.total_pages });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
