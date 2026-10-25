'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, UserCheck, ShieldCheck, Menu, X, BookOpen, Compass, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Stories & News', href: '/news' },
    { name: 'Direct Support', href: '/support' },
    { name: 'Donor Portal', href: '/portal', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fcf9f2] border-b-2 border-stone-900 shadow-[0_4px_0_0_#1c1917]">
      {/* Top Registration Ribbon */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 font-mono tracking-wider flex justify-between items-center border-b border-stone-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>ETHIOPIAN CHARITIES REGISTRATION NO. 0253</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-stone-400">
          <span>Tigray, Ethiopia</span>
          <span>•</span>
          <Link href="/portal" className="text-amber-400 hover:underline flex items-center gap-1 font-semibold">
            <UserCheck className="w-3.5 h-3.5" /> Donor Sign In
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-amber-400 border-2 border-stone-900 rounded-lg flex items-center justify-center font-black text-2xl shadow-[3px_3px_0px_0px_#1c1917] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_0px_#1c1917] transition-all">
              A
            </div>
            <div>
              <div className="font-black text-lg sm:text-xl tracking-tight text-stone-900 leading-tight">
                ASKBTM <span className="text-amber-600 font-extrabold text-sm ml-1">Ethiopia</span>
              </div>
              <p className="text-[11px] text-stone-600 font-medium hidden sm:block">
                Freminatos Children &amp; Mothers&apos; Resource Center
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-bold uppercase tracking-wider transition-all px-3 py-1.5 rounded border-2 ${
                    isActive
                      ? 'bg-amber-300 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917]'
                      : 'border-transparent hover:border-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Quick Multi-Step Donate CTA */}
            <Link
              href="/donate"
              className="bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-black text-sm uppercase tracking-wider px-5 py-2.5 rounded-lg border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#1c1917] transition-all flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-stone-950" />
              <span>Donate Now</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/donate"
              className="bg-emerald-400 text-stone-950 text-xs font-black px-3 py-2 rounded border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917]"
            >
              Donate
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-stone-900 rounded-lg bg-amber-200 shadow-[2px_2px_0px_0px_#1c1917]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-stone-900 bg-[#fdfaf5] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold uppercase tracking-wider py-2.5 px-3 rounded-lg border-2 border-stone-900 bg-white shadow-[2px_2px_0px_0px_#1c1917]"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/donate"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-black text-center uppercase tracking-wider py-3 px-3 rounded-lg border-2 border-stone-900 bg-emerald-400 text-stone-950 shadow-[3px_3px_0px_0px_#1c1917]"
          >
            Launch Donation Wizard
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-medium text-xs text-stone-600 text-center py-2"
          >
            Staff Admin Console &rarr;
          </Link>
        </div>
      )}
    </header>
  );
}
