'use client';

import { useEffect } from 'react';

/**
 * Closes a dropdown when the user clicks outside its container
 * or presses Escape. Only attaches listeners while `active` is true.
 */
export default function useClickOutside(ref, onOutsideClick, active) {
  useEffect(() => {
    if (!active) return undefined;

    function handlePointerDown(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') onOutsideClick();
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [active, ref, onOutsideClick]);
}
