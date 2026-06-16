import Link from 'next/link';
import Image from 'next/image';
import Search from './Search';
import HamburgerMenu from './HamburgerMenu';
import HavenLogo from './HavenLogo';
import { auth } from '@/auth';

export default async function Navbar() {
  const session = await auth();
  const userName = session?.user?.name || 'Guest';
  const userImage = session?.user?.image;
  const isLoggedIn = !!session?.user;

  return (
    <nav
      className="flex items-center justify-between px-2 sm:px-4 py-3 border-b sticky top-0 z-20 gap-1 sm:gap-2"
      style={{ backgroundColor: '#272c33', borderColor: '#000' }}
    >
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <HamburgerMenu userName={userName} />
        <HavenLogo />
      </div>

      <Search placeholder="Search products..." />

      <div className="flex items-center gap-1 sm:gap-3 text-white text-xs sm:text-sm font-medium shrink-0">
        {isLoggedIn ? (
          <Link
            href="/account"
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/10 transition"
            aria-label={`Account: ${userName}`}
          >
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                width={32}
                height={32}
                className="rounded-full border border-white/20"
              />
            ) : (
              <span className="text-xl">👤</span>
            )}
            <span className="hidden sm:inline truncate max-w-[120px]">
              {userName}
            </span>
          </Link>
        ) : (
          <Link
            href="/api/auth/signin"
            className="flex items-center gap-1.5 px-2 py-2 rounded-md hover:bg-white/10 transition"
            aria-label="Sign in"
          >
            <span className="text-xl">👤</span>
            <span className="hidden sm:inline">Sign In</span>
          </Link>
        )}

        <Link
          href="/shop/cart"
          className="flex items-center gap-1.5 px-2 py-2 rounded-md hover:bg-white/10 transition"
          aria-label="Cart"
        >
          <span className="text-xl">🛒</span>
          <span className="hidden sm:inline">Cart</span>
        </Link>
      </div>
    </nav>
  );
}