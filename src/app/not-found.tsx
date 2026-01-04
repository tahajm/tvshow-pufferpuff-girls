import { SadFaceIcon } from "@/components/icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <SadFaceIcon />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Page Not Found
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          <Link
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
