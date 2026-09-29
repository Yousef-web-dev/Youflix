'use client';

import { useState } from 'react';
import useMyList from '../../hooks/useMyList';
import MyListHeader from './MyListHeader';
import MyListTabs from './MyListTabs';
import MyListSearch from './MyListSearch';
import MyListSort from './MyListSort';
import MyListGrid from './MyListGrid';
import MyListEmptyState from './MyListEmptyState';

export default function MyListMainContent() {
  const { list, toggle } = useMyList();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // فلترة حسب البحث لو موجود
  const filteredList = list.filter((item) => {
    const title = item.title || item.name || '';
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <MyListHeader count={list.length} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <MyListTabs />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6">
          <MyListSearch value={searchQuery} onChange={setSearchQuery} />
          <MyListSort value={sortBy} onChange={setSortBy} />
        </div>

        {filteredList.length > 0 ? (
          <MyListGrid items={filteredList} onRemove={(id, type) => toggle({ id }, type)} />
        ) : (
          <MyListEmptyState reason={searchQuery ? 'search' : 'empty'} />
        )}
      </div>
    </main>
  );
}