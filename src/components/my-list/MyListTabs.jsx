'use client';

import { motion } from 'framer-motion';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'movies', label: 'Movies' },
  { key: 'series', label: 'Series' },
];

export default function MyListTabs({ active, onChange }) {
  return (
    <div role="tablist" aria-label="Filter my list" className="flex items-center gap-1 border-b border-white/10">
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={`relative px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 ${
              isActive ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
            {isActive && (
              <motion.span
                layoutId="my-list-tab-underline"
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
