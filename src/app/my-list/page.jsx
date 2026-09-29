'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
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
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // حماية وقت البناء والسيرفر
  if (!isMounted) {
    return <MyListSkeleton />;
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <MyListHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <MyListTabs />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6">
          <MyListSearch />
          <MyListSort />
        </div>
        <MyListGrid />
      </div>
    </main>
  );
}