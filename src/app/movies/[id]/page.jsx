import Image from "next/image";
import { getMovieDetails, backdropUrl, posterUrl } from "../../../lib/tmdb";
import PageTransition from "@/components/PageTransition";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const movie = await getMovieDetails(id);
    return {
      title: `${movie.title} | Youflix`,
      description: movie.overview?.slice(0, 150),
    };
  } catch {
    return { title: "Movie | Youflix" };
  }
}

export default async function MovieDetailsPage({ params }) {
  const { id } = await params;
  let movie;
  try {
    movie = await getMovieDetails(id);
  } catch (err) {
    return (
      <div className="px-4 py-24 text-center text-gray-400">
        Couldn't load this title right now.
      </div>
    );
  }

  const year = movie.release_date?.slice(0, 4);

  return (

    <PageTransition>
          <div className="relative">
      {movie.backdrop_path && (
        <div className="relative h-[50vh] min-h-[320px] w-full">
          <Image
            src={backdropUrl(movie.backdrop_path)}
            alt=""
            fill
            priority
            className="object-center "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        </div>
      )}

      <div className="relative z-10 -mt-24 mb-20 flex flex-col gap-6 px-4 sm:flex-row sm:px-8">
        {movie.poster_path && (
          <div className="relative aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-lg shadow-xl sm:w-56">
            <Image
              src={posterUrl(movie.poster_path)}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="pb-10">
          <h1 className="text-2xl font-black text-white sm:text-4xl">
            {movie.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-300">
            {movie.vote_average > 0 && (
              <span className="text-green-400">
                ★ {movie.vote_average.toFixed(1)}
              </span>
            )}
            {year && <span>{year}</span>}
            {movie.runtime > 0 && <span>{movie.runtime} min</span>}
            {movie.genres?.map((g) => (
              <span
                key={g.id}
                className="rounded border border-white/20 px-2 py-0.5 text-xs"
              >
                {g.name}
              </span>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-sm text-gray-200 sm:text-base">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
