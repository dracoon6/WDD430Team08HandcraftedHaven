'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <button
        onClick={toggleSidebar}
        className="flex items-center gap-2 px-3 py-2 border border-transparent hover:border-white rounded-sm text-white bg-slate-900 font-medium text-sm transition"
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
            Hello {'USER'}! What are we looking today?
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300"
          ></button>
        </div>

        {/* ANIMATION */}
        <div className="relative overflow-hidden h-[calc(100%-3.5rem)]">
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
          {/* ABOUT US */}
          <Link href="/aboutus">
            <div className="px-6 py-3 text-sm font-bold text-gray-500 tracking-wider hover:bg-gray-200">
              🤝 About Us
            </div>
          </Link>
          {/* SIGN OUT */}
          <Link href="/logout">
            <div className="px-6 py-3 text-sm font-bold text-gray-500 tracking-wider hover:bg-gray-200">
              ⛔ Sign Out!
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
