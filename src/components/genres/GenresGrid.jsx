import GenreCard from './GenreCard';

export default function GenresGrid({ genres, selectedGenreId, selectedType }) {
  if (genres.length === 0) {
    return <p className="text-sm text-gray-500">No genres found</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {genres.map((genre, index) => (
        <GenreCard
          key={`${genre.type}-${genre.id}`}
          genre={genre}
          index={index}
          isActive={selectedType === genre.type && String(selectedGenreId) === String(genre.id)}
        />
      ))}
    </div>
  );
}
