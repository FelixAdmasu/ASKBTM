'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost, SiteStats, VisitorAnnouncement, ContactInquiry } from '../../lib/siteData';

export default function AdminPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'inbox' | 'blogs' | 'stats' | 'visitors'>('inbox');

  // Data states
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<SiteStats>({
    childrenFed: '387+',
    mothersEmpowered: '241+',
    mealsPerDay: '3 / Day',
    allocationPercent: '100%',
    targetYear: '2025–2026',
    targetDescription: 'Providing 3 nutritious meals, early education, daytime shelter, and maternal micro-grants in Legatafo.',
  });
  const [announcement, setAnnouncement] = useState<VisitorAnnouncement>({
    enabled: true,
    message: 'Visiting Legatafo? Center campus tours are open Mon–Fri 8:30 AM – 5:30 PM & Sat 9:00 AM – 1:00 PM. Call +251 911 89 27 87 to schedule.',
    type: 'yellow',
    actionText: 'Plan Visit',
    actionLink: '/support',
  });

  // Action status message
  const [feedback, setFeedback] = useState<string | null>(null);

  // New Blog Form
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'education',
    author: 'Sister Sirgutemikael Teklu',
    readTime: '4 min read',
    image: '/assets/img/children learning at askbtm.svg',
    excerpt: '',
    fullContent: '',
  });

  // Load data once authenticated & set up polling
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('askbtm_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchAdminData();
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      fetchAdminData();
    }, 15000); // Poll every 15 seconds for new direct messages
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'askbtm2026' || pinInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('askbtm_admin_auth', 'true');
      setAuthError('');
      fetchAdminData();
    } else {
      setAuthError('Incorrect access PIN. Default PIN is: askbtm2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('askbtm_admin_auth');
  };

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const fetchAdminData = async () => {
    try {
      // Inquiries
      const resInq = await fetch('/api/contact');
      const dataInq = await resInq.json();
      if (dataInq.success && dataInq.inquiries) {
        setInquiries(dataInq.inquiries);
      }

      // Content
      const resContent = await fetch('/api/content');
      const dataContent = await resContent.json();
      if (dataContent.success) {
        if (dataContent.blogs) setBlogs(dataContent.blogs);
        if (dataContent.stats) setStats(dataContent.stats);
        if (dataContent.announcement) setAnnouncement(dataContent.announcement);
      }
    } catch (err) {
      console.warn('Data fetch note:', err);
    }
  };

  // Inquiry Status Handler
  const handleUpdateInquiryStatus = async (id: string, status: 'new' | 'in-progress' | 'replied') => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    try {
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      showFeedback(`Message status updated to ${status}`);
    } catch (e) {
      // fallback
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    try {
      await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      showFeedback('Message deleted');
    } catch (e) {
      // fallback
    }
  };

  // Publish Story Handler
  const handlePublishStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.fullContent) {
      alert('Please provide a title and story content.');
      return;
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_blog',
          payload: newBlog,
        }),
      });
      const data = await res.json();
      if (data.success && data.blog) {
        setBlogs([data.blog, ...blogs]);
        setNewBlog({
          title: '',
          category: 'education',
          author: 'Sister Sirgutemikael Teklu',
          readTime: '4 min read',
          image: '/assets/img/children learning at askbtm.svg',
          excerpt: '',
          fullContent: '',
        });
        showFeedback('New story published to the website!');
      }
    } catch (err) {
      showFeedback('Error publishing story.');
    }
  };

  // Delete Story Handler
  const handleDeleteStory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story from the blog?')) return;
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete_blog',
          payload: { id },
        }),
      });
      showFeedback('Story deleted from blog.');
    } catch (err) {
      // fallback
    }
  };

  // Update Stats Handler
  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_stats',
          payload: stats,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback('Impact statistics successfully updated on the homepage!');
      }
    } catch (err) {
      showFeedback('Error updating statistics.');
    }
  };

  // Update Announcement Handler
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_announcement',
          payload: announcement,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback('Visitor notice banner updated on the homepage!');
      }
    } catch (err) {
      showFeedback('Error updating announcement.');
    }
  };

  // ==================== LOGIN SCREEN ====================
  if (!isAuthenticated) {
    return (
      <div className="pt-36 pb-24 px-6 flex items-center justify-center min-h-[75vh]">
        <div className="w-full max-w-md bg-white border-2 border-color-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="inline-flex items-center gap-2 bg-color-green border border-black px-3 py-1 rounded-md text-xs font-bold uppercase mb-4">
            <i className="ri-shield-keyhole-line"></i> Authorized Personnel Only
          </div>
          <h1 className="font-primary text-3xl font-bold text-color-black mb-2">
            ASKBTM Staff Portal
          </h1>
          <p className="text-xs text-black/70 mb-6 leading-relaxed">
            Manage field stories, impact statistics, visitor announcements, and direct messages for
            Sister Sirgutemikael and the Legatafo center.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">
                Enter Staff PIN / Password
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="askbtm2026"
                className="w-full px-4 py-3 bg-color-cream border-2 border-color-black rounded-lg text-sm font-mono font-bold outline-none focus:bg-white"
              />
              <span className="block text-[11px] text-black/60 mt-1">
                Default Access PIN: <code>askbtm2026</code>
              </span>
            </div>

            {authError && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 text-xs rounded font-medium">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-color-yellow text-color-black font-bold rounded-lg border-2 border-color-black text-sm btn-brutal flex items-center justify-center gap-2"
            >
              <span>Unlock Admin Dashboard</span>
              <i className="ri-arrow-right-line"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==================== MAIN DASHBOARD ====================
  const unreadCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="pt-8 md:pt-12 pb-20 px-4 sm:px-6 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ==================== LEFT SIDEBAR ==================== */}
        <aside className="lg:col-span-3 space-y-5 lg:sticky lg:top-8">
          {/* Executive Profile Card */}
          <div className="bg-color-black text-white border-2 border-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="w-12 h-12 rounded-xl bg-color-yellow border-2 border-white overflow-hidden flex-shrink-0 flex items-center justify-center text-black font-bold text-lg shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <img
                  src="/assets/img/testimonial-profile-2.png"
                  alt="Sister Sirgutemikael"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-primary text-lg font-bold text-white truncate leading-tight">
                  Sister Sirgutemikael
                </h3>
                <p className="text-xs text-white/70 truncate">Executive Director</p>
                <div className="inline-flex items-center gap-1.5 text-[10px] text-color-green font-mono font-bold mt-1">
                  <span className="w-2 h-2 rounded-full bg-color-green animate-pulse"></span>
                  <span>Active Session</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/20 text-xs text-white/80 space-y-1.5">
              <p className="flex items-center justify-between">
                <span className="text-white/60">Location:</span>
                <strong className="text-white">Legatafo, Ethiopia</strong>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-white/60">Center:</span>
                <strong className="text-white">Freminatos Resource Center</strong>
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="bg-white border-2 border-black rounded-2xl p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-2">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black/50 border-b border-black/10 mb-1">
              Dashboard Navigation
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('inbox')}
              className={`w-full text-left px-3.5 py-3 rounded-xl border-2 border-black font-bold text-xs sm:text-sm flex items-center justify-between transition-all ${
                activeTab === 'inbox'
                  ? 'bg-color-yellow text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black/80 hover:bg-color-cream'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <i className="ri-mail-unread-line text-lg"></i>
                <span>Direct Inquiries</span>
              </div>
              {unreadCount > 0 ? (
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {unreadCount}
                </span>
              ) : (
                <span className="text-xs font-mono text-black/50">{inquiries.length}</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('blogs')}
              className={`w-full text-left px-3.5 py-3 rounded-xl border-2 border-black font-bold text-xs sm:text-sm flex items-center justify-between transition-all ${
                activeTab === 'blogs'
                  ? 'bg-color-yellow text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black/80 hover:bg-color-cream'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <i className="ri-article-line text-lg"></i>
                <span>Stories &amp; Blogs</span>
              </div>
              <span className="text-xs font-mono text-black/50">{blogs.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('stats')}
              className={`w-full text-left px-3.5 py-3 rounded-xl border-2 border-black font-bold text-xs sm:text-sm flex items-center justify-between transition-all ${
                activeTab === 'stats'
                  ? 'bg-color-yellow text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black/80 hover:bg-color-cream'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <i className="ri-bar-chart-box-line text-lg"></i>
                <span>Impact Counters</span>
              </div>
              <i className="ri-arrow-right-s-line text-black/40"></i>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('visitors')}
              className={`w-full text-left px-3.5 py-3 rounded-xl border-2 border-black font-bold text-xs sm:text-sm flex items-center justify-between transition-all ${
                activeTab === 'visitors'
                  ? 'bg-color-yellow text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black/80 hover:bg-color-cream'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <i className="ri-notification-3-line text-lg"></i>
                <span>Visitor Banner</span>
              </div>
              <span
                className={`w-2.5 h-2.5 rounded-full border border-black ${
                  announcement.enabled ? 'bg-color-green' : 'bg-gray-300'
                }`}
              ></span>
            </button>
          </nav>

          {/* Controls Card */}
          <div className="bg-color-cream border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
            <button
              onClick={fetchAdminData}
              className="w-full py-2.5 bg-white text-black font-bold text-xs rounded-xl border-2 border-black btn-brutal flex items-center justify-center gap-2 hover:bg-color-yellow"
            >
              <i className="ri-refresh-line"></i>
              <span>Refresh Inquiries</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="w-full py-2.5 bg-color-blue text-black font-bold text-xs rounded-xl border-2 border-black btn-brutal flex items-center justify-center gap-2"
            >
              <i className="ri-external-link-line"></i>
              <span>View Public Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 bg-red-100 text-red-900 font-bold text-xs rounded-xl border-2 border-black hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
            >
              <i className="ri-logout-box-r-line"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* ==================== RIGHT MAIN CONTENT ==================== */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Director Header & KPI Grid */}
          <div className="bg-color-black text-white rounded-2xl p-6 sm:p-8 border-2 border-color-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/20 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 bg-color-green text-black px-2.5 py-0.5 rounded font-bold text-xs uppercase mb-2">
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                  Director Console Operations
                </div>
                <h1 className="font-primary text-3xl sm:text-4xl font-normal tracking-tight text-white">
                  ASKBTM Executive Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-white/75 mt-1">
                  Legatafo Center, Ethiopia · Registered Charitable Resource Organization
                </p>
              </div>

              <span className="px-3 py-1 bg-color-yellow text-black border border-white rounded-lg text-xs font-mono font-bold">
                PIN: Protected
              </span>
            </div>

            {/* Quick KPI Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="bg-white/10 border border-white/20 rounded-xl p-3.5">
                <span className="text-[10px] uppercase font-bold text-white/60 block mb-0.5">
                  Direct Inquiries
                </span>
                <span className="text-2xl font-black text-color-yellow">{inquiries.length}</span>
                <span className="text-[10px] text-white/70 block mt-0.5">
                  {unreadCount} Unread
                </span>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-xl p-3.5">
                <span className="text-[10px] uppercase font-bold text-white/60 block mb-0.5">
                  Published Stories
                </span>
                <span className="text-2xl font-black text-color-green">{blogs.length}</span>
                <span className="text-[10px] text-white/70 block mt-0.5">Live on Blog</span>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-xl p-3.5">
                <span className="text-[10px] uppercase font-bold text-white/60 block mb-0.5">
                  Children Supported
                </span>
                <span className="text-2xl font-black text-color-pink">{stats.childrenFed}</span>
                <span className="text-[10px] text-white/70 block mt-0.5">Daily Care</span>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-xl p-3.5">
                <span className="text-[10px] uppercase font-bold text-white/60 block mb-0.5">
                  Notice Banner
                </span>
                <span
                  className={`text-sm font-bold block mt-1 ${
                    announcement.enabled ? 'text-color-green' : 'text-gray-400'
                  }`}
                >
                  {announcement.enabled ? '● Active Bar' : '○ Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* Feedback Toast Notification */}
          {feedback && (
            <div className="p-4 bg-color-green border-2 border-color-black rounded-xl text-black font-bold text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
              <i className="ri-checkbox-circle-fill text-lg"></i>
              <span>{feedback}</span>
            </div>
          )}

      {/* ==================== TAB 1: INBOX & DIRECT MESSAGES ==================== */}
      {activeTab === 'inbox' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="font-primary text-2xl font-bold text-color-black">
                Direct Inquiries &amp; Messages
              </h2>
              <p className="text-xs text-black/70">
                Messages submitted through the homepage or support contact forms.
              </p>
            </div>
            <button
              onClick={fetchAdminData}
              className="px-3 py-1.5 bg-white border-2 border-black rounded-lg text-xs font-bold btn-brutal hover:bg-color-yellow inline-flex items-center gap-1.5"
            >
              <i className="ri-refresh-line"></i> Refresh Inbox
            </button>
          </div>

          {inquiries.length === 0 ? (
            <div className="bg-white border-2 border-color-black rounded-xl p-8 text-center text-sm font-medium text-black/60">
              No inquiries received yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`border-2 border-color-black rounded-xl p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between gap-4 ${
                    inq.status === 'new' ? 'border-l-8 border-l-yellow-400' : ''
                  }`}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-color-cream px-2 py-0.5 rounded border border-black/40">
                        {inq.id}
                      </span>
                      <span className="text-xs font-bold bg-color-blue px-2.5 py-0.5 rounded border border-black uppercase">
                        {inq.subject}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded border border-black ${
                          inq.status === 'new'
                            ? 'bg-yellow-200 text-yellow-900'
                            : inq.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-green-200 text-green-900'
                        }`}
                      >
                        Status: {inq.status.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-black/60 ml-auto">
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-sm">
                      <strong className="text-black text-base">{inq.name}</strong>{' '}
                      <span className="text-black/70">(&lt;{inq.email}&gt;)</span>
                      {inq.phone && (
                        <span className="ml-2 text-xs font-mono font-bold bg-green-50 px-2 py-0.5 rounded border border-green-300">
                          Tel: {inq.phone}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-black/85 leading-relaxed bg-color-cream p-3 rounded-lg border border-black/20">
                      {inq.message}
                    </p>
                  </div>

                  {/* Actions column */}
                  <div className="flex flex-row md:flex-col justify-end gap-2 flex-shrink-0 pt-2 md:pt-0">
                    <a
                      href={`mailto:${inq.email}?subject=Re: ASKBTM Inquiries - ${encodeURIComponent(
                        inq.subject
                      )}`}
                      className="px-3 py-2 bg-color-yellow border-2 border-black rounded-lg text-xs font-bold text-center btn-brutal inline-flex items-center justify-center gap-1"
                    >
                      <i className="ri-mail-send-line"></i>
                      <span>Reply Email</span>
                    </a>

                    {inq.phone ? (
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                          inq.name
                        )}%2C%20thank%20you%20for%20contacting%20Freminatos%20Center%20(ASKBTM).`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-color-green border-2 border-black rounded-lg text-xs font-bold text-center btn-brutal inline-flex items-center justify-center gap-1"
                      >
                        <i className="ri-whatsapp-line"></i>
                        <span>WhatsApp</span>
                      </a>
                    ) : null}

                    <div className="flex gap-1.5">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleUpdateInquiryStatus(inq.id, e.target.value as any)
                        }
                        className="flex-1 text-xs font-bold p-1.5 border-2 border-black rounded-lg bg-white"
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="replied">Replied</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-1.5 text-xs bg-red-100 hover:bg-red-200 border-2 border-black rounded-lg text-red-700"
                        title="Delete inquiry"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 2: STORIES & BLOGS ==================== */}
      {activeTab === 'blogs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Create Story Form */}
          <div className="lg:col-span-5 bg-white border-2 border-color-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-color-green border border-black"></span>
              <h3 className="font-primary text-2xl font-bold">Post New Field Story</h3>
            </div>
            <p className="text-xs text-black/70">
              Published articles appear instantly on the News &amp; Blogs page (`/news`).
            </p>

            <form onSubmit={handlePublishStory} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Story Headline *</label>
                <input
                  type="text"
                  required
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  placeholder="e.g. New Nutrition Clinic Launched in Legatafo"
                  className="w-full px-3 py-2 bg-color-cream border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Category *</label>
                  <select
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                    className="w-full px-3 py-2 bg-color-cream border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                  >
                    <option value="education">Education</option>
                    <option value="events">Events &amp; Gala</option>
                    <option value="volunteer">Volunteer Spotlight</option>
                    <option value="success-stories">Success Stories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Est. Read Time</label>
                  <input
                    type="text"
                    value={newBlog.readTime}
                    onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                    placeholder="4 min read"
                    className="w-full px-3 py-2 bg-color-cream border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Author Name</label>
                <input
                  type="text"
                  value={newBlog.author}
                  onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                  placeholder="Sister Sirgutemikael Teklu"
                  className="w-full px-3 py-2 bg-color-cream border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Card Illustration / Photo
                </label>
                <select
                  value={newBlog.image}
                  onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                  className="w-full px-3 py-2 bg-color-cream border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                >
                  <option value="/assets/img/children learning at askbtm.svg">
                    Children Learning (SVG)
                  </option>
                  <option value="/assets/img/volunteer.svg">Volunteers at Work (SVG)</option>
                  <option value="/assets/img/community-event.svg">Community Event (SVG)</option>
                  <option value="/assets/img/education-tech.svg">Education Technology (SVG)</option>
                  <option value="/assets/img/success-story.svg">Success Story (SVG)</option>
                  <option value="/assets/img/art-class.svg">Art Class (SVG)</option>
                  <option value="/assets/img/slideshow1.jpg">Slideshow Photo 1 (Legatafo)</option>
                  <option value="/assets/img/slideshow6.jpg">Slideshow Photo 6 (Meals)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Short Summary (Excerpt)</label>
                <textarea
                  rows={2}
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                  placeholder="Brief preview sentence that shows on the card..."
                  className="w-full px-3 py-2 bg-color-cream border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Full Story Content (HTML or Paragraphs) *
                </label>
                <textarea
                  rows={6}
                  required
                  value={newBlog.fullContent}
                  onChange={(e) => setNewBlog({ ...newBlog, fullContent: e.target.value })}
                  placeholder="Share details about the program, quotes from mothers, and impact details..."
                  className="w-full px-3 py-2 bg-color-cream border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-color-yellow text-color-black font-bold rounded-xl border-2 border-color-black text-sm btn-brutal flex items-center justify-center gap-2"
              >
                <i className="ri-upload-cloud-line text-lg"></i>
                <span>Publish to Live Site</span>
              </button>
            </form>
          </div>

          {/* Existing Blogs List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-primary text-2xl font-bold text-color-black">
              Current Published Stories ({blogs.length})
            </h3>
            <div className="space-y-3">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border-2 border-color-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-color-green border border-black px-2 py-0.5 rounded uppercase">
                        {b.category}
                      </span>
                      <span className="text-xs text-black/60">
                        {b.day} {b.monthYear} · By {b.author}
                      </span>
                    </div>
                    <h4 className="font-primary text-lg font-bold text-black">{b.title}</h4>
                    <p className="text-xs text-black/75 line-clamp-2">{b.excerpt}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteStory(b.id)}
                    className="p-2 text-xs bg-red-100 hover:bg-red-200 border-2 border-black rounded-lg text-red-700 flex-shrink-0"
                    title="Delete story"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: IMPACT COUNTS & STATS ==================== */}
      {activeTab === 'stats' && (
        <div className="bg-white border-2 border-color-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-3xl space-y-6">
          <div>
            <h2 className="font-primary text-3xl font-bold text-color-black">
              Update Live Homepage Impact Numbers
            </h2>
            <p className="text-xs text-black/70 mt-1">
              These counts appear in the 4-box stats bar on the main homepage.
            </p>
          </div>

          <form onSubmit={handleSaveStats} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-color-blue/20 p-4 rounded-xl border-2 border-black">
                <label className="block text-xs font-bold uppercase mb-1">
                  1. Children Fed &amp; Cared Daily
                </label>
                <input
                  type="text"
                  value={stats.childrenFed}
                  onChange={(e) => setStats({ ...stats, childrenFed: e.target.value })}
                  placeholder="387+"
                  className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg text-lg font-primary font-bold outline-none"
                />
              </div>

              <div className="bg-color-yellow/30 p-4 rounded-xl border-2 border-black">
                <label className="block text-xs font-bold uppercase mb-1">
                  2. Mothers Empowered
                </label>
                <input
                  type="text"
                  value={stats.mothersEmpowered}
                  onChange={(e) => setStats({ ...stats, mothersEmpowered: e.target.value })}
                  placeholder="241+"
                  className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg text-lg font-primary font-bold outline-none"
                />
              </div>

              <div className="bg-color-green/30 p-4 rounded-xl border-2 border-black">
                <label className="block text-xs font-bold uppercase mb-1">
                  3. Nutritious Meals per Day
                </label>
                <input
                  type="text"
                  value={stats.mealsPerDay}
                  onChange={(e) => setStats({ ...stats, mealsPerDay: e.target.value })}
                  placeholder="3 / Day"
                  className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg text-lg font-primary font-bold outline-none"
                />
              </div>

              <div className="bg-color-pink/30 p-4 rounded-xl border-2 border-black">
                <label className="block text-xs font-bold uppercase mb-1">
                  4. Program Allocation Percentage
                </label>
                <input
                  type="text"
                  value={stats.allocationPercent}
                  onChange={(e) => setStats({ ...stats, allocationPercent: e.target.value })}
                  placeholder="100%"
                  className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg text-lg font-primary font-bold outline-none"
                />
              </div>
            </div>

            <div className="border-t-2 border-black/10 pt-4">
              <label className="block text-xs font-bold uppercase mb-1">
                Strategic Target Headline
              </label>
              <input
                type="text"
                value={stats.targetYear}
                onChange={(e) => setStats({ ...stats, targetYear: e.target.value })}
                placeholder="2025–2026"
                className="w-full px-3 py-2 bg-color-cream border-2 border-black rounded-lg text-sm font-bold outline-none mb-3"
              />

              <label className="block text-xs font-bold uppercase mb-1">
                Strategic Focus Description
              </label>
              <textarea
                rows={3}
                value={stats.targetDescription}
                onChange={(e) => setStats({ ...stats, targetDescription: e.target.value })}
                placeholder="Providing 3 nutritious meals, early education..."
                className="w-full px-3 py-2 bg-color-cream border-2 border-black rounded-lg text-sm font-medium outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-color-green text-color-black font-bold rounded-xl border-2 border-color-black text-sm btn-brutal flex items-center gap-2"
            >
              <i className="ri-save-line text-lg"></i>
              <span>Save &amp; Update Live Homepage</span>
            </button>
          </form>
        </div>
      )}

      {/* ==================== TAB 4: VISITOR NOTICE BANNER ==================== */}
      {activeTab === 'visitors' && (
        <div className="bg-white border-2 border-color-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-3xl space-y-6">
          <div>
            <h2 className="font-primary text-3xl font-bold text-color-black">
              Visitor Notice &amp; Announcement Bar
            </h2>
            <p className="text-xs text-black/70 mt-1">
              Broadcast urgent announcements, tour visiting hours, or donation drives at the very top of
              the website.
            </p>
          </div>

          <form onSubmit={handleSaveAnnouncement} className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-color-cream rounded-xl border-2 border-black">
              <input
                type="checkbox"
                id="enableBanner"
                checked={announcement.enabled}
                onChange={(e) =>
                  setAnnouncement({ ...announcement, enabled: e.target.checked })
                }
                className="w-5 h-5 accent-yellow-400"
              />
              <label htmlFor="enableBanner" className="font-bold text-sm cursor-pointer select-none">
                Enable Visitor Alert Bar on Homepage
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">Banner Accent Color</label>
              <div className="flex gap-3">
                {[
                  { id: 'yellow', label: 'Yellow (Warm Alert)', bg: 'bg-color-yellow' },
                  { id: 'green', label: 'Green (Good News / Open)', bg: 'bg-color-green' },
                  { id: 'blue', label: 'Blue (Info)', bg: 'bg-color-blue' },
                  { id: 'pink', label: 'Pink (Urgent Need)', bg: 'bg-color-pink' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() =>
                      setAnnouncement({ ...announcement, type: c.id as any })
                    }
                    className={`px-3 py-1.5 rounded-lg border-2 border-black text-xs font-bold ${c.bg} ${
                      announcement.type === c.id ? 'ring-2 ring-black font-black scale-105' : 'opacity-70'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">
                Announcement Message for Visitors *
              </label>
              <textarea
                rows={3}
                required
                value={announcement.message}
                onChange={(e) =>
                  setAnnouncement({ ...announcement, message: e.target.value })
                }
                placeholder="e.g. Visitor notice: Campus open for visiting tours this Saturday from 9 AM to 1 PM. Call +251 911 89 27 87 to reserve."
                className="w-full px-4 py-3 bg-color-cream border-2 border-color-black rounded-lg text-sm font-medium outline-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Optional Button Label
                </label>
                <input
                  type="text"
                  value={announcement.actionText || ''}
                  onChange={(e) =>
                    setAnnouncement({ ...announcement, actionText: e.target.value })
                  }
                  placeholder="Plan Visit"
                  className="w-full px-3 py-2 bg-color-cream border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Button Link</label>
                <input
                  type="text"
                  value={announcement.actionLink || ''}
                  onChange={(e) =>
                    setAnnouncement({ ...announcement, actionLink: e.target.value })
                  }
                  placeholder="/support"
                  className="w-full px-3 py-2 bg-color-cream border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                />
              </div>
            </div>

            {/* Live Preview */}
            <div className="p-4 bg-gray-50 border-2 border-dashed border-black/40 rounded-xl space-y-2">
              <span className="text-[11px] font-bold uppercase text-black/60">Live Preview:</span>
              <div
                className={`p-3 rounded-lg border-2 border-black flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm font-bold bg-color-${announcement.type}`}
              >
                <span>{announcement.message}</span>
                {announcement.actionText && (
                  <span className="px-3 py-1 bg-white border border-black rounded text-xs">
                    {announcement.actionText} &rarr;
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-color-yellow text-color-black font-bold rounded-xl border-2 border-color-black text-sm btn-brutal flex items-center gap-2"
            >
              <i className="ri-broadcast-line text-lg"></i>
              <span>Publish Banner Notice</span>
            </button>
          </form>
        </div>
      )}
        </main>
      </div>
    </div>
  );
}
