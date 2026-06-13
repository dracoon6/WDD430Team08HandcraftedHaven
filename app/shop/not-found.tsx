import Link from 'next/link';

export default function NotFound() {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center"
      style={{ backgroundColor: '#241c1f' }}
    >
      <div className="p-10 rounded-3xl border border-stone-800 bg-stone-900/60 backdrop-blur-md shadow-2xl max-w-lg">
        <h2 className="text-3xl font-serif font-bold text-amber-500 mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-stone-300 mb-8 leading-relaxed">
          We couldn&apos;t find the page you were looking for. It might have been moved or deleted, 
          or the URL might be incorrect. You can use the navigation menu above or return to the main shop.
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
    </div>
  );
}