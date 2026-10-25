'use client';

import Link from 'next/link';
import { ShieldCheck, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-emerald-800 font-bold px-3 py-1 bg-emerald-200 rounded-full border-2 border-stone-900 inline-block mb-3 shadow-[2px_2px_0px_0px_#1c1917]">
          Privacy &amp; Security
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900">Privacy Policy</h1>
        <p className="text-xs text-stone-600 mt-2 font-medium">
          Effective October 2026 • Strict donor confidentiality guarantee
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="bg-[#fffdfa] p-6 rounded-2xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] sticky top-28 space-y-4">
            <h3 className="font-black text-sm uppercase tracking-wider text-stone-900">Sections</h3>
            <ul className="space-y-2 text-xs font-bold text-stone-700">
              <li><a href="#information" className="hover:text-emerald-700">1. Information We Collect</a></li>
              <li><a href="#usage" className="hover:text-emerald-700">2. How We Use Donor Data</a></li>
              <li><a href="#security" className="hover:text-emerald-700">3. Encryption &amp; Server Secrets</a></li>
              <li><a href="#anonymity" className="hover:text-emerald-700">4. Anonymous Giving Guarantee</a></li>
              <li><a href="#contact" className="hover:text-emerald-700">5. Data Inquiries &amp; Deletion</a></li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#fffdfa] p-8 sm:p-10 rounded-2xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1c1917] space-y-8 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
          <section id="information" className="space-y-2">
            <h2 className="text-lg font-black text-stone-900">1. Information We Collect</h2>
            <p>
              When you use our donation wizard, donor portal, or contact form, we collect the necessary contact details you provide (such as your full name, email address, optional phone number, and tax identification for tax receipts). We do not store raw credit card numbers on our servers; payments are tokenized securely.
            </p>
          </section>

          <section id="usage" className="space-y-2">
            <h2 className="text-lg font-black text-stone-900">2. How We Use Donor Data</h2>
            <p>
              Your information is used exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-700">
              <li>Issue official charitable tax deductible receipts.</li>
              <li>Deliver quarterly impact dispatches on classroom and nutrition milestones.</li>
              <li>Coordinate volunteer field orientations in Tigray.</li>
            </ul>
            <p className="font-bold text-stone-900">
              We never sell, rent, trade, or commercialize your personal information to third parties.
            </p>
          </section>

          <section id="security" className="space-y-2">
            <h2 className="text-lg font-black text-stone-900">3. Encryption &amp; Server Secrets</h2>
            <p>
              Our application runs on Next.js full-stack infrastructure deployed to Render with TLS 1.3 encryption. Server secrets, including database service keys and webhook signatures, are strictly isolated from client-side bundles.
            </p>
          </section>

          <section id="anonymity" className="space-y-2">
            <h2 className="text-lg font-black text-stone-900">4. Anonymous Giving Guarantee</h2>
            <p>
              If you check the &quot;Anonymous Contribution&quot; option in our donation builder or in your donor profile settings, your name is omitted from all public donor rosters, community newsletters, and recognition plaques.
            </p>
          </section>

          <section id="contact" className="space-y-2">
            <h2 className="text-lg font-black text-stone-900">5. Data Inquiries &amp; Deletion</h2>
            <p>
              You may request a complete export or deletion of your contact profile at any time by emailing <span className="font-mono font-bold text-stone-900">privacy@askbtm.org</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
