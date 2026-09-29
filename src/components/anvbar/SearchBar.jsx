'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function handleClick(event) {
      if (open && containerRef.current && !containerRef.current.contains(event.target) && query === '') {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, query]);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/new-and-popular?query=${encodeURIComponent(trimmed)}`);
    setQuery('');
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="flex items-center">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-out ${
            open ? 'w-40 opacity-100 sm:w-56' : 'w-0 opacity-0'
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Titles, people, genres"
            aria-label="Search FlixJoo"
            className="w-full border-b border-white/40 bg-transparent px-1 py-1 text-sm text-white placeholder-gray-400 focus:border-white focus:outline-none"
          />
        </div>
        <button
          type={open ? 'submit' : 'button'}
          onClick={() => !open && setOpen(true)}
          aria-label="Search"
          className="ml-2 rounded-full p-1.5 text-gray-200 transition-colors hover:text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </form>
    </div>
  );
}