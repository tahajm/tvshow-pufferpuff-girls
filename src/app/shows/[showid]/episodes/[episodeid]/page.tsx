import { cache } from "react";
import { EpisodeDetail } from "@/components";
import { ArrowLeftIcon } from "@/components/icons";
import Link from "next/link";
import { getEpisodeById } from "@/lib/showsApi";
import { cleanAndShorten } from "@/utils";
import { META_DESCRIPTION_MAX_LENGTH } from "@/constants";
import type { Metadata } from "next";

const getCachedEpisode = cache(getEpisodeById);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ episodeid: string; showid: string }>;
}): Promise<Metadata> {
  const { episodeid } = await params;
  const episode = await getCachedEpisode(episodeid);

  const title = `${episode.name} - S${episode.season}E${episode.number}`;
  const description = episode.summary
    ? cleanAndShorten(episode.summary, META_DESCRIPTION_MAX_LENGTH)
    : "";

  return {
    title,
    description,
  };
}

export default async function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ episodeid: string; showid: string }>;
}) {
  const { episodeid, showid } = await params;
  const data = await getCachedEpisode(episodeid);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8 px-4 md:py-12 md:px-6">
      <nav className="w-full max-w-5xl mx-auto mb-6">
        <Link
          href={`/shows/${showid}`}
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group"
        >
          <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to show</span>
        </Link>
      </nav>

      <main>
        <EpisodeDetail episode={data} />
      </main>
    </div>
  );
}
