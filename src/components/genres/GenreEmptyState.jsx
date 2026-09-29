export default function GenreEmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-16 text-center">
      <p className="text-base font-semibold text-white">No titles found for this genre.</p>
      <p className="text-sm text-gray-400">Try another genre or adjust your filters.</p>
    </div>
  );
}
