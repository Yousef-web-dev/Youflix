import MovieRow from './MovieRow';
import MovieCard from './MovieCard';

export default function PopularSeries({ items, error }) {
  return (
    <MovieRow
      title="Popular Series"
      items={items}
      error={error}
      showMatch={true}
    />
  );
}
