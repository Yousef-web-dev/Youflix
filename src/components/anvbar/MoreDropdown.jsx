'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useClickOutside from '../../hooks/useClickOutside';
import { moreLinks } from '../../data/navigation';

export default function MoreDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const pathname = usePathname();

  useClickOutside(containerRef, () => setOpen(false), open);

  const isActiveGroup = moreLinks.some((link) => link.href === pathname);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center gap-1 cursor-pointer text-sm font-medium transition-colors duration-200 hover:text-white ${
          isActiveGroup ? 'text-white' : 'text-gray-300'
        }`}
      >
        More
        <svg
          className={`h-3.5 w-3.5 cursor-pointer transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full mt-3 w-52 overflow-hidden rounded-md border border-white/10 bg-[#141414] py-2 shadow-xl shadow-black/50"
        >
          {moreLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
