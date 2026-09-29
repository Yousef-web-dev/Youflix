'use client';

import { Search, X } from 'lucide-react';

export default function MyListSearch({ value, onChange }) {
  return (
    <div className="relative max-w-sm">
      <Search className="pointer-events-none cursor-pointer absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500/40" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search your list…"
        aria-label="Search my list"
        className="w-full rounded-full border cursor-pointer border-white/15 bg-white/5 py-2.5 pl-9 pr-9 text-sm text-white placeholder-red-500/40 focus:border-white focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500/40 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
