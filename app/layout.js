import '../styles/globals.css';
import HamburgerMenu from './ui/HamburgerMenu';
import { auth } from '@/auth';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'A Next.js starter app for Handcrafted Haven',
};

const session = await auth();
const userName = session?.user?.name || 'Guest';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
