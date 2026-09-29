import { NextResponse } from 'next/server';
import { getMovieVideos } from '../../../lib/tmdb';
import { searchYouTubeTrailer } from '../../../data/youtube';
import { getMoviesByGenre, getSeriesByGenre } from '../../../lib/tmdb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const title = searchParams.get('title');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    const videos = await getMovieVideos(id);
    const tmdbTrailer =
      videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
      videos.find((v) => v.site === 'YouTube');

    if (tmdbTrailer) {
      return NextResponse.json({ key: tmdbTrailer.key, source: 'tmdb' });
    }

    // No trailer in TMDB's own data — fall back to a direct YouTube search.
    if (title) {
      const fallbackKey = await searchYouTubeTrailer(title);
      if (fallbackKey) {
        return NextResponse.json({ key: fallbackKey, source: 'youtube' });
      }
    }

    return NextResponse.json({ key: null });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}









