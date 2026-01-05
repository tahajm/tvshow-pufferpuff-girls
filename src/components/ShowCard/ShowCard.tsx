import Image from "next/image";
import parse from "html-react-parser";
import { stripHtmlTags } from "@/utils";
import { ShowCardProps } from "./ShowCard.types";

export function ShowCard({ show }: Readonly<ShowCardProps>) {
  return (
    <article className="w-full max-w-5xl mx-auto bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {show.image ? (
          <div className="w-full md:w-80 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800">
            <div className="relative w-full aspect-[2/3] md:h-full">
              <Image
                src={show.image.original}
                alt={`${show.name} poster`}
                fill
                className="object-cover"
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
          </div>
        ) : (
          <div className="w-full md:w-80 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center min-h-[400px]">
            <span className="text-neutral-500 dark:text-neutral-400">
              No image available
            </span>
          </div>
        )}

        <div className="flex-1 p-6 md:p-8">
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 leading-tight">
              {show.name}
            </h1>
          </header>

          <div>
            <ul
              className="flex flex-wrap gap-2 mb-6 list-none"
              aria-label="Show tags"
            >
              {show.genres && show.genres.length > 0 && (
                <>
                  {show.genres.map((genre) => (
                    <li
                      key={genre}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      <span className="sr-only">Genre: </span>
                      {genre}
                    </li>
                  ))}
                </>
              )}
              <li className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                <span className="sr-only">Status: </span>
                {show.status}
              </li>
              {show.rating?.average && (
                <li
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  aria-label={`Rating: ${show.rating.average} out of 10`}
                >
                  <span aria-hidden="true">⭐ {show.rating.average}/10</span>
                </li>
              )}
            </ul>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-700">
              {show.premiered && (
                <>
                  <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Premiered
                  </dt>
                  <dd className="text-base text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-0">
                    <time dateTime={show.premiered}>
                      {new Date(show.premiered).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </dd>
                </>
              )}
              {show.ended && (
                <>
                  <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Ended
                  </dt>
                  <dd className="text-base text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-0">
                    <time dateTime={show.ended}>
                      {new Date(show.ended).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </dd>
                </>
              )}
              {show.runtime ? (
                <>
                  <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Episode Runtime
                  </dt>
                  <dd className="text-base text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-0">
                    <time dateTime={`PT${show.runtime}M`}>
                      {show.runtime} minutes
                    </time>
                  </dd>
                </>
              ) : null}
              {show.language && (
                <>
                  <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Language
                  </dt>
                  <dd className="text-base text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-0">
                    {show.language}
                  </dd>
                </>
              )}
              {show.type && (
                <>
                  <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Type
                  </dt>
                  <dd className="text-base text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-0">
                    {show.type}
                  </dd>
                </>
              )}
            </dl>
          </div>

          <section aria-labelledby="description-heading">
            <h2
              id="description-heading"
              className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-3"
            >
              Description
            </h2>
            <div className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              {show.summary ? (
                <>
                  <p className="sr-only">{stripHtmlTags(show.summary)}</p>
                  <div aria-hidden="true">{parse(show.summary)}</div>
                </>
              ) : (
                <p>No description available for this show.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
