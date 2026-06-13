import { Suspense } from 'react';
import Navbar from '../ui/Navbar';
import { CartProvider } from './cart/CartControl';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#241c1f' }}>
      <CartProvider>
        <div className="min-h-screen">
          <Suspense fallback={<div className="h-14 bg-[#373e48]" />}>
            <Navbar />
          </Suspense>
          <main>{children}</main>
        </div>
      </CartProvider>
    </main>
  );
}
