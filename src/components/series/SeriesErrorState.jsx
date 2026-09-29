export default function SeriesErrorState({ message = 'Failed to load series right now.' }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}
