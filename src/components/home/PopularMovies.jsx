import MovieRow from './MovieRow';
import MovieCard from './MovieCard';

export default function PopularMovies({ items, error }) {
  return (
    <MovieRow
      title="Popular Movies"
      items={items}
      error={error}
      showMatch={true}
    />
  );
}
