"use client";

import { useEffect } from "react";
import Link from "next/link";
import { WarningIcon } from "@/components/icons";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <WarningIcon />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 text-center mb-4">
            Something went wrong!
          </h1>

          <p className="text-neutral-600 dark:text-neutral-400 text-center mb-2">
            We encountered an unexpected error. Please try again.
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <p className="text-sm font-mono text-neutral-700 dark:text-neutral-300 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium rounded-lg transition-colors text-center"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
