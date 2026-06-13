import { getProductById } from '@/app/lib/product-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

const DEFAULT_PLACEHOLDER_IMAGE =
  'https://plus.unsplash.com/premium_vector-1683134288584-d2d5f6d714d2?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const materials = Array.isArray(product.materials)
    ? product.materials
    : typeof product.materials === 'string'
      ? (product.materials as string)
          .replace(/[{}"]/g, '')
          .split(',')
          .filter(Boolean)
      : [];

  return (
    <main
      className="min-h-screen text-stone-100 p-6 md:p-12"
      style={{ backgroundColor: '#241c1f' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* BREADCRUMB NAVIGATION */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="text-sm text-stone-400 hover:text-amber-500 transition-colors"
          >
            &larr; Back to Shop
          </Link>
        </div>

        {/* TWO-COLUMN PRODUCT DISPLAY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE: VISUAL PRODUCT IMAGE DISPLAY */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-stone-800 bg-stone-900/40 backdrop-blur-sm shadow-xl">
            <img
              src={product.image_url || DEFAULT_PLACEHOLDER_IMAGE}
              alt={product.title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* RIGHT SIDE: PRODUCT DETAILS */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-semibold text-stone-100 tracking-tight">
                {product.title}
              </h1>
              <p className="text-sm text-amber-500/90 font-medium mt-2 tracking-wide">
                Handcrafted Item
              </p>
            </div>

            {/* PRICE & AVAILABILITY */}
            <div className="flex items-baseline gap-4 py-2 border-b border-stone-800/60">
              <span className="text-3xl font-black text-amber-400">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {product.currency}
              </span>

              {product.stock_quantity > 0 && product.is_available ? (
                <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  &bull; In Stock ({product.stock_quantity})
                </span>
              ) : (
                <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  &bull; Out of Stock
                </span>
              )}
            </div>

            {/* DESCRIPTIONS */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-stone-300 leading-relaxed italic">
                {product.description}
              </p>
            </div>

            {/* SPECIFICATIONS */}
            <div className="pt-4 grid grid-cols-2 gap-4 text-xs font-medium border-t border-stone-800/60 text-stone-400">
              {product.materials && product.materials.length > 0 && (
                <div>
                  <span className="block text-stone-500 font-bold uppercase tracking-wider mb-0.5">
                    Materials:
                  </span>
                  {materials.join(', ')}
                </div>
              )}
              {product.dimensions && (
                <div>
                  <span className="block text-stone-500 font-bold uppercase tracking-wider mb-0.5">
                    Dimensions:
                  </span>
                  {product.dimensions}
                </div>
              )}
              {product.tags && product.tags.length > 0 && (
                <div className="col-span-2">
                  <span className="block text-stone-500 font-bold uppercase tracking-wider mb-1">
                    Tags:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-stone-800 text-stone-300 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
