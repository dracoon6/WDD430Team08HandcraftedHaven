'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    subcategories: [
      { id: '1-1', name: 'Audio & Headphones', slug: 'audio-headphones' },
      {
        id: '1-2',
        name: 'Computers & Accessories',
        slug: 'computers-accessories',
      },
      { id: '1-3', name: 'Smart Home', slug: 'smart-home' },
    ],
  },
  {
    id: '2',
    name: 'Clothing & Fashion',
    slug: 'clothing-fashion',
    subcategories: [
      { id: '2-1', name: "Men's Fashion", slug: 'mens-fashion' },
      { id: '2-2', name: "Women's Fashion", slug: 'womens-fashion' },
      { id: '2-3', name: "Kids' Luggage", slug: 'kids-luggage' },
    ],
  },
];

interface SidebarNavProps {
  onCloseAll: () => void; // Para cerrar todo el panel cuando hagan clic en un enlace final
  onBack: () => void; // Para regresar al menú principal del Hamburger
}

export default function CategoriesMenu({
  onCloseAll,
  onBack,
}: SidebarNavProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  return (
    <>
      {/* SIDE PANEL */}
      <div className="absolute top-0 left-0 h-full w-[365px] bg-white z-50 text-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out translate-x-0">
        {/* SLIDE ANIMATION (changes sublevel) */}
        <div className="relative overflow-hidden h-[calc(100%-3.5rem)]">
          {/* LEVEL 1: Main Categories */}
          <div
            className={`w-full h-full py-4 overflow-y-auto transition-transform duration-300 ${
              activeCategory ? '-translate-x-full absolute' : 'translate-x-0'
            }`}
          >
            {/* GO BACK TO MAIN MENU */}
            <button
              onClick={onBack}
              className="cursor-pointer w-full flex items-center gap-2 px-6 py-3 border-b border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              <span>⬅️ BACK TO MAIN MENU</span>
            </button>

            <div className="px-6 py-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
              CATEGORIES
            </div>
            <nav className="mt-2">
              {mockCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category)}
                  className="cursor-pointer w-full flex items-center justify-between px-8 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <span>{category.name} ➡️</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* LEVEL 2: SUBCATEGORIES */}
          <div
            className={`w-full h-full py-4 bg-white overflow-y-auto absolute top-0 transition-transform duration-300 ${
              activeCategory ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {activeCategory && (
              <>
                {/* BACK BUTTON */}
                <button
                  onClick={() => setActiveCategory(null)}
                  className="cursor-pointer w-full flex items-center gap-2 px-6 py-3 border-b border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                >
                  <span> 🔙 GO BACK</span>
                </button>

                {/* SUBCATEGORY LIST */}
                <div className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-100">
                  {activeCategory.name}
                </div>
                <nav className="mt-2">
                  {activeCategory.subcategories.map((sub: Subcategory) => (
                    <Link
                      key={sub.id}
                      href={`/shop/${activeCategory.slug}/${sub.slug}`}
                      onClick={onCloseAll} // Close on navigation
                      className="block px-8 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </nav>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
