'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getMyList, removeFromMyList, sortMyList } from '../../hooks/myList';
import MyListHeader from '../../components/my-list/MyListHeader';
import MyListTabs from '../../components/my-list/MyListTabs';
import MyListSearch from '../../components/my-list/MyListSearch';
import MyListSort from '../../components/my-list/MyListSort';
import MyListGrid from '../../components/my-list/MyListGrid';
import MyListEmptyState from '../../components/my-list/MyListEmptyState';
import MyListSkeleton from '../../components/my-list/MyListSkeleton';

export default function MyListPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recent');

  const urlType = searchParams.get('type');
  const activeTab = urlType === 'movies' || urlType === 'series' ? urlType : 'all';

  useEffect(() => {
    setItems(getMyList());
    setLoaded(true);

    // Stay in sync if the list changes from a card on another part of the app
    // (same tab) via the 'mylist-updated' event dispatched by useMyList.
    function handleSync() {
      setItems(getMyList());
    }
    window.addEventListener('mylist-updated', handleSync);
    return () => window.removeEventListener('mylist-updated', handleSync);
  }, []);

  function setTab(tab) {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === 'all') {
      params.delete('type');
    } else {
      params.set('type', tab);
    }
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  function handleRemove(id, type) {
    const next = removeFromMyList(id, type);
    setItems(next);
    window.dispatchEvent(new Event('mylist-updated'));
  }

  const tabFiltered = useMemo(() => {
    if (activeTab === 'movies') return items.filter((entry) => entry.type === 'movie');
    if (activeTab === 'series') return items.filter((entry) => entry.type === 'tv');
    return items;
  }, [items, activeTab]);

  const searched = useMemo(() => {
    if (!query.trim()) return tabFiltered;
    const q = query.trim().toLowerCase();
    return tabFiltered.filter((entry) => (entry.title || '').toLowerCase().includes(q));
  }, [tabFiltered, query]);

  const sorted = useMemo(() => sortMyList(searched, sort), [searched, sort]);

  if (!loaded) return <MyListSkeleton />;

  let emptyReason = null;
  if (items.length === 0) {
    emptyReason = 'empty';
  } else if (sorted.length === 0) {
    if (query.trim()) {
      emptyReason = 'search';
    } else if (activeTab === 'movies') {
      emptyReason = 'movies';
    } else if (activeTab === 'series') {
      emptyReason = 'series';
    } else {
      emptyReason = 'search';
    }
  }

  return (
    <div className="pb-16">
      <MyListHeader count={items.length} />

      <div className="mb-4 flex flex-col gap-4 px-4 sm:px-8">
        <MyListTabs active={activeTab} onChange={setTab} />
        <div className="flex flex-wrap items-center gap-3">
          <MyListSearch value={query} onChange={setQuery} />
          <MyListSort value={sort} onChange={setSort} />
        </div>
      </div>

      {emptyReason ? <MyListEmptyState reason={emptyReason} /> : <MyListGrid items={sorted} onRemove={handleRemove} />}
    </div>
  );
}
