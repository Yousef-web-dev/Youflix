import MovieRow from './MovieRow';
import MovieCard from './MovieCard';

function mockMatch(voteAverage) {
  return Math.min(99, Math.round((voteAverage || 7) * 10 + 5));
}

export default function RecommendedForYou({ items, error }) {
  return (
    <MovieRow
      title="Recommended For You"
      items={items}
      error={error}
      showMatch={true}
    />
  );
}