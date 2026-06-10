'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
          Handcrafted Haven
        </Link>

        {/* NAV LINKS */}
        <nav className="flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            Contact
          </Link>
        </nav>

      </div>
    </header>
  );
}