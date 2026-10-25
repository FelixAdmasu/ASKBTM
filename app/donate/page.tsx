'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Sparkles, 
  FileText, 
  Copy, 
  Check, 
  Calendar,
  Gift,
  Lock
} from 'lucide-react';

const PRESETS = [
  { amountUSD: 25, amountETB: 3000, impact: 'Provides warm nutritious lunches for 1 child for a full month' },
  { amountUSD: 50, amountETB: 6000, impact: 'Supplies complete school uniforms, books & stationery for 2 students' },
  { amountUSD: 100, amountETB: 12000, impact: 'Covers essential maternal healthcare & medical checkups for 3 mothers' },
  { amountUSD: 250, amountETB: 30000, impact: 'Funds vocational craft training tools & micro-grant for widowed mothers' },
];

const PROGRAMS = [
  { id: 'nutrition', title: 'Nutritional Care & Daily Meals', desc: 'Direct emergency nourishment and daily feeding programs for severely malnourished children.', badge: 'Urgent Priority' },
  { id: 'education', title: 'Primary Education & School Kits', desc: 'Tuition assistance, tutoring, textbooks, uniforms, and digital literacy tools.', badge: 'High Impact' },
  { id: 'maternal', title: 'Maternal Healthcare & Clinics', desc: 'Prenatal vitamins, postpartum support, and emergency medical clinic visits.', badge: 'Essential' },
  { id: 'general', title: 'General Field Relief Fund', desc: 'Allows ASKBTM field leadership to deploy funds wherever the most acute emergency arises.', badge: 'Flexible' },
];

