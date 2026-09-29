'use client';

import { useState } from 'react';
import ContentCard from '../../shared/ContentCard';
import KidsEmptyState from './KidsEmptyState';
import KidsErrorState from './KidsErrorState';

export default function KidsResults({ initialResults, initialTotalPages, initialError, type, genre, query }) {
  const [items, setItems] = useState(initialResults || []);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(initialError);

  async function loadMore() {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      const params = new URLSearchParams(window.location.search);
      params.set('page', String(page + 1));
      if (type && type !== 'all') params.set('type', type);
      if (genre) params.set('genre', genre);
      if (query) params.set('query', query);
      const res = await fetch(`/api/kids-results?${params.toString()}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setItems((prev) => [...prev, ...data.results]);
      setTotalPages(data.total_pages);
      setPage((p) => p + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  }

  if (error) return <KidsErrorState />;
  if (items.length === 0) return <KidsEmptyState isSearch={Boolean(query)} />;

  const hasMore = page < Math.min(totalPages, 500);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 sm:px-8 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item) => (
          <ContentCard key={`${item.media_type}-${item.id}`} item={item} type={item.media_type} />
        ))}
      </div>

      <div className="mt-6 flex justify-center px-4 sm:px-8">
        {hasMore ? (
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className="rounded-full border border-white/20 px-5 py-2 text-sm text-white transition-colors hover:bg-white/10 disabled:opacity-50"
          >
            {loadingMore ? 'Loading…' : 'Load More'}
          </button>
        ) : (
          <p className="text-sm text-gray-500">No more results</p>
        )}
      </div>
    </div>
  );
}
