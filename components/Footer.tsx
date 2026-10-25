import Link from 'next/link';
import { Heart, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-100 border-t-4 border-stone-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400 text-stone-950 font-black text-xl rounded flex items-center justify-center border-2 border-stone-100">
                A
              </div>
              <div>
                <h3 className="font-black text-lg text-white">ASKBTM</h3>
                <p className="text-xs text-stone-400">Tigray, Ethiopia</p>
              </div>
            </div>
            <p className="text-stone-300 text-xs leading-relaxed">
              Freminatos Children and Mothers&apos; Resource Center (Aba Selama Kesate Brihan Terado Mehaber) is dedicated to empowering vulnerable children, orphaned youth, and widowed mothers across Tigray through verified nutritional support, education, and vocational independence.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-800 border border-stone-700 rounded text-[11px] text-amber-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Charity Reg: #0253
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-stone-300 font-medium">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Home &amp; Impact
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-amber-300 transition-colors">
                  Stories &amp; News
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-amber-300 transition-colors">
                  Direct Bank Support
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-amber-300 transition-colors">
                  Multi-Step Donation Wizard
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-amber-300 transition-colors">
                  Donor Impact Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-300 transition-colors text-stone-500">
                  Staff Admin Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Support Accounts */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Direct Bank Giving
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-stone-800 rounded border border-stone-700">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Commercial Bank of Ethiopia (CBE)</span>
                <span className="font-mono text-sm text-white font-bold select-all">1000000000000</span>
                <span className="block text-[10px] text-stone-400 mt-0.5">Account: ASKBTM Charity</span>
              </div>
              <div className="p-2.5 bg-stone-800 rounded border border-stone-700">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Telebirr Direct</span>
                <span className="font-mono text-sm text-emerald-300 font-bold select-all">+251 91 430 0000</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              Contact &amp; Field Office
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Mekelle, Tigray Regional State, Ethiopia</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contact@askbtm.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+251 91 430 1122</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/donate"
                className="inline-block w-full text-center bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider py-2 rounded border border-stone-800 transition-all"
              >
                Start Monthly Sponsorship
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} Freminatos Children and Mothers&apos; Resource Center (ASKBTM). All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-stone-200 underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-stone-200 underline">
              Terms of Service
            </Link>
            <span className="text-stone-600">Hosted on Render Web Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
