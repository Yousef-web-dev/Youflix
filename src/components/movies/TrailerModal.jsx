'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function TrailerModal({ id, title, onClose }) {
  const [trailerKey, setTrailerKey] = useState(undefined); // undefined = loading, null = none found

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/trailer?id=${id}&title=${encodeURIComponent(title)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setTrailerKey(data.key ?? null);
      })
      .catch(() => {
        if (!cancelled) setTrailerKey(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id, title]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} trailer`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-lg bg-black"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close trailer"
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
        >
          <X className="h-4 w-4" />
        </button>

        {trailerKey === undefined && (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">Loading trailer…</div>
        )}
        {trailerKey === null && (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-gray-400">
            No trailer is available for {title} right now.
          </div>
        )}
        {trailerKey && (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
            title={`${title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}