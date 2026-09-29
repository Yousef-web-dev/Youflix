import MovieRow from './MovieRow';
import MovieCard from './MovieCard';

export default function NewReleases({ items, error }) {
  return (
    <MovieRow
      title="New Releases"
      items={items}
      error={error}
      showMatch={true}
    />
  );
}
