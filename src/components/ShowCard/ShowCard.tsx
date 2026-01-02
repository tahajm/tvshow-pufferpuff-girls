import Image from "next/image";
import { ShowCardProps } from "./ShowCard.types";
import AdditionalDetails from "./AdditionalDetails";

export function ShowCard({ show }: ShowCardProps) {
  //   const cleanSummary = show.summary?.replace(/<[^>]*>/g, "") || "No description available.";

  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-80 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800">
          {show.image ? (
            <div className="relative w-full aspect-[2/3] md:h-full">
              <Image
                src={show.image.original}
                alt={`${show.name} cover`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px] bg-neutral-200 dark:bg-neutral-700">
              <span className="text-neutral-500 dark:text-neutral-400">
                No image available
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 leading-tight">
            {show.name}
          </h1>

          <AdditionalDetails show={show} />
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
              Description
            </h2>
            <div dangerouslySetInnerHTML={{ __html: show.summary }} />
            {/* <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              {cleanSummary}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
