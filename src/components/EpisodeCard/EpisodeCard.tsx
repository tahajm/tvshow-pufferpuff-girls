"use client";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { VideoIcon } from "@/components/icons";
import { Episode } from "../ShowEpisodes";

export function EpisodeCard({
  episode,
  showId,
}: {
  episode: Episode;
  showId: number;
}) {
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

          <div className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
            {episode.summary ? parse(episode.summary) : ""}
          </div>
        </div>
      </div>
    </Link>
  );
}
