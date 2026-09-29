import MovieRow from './MovieRow';

const MOCK_PROGRESS = [72, 35, 88, 20, 55];

function remainingLabel(percent) {
  const totalMinutes = 110;
  const left = Math.round(totalMinutes * (1 - percent / 100));
  return `${left} min left`;
}

export default function ContinueWatching({ items, error }) {
  if (!error && (!items || items.length === 0)) return null;

  const safeItems = Array.isArray(items) ? items : [];

  const progressList = safeItems.map((_, index) => {
    const percent = MOCK_PROGRESS[index % MOCK_PROGRESS.length];
    return { progress: percent, remaining: remainingLabel(percent) };
  });

  return (
    <div className="pt-8 sm:pt-12">
      <MovieRow
        title="Continue Watching"
        items={safeItems}
        error={error}
        progressList={progressList}
      />
    </div>
  );
}