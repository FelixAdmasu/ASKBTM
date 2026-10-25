'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  PlusCircle, 
  FileText, 
  Users, 
  Heart, 
  CheckCircle, 
  Trash2, 
  Clock,
  Sparkles
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'stories' | 'submissions' | 'pledges'>('stories');
  
  // Simulated story creator
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Education');
  const [newContent, setNewContent] = useState('');
  const [publishedNotice, setPublishedNotice] = useState(false);

  const [submissions] = useState([
    { id: 'SUB-1', name: 'Sara Tadesse', email: 'sara.t@example.com', type: 'Volunteer Teaching', date: 'Oct 24, 2026', status: 'Pending Review' },
    { id: 'SUB-2', name: 'Dr. Michael Chen', email: 'mchen@health.org', type: 'Medical Clinic Support', date: 'Oct 23, 2026', status: 'Approved' },
    { id: 'SUB-3', name: 'Abebe Gebre', email: 'abebe.g@ethio.com', type: 'CBE Wire Confirmation Ref #99281', date: 'Oct 21, 2026', status: 'Verified' },
  ]);

  const [pledges] = useState([
    { id: 'PLG-991', donor: 'Helen Vance', amount: '$75.00/mo', program: 'Dual Sponsorship', channel: 'Credit Card', status: 'Active' },
    { id: 'PLG-992', donor: 'Samuel Kassa', amount: '6,000 ETB/mo', program: 'Nutrition Kitchen', channel: 'Telebirr', status: 'Active' },
    { id: 'PLG-993', donor: 'Marta Wolde', amount: '$100.00/mo', program: 'Maternal Clinic', channel: 'Credit Card', status: 'Active' },
  ]);

  const handlePublishStory = (e: React.FormEvent) => {
    e.preventDefault();
    setPublishedNotice(true);
    setNewTitle('');
    setNewContent('');
    setTimeout(() => setPublishedNotice(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1c1917] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            STAFF ADMINISTRATION PORTAL
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">ASKBTM Operations Management</h1>
          <p className="text-xs text-stone-400 mt-1">Manage field dispatches, review incoming volunteer applications &amp; monitor pledges.</p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/portal"
            className="text-xs font-bold text-amber-300 hover:underline px-3 py-2 bg-stone-800 rounded border border-stone-700"
          >
            Donor View &rarr;
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b-2 border-stone-900 pb-2">
        {[
          { id: 'stories', label: 'Publish Field Story', icon: FileText },
          { id: 'submissions', label: 'Inquiries & Volunteers (3)', icon: Users },
          { id: 'pledges', label: 'Active Monthly Pledges', icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg border-2 border-stone-900 font-black text-xs uppercase flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-300 text-stone-950 shadow-[2px_2px_0px_0px_#1c1917]'
                  : 'bg-white text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: STORY PUBLISHER */}
      {activeTab === 'stories' && (
        <div className="bg-[#fffdfa] rounded-2xl border-2 border-stone-900 p-6 sm:p-8 shadow-[4px_4px_0px_0px_#1c1917] max-w-3xl space-y-4">
          <div className="flex justify-between items-center border-b border-stone-200 pb-3">
            <div>
              <h3 className="font-black text-lg text-stone-900">Create New Field Story</h3>
              <p className="text-xs text-stone-500">Instantly publish news updates to the public site and Supabase database.</p>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-300">
              Live CMS Ready
            </span>
          </div>

          {publishedNotice && (
            <div className="p-3 bg-emerald-100 border border-emerald-400 text-emerald-900 rounded-lg text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              Story successfully published to the live news feed!
            </div>
          )}

          <form onSubmit={handlePublishStory} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Article Headline</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. New Science Classrooms Open for 200 Students in Mekelle"
                className="w-full p-2.5 rounded-lg border-2 border-stone-900 text-xs font-medium bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2.5 rounded-lg border-2 border-stone-900 text-xs font-medium bg-white"
                >
                  <option value="Education">Education</option>
                  <option value="Nutrition">Nutrition</option>
                  <option value="Community">Community</option>
                  <option value="Volunteering">Volunteering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Author Name</label>
                <input
                  type="text"
                  defaultValue="ASKBTM Field Team"
                  className="w-full p-2.5 rounded-lg border-2 border-stone-900 text-xs font-medium bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase mb-1">Full Story Body</label>
              <textarea
                rows={6}
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Write the full report here..."
                className="w-full p-2.5 rounded-lg border-2 border-stone-900 text-xs font-medium bg-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-black text-xs uppercase tracking-wider px-6 py-3 rounded-lg border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Story to Live Site</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: INQUIRIES & VOLUNTEERS */}
      {activeTab === 'submissions' && (
        <div className="bg-[#fffdfa] rounded-2xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] overflow-hidden">
          <div className="p-4 border-b border-stone-200">
            <h3 className="font-black text-base text-stone-900">Recent Applications &amp; Inquiries</h3>
          </div>
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-stone-50 border-b-2 border-stone-900 font-mono text-stone-600 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Category / Note</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {submissions.map((s) => (
                <tr key={s.id} className="hover:bg-amber-50/50">
                  <td className="py-3 px-4 font-bold text-stone-900">{s.name}</td>
                  <td className="py-3 px-4 font-mono text-stone-600">{s.email}</td>
                  <td className="py-3 px-4">{s.type}</td>
                  <td className="py-3 px-4 text-stone-500 font-mono text-[11px]">{s.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-amber-100 text-amber-900 border border-amber-300">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: PLEDGES */}
      {activeTab === 'pledges' && (
        <div className="bg-[#fffdfa] rounded-2xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] overflow-hidden">
          <div className="p-4 border-b border-stone-200">
            <h3 className="font-black text-base text-stone-900">Live Active Sponsorships</h3>
          </div>
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-stone-50 border-b-2 border-stone-900 font-mono text-stone-600 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Pledge ID</th>
                <th className="py-3 px-4">Donor</th>
                <th className="py-3 px-4">Commitment</th>
                <th className="py-3 px-4">Designated Program</th>
                <th className="py-3 px-4">Payment Channel</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {pledges.map((p) => (
                <tr key={p.id} className="hover:bg-amber-50/50">
                  <td className="py-3 px-4 font-mono font-bold text-stone-900">{p.id}</td>
                  <td className="py-3 px-4 font-bold">{p.donor}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-800">{p.amount}</td>
                  <td className="py-3 px-4">{p.program}</td>
                  <td className="py-3 px-4 text-stone-600">{p.channel}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
