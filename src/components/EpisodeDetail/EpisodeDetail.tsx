import Image from "next/image";
import { EpisodeDetailProps } from "./EpisodeDetail.types";

export function EpisodeDetail({ episode }: EpisodeDetailProps) {
  const cleanSummary =
    episode.summary?.replace(/<[^>]*>/g, "") || "No description available.";

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden">
        {episode.image && (
          <div className="relative w-full aspect-video bg-neutral-200 dark:bg-neutral-800">
            <Image
              src={episode.image.original}
              alt={episode.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
              <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold bg-black/70 text-white backdrop-blur-sm">
                Season {episode.season} • Episode {episode.number}
              </span>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8 lg:p-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 leading-tight">
            {episode.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-700">
            {episode.airdate && (
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">
                  {new Date(episode.airdate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}

            {episode.runtime && (
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">{episode.runtime} minutes</span>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
              Summary
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
              {cleanSummary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
