"use client";

import { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

// Replace with real notifications once you have a data source
const sampleNotifications = [
  { id: 1, title: 'New episode of "Nightfall Bay" is out', time: "2h ago" },
  { id: 2, title: '"The Long Drive" leaves Youflix in 3 days', time: "1d ago" },
  {
    id: 3,
    title: "Because you watched Coastal Static: 4 new picks",
    time: "3d ago",
  },
];

export default function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setOpen(false), open);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Notifications"
        className="relative rounded-full p-1.5 text-gray-200 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 2.5c-2.3 0-4 1.9-4 4.3v2.2c0 .6-.2 1.2-.6 1.7l-1 1.3c-.5.7 0 1.7.9 1.7h11.4c.9 0 1.4-1 .9-1.7l-1-1.3c-.4-.5-.6-1.1-.6-1.7V6.8c0-2.4-1.7-4.3-4-4.3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8.2 15.5a1.8 1.8 0 0 0 3.6 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span
          className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#E50914]"
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-md border border-white/10 bg-[#141414] shadow-xl shadow-black/50"
        >
          <p className="border-b border-white/10 px-4 py-3 text-sm text-gray-300">
            Notifications
          </p>
          {sampleNotifications.map((item) => (
            <div
              key={item.id}
              role="menuitem"
              className="flex flex-col gap-0.5 border-b border-white/5 px-4 py-3 last:border-none hover:bg-white/5"
            >
              <span className="text-sm text-gray-100">{item.title}</span>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
