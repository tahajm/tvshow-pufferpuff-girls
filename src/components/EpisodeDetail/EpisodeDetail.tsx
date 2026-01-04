import Image from "next/image";
import parse from "html-react-parser";
import { EpisodeDetailProps } from "./EpisodeDetail.types";
import { CalendarIcon, ClockIcon } from "@/components/icons";

export function EpisodeDetail({ episode }: EpisodeDetailProps) {
  return (
    <article className="w-full max-w-5xl mx-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden">
        {episode.image && (
          <figure className="relative w-full aspect-video bg-neutral-200 dark:bg-neutral-800">
            <Image
              src={episode.image.original}
              alt={episode.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              aria-hidden
            />

            <figcaption className="absolute bottom-4 left-4 px-4 py-2 rounded-lg text-sm font-bold bg-black/70 text-white">
              Season {episode.season}{" "}
              <span aria-hidden className="mx-2">
                •
              </span>{" "}
              Episode {episode.number}
            </figcaption>
          </figure>
        )}

        <div className="p-6 md:p-8 lg:p-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 leading-tight">
            {episode.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-700">
            {episode.airdate && (
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <CalendarIcon />
                <time className="font-medium" dateTime={episode.airdate}>
                  {new Date(episode.airdate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            )}

            {episode.runtime && (
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <ClockIcon />
                <time
                  className="font-medium"
                  dateTime={`PT${episode.runtime}M`}
                >
                  <span className="sr-only">Runtime: </span>
                  {episode.runtime} minutes
                </time>
              </div>
            )}
          </div>

          <section aria-labelledby="summary-heading">
            <h2
              id="summary-heading"
              className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4"
            >
              Summary
            </h2>
            <div className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
              {episode.summary ? (
                parse(episode.summary)
              ) : (
                <p>No summary available for this episode.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
