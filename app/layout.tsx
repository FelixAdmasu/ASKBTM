import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Freminatos Children and Mothers' Resource Center | ፍሬሚናጦስ የልጆች እና የእናቶች መርጃ ማዕከል - ASKBTM",
  description: "Freminatos Children and Mothers' Resource Center (ASKBTM) empowers children and mothers in Legatafo, Ethiopia with daytime care, nutrition, early education, and family support.",
  icons: {
    icon: '/assets/img/favicon1.png',
  },
  openGraph: {
    title: "Freminatos Children and Mothers' Resource Center - ASKBTM",
    description: "Empowering children and mothers through daytime care, nutrition, and education in Legatafo, Ethiopia.",
    images: ['/assets/img/preview.png'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
        />
      </head>
      <body className="font-secondary bg-color-cream text-color-black overflow-x-hidden selection:bg-color-yellow selection:text-color-black min-h-screen flex flex-col">
        {/* Background decorative pattern */}
        <div className="background-pattern"></div>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
