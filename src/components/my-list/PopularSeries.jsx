import MovieRow from '../../components/movies/ContentRow';
import MovieCard from '../../components/my-list/MovieCard';

export default function PopularSeries({ items, error }) {
  return (
    <MovieRow
      title="Popular Series"
      items={items}
      error={error}
      renderItem={(item) => <MovieCard key={item.id} item={item} style="backdrop" type="tv" />}
    />
  );
}
