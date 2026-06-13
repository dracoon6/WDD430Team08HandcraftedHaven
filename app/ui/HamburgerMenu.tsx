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
        className="flex items-center gap-2 px-3 py-2 border border-transparent hover:border-white rounded-sm text-white bg-slate-900 font-medium text-sm transition"
        aria-label="Open Navigation Menu"
      >
        ☰
      </button>

      {/* TOGLE OPEN/CLOSE */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
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
        <div className="flex items-center justify-between bg-slate-800 text-white p-9 pl-8 h-14">
          <h2 className="text-lg font-bold flex items-center gap-2">
            Hello {userName}! What are you looking today?
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300"
            aria-label="Close Navigation Menu"
          ></button>
        </div>

        {/* ANIMATION */}
        <div className="relative overflow-hidden h-[calc(100%-3.5rem)]">
          <div
            className={`w-full h-full py-4 overflow-y-auto transition-transform duration-300 ${
              showCategories ? '-translate-x-full absolute' : 'translate-x-0'
            }`}
          >
            {/* HOME */}
            <Link href="/">
              <div className="px-6 py-3 text-sm font-bold text-gray-500 tracking-wider hover:bg-gray-200">
                🏠 Home
              </div>
            </Link>
            {/* MY ACCOUNT */}
            <Link href="/account">
              <div className="px-6 py-3 text-sm font-bold text-gray-500 tracking-wider hover:bg-gray-200">
                👤 My Account
              </div>
            </Link>

            {/* CATEGORIES MENU */}
            <button
              onClick={() => setShowCategories(true)}
              className="cursor-pointer w-full flex items-center justify-between px-6 py-3.5 text-md font-bold text-gray-500 tracking-wider hover:bg-gray-200 text-left border-t border-b border-gray-200 my-3"
            >
              <span>🛍️ Categories</span>
              <span className="text-gray-400 text-xs">➡️</span>
            </button>

            {/* Companies */}
            <Link href="/companies">
              <div className="px-6 py-3 text-sm font-bold text-gray-500 tracking-wider hover:bg-gray-200">
                🏢 Companies
              </div>
            </Link>

            {/* CONTACT US */}
            <Link href="/contact">
              <div className="px-6 py-3 text-sm font-bold text-gray-500 tracking-wider hover:bg-gray-200">
                🤝 Contact Us
              </div>
            </Link>

            {/* SIGN OUT */}
            <Link href="/logout">
              <div className="px-6 py-3 text-sm font-bold text-gray-500 tracking-wider hover:bg-gray-200">
                ⛔ Sign Out!
              </div>
            </Link>
          </div>

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
