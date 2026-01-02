import { ShowCard, ShowEpisodes } from "@/components";
export default async function Home({
  params,
}: {
  params: Promise<{ showid: string }>;
}) {
  const { showid } = await params;
  const URL = `https://api.tvmaze.com/shows/${showid}`;
  const response = await fetch(URL, {
    cache: "force-cache",
  });
  const data = await response.json();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8 px-4 md:py-12 md:px-6 space-y-8">
      <ShowCard show={data} />
      <ShowEpisodes showId={data.id} />
    </div>
  );
}
