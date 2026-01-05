"use client";
import { useQuery } from "@tanstack/react-query";
import { EpisodeCard } from "@/components";
import { Episode } from "@/types";
import { ShowEpisodesProps } from "./ShowEpisodes.types";

export function ShowEpisodes({ showId }: ShowEpisodesProps) {
  const { error, data, isLoading } = useQuery<Episode[]>({
    queryKey: ["showEpisodes", showId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.tvmaze.com/shows/${showId}/episodes`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch episodes");
      }
      return await response.json();
    },
  });

  if (error) {
    return (
      <section 
        className="w-full max-w-5xl mx-auto mt-8"
        aria-labelledby="episodes-error-heading"
      >
        <div 
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6"
          role="alert"
        >
          <h3 
            id="episodes-error-heading"
            className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2"
          >
            Failed to load episodes
          </h3>
          <p className="text-red-700 dark:text-red-300">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section 
        className="w-full max-w-5xl mx-auto mt-8"
        aria-labelledby="episodes-loading-heading"
        aria-busy="true"
      >
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden p-6 md:p-8">
          <div 
            className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-48 mb-6 animate-pulse"
            role="status"
            aria-label="Loading episodes"
          >
            <span className="sr-only">Loading episodes...</span>
          </div>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            aria-label="Episode cards loading"
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
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

  if (!data || data.length === 0) {
    return (
      <section 
        className="w-full max-w-5xl mx-auto mt-8"
        aria-labelledby="episodes-heading"
      >
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden p-6 md:p-8">
          <h2 
            id="episodes-heading"
            className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4"
          >
            Episodes
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            No episodes available for this show.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="w-full max-w-5xl mx-auto mt-8"
      aria-labelledby="episodes-heading"
    >
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden p-6 md:p-8">
        <h2 
          id="episodes-heading"
          className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-6"
        >
          Episodes
        </h2>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
          aria-label={`${data.length} episode${data.length === 1 ? '' : 's'} available`}
        >
          {data.map((episode) => (
            <div key={episode.id} role="listitem">
              <EpisodeCard showId={showId} episode={episode} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
