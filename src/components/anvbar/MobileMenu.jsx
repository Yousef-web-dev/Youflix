'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { primaryLinks, moreLinks } from '../../data/navigation';

export default function MobileMenu({ open, onClose }) {
  const pathname = usePathname();

  return (
    <div
      id="mobile-nav"
      className={`overflow-hidden border-t border-white/10 bg-[#0b0b0b] transition-[max-height] duration-300 ease-in-out md:hidden ${
        open ? 'max-h-96' : 'max-h-0 border-t-0'
      }`}
    >
      <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile">
        {[...primaryLinks, ...moreLinks].map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              aria-current={active ? 'page' : undefined}
              className={`rounded px-2 py-2.5 text-sm font-medium transition-colors ${
                active ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
