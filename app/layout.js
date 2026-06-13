import '../styles/globals.css';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'A Next.js starter app for Handcrafted Haven',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
