import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Freminatos Children and Mothers' Resource Center",
  description: "Official website for Freminatos Children and Mothers' Resource Center (ASKBTM) - Aba Selama Kesate Brihan Terado Mehaber.",
  openGraph: {
    title: "Freminatos Children and Mothers' Resource Center",
    description: "Official website for Freminatos Children and Mothers' Resource Center (ASKBTM) - Aba Selama Kesate Brihan Terado Mehaber.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/img/favicon.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fcf9f2] text-stone-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
