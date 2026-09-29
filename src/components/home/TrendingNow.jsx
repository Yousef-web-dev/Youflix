import MovieRow from './MovieRow';
import MovieCard from './MovieCard';

export default function TrendingNow({ items, error }) {
  return (
    <MovieRow
      title="Trending Now"
      items={items}
      error={error}
      showMatch={true}
    />
  );
}
