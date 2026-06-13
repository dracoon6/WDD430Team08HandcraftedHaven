'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center"
      style={{ backgroundColor: '#241c1f' }}
    >
      <div className="p-10 rounded-3xl border border-stone-800 bg-stone-900/60 backdrop-blur-md shadow-2xl max-w-lg">
        <h2 className="text-3xl font-serif font-bold text-amber-500 mb-4">
          Something went wrong!
        </h2>
        <p className="text-stone-300 mb-8 leading-relaxed">
          We&apos;re sorry, but we encountered an unexpected error while loading this page. 
          You can try to reload the segment below or use the navigation menu above to continue browsing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold py-3 px-8 rounded-xl transition duration-200 shadow-lg tracking-wide uppercase text-sm cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/shop"
            className="inline-block border border-stone-700 hover:border-amber-600/50 text-stone-300 hover:text-amber-500 font-bold py-3 px-8 rounded-xl transition duration-200 text-sm uppercase tracking-wide"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}