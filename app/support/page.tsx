'use client';

import React, { useState } from 'react';

const SUPPORT_FAQS = [
  {
    q: "How can I make a donation to support ASKBTM's initiatives?",
    a: (
      <>
        <p>We provide multiple secure donation options suited for both local supporters in Ethiopia and international donors:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Local Bank Transfer:</strong> Direct deposit to our Commercial Bank of Ethiopia (CBE) account: <code>1000 488 291 034</code>.</li>
          <li><strong>Telebirr:</strong> Quick mobile transfer to <code>+251 911 89 27 87</code>.</li>
          <li><strong>In-Person Delivery:</strong> Supplies (food, clothing, educational toys, hygiene packs) can be brought directly to our Legatafo campus.</li>
        </ul>
        <p className="mt-2">Every single contribution is acknowledged with an official receipt and financial report.</p>
      </>
    ),
  },
  {
    q: 'What volunteer opportunities are available at ASKBTM?',
    a: (
      <>
        <p>We welcome volunteers from all walks of life. Core roles include:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Daytime Classroom Helpers:</strong> Assisting educators with early literacy, arts, and games.</li>
          <li><strong>Meal Preparation &amp; Distribution:</strong> Helping our kitchen staff serve nutritious hot meals twice a day.</li>
          <li><strong>Skills Workshops for Mothers:</strong> Sharing vocational crafts, business basics, or tailoring skills.</li>
          <li><strong>Professional Support:</strong> Photography, medical/dental checkup volunteering, and translation.</li>
        </ul>
      </>
    ),
  },
  {
    q: 'What are your operating hours and how can I visit?',
    a: (
      <>
        <p>Our daytime center runs from <strong>Monday through Friday, 8:30 AM to 5:30 PM EAT</strong>. Children are welcomed in the morning, receive breakfast, educational play, lunch, afternoon naps, and creative activities before mothers return after work.</p>
        <p className="mt-2">If you wish to visit our Legatafo center, please email or call us at least 24 hours in advance so our staff can prepare a safe, organized tour for you.</p>
      </>
    ),
  },
  {
    q: 'How does ASKBTM ensure financial transparency?',
    a: (
      <>
        <p>Over 82% of all resources go directly toward child nutrition, learning supplies, and staff care. 10% is used for facility maintenance and utility costs, and 8% for community outreach.</p>
        <p className="mt-2">We publish an annual audited report detailing fund usage, donor contributions, and child enrollment growth, which is available upon request.</p>
      </>
    ),
  },
  {
    q: 'Can businesses or schools become corporate partners?',
    a: (
      <>
        <p>Yes! We collaborate with local businesses, private schools, and international non-profits for sponsorships, supply drives, and employee volunteer days.</p>
        <p className="mt-2">Reach out to <code>partnerships@askbtm.org</code> to discuss custom collaboration plans.</p>
      </>
    ),
  },
];

