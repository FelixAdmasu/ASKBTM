'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  // Scroll-spy active section tracking on homepage
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['home', 'about', 'video', 'programs', 'gallery', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Hide public navbar on admin dashboard
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const isHome = pathname === '/';

  const getLink = (hash: string) => {
    return isHome ? hash : `/${hash}`;
  };

  const isActive = (key: string) => {
    if (key === 'news') return pathname === '/news';
    if (key === 'support') return pathname === '/support';
    if (pathname === '/') return activeSection === key;
    return false;
  };

  const getNavItemClass = (key: string) => {
    return isActive(key)
      ? 'px-3 py-1.5 rounded-xl bg-color-yellow font-black text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all'
      : 'px-3 py-1.5 rounded-xl text-black/80 font-bold hover:bg-color-cream hover:text-black transition-all';
  };

  const getMobileNavItemClass = (key: string) => {
    return isActive(key)
      ? 'block py-2 px-3 rounded-lg bg-color-yellow font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
      : 'block py-2 px-3 rounded-lg hover:bg-color-cream font-bold';
  };

  return (
    <header className="fixed top-4 left-0 right-0 w-full max-w-[1180px] mx-auto px-4 z-50">
      <div className="header-wrapper">
        <div className="flex justify-between items-center bg-color-white border-2 border-color-black rounded-2xl px-4 md:px-6 py-2.5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          {/* Brand Logo & Tag */}
          <Link
            href="/"
            className="flex items-center gap-2 bg-color-green border-2 border-color-black px-3 py-1.5 rounded-xl font-bold font-primary transition-transform hover:scale-105 btn-brutal"
          >
            <img src="/assets/img/favicon1.png" alt="ASKBTM" className="w-6 h-6 object-contain" />
            <div className="flex flex-col text-left">
              <span className="text-base leading-none font-extrabold tracking-tight">ASKBTM</span>
              <span className="text-[9px] font-mono leading-none text-black/80 font-bold uppercase mt-0.5">
                Legatafo
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2">
            <ul className="flex items-center gap-1.5 text-sm font-bold">
              <li>
                <Link href={getLink('#home')} className={getNavItemClass('home')}>
                  Home
                </Link>
              </li>
              <li>
                <Link href={getLink('#about')} className={getNavItemClass('about')}>
                  About
                </Link>
              </li>
              <li>
                <Link href={getLink('#video')} className={getNavItemClass('video')}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link href={getLink('#programs')} className={getNavItemClass('programs')}>
                  Programs
                </Link>
              </li>
              <li>
                <Link href={getLink('#gallery')} className={getNavItemClass('gallery')}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className={getNavItemClass('news')}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/support" className={getNavItemClass('support')}>
                  Support
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href="https://t.me/your_channel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram Channel"
              className="w-9 h-9 flex items-center justify-center rounded-xl border-2 border-color-black bg-color-blue hover:scale-105 transition-transform btn-brutal"
              title="ASKBTM Telegram Channel"
            >
              <i className="ri-telegram-fill text-lg text-black"></i>
            </a>
            <Link
              href={getLink('#donate')}
              className="bg-color-yellow text-color-black font-extrabold px-4 py-2 rounded-xl border-2 border-color-black text-xs uppercase tracking-wider btn-brutal inline-flex items-center gap-1.5 hover:bg-yellow-300"
            >
              <i className="ri-heart-3-fill text-red-600 text-sm"></i>
              <span>Donate</span>
            </Link>
          </div>

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
          <nav className="mobile-nav lg:hidden mt-3 bg-color-white border-2 border-color-black rounded-xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <ul className="flex flex-col gap-2 font-bold text-base">
              <li>
                <Link
                  href={getLink('#home')}
                  onClick={() => setMobileMenuOpen(false)}
                  className={getMobileNavItemClass('home')}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#about')}
                  onClick={() => setMobileMenuOpen(false)}
                  className={getMobileNavItemClass('about')}
                >
                  About ASKBTM
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#video')}
                  onClick={() => setMobileMenuOpen(false)}
                  className={getMobileNavItemClass('video')}
                >
                  Our Story in Motion
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#programs')}
                  onClick={() => setMobileMenuOpen(false)}
                  className={getMobileNavItemClass('programs')}
                >
                  Programs &amp; Support
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#gallery')}
                  onClick={() => setMobileMenuOpen(false)}
                  className={getMobileNavItemClass('gallery')}
                >
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  onClick={() => setMobileMenuOpen(false)}
                  className={getMobileNavItemClass('news')}
                >
                  News &amp; Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  onClick={() => setMobileMenuOpen(false)}
                  className={getMobileNavItemClass('support')}
                >
                  Support Center
                </Link>
              </li>
              <li>
                <Link
                  href={getLink('#contact')}
                  onClick={() => setMobileMenuOpen(false)}
                  className={getMobileNavItemClass('contact')}
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
