import { ShowCardProps } from "./ShowCard.types";

export default function AdditionalDetails({show}: ShowCardProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {show.genres && show.genres.length > 0 && (
          <div className="flex gap-2">
            {show.genres.map((genre) => (
              <span
                key={genre}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
          {show.status}
        </span>
        {show.rating?.average && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            ⭐ {show.rating.average}/10
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-700">
        {show.premiered && (
          <div>
            <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
              Premiered
            </dt>
            <dd className="text-base text-neutral-900 dark:text-neutral-100">
              {new Date(show.premiered).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </dd>
          </div>
        )}
        {show.ended && (
          <div>
            <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
              Ended
            </dt>
            <dd className="text-base text-neutral-900 dark:text-neutral-100">
              {new Date(show.ended).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </dd>
          </div>
        )}
        {show.runtime && (
          <div>
            <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
              Runtime
            </dt>
            <dd className="text-base text-neutral-900 dark:text-neutral-100">
              {show.runtime} minutes
            </dd>
          </div>
        )}
        {show.language && (
          <div>
            <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
              Language
            </dt>
            <dd className="text-base text-neutral-900 dark:text-neutral-100">
              {show.language}
            </dd>
          </div>
        )}
        {show.type && (
          <div>
            <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
              Type
            </dt>
            <dd className="text-base text-neutral-900 dark:text-neutral-100">
              {show.type}
            </dd>
          </div>
        )}
      </div>
    </div>
  );
}
