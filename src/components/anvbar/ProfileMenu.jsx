'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '../../hooks/useAuth';
import useClickOutside from '../../hooks/useClickOutside';
import { profileMenuLinks } from '../../data/navigation';

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();
  const { user, isAuthenticated, isReady, logout } = useAuth();
  useClickOutside(containerRef, () => setOpen(false), open);

  // Avoid flashing "Login" for a split second before we've read localStorage.
  if (!isReady) return <div className="h-8 w-8" aria-hidden="true" />;

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="rounded px-3 py-1.5 text-sm font-medium text-white transition-colors hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        Login
      </Link>
    );
  }

  // The API's placeholder image value is the literal string "default", not a real URL.
  const hasRealImage = Boolean(user?.image) && user.image !== 'default';
  const initials = `${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`.toUpperCase() || 'U';

  function handleLogout() {
    setOpen(false);
    logout();
    router.push('/login');
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex items-center gap-1.5 rounded focus:outline-none focus-visible:ring-2 cursor-pointer focus-visible:ring-white/60"
      >
        {hasRealImage ? (
          <img src={user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E50914] text-xs font-bold text-white">
            {initials}
          </span>
        )}
        <svg
          className={`h-3.5 w-3.5 text-gray-300 cursor-pointer transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
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
          className="absolute right-0 top-full mt-3 w-48 overflow-hidden rounded-md border border-white/10 bg-[#141414] py-2 shadow-xl shadow-black/50"
        >
          <div className="truncate border-b border-white/10 px-4 py-2 text-sm text-gray-300">
            {user?.first_name} {user?.last_name}
          </div>

          {profileMenuLinks.map((link) => (
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

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}