import { genres } from '../../lib/genres';
import { getGenreBackdrop, backdropUrl } from '../../lib/tmdb';
import GenreCard from './GenreCard';

export default async function BrowseByGenre() {
  const withImages = await Promise.all(
    genres.map(async (genre) => ({
      ...genre,
      image: backdropUrl(await getGenreBackdrop(genre.id), 'w500'),
    }))
  );

  return (
    <section className="px-4 py-6 sm:px-8">
      <h2 className="mb-3 text-lg font-semibold text-white sm:text-xl">Browse by Genre</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {withImages.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
    </section>
  );
}