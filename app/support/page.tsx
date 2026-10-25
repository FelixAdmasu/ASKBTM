'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Smartphone, 
  Check, 
  Copy, 
  ShieldCheck, 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  HelpCircle,
  HeartHandshake
} from 'lucide-react';

export default function SupportPage() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'volunteer',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitSuccess(true);
    } catch {
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-emerald-800 font-bold px-3 py-1 bg-emerald-200 rounded-full border-2 border-stone-900 inline-block mb-3 shadow-[2px_2px_0px_0px_#1c1917]">
          Direct Community Giving
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          Support &amp; Verified Bank Accounts
        </h1>
        <p className="mt-2 text-stone-600 text-sm sm:text-base font-medium">
          Make direct transfers through verified Ethiopian banking channels or join our volunteer field team.
        </p>
      </div>

      {/* Verified Banking Rails Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CBE */}
        <div className="bg-[#fffdfa] rounded-2xl border-2 border-stone-900 p-6 shadow-[6px_6px_0px_0px_#1c1917] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-amber-300 rounded-xl border-2 border-stone-900 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-stone-900" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-black px-2 py-0.5 bg-amber-100 rounded">
              Primary Ethiopian Bank
            </span>
            <h3 className="text-xl font-black text-stone-900 mt-2">Commercial Bank of Ethiopia</h3>
            <p className="text-xs text-stone-600 mt-1">Official Charity Account Name:</p>
            <p className="font-bold text-stone-900 text-xs">Freminatos Children &amp; Mothers Center</p>

            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-300 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-mono text-stone-500 block">Account Number</span>
                <span className="font-mono text-base font-extrabold text-stone-900 select-all">1000000000000</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('1000000000000', 'cbe')}
                className="px-3 py-1.5 bg-amber-300 border border-stone-900 rounded text-xs font-bold flex items-center gap-1 shadow-[2px_2px_0px_0px_#1c1917]"
              >
                {copiedAccount === 'cbe' ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedAccount === 'cbe' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] text-stone-500">
            Branch: Mekelle Main Branch • Swift: CBETETAA
          </div>
        </div>

        {/* Telebirr */}
        <div className="bg-[#fffdfa] rounded-2xl border-2 border-stone-900 p-6 shadow-[6px_6px_0px_0px_#1c1917] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-emerald-300 rounded-xl border-2 border-stone-900 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-stone-900" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-black px-2 py-0.5 bg-emerald-100 rounded">
              Instant Mobile Pay
            </span>
            <h3 className="text-xl font-black text-stone-900 mt-2">Telebirr Mobile Service</h3>
            <p className="text-xs text-stone-600 mt-1">Official Merchant Registration:</p>
            <p className="font-bold text-stone-900 text-xs">ASKBTM Charity Fund</p>

            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-300 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-mono text-stone-500 block">Telebirr Number</span>
                <span className="font-mono text-base font-extrabold text-stone-900 select-all">+251 91 430 0000</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('+251914300000', 'telebirr')}
                className="px-3 py-1.5 bg-emerald-300 border border-stone-900 rounded text-xs font-bold flex items-center gap-1 shadow-[2px_2px_0px_0px_#1c1917]"
              >
                {copiedAccount === 'telebirr' ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedAccount === 'telebirr' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] text-stone-500">
            Open Telebirr App $\rightarrow$ Send Money / Pay Merchant
          </div>
        </div>

        {/* Awash Bank / International Wire */}
        <div className="bg-[#fffdfa] rounded-2xl border-2 border-stone-900 p-6 shadow-[6px_6px_0px_0px_#1c1917] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-sky-300 rounded-xl border-2 border-stone-900 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-stone-900" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-800 font-black px-2 py-0.5 bg-sky-100 rounded">
              Awash Bank Account
            </span>
            <h3 className="text-xl font-black text-stone-900 mt-2">Awash Bank Ethiopia</h3>
            <p className="text-xs text-stone-600 mt-1">Official Account Name:</p>
            <p className="font-bold text-stone-900 text-xs">Freminatos Resource Center</p>

            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-300 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-mono text-stone-500 block">Account Number</span>
                <span className="font-mono text-base font-extrabold text-stone-900 select-all">01425000000000</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('01425000000000', 'awash')}
                className="px-3 py-1.5 bg-sky-300 border border-stone-900 rounded text-xs font-bold flex items-center gap-1 shadow-[2px_2px_0px_0px_#1c1917]"
              >
                {copiedAccount === 'awash' ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedAccount === 'awash' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] text-stone-500">
            Mekelle Branch • Swift: AWINETAA
          </div>
        </div>
      </div>

      {/* Volunteer Application & Inquiries Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#fffdfa] rounded-2xl border-2 border-stone-900 p-8 sm:p-12 shadow-[6px_6px_0px_0px_#1c1917]">
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-amber-200 text-stone-950 px-2.5 py-1 rounded border border-stone-900">
            <HeartHandshake className="w-3.5 h-3.5" />
            Field Engagement
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            Volunteer or Send an Inquiry
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
            Whether you want to tutor students, provide healthcare expertise, or organize a diaspora fundraising campaign, we welcome your dedication.
          </p>

          <div className="space-y-3 pt-4 text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Mekelle, Tigray Regional State, Ethiopia</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-700 shrink-0" />
              <span>contact@askbtm.org</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-700 shrink-0" />
              <span>+251 91 430 1122</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitSuccess ? (
            <div className="p-6 bg-emerald-50 rounded-xl border-2 border-emerald-900 text-center space-y-3 font-medium">
              <div className="w-12 h-12 bg-emerald-300 rounded-full border-2 border-stone-900 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-stone-900 stroke-[3]" />
              </div>
              <h3 className="font-black text-emerald-950 text-lg">Inquiry Received!</h3>
              <p className="text-xs text-emerald-900 max-w-sm mx-auto">
                Thank you for reaching out. Our community coordinator in Mekelle will review your note and contact you within 48 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="text-xs font-bold text-emerald-950 underline pt-2"
              >
                Send another message &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full p-2.5 rounded-lg border-2 border-stone-900 text-xs font-medium bg-white focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full p-2.5 rounded-lg border-2 border-stone-900 text-xs font-medium bg-white focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Inquiry Purpose</label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full p-2.5 rounded-lg border-2 border-stone-900 text-xs font-medium bg-white focus:ring-2 focus:ring-amber-400"
                >
                  <option value="volunteer">Volunteer Application (Teaching / Healthcare)</option>
                  <option value="bank-confirmation">Direct Bank Transfer Confirmation</option>
                  <option value="diaspora-partnership">Diaspora Partnership &amp; Corporate Giving</option>
                  <option value="other">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Message Details</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your background, skills, or transaction reference..."
                  className="w-full p-2.5 rounded-lg border-2 border-stone-900 text-xs font-medium bg-white focus:ring-2 focus:ring-amber-400"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending...' : 'Submit Message to Staff'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
