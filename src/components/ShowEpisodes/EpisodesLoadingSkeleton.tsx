const SKELETON_KEYS = Array.from({ length: 6 }, (_, i) => `skeleton-${i}`);

export function EpisodesLoadingSkeleton() {
  return (
    <section
      className="w-full max-w-5xl mx-auto mt-8"
      aria-labelledby="episodes-loading-heading"
      aria-busy="true"
    >
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden p-6 md:p-8">
        <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-48 mb-6 animate-pulse">
          <span className="sr-only">Loading episodes...</span>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-label="Episode cards loading"
        >
          {SKELETON_KEYS.map((key) => (
            <div
              key={key}
              className="bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden animate-pulse"
              aria-hidden="true"
            >
              <div className="aspect-video bg-neutral-200 dark:bg-neutral-700" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
