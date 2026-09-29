import ContentCard from '../../shared/ContentCard';
import NewPopularEmptyState from './NewPopularEmptyState';
import NewPopularErrorState from './NewPopularErrorState';
import Pagination from '../../app/movies/Pagination';

export default function NewPopularGrid({ items, error, page, totalPages, showPagination, hasActiveFiltersOrQuery }) {
  if (error) return <NewPopularErrorState />;
  if (!items || items.length === 0) return <NewPopularEmptyState hasActiveFiltersOrQuery={hasActiveFiltersOrQuery} />;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 sm:px-8 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item) => (
          <ContentCard key={`${item.media_type}-${item.id}`} item={item} type={item.media_type} />
        ))}
      </div>
      {showPagination && <Pagination page={page} totalPages={totalPages} />}
    </div>
  );
}
