import {ShowCard} from "@/components";

export default async function Home() {
  const response = await fetch("https://api.tvmaze.com/shows/6771", {
    cache: "force-cache",
  });
  const data = await response.json();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8 px-4 md:py-12 md:px-6">
      <ShowCard show={data} />
    </div>
  );
}
