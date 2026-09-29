'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import AuthBackground from './AuthBackground';

/**
 * Full-viewport shell for /login and /signup. It covers the global Navbar and
 * Footer (so neither has to be edited) and marks them inert while mounted so
 * keyboard focus can't wander into the hidden navigation.
 */
export default function AuthLayout({ children }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const hidden = [...document.querySelectorAll('header, footer')].filter(
      (el) => rootRef.current && !rootRef.current.contains(el)
    );
    hidden.forEach((el) => {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    });
    return () => {
      hidden.forEach((el) => {
        el.removeAttribute('inert');
        el.removeAttribute('aria-hidden');
      });
    };
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[70] overflow-y-auto bg-black text-white">
      <AuthBackground />

      <div className="relative mx-auto grid min-h-full w-full max-w-6xl lg:grid-cols-2">
        <div className="hidden flex-col justify-center px-10 lg:flex">
          <Link
            href="/"
            className="w-fit rounded text-5xl font-black italic tracking-tight text-[#E50914] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            YouFlix
          </Link>
          <p className="mt-6 max-w-sm text-2xl font-semibold leading-snug text-white">
            Your next favorite story is waiting.
          </p>
          <p className="mt-3 max-w-sm text-sm text-gray-400">
            Discover movies and series, save what you love, and pick up where you left off.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center px-4 py-10 sm:px-8">
          <Link
            href="/"
            className="mb-6 rounded text-3xl font-black italic tracking-tight text-[#E50914] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:hidden"
          >
            YouFlix
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
