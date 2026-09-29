'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';

export default function SeriesSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('query') || '');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }
      params.delete('page');
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative max-w-md">
      <Search className="pointer-events-none cursor-pointer absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500/40" />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search series…"
        aria-label="Search series"
        className="w-full cursor-pointer rounded-full border border-white/15 bg-white/5 py-2.5 pl-9 pr-9 text-sm text-white placeholder-red-500/40 focus:border-white focus:outline-none"
      />
      {isPending && (
        <Loader2 className="absolute right-9 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gray-400" />
      )}
      {value && (
        <button
          type="button"
          onClick={() => setValue('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