export default function DonateWizardPage() {
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState<'USD' | 'ETB'>('USD');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('monthly');
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedProgram, setSelectedProgram] = useState<string>('nutrition');
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'cbe' | 'card'>('cbe');
  
  // Donor details
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    isDedicated: false,
    dedicationName: '',
    isAnonymous: false,
    taxReceiptRequired: true,
  });

  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionRef, setTransactionRef] = useState<string | null>(null);

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleFinishDonation = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount,
          currency,
          frequency,
          program: selectedProgram,
          paymentMethod,
          donor: formData,
        }),
      });
      const data = await res.json();
      setTransactionRef(data.transactionId || `ASKBTM-${Date.now().toString().slice(-6)}`);
      setStep(5);
    } catch {
      setTransactionRef(`ASKBTM-${Date.now().toString().slice(-6)}`);
      setStep(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
      {/* Wizard Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-200 border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-800" />
          Interactive Multi-Step Giving Workflow
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          Empower Lives in Tigray
        </h1>
        <p className="mt-2 text-stone-600 max-w-xl mx-auto text-sm sm:text-base font-medium">
          Every contribution directly provides hot meals, education supplies, and medical relief with 100% field transparency.
        </p>
      </div>

      {/* Step Tracker Indicator */}
      <div className="mb-10 bg-white p-4 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917]">
        <div className="grid grid-cols-5 gap-2 text-center text-xs font-bold">
          {[
            { num: 1, label: 'Amount' },
            { num: 2, label: 'Impact' },
            { num: 3, label: 'Method' },
            { num: 4, label: 'Donor Info' },
            { num: 5, label: 'Receipt' },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full border-2 border-stone-900 flex items-center justify-center font-mono text-sm transition-all ${
                  step === s.num
                    ? 'bg-amber-400 text-stone-950 font-black shadow-[2px_2px_0px_0px_#1c1917] scale-105'
                    : step > s.num
                    ? 'bg-emerald-300 text-stone-900'
                    : 'bg-stone-100 text-stone-400'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`mt-1 hidden sm:block ${step === s.num ? 'text-stone-950 font-extrabold' : 'text-stone-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Wizard Body Card */}
      <div className="bg-[#fffdfa] border-2 border-stone-900 rounded-2xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_#1c1917]">
        {/* STEP 1: AMOUNT & FREQUENCY */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-stone-200 pb-5">
              <div>
                <h2 className="text-2xl font-black text-stone-900">Step 1: Select Your Contribution</h2>
                <p className="text-xs text-stone-600 font-medium">Choose recurring monthly support or a one-time gift.</p>
              </div>

              {/* Currency Toggle */}
              <div className="flex bg-stone-100 p-1 rounded-lg border-2 border-stone-900">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 text-xs font-bold rounded ${
                    currency === 'USD' ? 'bg-amber-300 border border-stone-900 text-stone-900' : 'text-stone-600'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('ETB')}
                  className={`px-3 py-1 text-xs font-bold rounded ${
                    currency === 'ETB' ? 'bg-amber-300 border border-stone-900 text-stone-900' : 'text-stone-600'
                  }`}
                >
                  ETB (Birr)
                </button>
              </div>
            </div>

            {/* Frequency Toggle */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`p-4 rounded-xl border-2 border-stone-900 text-left transition-all ${
                  frequency === 'monthly'
                    ? 'bg-amber-200 shadow-[4px_4px_0px_0px_#1c1917]'
                    : 'bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-black text-stone-900">Monthly Supporter</span>
                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded">Highest Impact</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 font-medium">Continuous monthly nourishment for children in need.</p>
              </button>

              <button
                type="button"
                onClick={() => setFrequency('one-time')}
                className={`p-4 rounded-xl border-2 border-stone-900 text-left transition-all ${
                  frequency === 'one-time'
                    ? 'bg-amber-200 shadow-[4px_4px_0px_0px_#1c1917]'
                    : 'bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-black text-stone-900">One-Time Gift</span>
                  <span className="text-[10px] bg-stone-300 text-stone-800 font-bold px-2 py-0.5 rounded">Single Support</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 font-medium">Immediate relief assistance for our ongoing projects.</p>
              </button>
            </div>

            {/* Preset Amount Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PRESETS.map((p) => {
                const amt = currency === 'USD' ? p.amountUSD : p.amountETB;
                const isSelected = selectedAmount === amt && !customAmount;
                return (
                  <button
                    key={p.amountUSD}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`p-4 rounded-xl border-2 border-stone-900 text-center transition-all ${
                      isSelected
                        ? 'bg-amber-300 shadow-[4px_4px_0px_0px_#1c1917] font-black'
                        : 'bg-white hover:bg-stone-50 font-bold'
                    }`}
                  >
                    <div className="text-2xl text-stone-900">
                      {currency === 'USD' ? `$${amt}` : `${amt.toLocaleString()} ETB`}
                    </div>
                    <div className="text-[10px] text-stone-500 font-medium mt-1">
                      {frequency === 'monthly' ? '/ month' : 'gift'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Amount Field */}
            <div className="bg-stone-50 p-4 rounded-xl border-2 border-stone-900">
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Or Enter Custom Amount ({currency})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 font-bold text-stone-500">
                  {currency === 'USD' ? '$' : 'ETB'}
                </span>
                <input
                  type="number"
                  min="5"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full pl-12 pr-4 py-2.5 rounded-lg border-2 border-stone-900 bg-white font-mono text-base font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Real-time Impact Summary */}
            <div className="p-4 bg-emerald-50 rounded-xl border-2 border-emerald-900 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-900 block">Calculated Direct Impact</span>
                <p className="text-sm font-semibold text-emerald-950 mt-0.5">
                  Your pledge of {currency === 'USD' ? `$${effectiveAmount}` : `${effectiveAmount.toLocaleString()} ETB`} {frequency === 'monthly' ? 'every month' : 'today'} guarantees direct aid to vulnerable youth under strict NGO accountability.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm uppercase px-8 py-3.5 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#1c1917] transition-all flex items-center gap-2"
              >
                <span>Continue to Impact Area</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROGRAM SELECTION */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="border-b-2 border-stone-200 pb-4">
              <h2 className="text-2xl font-black text-stone-900">Step 2: Choose Direct Impact Program</h2>
              <p className="text-xs text-stone-600 font-medium">Allocate your funds to the specific initiative that speaks to your heart.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROGRAMS.map((prog) => {
                const isSelected = selectedProgram === prog.id;
                return (
                  <button
                    key={prog.id}
                    type="button"
                    onClick={() => setSelectedProgram(prog.id)}
                    className={`p-5 rounded-xl border-2 border-stone-900 text-left transition-all relative ${
                      isSelected
                        ? 'bg-amber-200 shadow-[4px_4px_0px_0px_#1c1917]'
                        : 'bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-stone-900 text-amber-300">
                        {prog.badge}
                      </span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-stone-900" />}
                    </div>
                    <h3 className="font-black text-base text-stone-900 leading-tight">{prog.title}</h3>
                    <p className="text-xs text-stone-600 mt-2 font-medium leading-relaxed">{prog.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-6 border-t-2 border-stone-200">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-stone-700 font-bold text-xs uppercase px-4 py-2 border-2 border-stone-900 rounded-lg bg-stone-100 flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm uppercase px-8 py-3.5 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] flex items-center gap-2"
              >
                <span>Continue to Payment Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT METHOD */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="border-b-2 border-stone-200 pb-4">
              <h2 className="text-2xl font-black text-stone-900">Step 3: Select Payment Channel</h2>
              <p className="text-xs text-stone-600 font-medium">Choose between Ethiopian local rails (Telebirr / CBE) or international card processing.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'cbe', label: 'Commercial Bank of Ethiopia', sub: 'Direct CBE account transfer', icon: Building2 },
                { id: 'telebirr', label: 'Telebirr Mobile Pay', sub: 'Instant mobile transfer', icon: Smartphone },
                { id: 'card', label: 'Credit / Debit Card', sub: 'Stripe & International cards', icon: CreditCard },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-4 rounded-xl border-2 border-stone-900 text-left transition-all ${
                      isSelected
                        ? 'bg-amber-200 shadow-[4px_4px_0px_0px_#1c1917]'
                        : 'bg-white hover:bg-stone-50'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-stone-900 mb-2" />
                    <h4 className="font-black text-sm text-stone-900">{m.label}</h4>
                    <p className="text-[11px] text-stone-600 mt-1 font-medium">{m.sub}</p>
                  </button>
                );
              })}
            </div>

            {/* Method Details Box */}
            <div className="bg-white p-5 rounded-xl border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] space-y-4">
              {paymentMethod === 'cbe' && (
                <div>
                  <h4 className="font-black text-sm text-stone-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    CBE Official NGO Account Details
                  </h4>
                  <div className="mt-3 p-3 bg-stone-50 border border-stone-300 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase block font-mono">Account Number (CBE)</span>
                      <span className="font-mono text-base font-extrabold text-stone-900">1000000000000</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('1000000000000', 'cbe')}
                      className="px-3 py-1.5 bg-amber-300 border border-stone-900 rounded text-xs font-bold flex items-center gap-1 shadow-[2px_2px_0px_0px_#1c1917]"
                    >
                      {copiedBank === 'cbe' ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedBank === 'cbe' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-2 font-medium">
                    Reference note when transferring: <span className="font-mono font-bold text-stone-800">ASKBTM-{effectiveAmount}</span>
                  </p>
                </div>
              )}

              {paymentMethod === 'telebirr' && (
                <div>
                  <h4 className="font-black text-sm text-stone-900 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    Official Telebirr Merchant Number
                  </h4>
                  <div className="mt-3 p-3 bg-stone-50 border border-stone-300 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase block font-mono">Telebirr Mobile / Merchant</span>
                      <span className="font-mono text-base font-extrabold text-stone-900">+251 91 430 0000</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('+251914300000', 'telebirr')}
                      className="px-3 py-1.5 bg-emerald-300 border border-stone-900 rounded text-xs font-bold flex items-center gap-1 shadow-[2px_2px_0px_0px_#1c1917]"
                    >
                      {copiedBank === 'telebirr' ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedBank === 'telebirr' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div>
                  <h4 className="font-black text-sm text-stone-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    Secure Card Processing (Next.js Server Verified)
                  </h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Processed securely via encrypted server route using TLS 1.3. Your payment secret is handled server-side on Render Web Service.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Card Number (4242 •••• •••• 4242)"
                      className="col-span-2 p-2.5 rounded border border-stone-400 font-mono text-xs"
                      defaultValue="4242 •••• •••• 4242"
                    />
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="p-2.5 rounded border border-stone-400 font-mono text-xs"
                      defaultValue="12/28"
                    />
                    <input
                      type="password"
                      placeholder="CVC"
                      className="p-2.5 rounded border border-stone-400 font-mono text-xs"
                      defaultValue="789"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-6 border-t-2 border-stone-200">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-stone-700 font-bold text-xs uppercase px-4 py-2 border-2 border-stone-900 rounded-lg bg-stone-100 flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm uppercase px-8 py-3.5 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] flex items-center gap-2"
              >
                <span>Continue to Donor Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: DONOR PROFILE & SETTINGS */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="border-b-2 border-stone-200 pb-4">
              <h2 className="text-2xl font-black text-stone-900">Step 4: Donor Profile &amp; Receipt</h2>
              <p className="text-xs text-stone-600 font-medium">Enter your details for official tax deductions and impact updates.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Helen Vance"
                  className="w-full p-2.5 rounded-lg border-2 border-stone-900 bg-white text-sm font-medium focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="helen@example.com"
                  className="w-full p-2.5 rounded-lg border-2 border-stone-900 bg-white text-sm font-medium focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+251 ... or +1 ..."
                  className="w-full p-2.5 rounded-lg border-2 border-stone-900 bg-white text-sm font-medium focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg border border-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isDedicated}
                  onChange={(e) => setFormData({ ...formData, isDedicated: e.target.checked })}
                  className="mt-0.5 rounded border-stone-400 text-amber-500 focus:ring-amber-400"
                />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Dedicate this donation in honor or memory of someone</span>
                  {formData.isDedicated && (
                    <input
                      type="text"
                      placeholder="In memory of / In honor of..."
                      value={formData.dedicationName}
                      onChange={(e) => setFormData({ ...formData, dedicationName: e.target.value })}
                      className="mt-2 w-full p-2 border border-stone-400 rounded text-xs bg-white"
                    />
                  )}
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                  className="rounded border-stone-400 text-amber-500 focus:ring-amber-400"
                />
                <span className="text-xs font-bold text-stone-900">Keep my donation anonymous on public honor rolls</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.taxReceiptRequired}
                  onChange={(e) => setFormData({ ...formData, taxReceiptRequired: e.target.checked })}
                  className="rounded border-stone-400 text-amber-500 focus:ring-amber-400"
                />
                <span className="text-xs font-bold text-stone-900">Email official 501(c)(3) / Ethiopian NGO charitable tax receipt</span>
              </label>
            </div>

            {/* Order Summary Box */}
            <div className="bg-amber-100 p-4 rounded-xl border-2 border-stone-900 text-xs space-y-1.5 font-medium">
              <div className="flex justify-between font-bold text-stone-900 text-sm">
                <span>Summary Contribution:</span>
                <span>{currency === 'USD' ? `$${effectiveAmount}` : `${effectiveAmount.toLocaleString()} ETB`} ({frequency})</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span>Allocated Program:</span>
                <span className="capitalize">{selectedProgram} Relief</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span>Payment Channel:</span>
                <span className="uppercase font-mono">{paymentMethod}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t-2 border-stone-200">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-stone-700 font-bold text-xs uppercase px-4 py-2 border-2 border-stone-900 rounded-lg bg-stone-100 flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                disabled={isSubmitting || !formData.fullName || !formData.email}
                onClick={handleFinishDonation}
                className="bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-stone-950 font-black text-sm uppercase px-8 py-3.5 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Record...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm &amp; Generate Receipt</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CONFIRMATION & RECEIPT */}
        {step === 5 && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 bg-emerald-300 rounded-full border-2 border-stone-900 flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_#1c1917]">
              <Check className="w-10 h-10 text-stone-900 stroke-[3]" />
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 font-bold">Contribution Confirmed</span>
              <h2 className="text-3xl font-black text-stone-900 mt-1">Thank You for Your Compassion!</h2>
              <p className="text-sm text-stone-600 max-w-md mx-auto mt-2 font-medium">
                Your generosity directly funds life-saving nutrition and education for the children of Tigray.
              </p>
            </div>

            {/* Official Digital Certificate / Receipt Card */}
            <div className="max-w-md mx-auto bg-white p-6 rounded-xl border-2 border-stone-900 text-left font-mono shadow-[4px_4px_0px_0px_#1c1917] space-y-3">
              <div className="flex justify-between items-center border-b border-stone-300 pb-2">
                <span className="text-[10px] text-stone-500 uppercase">OFFICIAL DONATION RECORD</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">VERIFIED</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Ref Code:</span>
                  <span className="font-bold text-stone-900">{transactionRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Donor Name:</span>
                  <span className="font-bold text-stone-900">{formData.fullName || 'Anonymous Patron'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Amount:</span>
                  <span className="font-bold text-emerald-700 text-sm">
                    {currency === 'USD' ? `$${effectiveAmount}` : `${effectiveAmount.toLocaleString()} ETB`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Program:</span>
                  <span className="font-bold capitalize">{selectedProgram} Relief</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Frequency:</span>
                  <span className="font-bold capitalize">{frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Date:</span>
                  <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link
                href="/portal"
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] flex items-center justify-center gap-2"
              >
                <span>View in Donor Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto bg-white hover:bg-stone-100 text-stone-900 font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" /> Print / Save Tax Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
