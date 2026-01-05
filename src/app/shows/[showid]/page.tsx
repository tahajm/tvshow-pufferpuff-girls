import { ShowCard, ShowEpisodes } from "@/components";
import { getShow } from "@/lib/showsApi";

export default async function Home({
  params,
}: {
  params: Promise<{ showid: string }>;
}) {
  const { showid } = await params;
  const data = await getShow(showid);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8 px-4 md:py-12 md:px-6 space-y-8">
      <main id="main-content" className="space-y-8">
        <ShowCard show={data} />
        <ShowEpisodes showId={data.id} />
      </main>
    </div>
  );
}
