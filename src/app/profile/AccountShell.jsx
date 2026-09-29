'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/profile', label: 'Profile' },
  { href: '/account', label: 'Account' },
  { href: '/settings', label: 'Settings' },
];

export default function AccountShell({ title, children }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-28 sm:px-8">
      <h1 className="text-2xl font-black text-white sm:text-3xl">{title}</h1>

      <nav aria-label="Account sections" className="mt-6 flex gap-1 border-b border-white/10">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              className={`px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 ${
                active ? 'border-b-2 border-[#E50914] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6">{children}</div>
    </div>
  );
}
