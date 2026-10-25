'use client';

import Link from 'next/link';
import { ShieldCheck, ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-amber-800 font-bold px-3 py-1 bg-amber-200 rounded-full border-2 border-stone-900 inline-block mb-3 shadow-[2px_2px_0px_0px_#1c1917]">
          Legal Framework
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900">Terms of Service</h1>
        <p className="text-xs text-stone-600 mt-2 font-medium">
          Last updated: October 2026 • Registered Ethiopian Charitable Organization #0253
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="bg-[#fffdfa] p-6 rounded-2xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] sticky top-28 space-y-4">
            <h3 className="font-black text-sm uppercase tracking-wider text-stone-900">Table of Contents</h3>
            <ul className="space-y-2 text-xs font-bold text-stone-700">
              <li><a href="#charitable-status" className="hover:text-amber-700">1. Legal &amp; Charitable Status</a></li>
              <li><a href="#donations" className="hover:text-amber-700">2. Voluntary Contributions &amp; Pledges</a></li>
              <li><a href="#transparency" className="hover:text-amber-700">3. Field Transparency &amp; Accounting</a></li>
              <li><a href="#portal" className="hover:text-amber-700">4. Donor Portal &amp; Tax Receipts</a></li>
              <li><a href="#liability" className="hover:text-amber-700">5. Limitation of Liability</a></li>
            </ul>
            <div className="pt-4 border-t border-stone-200">
              <Link href="/support" className="text-xs font-black text-amber-800 underline flex items-center gap-1">
                Have questions? Contact our staff &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#fffdfa] p-8 sm:p-10 rounded-2xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1c1917] space-y-8 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
          <section id="charitable-status" className="space-y-2">
            <h2 className="text-lg font-black text-stone-900">1. Legal &amp; Charitable Status</h2>
            <p>
              Freminatos Children and Mothers&apos; Resource Center (ASKBTM - Aba Selama Kesate Brihan Terado Mehaber) is a non-governmental organization legally registered with the Ethiopian Civil Society Organizations Authority under Registry No. 0253. By accessing this platform or contributing funds, you agree to these Terms.
            </p>
          </section>

          <section id="donations" className="space-y-2">
            <h2 className="text-lg font-black text-stone-900">2. Voluntary Contributions &amp; Pledges</h2>
            <p>
              All monetary donations processed through our website, Telebirr, Commercial Bank of Ethiopia (CBE), Awash Bank, or online card rails are voluntary philanthropic gifts. Once transferred and acknowledged by official receipt, contributions are irrevocable and deployed to direct food purchases, educational provisions, and medical care in Tigray.
            </p>
          </section>

          <section id="transparency" className="space-y-2">
            <h2 className="text-lg font-black text-stone-900">3. Field Transparency &amp; Accounting</h2>
            <p>
              ASKBTM maintains strict dual-entry accounting ledgers audited annually in accordance with Ethiopian CSO regulatory standards. Program allocations stated during the donation wizard reflect direct field disbursements with minimal administrative overhead.
            </p>
          </section>

          <section id="portal" className="space-y-2">
            <h2 className="text-lg font-black text-stone-900">4. Donor Portal &amp; Tax Receipts</h2>
            <p>
              Donors using our online platform are provided digital records and downloadable contribution certificates. These receipts document that no goods or commercial services were provided in consideration for your charitable gift.
            </p>
          </section>

          <section id="liability" className="space-y-2">
            <h2 className="text-lg font-black text-stone-900">5. Limitation of Liability</h2>
            <p>
              While ASKBTM implements industry-standard encryption and security protocols on our Next.js web application and Render deployment, electronic transfers rely on third-party banking rails (CBE, Ethio Telecom Telebirr, Visa/Mastercard). We are not liable for bank network disruptions outside our direct control.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
