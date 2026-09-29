'use client';

import { useCallback, useEffect, useState } from 'react';
import { getMyList, addToMyList, removeFromMyList, isInMyList } from '../hooks/myList';

const SYNC_EVENT = 'mylist-updated';

export default function useMyList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getMyList());

    // Multiple cards on the same page each use this hook independently.
    // When one toggles, broadcast it so every other card's checkmark updates too.
    function handleSync() {
      setList(getMyList());
    }
    window.addEventListener(SYNC_EVENT, handleSync);
    return () => window.removeEventListener(SYNC_EVENT, handleSync);
  }, []);

  const isInList = useCallback((id, type) => list.some((entry) => entry.id === id && entry.type === type), [list]);

  const toggle = useCallback((item, type) => {
    const next = isInMyList(item.id, type) ? removeFromMyList(item.id, type) : addToMyList(item, type);
    setList(next);
    window.dispatchEvent(new Event(SYNC_EVENT));
  }, []);

  return { list, isInList, toggle };
}
