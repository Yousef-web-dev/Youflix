'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'movies', label: 'Movies' },
  { key: 'series', label: 'Series' },
];

export default function NewPopularTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlType = searchParams.get('type');
  const active = urlType === 'movies' || urlType === 'series' ? urlType : 'all';

  function setTab(tab) {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === 'all') {
      params.delete('type');
    } else {
      params.set('type', tab);
    }
    // Switching type invalidates genre (movie/series genre IDs differ) and page.
    params.delete('genre');
    params.delete('page');
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div role="tablist" aria-label="Filter by content type" className="flex items-center gap-1 border-b border-white/10">
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setTab(tab.key)}
            className={`relative px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 ${
              isActive ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
            {isActive && (
              <motion.span
                layoutId="new-popular-tab-underline"
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[#E50914]"
                transition={{ duration: 0.2 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
