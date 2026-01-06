export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8 px-4 md:py-12 md:px-6 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"
          aria-hidden="true"
        />
        <span className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">
          Loading...
        </span>
      </div>
    </div>
  );
}
