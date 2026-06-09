import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function HavenLogo() {
  return (
    // LINK WRAPPER
    <Link
      href="/"
      className="inline-flex flex-row items-center gap-3 leading-none text-white select-none group cursor-pointer"
    >
      {/* ICON */}
      <div className="p-2 bg-amber-700/20 border border-amber-500/30 rounded-xl transition-transform group-hover:scale-105 duration-200">
        <BuildingStorefrontIcon className="h-9 w-9 text-amber-500" />
      </div>

      {/* TEXT */}
      <div className="flex flex-col">
        <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
          Handcrafted
        </span>
        <span className="text-xs font-semibold tracking-[0.25em] text-amber-600 uppercase -mt-0.5 pl-0.5">
          Haven
        </span>
      </div>
    </Link>
  );
}
