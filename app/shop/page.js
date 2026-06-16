import { getAllProducts } from '../lib/product-data';
import Link from 'next/link';

const ITEMS_PER_PAGE = 12;

// Split flat array into N columns for masonry layout
function splitIntoColumns(items, numCols) {
  const cols = Array.from({ length: numCols }, () => []);
  items.forEach((item, i) => cols[i % numCols].push(item));
  return cols;
}

// Filter products by search query
function filterProducts(items, query) {
  if (!query) return items;
  const q = query.toLowerCase();
  return items.filter(
    (p) =>
      p.title?.toLowerCase().includes(q) ||
      p.short_description?.toLowerCase().includes(q),
  );
}

export default async function Home(props) {
  const products = await getAllProducts();
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const filtered = filterProducts(products, query);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageProducts = filtered.slice(offset, offset + ITEMS_PER_PAGE);
  const columns = splitIntoColumns(pageProducts, 4);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#241c1f' }}>
      {/* HERO SECTION */}
      <section
        className="relative text-center py-20 px-8 bg-cover bg-center min-h-[450px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/hero-bg-geometric.svg')",
        }}
      >
        {/* DARK GRADIENT OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(55,62,72,0.5), rgba(36,28,31,0.95))',
          }}
        />

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          {/* "HANDCRAFTED HAVEN" */}
          <h1 className="flex flex-wrap items-baseline justify-center gap-x-4 drop-shadow-lg">
            <span className="text-6xl md:text-7xl font-extrabold tracking-tight text-amber-500">
              Handcrafted
            </span>
            <span className="text-6xl md:text-7xl font-semibold tracking-[0.15em] uppercase text-amber-600">
              Haven
            </span>
          </h1>

          {/* TAGLINE */}
          <p className="text-base md:text-lg text-stone-200 italic font-normal tracking-wide drop-shadow mt-2">
            Unique handmade products, just for you
          </p>

          {/* DECORATIVE DIVIDER */}
          <div className="flex items-center gap-3 mt-2">
            <div className="h-px w-16 bg-amber-500/40" />
            <span className="text-amber-500 text-xs">✦</span>
            <div className="h-px w-16 bg-amber-500/40" />
          </div>
        </div>
      </section>

      {/* Search results indicator */}
      {query && (
        <div className="px-8 pt-6 text-stone-300 text-sm">
          Showing results for:{' '}
          <span className="font-semibold text-amber-400">"{query}"</span>{' '}
          <span className="text-stone-400">
            ({filtered.length}{' '}
            {filtered.length === 1 ? 'result' : 'results'})
          </span>
        </div>
      )}

      {/* Masonry Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
        {pageProducts.length === 0 ? (
          <p className="text-stone-300 col-span-full text-center text-lg">
            No products match "{query}"
          </p>
        ) : (
          columns.map((col, colIndex) => (
            <div key={colIndex} className="grid gap-4">
              {col.map((item) => (
                <Link
                  key={item.id}
                  href={`/shop/product/${item.id}`}
                  className="rounded-lg p-4 shadow-md border block hover:border-amber-500 hover:scale-[1.02] transition-all duration-200"
                  style={{ backgroundColor: '#373e48', borderColor: '#000000' }}
                >
                  <div className="rounded-md mb-3 overflow-hidden h-40 bg-stone-900">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-40"
                        style={{ backgroundColor: '#241c1f' }}
                      />
                    )}
                  </div>

                  <h2 className="text-base font-serif font-medium mb-1 text-stone-100">
                    {item.title}
                  </h2>

                  <p className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    ${Number(item.price).toFixed(2)}
                  </p>

                  <p
                    className="text-sm line-clamp-2 mt-2"
                    style={{ color: '#cbd5e1' }}
                  >
                    {item.short_description}
                  </p>
                </Link>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Simple Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pb-8">
          {currentPage > 1 && (
            <Link
              href={`?${new URLSearchParams({ ...searchParams, page: String(currentPage - 1) }).toString()}`}
              className="px-4 py-2 rounded text-stone-100 border border-stone-700 hover:bg-stone-800 hover:border-amber-500 transition-colors"
            >
              ← Prev
            </Link>
          )}
          <span className="text-stone-300 text-sm">
            Page <span className="text-amber-400 font-semibold">{currentPage}</span> of{' '}
            <span className="text-amber-400 font-semibold">{totalPages}</span>
          </span>
          {currentPage < totalPages && (
            <Link
              href={`?${new URLSearchParams({ ...searchParams, page: String(currentPage + 1) }).toString()}`}
              className="px-4 py-2 rounded text-stone-100 border border-stone-700 hover:bg-stone-800 hover:border-amber-500 transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </main>
  );
}