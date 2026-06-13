import Link from 'next/link';
import Navbar from './ui/Navbar';
import { Suspense } from 'react';

/**
 * Root not-found handler.
 * Next.js uses the root layout (app/layout.js) for this page.
 * Since the root layout doesn't have a Navbar, we include it here.
 */
export default function RootNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Manually include Navbar to ensure users can always navigate back */}
      <Suspense fallback={<div className="h-14 bg-[#272c33]" />}>
        <Navbar />
      </Suspense>
      
      <main 
        className="flex-grow flex flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: '#241c1f' }}
      >
        <div className="p-10 rounded-3xl border border-stone-800 bg-stone-900/60 backdrop-blur-md shadow-2xl max-w-lg">
          <h2 className="text-3xl font-serif font-bold text-amber-500 mb-4">
            404 - Page Not Found
          </h2>
          <p className="text-stone-300 mb-8 leading-relaxed">
            We couldn&apos;t find the page you were looking for. 
            It might have been moved or deleted.
          </p>
          <div className="flex justify-center">
            <Link
              href="/shop"
              className="inline-block bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold py-3 px-8 rounded-xl transition duration-200 shadow-lg tracking-wide uppercase text-sm cursor-pointer"
            >
              Return to Shop
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}