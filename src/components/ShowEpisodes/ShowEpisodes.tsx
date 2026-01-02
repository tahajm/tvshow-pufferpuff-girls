"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Episode, ShowEpisodesProps } from "./ShowEpisodes.types";
import { VideoIcon } from "@/components/icons";

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
      <div className="w-full max-w-5xl mx-auto mt-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
            Failed to load episodes
          </h3>
          <p className="text-red-700 dark:text-red-300">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden p-6 md:p-8">
          <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-48 mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden animate-pulse"
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
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-8">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
            Episodes
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            No episodes available for this show.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
          Episodes
        </h2>

        <div className="space-y-8">
          {/* Episodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((episode) => (
              <EpisodeCard key={episode.id} showId={showId} episode={episode} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EpisodeCard({
  episode,
  showId,
}: {
  episode: Episode;
  showId: number;
}) {
  const cleanSummary =
    episode.summary?.replace(/<[^>]*>/g, "") || "No description available.";

  return (
    <Link href={`/shows/${showId}/episodes/${episode.id}`}>
      <div className="group bg-neutral-50 dark:bg-neutral-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600">
        <div className="relative aspect-video bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
          {episode.image ? (
            <Image
              src={episode.image.medium}
              alt={episode.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <VideoIcon className="w-12 h-12 text-neutral-400 dark:text-neutral-600" />
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-black/70 text-white backdrop-blur-sm">
              S{episode.season} E{episode.number}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {episode.name}
          </h4>

          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
            {episode.airdate && (
              <span>
                {new Date(episode.airdate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
            {episode.runtime && (
              <>
                <span>•</span>
                <span>{episode.runtime} min</span>
              </>
            )}
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
            {cleanSummary}
          </p>
        </div>
      </div>
    </Link>
  );
}
