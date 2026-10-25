'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Hide public footer on admin dashboard
  if (pathname.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className="bg-color-black text-color-white rounded-t-xl border-t-2 border-color-black pt-14 pb-8 mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          {/* Logo & Mission Summary */}
          <div className="space-y-3 max-w-sm">
            <Link
              href="/"
              className="bg-color-green text-color-black border-2 border-color-white px-4 py-1.5 rounded-lg text-lg font-bold font-primary inline-flex items-center gap-2"
            >
              <img src="/assets/img/favicon1.png" alt="ASKBTM" className="w-5 h-5 object-contain" />
              <span>ASKBTM</span>
            </Link>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">
              Freminatos Children and Mothers' Resource Center · ፍሬሚናጦስ የልጆች እና የእናቶች መርጃ ማዕከል. Protecting children, empowering mothers, and keeping families united in Legatafo.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="flex flex-wrap gap-8 md:gap-14">
            <div className="space-y-2">
              <h4 className="font-primary text-xl font-normal text-color-yellow">Explore</h4>
              <nav className="flex flex-col gap-1.5 text-sm text-white/80">
                <Link href="/#home" className="hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="/#programs" className="hover:text-white transition-colors">
                  Programs
                </Link>
                <Link href="/#gallery" className="hover:text-white transition-colors">
                  Photo Gallery
                </Link>
              </nav>
            </div>

            <div className="space-y-2">
              <h4 className="font-primary text-xl font-normal text-color-yellow">Resources</h4>
              <nav className="flex flex-col gap-1.5 text-sm text-white/80">
                <Link href="/news" className="hover:text-white transition-colors">
                  News &amp; Blogs
                </Link>
                <Link href="/support" className="hover:text-white transition-colors">
                  Support Center
                </Link>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </nav>
            </div>

            <div className="space-y-2">
              <h4 className="font-primary text-xl font-normal text-color-yellow">Connect</h4>
              <div className="text-sm text-white/80 space-y-1">
                <p>Legatafo Town, Ethiopia</p>
                <p>+251 911 89 27 87</p>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://t.me/your_channel"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="w-8 h-8 rounded border border-white flex items-center justify-center hover:bg-color-yellow hover:text-color-black transition-colors"
                  >
                    <i className="ri-telegram-fill"></i>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded border border-white flex items-center justify-center hover:bg-color-yellow hover:text-color-black transition-colors"
                  >
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded border border-white flex items-center justify-center hover:bg-color-yellow hover:text-color-black transition-colors"
                  >
                    <i className="ri-instagram-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/20 pt-6 text-xs text-white/60 gap-3">
          <p>© 2026 ASKBTM (Freminatos Children and Mothers' Resource Center). All rights reserved.</p>
          <p>Built with love in Legatafo, Ethiopia 🇪🇹</p>
        </div>
      </div>
    </footer>
  );
}
