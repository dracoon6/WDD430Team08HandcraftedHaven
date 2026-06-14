'use client';

import { useCart } from '../../cart/CartControl';
import { DBProduct } from '@/app/lib/product-data';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: DBProduct }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      image_url: product.image_url ?? undefined,
    });

    // ADDED SUCCES STATE
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isUnavailable = product.stock_quantity === 0 || !product.is_available;

  return (
    <div className="pt-6">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isUnavailable || added}
        className={`w-full font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg tracking-wide uppercase text-xs text-center cursor-pointer focus:outline-none
          ${
            isUnavailable
              ? 'bg-stone-800 text-stone-600 cursor-not-allowed'
              : added
                ? 'bg-emerald-600 text-white scale-95'
                : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
          }`}
      >
        {isUnavailable
          ? 'Sold Out'
          : added
            ? '✓ Added to Cart!'
            : 'Add to Cart'}
      </button>
    </div>
  );
}
