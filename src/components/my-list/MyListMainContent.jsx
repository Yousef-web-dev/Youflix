'use client';

import { useEffect, useState } from 'react';
import MyListHeader from './MyListHeader';
import MyListTabs from './MyListTabs';
import MyListSearch from './MyListSearch';
import MyListSort from './MyListSort';
import MyListGrid from './MyListGrid';

export default function MyListMainContent() {
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