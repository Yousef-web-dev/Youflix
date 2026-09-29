import SeriesCard from './SeriesCard';
import SeriesEmptyState from './SeriesEmptyState';
import SeriesErrorState from './SeriesErrorState';
import Pagination from '../../app/movies/Pagination';

export default function SeriesGrid({ series, page, totalPages, error, hasActiveFilters }) {
  if (error) return <SeriesErrorState />;
  if (!series || series.length === 0) return <SeriesEmptyState hasActiveFilters={hasActiveFilters} />;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 sm:px-8 md:grid-cols-4 lg:grid-cols-5">
        {series.map((item) => (
          <SeriesCard key={item.id} series={item} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
