'use client';

import Link from 'next/link';
import { useCart } from './CartControl';

export default function CartPage() {
  const { cart, addToCart, decrementQuantity, removeFromCart, totalPrice } =
    useCart();

  // Shipping logic configuration (e.g., Free shipping over $100, otherwise $5.99)
  const shippingThreshold = 100;
  const shippingCost =
    totalPrice > shippingThreshold || totalPrice === 0 ? 0 : 5.99;
  const finalOrderTotal = totalPrice + shippingCost;

  return (
    <main
      className="min-h-screen text-stone-100 p-6 md:p-12"
      style={{ backgroundColor: '#241c1f' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* SHOP NAVIGATION HEADER */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="text-sm text-stone-400 hover:text-amber-500 transition-colors"
          >
            &larr; Back to Shop
          </Link>
          <h1 className="text-3xl font-serif font-semibold mt-2">
            Shopping Cart
          </h1>
          {cart.length > 0 && (
            <p className="text-sm text-stone-400 mt-1">
              You have {cart.length} unique items in your basket
            </p>
          )}
        </div>

        {cart.length === 0 ? (
          /* EMPTY STATE ELEMENT */
          <div className="text-center py-16 border border-dashed border-stone-800 rounded-2xl bg-stone-900/10">
            <p className="text-zinc-400 text-sm mb-4">
              Your cart feels a bit empty...
            </p>
            <Link
              href="/shop"
              className="text-amber-500 hover:underline text-sm font-semibold"
            >
              &larr; Go browse handcrafted products
            </Link>
          </div>
        ) : (
          /* CART ACTIVE GRID */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* LEFT COLUMN: SELECTED BASKET ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-stone-800 bg-stone-900/40 backdrop-blur-sm items-center justify-between"
                >
                  <div className="flex gap-4 items-center w-full">
                    {/* OPTIONAL IMAGE URL */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-800 flex-shrink-0">
                      <img
                        src={
                          (item as any).image_url ||
                          'https://plus.unsplash.com/premium_vector-1745409090779-1710c1f8fd4d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div>
                      <h3 className="text-sm font-bold text-zinc-100">
                        {item.title}
                      </h3>
                      <p className="text-xs text-amber-500/90 font-medium mt-1">
                        ${item.price.toFixed(2)} x {item.quantity} = $
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY GENERAL CONTROL */}
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                    <div className="flex items-center bg-zinc-800/80 border border-zinc-700/60 rounded-xl overflow-hidden shadow-inner">
                      {/* REDUCE QUANTITY BUTTON */}
                      <button
                        onClick={() => decrementQuantity(item.id.toString())}
                        className="cursor-pointer px-3 py-1.5 text-zinc-400 hover:bg-amber-600/10 hover:text-amber-500 active:scale-95 font-bold transition-all"
                      >
                        -
                      </button>

                      {/* DISPLAY ITEM VALUE */}
                      <span className="w-8 text-center text-sm font-semibold text-zinc-100">
                        {item.quantity}
                      </span>

                      {/* INCREASE QUANTITY BUTTON */}
                      <button
                        onClick={() => addToCart(item)}
                        className="cursor-pointer px-3 py-1.5 text-zinc-400 hover:bg-amber-600/10 hover:text-amber-500 active:scale-95 font-bold transition-all"
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() => removeFromCart(item.id.toString())}
                      className="cursor-pointer text-xs font-bold uppercase tracking-wider text-rose-400/80 hover:text-rose-400 hover:underline transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: REFINED FINANCIAL ORDER SUMMARY */}
            <div className="p-6 rounded-xl border border-stone-800 bg-stone-900/60 shadow-xl lg:sticky lg:top-6">
              <h2 className="text-xl font-serif font-medium mb-4 pb-2 border-b border-stone-800">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm text-stone-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>
                    {shippingCost === 0
                      ? 'FREE'
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-stone-800 pt-3 mt-3 flex justify-between font-semibold text-base text-stone-100">
                  <span>Total</span>
                  <span className="text-amber-400 text-xl font-black">
                    ${finalOrderTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA Trigger */}
              <button
                type="button"
                className="w-full mt-6 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold py-3 px-4 rounded-xl transition duration-200 shadow-lg tracking-wide uppercase text-xs text-center cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
