export const genres = [
  { id: 28, name: 'Action', gradient: 'from-red-900 via-red-950 to-black' },
  { id: 35, name: 'Comedy', gradient: 'from-amber-800 via-amber-950 to-black' },
  { id: 18, name: 'Drama', gradient: 'from-slate-700 via-slate-900 to-black' },
  { id: 878, name: 'Sci-Fi', gradient: 'from-cyan-900 via-blue-950 to-black' },
  { id: 27, name: 'Horror', gradient: 'from-purple-950 via-black to-black' },
  { id: 10749, name: 'Romance', gradient: 'from-rose-900 via-rose-950 to-black' },
  { id: 16, name: 'Animation', gradient: 'from-emerald-800 via-emerald-950 to-black' },
  { id: 53, name: 'Thriller', gradient: 'from-orange-950 via-black to-black' },
];

const genreMap = Object.fromEntries(genres.map((g) => [g.id, g.name]));

export function genreNames(ids = []) {
  return ids.map((id) => genreMap[id]).filter(Boolean);
}
