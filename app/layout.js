import '../styles/globals.css';
import SidebarNav from './ui/SidebarNav';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'A Next.js starter app for Handcrafted Haven',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex bg-gray-50">
        <SidebarNav />
        <div className="flex-1 ml-[365px]">
          {children}
        </div>
      </body>
    </html>
  );
}
