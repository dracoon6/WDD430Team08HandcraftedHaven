import '../styles/globals.css';
import HamburgerMenu from './ui/HamburgerMenu';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'A Next.js starter app for Handcrafted Haven',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="absolute top-4 left-4 z-10">
          <HamburgerMenu />
        </div>
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
