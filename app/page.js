import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { products } from './lib/product-data';

// Split flat array into N columns for masonry layout
function splitIntoColumns(items, numCols) {
  const cols = Array.from({ length: numCols }, () => []);
  items.forEach((item, i) => cols[i % numCols].push(item));
  return cols;
}

export default function Home() {
  const columns = splitIntoColumns(products, 4);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#241c1f' }}>
      {/* HERO SECTION — matches navbar logo exactly */}
      <section
        className="relative text-center py-20 px-8 bg-cover bg-center min-h-[450px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/hero-bg-geometric.svg')",
        }}
      >
        {/* DARK GRADIENT OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(55,62,72,0.55), rgba(36,28,31,0.92))',
          }}
        />

        {/* HERO CONTENT */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* ICON BADGE — same as navbar logo */}
          <div className="p-4 bg-amber-700/20 border border-amber-500/30 rounded-2xl shadow-xl backdrop-blur-sm">
            <BuildingStorefrontIcon className="h-14 w-14 text-amber-500" />
          </div>

          {/* "HANDCRAFTED HAVEN" — solid amber, no gradient */}
          <div className="flex flex-col items-center leading-none">
            {/* Solid amber "Handcrafted" matching logo */}
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-amber-500 drop-shadow-lg">
              Handcrafted
            </h1>

            {/* Spaced "HAVEN" matching logo color */}
            <span className="text-base md:text-lg font-semibold tracking-[0.4em] text-amber-600 uppercase mt-3">
              Haven
            </span>
          </div>

          {/* TAGLINE — soft, italic */}
          <p className="text-lg md:text-xl text-stone-300 italic max-w-xl mt-2 drop-shadow">
            Unique handmade products, just for you
          </p>

          {/* DECORATIVE DIVIDER */}
          <div className="flex items-center gap-3 mt-2">
            <div className="h-px w-12 bg-amber-500/40" />
            <span className="text-amber-500/70 text-xs tracking-[0.3em] uppercase">
              Est. 2026
            </span>
            <div className="h-px w-12 bg-amber-500/40" />
          </div>
        </div>
      </section>

      {/* Masonry Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="grid gap-4">
            {col.map((item) => (
              <article
                key={item.id}
                className="rounded-lg p-4 shadow-md border transition-transform hover:scale-[1.02]"
                style={{
                  backgroundColor: '#373e48',
                  borderColor: '#000000',
                }}
              >
                <div
                  className={`rounded-md mb-3 ${item.h}`}
                  style={{ backgroundColor: '#241c1f' }}
                />
                <h2 className="text-base font-medium mb-1 text-white">
                  {item.title}
                </h2>
                <p className="text-sm mb-3" style={{ color: '#cbd5e1' }}>
                  {item.text}
                </p>
                <button
                  type="button"
                  className="rounded-md px-3 py-1 text-sm text-white cursor-pointer transition hover:bg-amber-700"
                  style={{
                    backgroundColor: '#241c1f',
                    border: '1px solid #000000',
                  }}
                >
                  View
                </button>
              </article>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}