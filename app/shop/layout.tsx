import { Suspense } from 'react';
import Navbar from '../ui/Navbar';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="h-14 bg-[#373e48]" />}>
        <Navbar />
      </Suspense>
      <main>{children}</main>
    </div>
  );
}