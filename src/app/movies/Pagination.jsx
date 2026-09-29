'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goTo(targetPage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(targetPage));
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  for (let p = start; p <= end; p += 1) pages.push(p);

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center hover:bg-white/10 transition-all duration-300 justify-center rounded-full border cursor-pointer border-white/15 text-white disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => goTo(p)}
          aria-current={p === page ? 'page' : undefined}
          className={`flex h-9 w-9 items-center justify-center transition-all duration-300 rounded-full text-sm cursor-pointer ${
            p === page ? 'bg-red-900 text-white' : 'text-gray-300 hover:bg-white/10'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center hover:bg-white/10 transition-all duration-300 cursor-pointer justify-center rounded-full border border-white/15 text-white disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
