import MovieRow from './MovieRow';
import MovieCard from './MovieCard';

export default function TopRated({ items, error }) {
  return (
    <MovieRow
      title="Top Rated"
      items={items?.slice(0, 10)}
      error={error}
      showMatch={true}
    />
  );
}
