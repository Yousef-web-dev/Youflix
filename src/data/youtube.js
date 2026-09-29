const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

/**
 * Searches YouTube directly for "<query> official trailer" and returns the
 * first video ID, or null if no key is configured or nothing is found.
 * Only used when TMDB itself has no trailer for a title.
 */
export async function searchYouTubeTrailer(query) {
  if (!YOUTUBE_API_KEY) return null;

  const params = new URLSearchParams({
    part: 'snippet',
    q: `${query} official trailer`,
    type: 'video',
    maxResults: '1',
    key: YOUTUBE_API_KEY,
  });

  const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
  if (!res.ok) return null;

  const data = await res.json();
  return data.items?.[0]?.id?.videoId ?? null;
}