export default function SupportPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Direct Message Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'donation',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
    details?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been received.',
          details: 'Our Legatafo care team will reply to ' + formData.email + ' shortly. Reference: #' + data.inquiry.id,
        });
        setFormData({ name: '', email: '', phone: '', subject: 'donation', message: '' });
      } else {
        throw new Error(data.error || 'Failed to submit message');
      }
    } catch (err: any) {
      setSubmitStatus({
        type: 'error',
        message: 'Unable to deliver message right now.',
        details: 'You can also reach us immediately on WhatsApp at +251 911 89 27 87.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ASKBTM Team! I am contacting you from your support center regarding ${formData.subject || 'general support'}.`
  );

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="pt-32 md:pt-40 pb-16 px-6 relative">
        <div className="max-w-[1200px] mx-auto text-center">
          {/* Status Tag */}
          <div className="inline-flex items-center gap-2.5 bg-color-yellow border-2 border-color-black rounded-lg px-3.5 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-color-black"></span>
            <span className="text-xs md:text-sm font-semibold tracking-wide uppercase">
              Community Support &amp; Resource Desk · Legatafo
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-primary font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl mx-auto mb-6">
            How Can We{' '}
            <span className="inline-block bg-color-green px-3 py-0.5 -rotate-1 border-2 border-color-black mx-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Support
            </span>{' '}
            You Today?
          </h1>

          <p className="text-base md:text-lg text-color-black/80 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            Whether you want to visit our center in Legatafo, partner as a corporate donor, volunteer
            your time, or need assistance navigating our programs, our team is ready to help.
          </p>

          {/* Fast Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            {/* Card 1 */}
            <div className="bg-color-yellow border-2 border-color-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] btn-brutal">
              <div className="w-12 h-12 rounded-lg bg-white border-2 border-black flex items-center justify-center text-2xl mb-4">
                <i className="ri-phone-fill"></i>
              </div>
              <h3 className="font-primary text-2xl font-bold mb-1">Direct Lines</h3>
              <p className="text-xs text-black/70 mb-3">Reach our office or 24/7 care desk</p>
              <p className="font-bold text-sm text-color-black">+251 911 89 27 87</p>
              <p className="text-xs text-black/80">+251 922 222 222 (Emergency)</p>
            </div>

            {/* Card 2 */}
            <div className="bg-color-green border-2 border-color-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] btn-brutal">
              <div className="w-12 h-12 rounded-lg bg-white border-2 border-black flex items-center justify-center text-2xl mb-4">
                <i className="ri-map-pin-2-fill"></i>
              </div>
              <h3 className="font-primary text-2xl font-bold mb-1">Center Campus</h3>
              <p className="text-xs text-black/70 mb-3">Legatafo Town, Oromia, Ethiopia</p>
              <p className="font-bold text-sm text-color-black">Mon – Fri: 8:30 AM – 5:30 PM</p>
              <p className="text-xs text-black/80">Saturday: 9:00 AM – 1:00 PM</p>
            </div>

            {/* Card 3 */}
            <div className="bg-color-blue border-2 border-color-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] btn-brutal">
              <div className="w-12 h-12 rounded-lg bg-white border-2 border-black flex items-center justify-center text-2xl mb-4">
                <i className="ri-mail-send-fill"></i>
              </div>
              <h3 className="font-primary text-2xl font-bold mb-1">Electronic Mail</h3>
              <p className="text-xs text-black/70 mb-3">Average response time under 24 hours</p>
              <p className="font-bold text-sm text-color-black truncate">fadm94202@gmail.com</p>
              <p className="text-xs text-black/80 truncate">info@askbtm.org</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM & OPERATIONAL DETAILS ===== */}
      <section className="py-12 px-6" id="contact">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white border-2 border-color-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="inline-block bg-color-pink px-3 py-1 rounded-md border-2 border-black font-bold text-xs uppercase">
                  Direct In-App Message
                </div>
                <a
                  href={`https://wa.me/251911892787?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#25D366] text-white px-3 py-1 rounded-md border-2 border-black hover:opacity-90 btn-brutal"
                >
                  <i className="ri-whatsapp-line text-sm"></i>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <h2 className="font-primary text-3xl sm:text-4xl font-normal tracking-tight mb-2">
                Send Our Team a Message
              </h2>
              <p className="text-sm text-black/70 mb-6 leading-relaxed">
                Messages are saved directly into our staff inbox and forwarded securely to our management team. We typically respond within a few hours.
              </p>

              {submitStatus && (
                <div
                  className={`mb-6 p-4 rounded-xl border-2 border-black font-medium text-sm ${
                    submitStatus.type === 'success'
                      ? 'bg-color-green text-color-black'
                      : 'bg-red-100 text-red-900'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-2">
                    <i
                      className={`text-lg ${
                        submitStatus.type === 'success'
                          ? 'ri-checkbox-circle-fill'
                          : 'ri-error-warning-fill'
                      }`}
                    ></i>
                    {submitStatus.message}
                  </div>
                  {submitStatus.details && <p className="text-xs">{submitStatus.details}</p>}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    >
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Abebe Bikila"
                      className="w-full bg-color-cream border-2 border-color-black rounded-lg px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="abebe@example.com"
                      className="w-full bg-color-cream border-2 border-color-black rounded-lg px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+251 911 00 00 00"
                      className="w-full bg-color-cream border-2 border-color-black rounded-lg px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    >
                      Inquiry Topic *
                    </label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-color-cream border-2 border-color-black rounded-lg px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="donation">Donation &amp; Bank Transfer Verification</option>
                      <option value="volunteer">Volunteer Opportunities &amp; Internships</option>
                      <option value="visit">Center Visitation &amp; Tours in Legatafo</option>
                      <option value="corporate">Corporate Partnership &amp; CSR Initiatives</option>
                      <option value="other">General Community Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please provide any details about how we can help or collaborate..."
                    className="w-full bg-color-cream border-2 border-color-black rounded-lg px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 bg-color-yellow text-color-black font-bold py-3.5 px-6 rounded-xl border-2 border-color-black text-base btn-brutal flex items-center justify-center gap-2 hover:bg-yellow-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin text-lg"></i>
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Direct Message</span>
                        <i className="ri-send-plane-2-fill text-lg"></i>
                      </>
                    )}
                  </button>

                  <a
                    href="https://t.me/your_channel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-color-blue text-color-black font-bold py-3.5 px-5 rounded-xl border-2 border-color-black text-sm btn-brutal flex items-center justify-center gap-2"
                  >
                    <i className="ri-telegram-fill text-lg"></i>
                    <span>Telegram</span>
                  </a>
                </div>
              </form>
            </div>

            {/* Banking & Direct Info Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              {/* Donation Banking Box */}
              <div className="bg-color-cream border-2 border-color-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-color-green border border-black"></span>
                  <h3 className="font-primary text-2xl font-bold">Official Donation Accounts</h3>
                </div>
                <p className="text-xs text-black/70 mb-4 leading-relaxed">
                  Direct contributions support our daily food program and school supplies for children
                  in Legatafo.
                </p>

                {/* CBE Card */}
                <div className="bg-white border-2 border-black rounded-xl p-3.5 mb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-300">
                      Commercial Bank of Ethiopia
                    </span>
                    <p className="font-mono font-bold text-sm mt-1 text-black">1000 488 291 034</p>
                    <p className="text-[11px] text-black/60">
                      Freminatos Children &amp; Mothers Center
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('1000488291034', 'cbe')}
                    className="px-2.5 py-1.5 bg-color-yellow border border-black rounded-lg text-xs font-bold btn-brutal"
                  >
                    {copiedKey === 'cbe' ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* Telebirr Card */}
                <div className="bg-white border-2 border-black rounded-xl p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-300">
                      Telebirr Fast Pay
                    </span>
                    <p className="font-mono font-bold text-sm mt-1 text-black">+251 911 89 27 87</p>
                    <p className="text-[11px] text-black/60">Registered ASKBTM Account</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('+251911892787', 'telebirr')}
                    className="px-2.5 py-1.5 bg-color-green border border-black rounded-lg text-xs font-bold btn-brutal"
                  >
                    {copiedKey === 'telebirr' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Map Card */}
              <div className="bg-white border-2 border-color-black rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-primary text-xl font-bold mb-2">Center Location Map</h4>
                <div className="border-2 border-color-black rounded-xl overflow-hidden h-[220px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3939.5712172329654!2d38.94571!3d9.102767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMDYnMTAuMCJOIDM4wrA1Nic0NC42IkU!5e0!3m2!1sen!2set!4v1762429431323!5m2!1sen!2set"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <p className="text-xs text-black/70 mt-2 text-center">
                  Legatafo Center, Oromia Region (near Addis Ababa outskirts)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ACCORDION SECTION ===== */}
      <section className="py-16 px-6 bg-white border-t-2 border-color-black" id="faq">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-color-green px-3.5 py-1 rounded-md border-2 border-black font-bold text-xs uppercase mb-3">
              Got Questions?
            </div>
            <h2 className="font-primary text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-black/70 font-medium">
              Clear answers on donations, financial audits, volunteer onboarding, and community operations.
            </p>
          </div>

          <div className="space-y-4">
            {SUPPORT_FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="border-2 border-color-black rounded-xl p-5 bg-color-cream shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center text-left font-bold text-lg text-color-black"
                  >
                    <span>{faq.q}</span>
                    <span className="text-2xl font-bold ml-4">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="text-sm text-black/80 space-y-2 leading-relaxed pt-3 border-t border-black/10 mt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
