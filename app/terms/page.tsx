'use client';

import React from 'react';
import Link from 'next/link';

const TERMS_SECTIONS = [
  {
    id: 'section-1',
    number: '1',
    title: 'Acceptance of Terms',
    content: (
      <p>
        Welcome to ASKBTM (Aba Selama Kesate Brihan Terado Mehaber). By accessing or using our
        website, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not
        agree with any part of these terms, you must not use our services.
      </p>
    ),
  },
  {
    id: 'section-2',
    number: '2',
    title: 'Services Description',
    content: (
      <>
        <p>ASKBTM provides various community services including but not limited to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Community development programs</li>
          <li>Educational initiatives &amp; daycare childcare</li>
          <li>Charitable activities and fundraising</li>
          <li>Volunteer coordination &amp; mentorship</li>
          <li>Cultural and community events in Legatafo</li>
        </ul>
      </>
    ),
  },
  {
    id: 'section-3',
    number: '3',
    title: 'User Accounts',
    content: (
      <>
        <p>To access certain features, you may need to register or submit verified information. You agree to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Immediately notify us of any unauthorized use of your account</li>
        </ul>
      </>
    ),
  },
  {
    id: 'section-4',
    number: '4',
    title: 'Donations and Payments',
    content: (
      <>
        <p>All donations made through our website or direct banking are subject to the following terms:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Donations are voluntary and non-refundable unless otherwise specified by statutory regulations</li>
          <li>We accept direct bank transfers via CBE (Commercial Bank of Ethiopia), Telebirr, and authorized online partners</li>
          <li>You may be required to provide reference codes to verify your tax receipt</li>
          <li>We employ strict audit controls to ensure transparent fund utilization</li>
        </ul>
      </>
    ),
  },
  {
    id: 'section-5',
    number: '5',
    title: 'Intellectual Property',
    content: (
      <p>
        All content on this website, including photographs of children and facilities, text, graphics, logos,
        and audio-visual recordings, is the property of ASKBTM or used with permission under child protection
        agreements. You may not reproduce, redistribute, or use these assets for unauthorized commercial purposes.
      </p>
    ),
  },
  {
    id: 'section-6',
    number: '6',
    title: 'User Conduct',
    content: (
      <>
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Use our services for any unlawful purpose</li>
          <li>Impersonate any person or entity associated with ASKBTM</li>
          <li>Upload or transmit viruses, spam, or malicious software</li>
          <li>Interfere with the proper functioning of our donation platform</li>
          <li>Harass or scrape data from other community members</li>
        </ul>
      </>
    ),
  },
  {
    id: 'section-7',
    number: '7',
    title: 'Limitation of Liability',
    content: (
      <p>
        ASKBTM shall not be liable for any indirect, incidental, special, consequential, or punitive damages
        resulting from your access to or use of our services. Our total liability for any claim arising out of
        these terms shall not exceed the amount you contributed or paid, if any.
      </p>
    ),
  },
  {
    id: 'section-8',
    number: '8',
    title: 'Indemnification',
    content: (
      <p>
        You agree to indemnify and hold harmless ASKBTM, its officers, trustees, employees, and volunteers from
        any claims, liabilities, damages, losses, or expenses arising out of your violation of these terms or
        misuse of our public services.
      </p>
    ),
  },
  {
    id: 'section-9',
    number: '9',
    title: 'Termination',
    content: (
      <p>
        We may terminate or suspend access to our online tools or programs immediately, without prior notice,
        for conduct that we believe violates these terms or is harmful to our community, children, or mission.
      </p>
    ),
  },
  {
    id: 'section-10',
    number: '10',
    title: 'Governing Law',
    content: (
      <p>
        These terms shall be governed by and construed in accordance with the laws of the Federal Democratic
        Republic of Ethiopia. Any legal disputes shall be subject to the exclusive jurisdiction of the competent
        courts in Addis Ababa and Oromia.
      </p>
    ),
  },
  {
    id: 'section-11',
    number: '11',
    title: 'Changes to Terms',
    content: (
      <p>
        We reserve the right to modify these terms as our charitable programs expand. We will notify visitors
        by updating the effective date on this page. Your continued use constitutes acceptance of revised terms.
      </p>
    ),
  },
  {
    id: 'section-12',
    number: '12',
    title: 'Contact Information',
    content: (
      <>
        <p>If you have any questions regarding these Terms of Service, please contact our team:</p>
        <ul className="mt-3 space-y-1.5 text-sm font-medium">
          <li>
            <i className="ri-mail-line mr-1 text-blue-700"></i> Email:{' '}
            <a href="mailto:info@askbtm.org" className="underline font-bold">
              info@askbtm.org
            </a>
          </li>
          <li>
            <i className="ri-phone-line mr-1 text-green-700"></i> Phone:{' '}
            <a href="tel:+251911892787" className="underline font-bold">
              +251 911 89 27 87
            </a>
          </li>
          <li>
            <i className="ri-map-pin-line mr-1 text-red-600"></i> Address: Legatafo Town, P.O. Box 20461, Ethiopia
          </li>
          <li>
            <i className="ri-time-line mr-1 text-amber-700"></i> Office Hours: Monday – Friday, 8:30 AM – 5:30 PM EAT
          </li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 px-6 relative">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 bg-color-green border-2 border-color-black rounded-lg px-3.5 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-color-black"></span>
            <span className="text-xs md:text-sm font-semibold tracking-wide uppercase">
              ASKBTM Guidelines · Effective October 2025
            </span>
          </div>

          <h1 className="font-primary font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl mx-auto mb-6">
            Terms of{' '}
            <span className="inline-block bg-color-yellow px-3 py-0.5 -rotate-1 border-2 border-color-black mx-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Service
            </span>
          </h1>

          <p className="text-base md:text-lg text-color-black/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Please review the terms and code of conduct applicable to our donors, website visitors,
            center participants, and community members.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-color-green border-2 border-color-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-primary text-2xl font-bold mb-3 flex items-center gap-2">
                <i className="ri-book-open-line"></i> Agreement Sections
              </h3>
              <p className="text-xs text-black/70 mb-4">
                Select a section to quickly review specific conditions.
              </p>
              <ul className="space-y-1.5 border-t-2 border-black/10 pt-3">
                {TERMS_SECTIONS.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="block py-1 text-sm text-black/75 hover:text-black hover:translate-x-1 transition-transform font-medium truncate"
                    >
                      {sec.number}. {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-Profit Notice */}
            <div className="bg-white border-2 border-color-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 mb-2 text-color-black font-bold text-sm">
                <i className="ri-heart-pulse-fill text-2xl text-red-500"></i>
                <span>Charitable Mission</span>
              </div>
              <p className="text-xs text-black/70 leading-relaxed">
                ASKBTM operates as a registered community resource organization dedicated to mother and
                child welfare in Legatafo, Ethiopia.
              </p>
            </div>
          </aside>

          {/* Main Legal Body */}
          <div className="lg:col-span-8 space-y-6">
            {TERMS_SECTIONS.map((sec) => (
              <div
                key={sec.id}
                id={sec.id}
                className="scroll-mt-32 border-2 border-black rounded-2xl bg-white p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <h2 className="font-primary text-2xl sm:text-3xl font-bold mb-4 text-color-black">
                  {sec.number}. {sec.title}
                </h2>
                <div className="text-sm sm:text-base text-black/80 space-y-3 leading-relaxed font-normal">
                  {sec.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
