'use client';

import React from 'react';
import Link from 'next/link';

const PRIVACY_SECTIONS = [
  {
    id: 'section-1',
    number: '1',
    title: 'Introduction',
    content: (
      <>
        <p>
          Welcome to ASKBTM (Aba Selama Kesate Brihan Terado Mehaber). We are committed to protecting
          your privacy and ensuring the security of personal information. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you visit our website or
          interact with our daycare center in Legatafo, Ethiopia.
        </p>
        <p className="mt-2">
          By using our website, you agree to the collection and use of information in accordance with
          this policy.
        </p>
      </>
    ),
  },
  {
    id: 'section-2',
    number: '2',
    title: 'Information We Collect',
    content: (
      <>
        <p>We collect several types of information from and about our community supporters and participants, including:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1.5">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone number, and contact details
            when you register, make a donation pledge, or submit an inquiry.
          </li>
          <li>
            <strong>Payment &amp; Transfer Proof:</strong> Bank transaction slips, deposit confirmation codes,
            and verification notes for tax receipt generation.
          </li>
          <li>
            <strong>Demographic &amp; Enrollment Data:</strong> Family background, child age, nutritional requirements,
            and maternal background provided during center onboarding.
          </li>
          <li>
            <strong>Usage &amp; Diagnostic Data:</strong> Browser type, visit timestamps, and pages accessed to ensure
            system availability and security.
          </li>
        </ul>
        <p className="mt-2 text-xs text-black/75">
          <strong>Special Protection for Minor Data:</strong> Children's photographic media and health progress reports
          are strictly curated with written parental consent and are never shared for commercial solicitation.
        </p>
      </>
    ),
  },
  {
    id: 'section-3',
    number: '3',
    title: 'How We Use Your Information',
    content: (
      <>
        <p>We utilize the collected information for specific charitable and operational objectives:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>To manage daycare enrollments and daily meal allocations</li>
          <li>To issue official tax receipts and donor verification statements</li>
          <li>To send transparent updates regarding center developments and child welfare</li>
          <li>To respond promptly to volunteer applications and partnership requests</li>
          <li>To uphold our child safety standards and legal compliance in Ethiopia</li>
        </ul>
      </>
    ),
  },
  {
    id: 'section-4',
    number: '4',
    title: 'Data Security',
    content: (
      <p>
        The security of your data is paramount. We implement strict administrative and technological safeguards
        to protect against unauthorized access, alteration, or disclosure. We utilize encrypted transmission channels
        and restrict internal record access solely to authorized personnel.
      </p>
    ),
  },
  {
    id: 'section-5',
    number: '5',
    title: 'Your Data Protection Rights',
    content: (
      <>
        <p>Depending on your jurisdiction and applicable data protection regulations, you hold rights to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Request access to copies of your personal data</li>
          <li>Request correction of inaccurate or incomplete records</li>
          <li>Request deletion or anonymization of your contact information</li>
          <li>Withdraw consent for newsletters or media publication at any time</li>
        </ul>
      </>
    ),
  },
  {
    id: 'section-6',
    number: '6',
    title: 'Third-Party Services and Data Sharing',
    content: (
      <p>
        ASKBTM never sells, rents, or monetizes personal data to advertisers. We only coordinate with trusted financial
        and logistics partners (e.g. Commercial Bank of Ethiopia, Telebirr, audited accounting partners) strictly for
        processing donations and maintaining operational transparency.
      </p>
    ),
  },
  {
    id: 'section-7',
    number: '7',
    title: "Children's Privacy",
    content: (
      <p>
        Protecting the dignity, safety, and confidentiality of vulnerable infants, children, and young mothers is our
        core mission. Media materials featuring beneficiaries are captured exclusively under ethical guidelines and with
        verified parental consent. No minor may be contacted directly through this website.
      </p>
    ),
  },
  {
    id: 'section-8',
    number: '8',
    title: 'Changes to This Privacy Policy',
    content: (
      <p>
        We may periodically revise our Privacy Policy to reflect updated regulatory requirements or enhanced programs.
        The revised policy will be posted on this page with an updated timestamp.
      </p>
    ),
  },
  {
    id: 'section-9',
    number: '9',
    title: 'Data Retention and Deletion',
    content: (
      <p>
        We retain donor and contribution records only for the period mandated by Ethiopian non-profit auditing laws.
        Non-essential inquiry submissions can be removed upon written request to our data desk.
      </p>
    ),
  },
  {
    id: 'section-10',
    number: '10',
    title: 'Your Choices and Opt-Out Options',
    content: (
      <p>
        You have the freedom to opt out of electronic correspondence or donor impact chronicles at any point by
        clicking the unsubscribe option or emailing our coordinator directly.
      </p>
    ),
  },
  {
    id: 'section-11',
    number: '11',
    title: 'Governing Law and Dispute Resolution',
    content: (
      <p>
        This Privacy Policy is governed by the laws and statutory non-profit regulatory frameworks of Ethiopia. Any
        unresolved concerns shall be addressed through good-faith mediation in Addis Ababa, Ethiopia.
      </p>
    ),
  },
  {
    id: 'section-12',
    number: '12',
    title: 'Contact Us',
    content: (
      <>
        <p>If you have any questions or wish to exercise your data rights, please reach out to our privacy officer:</p>
        <ul className="mt-3 space-y-1.5 text-sm font-medium">
          <li>
            <i className="ri-mail-line mr-1 text-blue-700"></i> Email:{' '}
            <a href="mailto:privacy@askbtm.org" className="underline font-bold">
              privacy@askbtm.org
            </a>
          </li>
          <li>
            <i className="ri-phone-line mr-1 text-green-700"></i> Phone:{' '}
            <a href="tel:+251911892787" className="underline font-bold">
              +251 911 89 27 87
            </a>
          </li>
          <li>
            <i className="ri-map-pin-line mr-1 text-red-600"></i> Address: Legatafo Center, Oromia Special Zone, Ethiopia
          </li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 px-6 relative">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 bg-color-yellow border-2 border-color-black rounded-lg px-3.5 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-color-black"></span>
            <span className="text-xs md:text-sm font-semibold tracking-wide uppercase">
              Legal &amp; Data Protection · Effective October 2025
            </span>
          </div>

          <h1 className="font-primary font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl mx-auto mb-6">
            ASKBTM{' '}
            <span className="inline-block bg-color-pink px-3 py-0.5 -rotate-1 border-2 border-color-black mx-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Privacy
            </span>{' '}
            Policy
          </h1>

          <p className="text-base md:text-lg text-color-black/80 font-medium max-w-2xl mx-auto leading-relaxed">
            We are deeply dedicated to transparency, safeguarding children's privacy, and securing
            personal data provided by families, volunteers, and donors.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-color-yellow border-2 border-color-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-primary text-2xl font-bold mb-3 flex items-center gap-2">
                <i className="ri-list-check-3"></i> Document Sections
              </h3>
              <p className="text-xs text-black/70 mb-4">Click to jump directly to any policy section.</p>
              <ul className="space-y-1.5 border-t-2 border-black/10 pt-3">
                {PRIVACY_SECTIONS.map((sec) => (
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

            {/* Quick Trust Card */}
            <div className="bg-white border-2 border-color-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 mb-2 text-color-green font-bold text-sm">
                <i className="ri-shield-check-fill text-2xl text-green-600"></i>
                <span className="text-black font-bold">Child Protection Guarantee</span>
              </div>
              <p className="text-xs text-black/70 leading-relaxed">
                We never sell or distribute child or donor records. Media publication requires verified parent/guardian
                consent.
              </p>
            </div>
          </aside>

          {/* Main Legal Body */}
          <div className="lg:col-span-8 space-y-6">
            {PRIVACY_SECTIONS.map((sec) => (
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
