import '../styles/globals.css';
import SidebarNav from './ui/SidebarNav';
import Header from './ui/Header';
import Footer from './ui/Footer';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'A Next.js starter app for Handcrafted Haven',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex bg-gray-50">
        <SidebarNav />
        <div className="flex-1 ml-91.25 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}