export default function TmdbAttribution() {
  return (
    <section className="border-t border-white/10 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl rounded-lg border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Powered by TMDB
        </h2>
        <p className="mt-3 text-sm text-gray-300 sm:text-base">
          Youflix uses the TMDB API to provide movie and TV metadata such as
          titles, posters, ratings, genres, release information, and available
          video data.
        </p>
        <p className="mt-3 text-xs text-gray-500">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
    </section>
  );
}
