export default function ErrorState({ message = 'Something went wrong. Please try again.' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}
