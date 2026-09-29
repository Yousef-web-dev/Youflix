'use client';

const OPTIONS = [
  { label: 'Recently Added', value: 'recent' },
  { label: 'Oldest Added', value: 'oldest' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Alphabetical A-Z', value: 'az' },
  { label: 'Alphabetical Z-A', value: 'za' },
  { label: 'Release Date', value: 'release' },
];

export default function MyListSort({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Sort my list"
      className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-red-500 focus:border-white focus:outline-none"
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
