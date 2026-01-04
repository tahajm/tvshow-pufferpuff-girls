import { EpisodeDetail } from "@/components";
import { ArrowLeftIcon } from "@/components/icons";
import Link from "next/link";

export default async function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ episodeid: string; showid: string }>;
}) {
  const { episodeid, showid } = await params;
  const URL = `https://api.tvmaze.com/episodes/${episodeid}`;
  const response = await fetch(URL, {
    cache: "force-cache",
  });
  const data = await response.json();

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
