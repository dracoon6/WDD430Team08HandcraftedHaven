'use client';

import { useState } from 'react';
import Link from 'next/link';
import CategoriesMenu from './CategoriesMenu';

export default function HamburgerMenu({ userName }: { userName: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setShowCategories(false);
    }
  };

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <button
        onClick={toggleSidebar}
        className="flex items-center gap-2 px-3 py-2 border border-amber-500/30 rounded-xl text-amber-500 bg-zinc-900/80 backdrop-blur-md shadow-lg hover:bg-amber-600/10 active:scale-95 transition-all duration-200 focus:outline-none"
        aria-label="Open Navigation Menu"
      >
        ☰
      </button>

      {/* TOGLE OPEN/CLOSE */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDE PANEL */}
      <div
        className={`fixed top-0 left-0 h-full w-[365px] bg-white z-50 text-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* HEADER/GREET */}
        <div className="flex items-center justify-between bg-zinc-900 border-b border-zinc-800/80 px-6 h-20 pt-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">
              Welcome {userName} to
            </span>
            <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
              Handcrafted Haven
            </h2>
          </div>
        </div>

        {/* ANIMATION */}
        <div className="relative overflow-hidden h-[calc(100%-5rem)]">
          <div
            className={`w-full h-full py-6 px-4 overflow-y-auto space-y-1.5 transition-transform duration-300 ${
              showCategories ? '-translate-x-full absolute' : 'translate-x-0'
            }`}
          >
            {/* HOME */}
            <Link href="/">
              <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-600 rounded-xl hover:bg-amber-600/10 hover:text-amber-500 transition-all duration-150">
                🏠 Home
              </div>
            </Link>

            {/* MY ACCOUNT */}
            <Link href={userName == 'Guest' ? '/login' : '/account'}>
              <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-600 rounded-xl hover:bg-amber-600/10 hover:text-amber-500 transition-all duration-150">
                👤 My Account
              </div>
            </Link>

            {/* CATEGORIES MENU */}
            <button
              onClick={() => setShowCategories(true)}
              className="cursor-pointer w-full flex items-center justify-between px-4 py-3.5 text-sm font-bold text-amber-500/90 tracking-wide bg-zinc-300/40 hover:bg-amber-600/10 rounded-xl text-left border border-amber-900/20 my-3 transition-all duration-150 group"
            >
              <span className="flex items-center gap-3">
                <span className="text-base group-hover:scale-110 transition-transform">
                  🛍️
                </span>{' '}
                Shop By Category
              </span>
              <span className="text-amber-600/80 group-hover:translate-x-1 transition-transform text-xs">
                ➡️
              </span>
            </button>

            {/* Companies */}
            <Link href="/shop/companies">
              <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-600 rounded-xl hover:bg-amber-600/10 hover:text-amber-500 transition-all duration-150">
                🏢 Companies
              </div>
            </Link>

            {/* ABOUT US */}
            <Link href="/shop/about">
              <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-600 rounded-xl hover:bg-amber-600/10 hover:text-amber-500 transition-all duration-150">
                ℹ️ About Us
              </div>
            </Link>

            {/* CONTACT US */}
            <Link href="/shop/about/email">
              <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-600 rounded-xl hover:bg-amber-600/10 hover:text-amber-500 transition-all duration-150">
                🤝 Contact Us
              </div>
            </Link>

            {/* SIGN OUT */}
            <Link href="/logout">
              <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-600 rounded-xl hover:bg-amber-600/10 hover:text-amber-500 transition-all duration-150">
                ⛔ Sign Out!
              </div>
            </Link>
          </div>

          {/* 2ND MENU: CATEGORIES */}
          <div
            className={`w-full h-full absolute top-0 transition-transform duration-300 ${
              showCategories ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {showCategories && (
              <CategoriesMenu
                onBack={() => setShowCategories(false)}
                onCloseAll={toggleSidebar}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
