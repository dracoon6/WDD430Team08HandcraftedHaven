'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface DBCategory {
  id: number;
  name: string;
  slug: string;
}

interface CategoriesMenuProps {
  categories: DBCategory[];
  onCloseAll: () => void;
  onBack: () => void;
}

export default function CategoriesMenu({
  categories,
  onCloseAll,
  onBack,
}: CategoriesMenuProps) {
  return (
    <div className="absolute top-0 left-0 h-full w-[365px] bg-white z-50 text-gray-900 shadow-2xl">
      <div className="h-full py-4 overflow-y-auto">
        {/* BACK TO MAIN MENU */}
        <button
          onClick={onBack}
          className="cursor-pointer w-full flex items-center px-4 py-3.5 text-sm font-bold text-amber-500/90 tracking-wide bg-zinc-300/40 hover:bg-amber-600/10 rounded-xl text-left border border-amber-900/20 my-3 transition-all duration-150"
        >
          ⬅️ BACK TO MAIN MENU
        </button>

        <div className="px-6 py-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
          Categories
        </div>

        <nav className="mt-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              onClick={onCloseAll}
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-600 rounded-xl hover:bg-amber-600/10 hover:text-amber-500 transition-all duration-150"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
