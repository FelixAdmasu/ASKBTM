'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const getLink = (hash: string) => {
    return isHome ? hash : `/${hash}`;
  };

  return (
    <header className="fixed top-4 left-0 right-0 w-full max-w-[1140px] mx-auto px-4 z-50">
      <div className="header-wrapper">
        <div className="flex justify-between items-center bg-color-white border-2 border-color-black rounded-xl px-4 md:px-8 py-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 bg-color-green border-2 border-color-black px-3.5 py-1.5 rounded-lg text-lg font-bold font-primary transition-transform hover:scale-105"
          >
            <img src="/assets/img/favicon1.png" alt="ASKBTM" className="w-6 h-6 object-contain" />
            <span className="tracking-wide">ASKBTM</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <ul className="flex gap-6 font-medium text-base">
              <li>
                <Link
                  href={getLink('#home')}
                  className="hover:underline underline-offset-4 decoration-2 decoration-color-yellow"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#about')}
                  className="hover:underline underline-offset-4 decoration-2 decoration-color-yellow"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#video')}
                  className="hover:underline underline-offset-4 decoration-2 decoration-color-yellow"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#programs')}
                  className="hover:underline underline-offset-4 decoration-2 decoration-color-yellow"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#gallery')}
                  className="hover:underline underline-offset-4 decoration-2 decoration-color-yellow"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className={`hover:underline underline-offset-4 decoration-2 decoration-color-yellow ${
                    pathname === '/news' ? 'font-bold underline decoration-color-yellow' : ''
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className={`hover:underline underline-offset-4 decoration-2 decoration-color-yellow ${
                    pathname === '/support' ? 'font-bold underline decoration-color-yellow' : ''
                  }`}
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#contact')}
                  className="hover:underline underline-offset-4 decoration-2 decoration-color-yellow"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <a
                href="https://t.me/your_channel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-color-black bg-color-blue hover:scale-105 transition-transform btn-brutal"
              >
                <i className="ri-telegram-fill text-lg"></i>
              </a>
              <Link
                href={getLink('#donate')}
                className="bg-color-yellow text-color-black font-semibold px-4 py-2 rounded-lg border-2 border-color-black text-sm btn-brutal inline-flex items-center"
              >
                <i className="ri-heart-line mr-1"></i> Donate
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col justify-center gap-1.5 w-9 h-8 border-2 border-color-black rounded-md p-1 bg-color-yellow nav-toggle btn-brutal"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`bg-color-black h-0.5 w-full rounded-sm transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`bg-color-black h-0.5 w-full rounded-sm transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`bg-color-black h-0.5 w-full rounded-sm transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className="mobile-nav lg:hidden mt-3 bg-color-white border-2 border-color-black rounded-xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <ul className="flex flex-col gap-4 font-semibold text-lg">
              <li>
                <Link
                  href={getLink('#home')}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-blue-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#about')}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-blue-600"
                >
                  About ASKBTM
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#video')}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-blue-600"
                >
                  Our Story in Motion
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#programs')}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-blue-600"
                >
                  Programs &amp; Support
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#gallery')}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-blue-600"
                >
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-blue-600"
                >
                  News &amp; Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-blue-600"
                >
                  Support Center
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#contact')}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-blue-600"
                >
                  Contact &amp; Banking
                </Link>
              </li>
            </ul>
            <div className="mt-6 pt-5 border-t-2 border-color-black flex gap-3">
              <Link
                href={getLink('#donate')}
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 bg-color-yellow text-center py-2.5 rounded-lg border-2 border-color-black font-bold btn-brutal"
              >
                <i className="ri-heart-line mr-1"></i> Donate Now
              </Link>
              <Link
                href="/support"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 bg-color-blue text-center rounded-lg border-2 border-color-black font-bold btn-brutal"
              >
                Help
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
