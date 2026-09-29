'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Film, Play, Plus, Check } from 'lucide-react';
import { backdropUrl, posterUrl } from '../../lib/tmdb';
import useMyList from '../../hooks/useMyList';
import SeriesTrailerModal from './SeriesTrailerModal';
import SimilarSeries from './SimilarSeries';

export default function SeriesDetails({ series, similar, recommended }) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { isInList, toggle } = useMyList();
  const inList = isInList(series.id, 'tv');

  const year = series.first_air_date?.slice(0, 4);
  const cast = series.credits?.cast?.slice(0, 6) ?? [];
  const networks = series.networks?.map((n) => n.name).filter(Boolean) ?? [];

  return (
    <div className="pb-20">
      <div className="relative h-[70vh] min-h-[420px] w-full">
        {series.backdrop_path ? (
          <Image src={backdropUrl(series.backdrop_path)} alt="" fill priority className="object-center" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#141414]">
            <Film className="h-16 w-16 text-white/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="relative z-10 -mt-32 px-4 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-md sm:flex-row sm:p-8">
          <div className="relative aspect-[2/3] w-32 shrink-0 overflow-hidden rounded-lg shadow-xl sm:w-48">
            {series.poster_path ? (
              <Image src={posterUrl(series.poster_path)} alt={series.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/5">
                <Film className="h-8 w-8 text-white/20" />
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-black text-white sm:text-4xl">{series.name}</h1>
            {series.original_name && series.original_name !== series.name && (
              <p className="mt-0.5 text-sm text-gray-500">Original title: {series.original_name}</p>
            )}
            {series.tagline && <p className="mt-1 text-sm italic text-gray-400">{series.tagline}</p>}

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-300">
              {series.vote_average > 0 && <span className="text-green-400">★ {series.vote_average.toFixed(1)}</span>}
              {year && <span>{year}</span>}
              {series.status && <span>{series.status}</span>}
              {series.number_of_seasons > 0 && (
                <span>
                  {series.number_of_seasons} Season{series.number_of_seasons > 1 ? 's' : ''}
                </span>
              )}
              {series.number_of_episodes > 0 && <span>{series.number_of_episodes} Episodes</span>}
              {series.genres?.map((g) => (
                <span key={g.id} className="rounded border border-white/20 px-2 py-0.5 text-xs">
                  {g.name}
                </span>
              ))}
            </div>

            {networks.length > 0 && <p className="mt-2 text-xs text-gray-500">{networks.join(' • ')}</p>}

            <p className="mt-4 max-w-2xl text-sm text-gray-200 sm:text-base">{series.overview}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setTrailerOpen(true)}
                className="flex items-center gap-2 rounded bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch Trailer
              </button>
              <button
                type="button"
                onClick={() => toggle(series, 'tv')}
                className="flex items-center gap-2 rounded border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                {inList ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {inList ? 'In My List' : 'My List'}
              </button>
            </div>
          </div>
        </div>

        {cast.length > 0 && (
          <div className="mx-auto mt-8 max-w-5xl">
            <h2 className="mb-3 text-lg font-semibold text-white">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {cast.map((person) => (
                <div key={person.cast_id ?? person.id} className="w-20 shrink-0 text-center">
                  <div className="relative aspect-square overflow-hidden rounded-full bg-white/5">
                    {person.profile_path ? (
                      <Image src={posterUrl(person.profile_path, 'w185')} alt={person.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-500">No photo</div>
                    )}
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs text-gray-300">{person.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto max-w-5xl">
          <SimilarSeries title="Similar Series" items={similar} />
          <SimilarSeries title="Recommended" items={recommended} />
        </div>
      </div>

      {trailerOpen && (
        <SeriesTrailerModal id={series.id} title={series.name} onClose={() => setTrailerOpen(false)} />
      )}
    </div>
  );
}
