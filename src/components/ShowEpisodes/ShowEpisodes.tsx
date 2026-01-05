"use client";
import { useQuery } from "@tanstack/react-query";
import { EpisodeCard } from "@/components";
import { Episode } from "@/types";
import { ShowEpisodesProps } from "./ShowEpisodes.types";
import { getShowEpisodes } from "@/lib/showsApi";
import { EpisodesLoadingSkeleton } from "./EpisodesLoadingSkeleton";

export function ShowEpisodes({ showId }: Readonly<ShowEpisodesProps>) {
  const { error, data, isLoading } = useQuery<Episode[]>({
    queryKey: ["showEpisodes", showId],
    queryFn: () => getShowEpisodes(showId),
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
    return <EpisodesLoadingSkeleton />;
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

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-label={`${data.length} episode${data.length === 1 ? "" : "s"} available`}
        >
          {data.map((episode) => (
            <li key={episode.id}>
              <EpisodeCard showId={showId} episode={episode} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
