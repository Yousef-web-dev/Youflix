const STORAGE_KEY = "Youflix-my-list";

function isValidEntry(entry) {
  return (
    entry &&
    typeof entry === "object" &&
    entry.id != null &&
    (entry.type === "movie" || entry.type === "tv")
  );
}

function readRaw() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidEntry) : [];
  } catch {
    return [];
  }
}

function writeRaw(list) {
  if (typeof window === "undefined") return list;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Storage full / private browsing — in-memory list still updates for this session.
  }
  return list;
}

export function getMyList() {
  return readRaw();
}

export function isInMyList(id, type) {
  return readRaw().some((entry) => entry.id === id && entry.type === type);
}

export function addToMyList(item, type) {
  const list = readRaw();
  const exists = list.some(
    (entry) => entry.id === item.id && entry.type === type,
  );
  if (exists) return list;

  const entry = {
    id: item.id,
    type,
    title: item.title ?? item.name ?? "",
    poster_path: item.poster_path ?? null,
    backdrop_path: item.backdrop_path ?? null,
    vote_average: item.vote_average ?? null,
    release_date: item.release_date ?? null,
    first_air_date: item.first_air_date ?? null,
    genre_ids: item.genre_ids ?? [],
    savedAt: new Date().toISOString(),
  };

  return writeRaw([...list, entry]);
}

export function removeFromMyList(id, type) {
  const next = readRaw().filter(
    (entry) => !(entry.id === id && entry.type === type),
  );
  return writeRaw(next);
}

export function clearMyList() {
  return writeRaw([]);
}

export function filterMyList(items, type) {
  if (!type || type === "all") return items;
  return items.filter((entry) => entry.type === type);
}

export function sortMyList(items, sortOption) {
  const sorted = [...items];
  switch (sortOption) {
    case "oldest":
      return sorted.sort((a, b) => new Date(a.savedAt) - new Date(b.savedAt));
    case "rating":
      return sorted.sort(
        (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0),
      );
    case "az":
      return sorted.sort((a, b) =>
        (a.title || "").localeCompare(b.title || ""),
      );
    case "za":
      return sorted.sort((a, b) =>
        (b.title || "").localeCompare(a.title || ""),
      );
    case "release": {
      const dateOf = (e) => e.release_date || e.first_air_date || "";
      return sorted.sort((a, b) => dateOf(b).localeCompare(dateOf(a)));
    }
    case "recent":
    default:
      return sorted.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
  }
}
