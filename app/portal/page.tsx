'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  UserCheck, 
  Heart, 
  Calendar, 
  Download, 
  Clock, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  PauseCircle, 
  PlayCircle, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  FileText,
  DollarSign,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface DonationRecord {
  id: string;
  date: string;
  amountUSD: number;
  amountETB: number;
  program: string;
  channel: string;
  status: 'Verified' | 'Pending';
  taxDeductible: boolean;
}

export default function DonorPortalPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'pledges' | 'settings'>('overview');
  const [currency, setCurrency] = useState<'USD' | 'ETB'>('USD');
  const [selectedReceipt, setSelectedReceipt] = useState<DonationRecord | null>(null);

  // Simulated Donor State
  const [donorProfile, setDonorProfile] = useState({
    name: 'Helen Vance',
    email: 'helen.vance@givinglife.org',
    donorTier: 'Gold Patron',
    memberSince: 'March 2023',
    taxId: 'US-9428-1102',
    isAnonymous: false,
    quarterlyReports: true,
  });

  // Active Pledges
  const [pledges, setPledges] = useState([
    {
      id: 'PLG-101',
      title: 'Daily Hot Lunch Nutrition Support',
      amountUSD: 50,
      amountETB: 6000,
      beneficiary: 'Mekelle Primary Learning Group A',
      status: 'Active',
      nextBilling: 'November 1, 2026',
    },
    {
      id: 'PLG-102',
      title: 'School Supplies & Uniforms',
      amountUSD: 25,
      amountETB: 3000,
      beneficiary: 'Orphaned Youth Education Fund',
      status: 'Active',
      nextBilling: 'November 5, 2026',
    },
  ]);

  // Donation History
  const [history] = useState<DonationRecord[]>([
    {
      id: 'REC-2026-881',
      date: 'Oct 15, 2026',
      amountUSD: 75,
      amountETB: 9000,
      program: 'Monthly Dual Sponsorship (Meals + Schooling)',
      channel: 'Credit Card (Stripe)',
      status: 'Verified',
      taxDeductible: true,
    },
    {
      id: 'REC-2026-742',
      date: 'Sep 15, 2026',
      amountUSD: 75,
      amountETB: 9000,
      program: 'Monthly Dual Sponsorship',
      channel: 'Credit Card (Stripe)',
      status: 'Verified',
      taxDeductible: true,
    },
    {
      id: 'REC-2026-619',
      date: 'Aug 20, 2026',
      amountUSD: 250,
      amountETB: 30000,
      program: 'Emergency Medical Clinic Grant',
      channel: 'Commercial Bank of Ethiopia (CBE)',
      status: 'Verified',
      taxDeductible: true,
    },
    {
      id: 'REC-2026-501',
      date: 'Jul 15, 2026',
      amountUSD: 75,
      amountETB: 9000,
      program: 'Monthly Dual Sponsorship',
      channel: 'Credit Card (Stripe)',
      status: 'Verified',
      taxDeductible: true,
    },
  ]);

  const togglePledgeStatus = (id: string) => {
    setPledges(
      pledges.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Active' ? 'Paused' : 'Active' } : p
      )
    );
  };

  const totalUSD = history.reduce((acc, curr) => acc + curr.amountUSD, 0);
  const totalETB = history.reduce((acc, curr) => acc + curr.amountETB, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Banner: Donor Account Summary */}
      <div className="bg-[#fffdfa] border-2 border-stone-900 rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#1c1917] mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-300 rounded-xl border-2 border-stone-900 flex items-center justify-center font-black text-2xl text-stone-900 shadow-[3px_3px_0px_0px_#1c1917]">
              HV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
                  Welcome back, {donorProfile.name}
                </h1>
                <span className="bg-amber-400 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded border border-stone-900">
                  {donorProfile.donorTier}
                </span>
              </div>
              <p className="text-xs text-stone-600 font-medium mt-1">
                Donor ID: <span className="font-mono font-bold text-stone-800">ASKBTM-DONOR-4819</span> • Member since {donorProfile.memberSince}
              </p>
            </div>
          </div>

          {/* Quick Currency & Actions */}
          <div className="flex items-center gap-3">
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

            <Link
              href="/donate"
              className="bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-black text-xs uppercase px-4 py-2.5 rounded-lg border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Make New Pledge</span>
            </Link>
          </div>
        </div>

        {/* 4 Key Executive Impact Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t-2 border-stone-200">
          <div className="bg-amber-50 p-4 rounded-xl border-2 border-stone-900">
            <span className="text-[11px] font-bold uppercase text-stone-600 tracking-wider block">Total Lifetime Giving</span>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              {currency === 'USD' ? `$${totalUSD.toLocaleString()}` : `${totalETB.toLocaleString()} ETB`}
            </div>
            <span className="text-[10px] text-emerald-700 font-bold mt-1 block">100% Tax Deductible</span>
          </div>

          <div className="bg-emerald-50 p-4 rounded-xl border-2 border-stone-900">
            <span className="text-[11px] font-bold uppercase text-stone-600 tracking-wider block">Active Monthly Pledges</span>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              {pledges.filter((p) => p.status === 'Active').length} Active
            </div>
            <span className="text-[10px] text-stone-600 font-medium mt-1 block">Renews Nov 1, 2026</span>
          </div>

          <div className="bg-sky-50 p-4 rounded-xl border-2 border-stone-900">
            <span className="text-[11px] font-bold uppercase text-stone-600 tracking-wider block">Children Sponsored</span>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              4 Children
            </div>
            <span className="text-[10px] text-sky-800 font-medium mt-1 block">Mekelle Central Ward</span>
          </div>

          <div className="bg-rose-50 p-4 rounded-xl border-2 border-stone-900">
            <span className="text-[11px] font-bold uppercase text-stone-600 tracking-wider block">Hot Meals Delivered</span>
            <div className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              480 Lunches
            </div>
            <span className="text-[10px] text-rose-800 font-medium mt-1 block">Direct Kitchen Impact</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b-2 border-stone-900 mb-6 gap-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Field Impact & Progress' },
          { id: 'history', label: 'Giving History & Tax Receipts' },
          { id: 'pledges', label: 'Manage Recurring Pledges' },
          { id: 'settings', label: 'Donor Profile & Tax Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3 font-black text-xs uppercase tracking-wider rounded-t-lg border-t-2 border-x-2 border-stone-900 transition-all ${
              activeTab === tab.id
                ? 'bg-amber-300 text-stone-950 shadow-[0_2px_0_0_#fde68a] -mb-[2px]'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & FIELD IMPACT */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Real-time Field Progress Bar */}
            <div className="bg-white p-6 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-lg text-stone-900">Mekelle Nutrition Center Goal</h3>
                <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  88% Funded
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Together with your ongoing support, our community kitchen has secured continuous food provisions through December 2026.
              </p>
              <div className="w-full bg-stone-200 rounded-full h-4 border-2 border-stone-900 overflow-hidden">
                <div className="bg-amber-400 h-full w-[88%] border-r-2 border-stone-900 transition-all duration-1000"></div>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-stone-600">
                <span>Raised: $26,400</span>
                <span>Target: $30,000</span>
              </div>
            </div>

            {/* Field Dispatch Report */}
            <div className="bg-white p-6 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block">
                Field Director Update • Oct 2026
              </span>
              <h3 className="font-black text-lg text-stone-900">
                School Kit Delivery to 350 Primary Students
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Thanks to recurring patrons like you, ASKBTM volunteers distributed 350 complete stationery packs, exercise books, and durable canvas backpacks this past Tuesday. Teachers in the Ayder district reported immediate attendance stabilization.
              </p>
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-300 flex items-center justify-between text-xs">
                <span className="font-medium text-stone-700">Detailed Q3 Program PDF Available</span>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="font-bold text-amber-700 hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download Report
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Donor Recognition & Support */}
          <div className="space-y-6">
            <div className="bg-amber-100 p-6 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] space-y-3">
              <div className="w-10 h-10 bg-amber-400 rounded-lg border-2 border-stone-900 flex items-center justify-center">
                <Award className="w-5 h-5 text-stone-900" />
              </div>
              <h4 className="font-black text-stone-900">Patron Circle Benefit</h4>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                As a Gold Tier supporter, you receive direct bi-annual video updates from our volunteer coordinators in Tigray and dedicated concierge giving assistance.
              </p>
              <div className="pt-2">
                <Link
                  href="/news"
                  className="text-xs font-bold text-stone-900 underline flex items-center gap-1 hover:text-amber-800"
                >
                  Read latest field news &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border-2 border-stone-900 text-xs space-y-2">
              <span className="font-bold uppercase text-stone-500 block">Dedicated Support Liaison</span>
              <p className="font-bold text-stone-900">Yohannes Berhe</p>
              <p className="text-stone-600">Donor Partnerships Coordinator</p>
              <p className="font-mono text-stone-800">donors@askbtm.org</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GIVING HISTORY & TAX RECEIPTS */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] overflow-hidden">
            <div className="p-5 border-b-2 border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-black text-lg text-stone-900">Contribution Ledger</h3>
                <p className="text-xs text-stone-500">Official Ethiopian NGO &amp; international charitable records.</p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 border-2 border-stone-900 rounded-lg text-xs font-bold flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" /> Export All Tax Records (CSV)
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b-2 border-stone-900 font-mono uppercase text-stone-600">
                  <tr>
                    <th className="py-3 px-4">Receipt Ref</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Allocated Program</th>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-medium">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/50">
                      <td className="py-3.5 px-4 font-mono font-bold text-stone-900">{item.id}</td>
                      <td className="py-3.5 px-4 text-stone-600">{item.date}</td>
                      <td className="py-3.5 px-4 text-stone-900 font-semibold">{item.program}</td>
                      <td className="py-3.5 px-4 text-stone-600 font-mono text-[11px]">{item.channel}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-800">
                        {currency === 'USD' ? `$${item.amountUSD}` : `${item.amountETB.toLocaleString()} ETB`}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedReceipt(item)}
                          className="px-2.5 py-1 bg-amber-300 hover:bg-amber-200 border border-stone-900 rounded font-bold text-[11px] inline-flex items-center gap-1 shadow-[1px_1px_0px_0px_#1c1917]"
                        >
                          <FileText className="w-3 h-3" /> View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Receipt Modal */}
          {selectedReceipt && (
            <div className="fixed inset-0 bg-stone-950/70 z-50 flex items-center justify-center p-4">
              <div className="bg-white max-w-lg w-full border-2 border-stone-900 rounded-2xl p-6 shadow-[6px_6px_0px_0px_#1c1917] space-y-4 font-mono">
                <div className="flex justify-between items-start border-b-2 border-stone-900 pb-3">
                  <div>
                    <h3 className="font-black text-stone-900 text-base">Official Contribution Receipt</h3>
                    <p className="text-[10px] text-stone-500">Charity Reg: #0253 • Tigray, Ethiopia</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedReceipt(null)}
                    className="p-1 rounded border border-stone-900 hover:bg-stone-100 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Receipt Number:</span>
                    <span className="font-bold text-stone-900">{selectedReceipt.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Donor Name:</span>
                    <span className="font-bold text-stone-900">{donorProfile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Tax Deductible ID:</span>
                    <span className="font-bold text-stone-900">{donorProfile.taxId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Amount Received:</span>
                    <span className="font-bold text-emerald-700 text-sm">
                      ${selectedReceipt.amountUSD} USD ({selectedReceipt.amountETB.toLocaleString()} ETB)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Date Paid:</span>
                    <span>{selectedReceipt.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Designation:</span>
                    <span className="font-bold">{selectedReceipt.program}</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded border border-stone-200 text-[10px] text-stone-600 leading-relaxed">
                  No goods or services were provided in exchange for this contribution other than intangible religious or charitable benefits. Retain this receipt for your income tax filings.
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-amber-400 border-2 border-stone-900 rounded font-bold text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Print / Save PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedReceipt(null)}
                    className="px-4 py-2 bg-stone-200 border-2 border-stone-900 rounded font-bold text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MANAGE RECURRING PLEDGES */}
      {activeTab === 'pledges' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917]">
            <h3 className="font-black text-xl text-stone-900">Your Active Sponsorships</h3>
            <p className="text-xs text-stone-600 mt-1">
              Recurring gifts provide the dependable foundation that keeps our daily feeding and classroom doors open.
            </p>

            <div className="space-y-4 mt-6">
              {pledges.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-xl border-2 border-stone-900 bg-stone-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-base text-stone-900">{p.title}</h4>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border border-stone-900 ${
                          p.status === 'Active' ? 'bg-emerald-300 text-stone-900' : 'bg-stone-300 text-stone-700'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">
                      Beneficiary: <span className="font-bold text-stone-800">{p.beneficiary}</span>
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5 font-mono">
                      Next renewal: {p.nextBilling}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-mono text-xl font-black text-stone-900">
                        {currency === 'USD' ? `$${p.amountUSD}` : `${p.amountETB.toLocaleString()} ETB`}
                      </div>
                      <span className="text-[10px] text-stone-500 font-bold">per month</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePledgeStatus(p.id)}
                      className={`px-3 py-1.5 rounded-lg border-2 border-stone-900 text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#1c1917] ${
                        p.status === 'Active' ? 'bg-amber-200 hover:bg-amber-100' : 'bg-emerald-300 hover:bg-emerald-200'
                      }`}
                    >
                      {p.status === 'Active' ? (
                        <>
                          <PauseCircle className="w-3.5 h-3.5" /> Pause
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-3.5 h-3.5" /> Resume
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-stone-200 flex justify-between items-center">
              <span className="text-xs text-stone-600 font-medium">Need to modify sponsorship program or payment card?</span>
              <Link
                href="/donate"
                className="text-xs font-black text-amber-700 uppercase hover:underline"
              >
                Add another sponsorship &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DONOR PROFILE & TAX SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] space-y-6 max-w-2xl">
          <h3 className="font-black text-xl text-stone-900">Donor Profile &amp; Preferences</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Legal Full Name</label>
              <input
                type="text"
                value={donorProfile.name}
                onChange={(e) => setDonorProfile({ ...donorProfile, name: e.target.value })}
                className="w-full p-2.5 rounded-lg border-2 border-stone-900 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Receipt Email</label>
              <input
                type="email"
                value={donorProfile.email}
                onChange={(e) => setDonorProfile({ ...donorProfile, email: e.target.value })}
                className="w-full p-2.5 rounded-lg border-2 border-stone-900 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Tax ID / SSN / Business Number</label>
              <input
                type="text"
                value={donorProfile.taxId}
                onChange={(e) => setDonorProfile({ ...donorProfile, taxId: e.target.value })}
                className="w-full p-2.5 rounded-lg border-2 border-stone-900 text-sm font-mono font-bold"
              />
              <span className="text-[10px] text-stone-500 mt-1 block">Used automatically when generating downloadable annual charitable deductions.</span>
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={donorProfile.isAnonymous}
                  onChange={(e) => setDonorProfile({ ...donorProfile, isAnonymous: e.target.checked })}
                  className="rounded border-stone-400 text-amber-500"
                />
                <span className="text-xs font-bold text-stone-900">Make my name anonymous on public donor rolls &amp; annual reports</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg border border-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={donorProfile.quarterlyReports}
                  onChange={(e) => setDonorProfile({ ...donorProfile, quarterlyReports: e.target.checked })}
                  className="rounded border-stone-400 text-amber-500"
                />
                <span className="text-xs font-bold text-stone-900">Send quarterly Tigray field video dispatches to my email</span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => alert('Donor profile updated successfully!')}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs uppercase px-6 py-3 rounded-lg border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917]"
              >
                Save Profile Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
