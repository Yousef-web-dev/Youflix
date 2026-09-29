'use client';

export default function KidsErrorState({ message = 'Something went wrong while loading Kids & Family content.' }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
      <p className="text-sm text-gray-400">{message}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/10"
      >
        Try Again
      </button>
    </div>
  );
}
