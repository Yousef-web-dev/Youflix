"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useScrollPosition from "../../hooks/useScrollPosition";
import { primaryLinks } from "../../data/navigation";

import SearchBar from "./SearchBar";
import NotificationsMenu from "./NotificationsMenu";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import MoreDropdown from "./MoreDropdown";

/**
 * Sticky site navbar. Pass `user` once auth is wired up:
 *   null / undefined -> shows "Login"
 *   { avatarUrl }     -> shows the profile menu
 */
export default function Navbar({ user = null }) {
  const scrollProgress = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const headerStyle = {
    backgroundColor: `rgba(11, 11, 11, ${0.85 * scrollProgress})`,
    backdropFilter: scrollProgress > 0.6 ? "blur(8px)" : "none",
    WebkitBackdropFilter: scrollProgress > 0.6 ? "blur(8px)" : "none",
    boxShadow: scrollProgress > 0.6 ? "0 4px 20px rgba(0, 0, 0, 0.4)" : "none",
  };

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300"
      style={headerStyle}
    >
      <div className="mx-auto flex h-16 max-w-[1900px] items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="shrink-0" aria-label="Youflix home">
            <span className="text-2xl font-black italic tracking-tight text-[#E50914]">
              Youflix
            </span>
          </Link>

          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Primary"
          >
            {primaryLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-white ${
                    active ? "text-white" : "text-gray-300"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <MoreDropdown />
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:block">
            <SearchBar />
          </div>
          <NotificationsMenu />
          <ProfileMenu user={user} />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            className="ml-1 flex flex-col gap-1.5 p-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-5 bg-white transition-transform duration-200 ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition-transform duration-200 ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
