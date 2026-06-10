import Newsletter from './Newsletter';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <Newsletter />
      <div className="bg-gray-950 text-gray-500 text-sm py-6 px-6 text-center">
        <p>
          © {new Date().getFullYear()} Handcrafted Haven. Built by Team 08.
        </p>
        <div className="flex justify-center gap-6 mt-3">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/shop" className="hover:text-white transition">Shop</Link>
          <Link href="/about" className="hover:text-white transition">About Us</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </div>
      </div>
    </footer>
  );
}