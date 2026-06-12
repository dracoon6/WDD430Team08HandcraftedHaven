import { products } from '@/app/lib/product-data';

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
      p.text?.toLowerCase().includes(q)
  );
}

export default async function Home(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // Filter + paginate
  const filtered = filterProducts(products, query);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageProducts = filtered.slice(offset, offset + ITEMS_PER_PAGE);
  const columns = splitIntoColumns(pageProducts, 4);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#241c1f" }}>
      {/* Hero Section */}
      <section
        className="relative text-white text-center py-16 px-8 bg-cover bg-center min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/hero-bg-geometric.svg')",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(55,62,72,0.5), rgba(36,28,31,0.85))",
          }}
        />

        <div className="relative z-10">
          <h1 className="text-5xl mb-4 drop-shadow-lg">Handcrafted Haven</h1>
          <p className="text-xl drop-shadow">Unique handmade products, just for you</p>
        </div>
      </section>

      {/* Search results indicator */}
      {query && (
        <div className="px-8 pt-6 text-white text-sm">
          Showing results for: <span className="font-semibold">"{query}"</span>
          {' '}({filtered.length} {filtered.length === 1 ? 'result' : 'results'})
        </div>
      )}

      {/* Masonry Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
        {pageProducts.length === 0 ? (
          <p className="text-white col-span-full text-center text-lg">
            No products match "{query}"
          </p>
        ) : (
          columns.map((col, colIndex) => (
            <div key={colIndex} className="grid gap-4">
              {col.map((item) => (
                <article
                  key={item.id}
                  className="rounded-lg p-4 shadow-md border"
                  style={{
                    backgroundColor: "#373e48",
                    borderColor: "#000000",
                  }}
                >
                  <div
                    className={`rounded-md mb-3 ${item.h}`}
                    style={{ backgroundColor: "#241c1f" }}
                  />
                  <h2 className="text-base font-medium mb-1 text-white">{item.title}</h2>
                  <p className="text-sm mb-3" style={{ color: "#cbd5e1" }}>{item.text}</p>
                  <button
                    type="button"
                    className="rounded-md px-3 py-1 text-sm text-white cursor-pointer transition"
                    style={{
                      backgroundColor: "#241c1f",
                      border: "1px solid #000000",
                    }}
                  >
                    View
                  </button>
                </article>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Simple Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pb-8">
          {currentPage > 1 && (
            <a
              href={`?${new URLSearchParams({ ...searchParams, page: String(currentPage - 1) }).toString()}`}
              className="px-4 py-2 rounded text-white border border-gray-600 hover:bg-gray-700"
            >
              ← Prev
            </a>
          )}
          <span className="text-white text-sm">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <a
              href={`?${new URLSearchParams({ ...searchParams, page: String(currentPage + 1) }).toString()}`}
              className="px-4 py-2 rounded text-white border border-gray-600 hover:bg-gray-700"
            >
              Next →
            </a>
          )}
        </div>
      )}
    </main>
  );
}