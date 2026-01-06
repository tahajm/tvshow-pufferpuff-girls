import { cache } from "react";
import { ShowCard, ShowEpisodes } from "@/components";
import { getShow } from "@/lib/showsApi";
import { cleanAndShorten } from "@/utils";
import { DEFAULT_SHOW_ID, META_DESCRIPTION_MAX_LENGTH } from "@/constants";
import type { Metadata } from "next";

const getCachedShow = cache(getShow);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ showid: string }>;
}): Promise<Metadata> {
  const { showid } = await params;
  const data = await getCachedShow(showid);

  const description = data.summary
    ? cleanAndShorten(data.summary, META_DESCRIPTION_MAX_LENGTH)
    : "";

  return {
    title: data.name,
    description,
  };
}

export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  return [{ showid: String(DEFAULT_SHOW_ID) }];
}

export default async function Home({
  params,
}: {
  params: Promise<{ showid: string }>;
}) {
  const { showid } = await params;
  const data = await getCachedShow(showid);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8 px-4 md:py-12 md:px-6 space-y-8">
      <main id="main-content" className="space-y-8">
        <ShowCard show={data} />
        <ShowEpisodes showId={data.id} />
      </main>
    </div>
  );
}
