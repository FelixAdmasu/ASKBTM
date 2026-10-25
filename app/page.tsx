'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const HERO_SLIDES = [
  { src: '/assets/img/slideshow25.jpg', alt: 'Children at ASKBTM' },
  { src: '/assets/img/slideshow22.jpg', alt: 'Learning activities in Legatafo' },
  { src: '/assets/img/slideshow16.jpg', alt: 'Nutritious meals for children' },
  { src: '/assets/img/slideshow20.jpg', alt: 'Mothers and daycare staff' },
  { src: '/assets/img/slideshow18.jpg', alt: 'Playtime and companionship' },
];

const GALLERY_ROW_1 = [
  { src: '/assets/img/slideshow1.jpg', alt: 'Children learning together' },
  { src: '/assets/img/slideshow2.jpg', alt: 'Creative play at Legatafo' },
  { src: '/assets/img/slideshow3.jpg', alt: 'Daycare activity session' },
  { src: '/assets/img/slideshow4.jpg', alt: 'Outdoor playground fun' },
  { src: '/assets/img/slideshow5.jpg', alt: 'Group reading hour' },
  { src: '/assets/img/slideshow1.jpg', alt: 'Children learning together' },
  { src: '/assets/img/slideshow2.jpg', alt: 'Creative play at Legatafo' },
  { src: '/assets/img/slideshow3.jpg', alt: 'Daycare activity session' },
];

const GALLERY_ROW_2 = [
  { src: '/assets/img/slideshow6.jpg', alt: 'Nutritious lunchtime meal' },
  { src: '/assets/img/slideshow7.jpg', alt: 'Art & drawing lesson' },
  { src: '/assets/img/slideshow8.jpg', alt: 'Mothers & children circle' },
  { src: '/assets/img/slideshow9.jpg', alt: 'Celebration event' },
  { src: '/assets/img/slideshow10.jpg', alt: 'Community support session' },
  { src: '/assets/img/slideshow6.jpg', alt: 'Nutritious lunchtime meal' },
  { src: '/assets/img/slideshow7.jpg', alt: 'Art & drawing lesson' },
  { src: '/assets/img/slideshow8.jpg', alt: 'Mothers & children circle' },
];

const IMPACT_TIERS = [
  {
    code: 'Meals',
    amount: '$18',
    sub: '1 Mo Meals',
    fullAmount: '$18 / ~2,400 ETB',
    purpose: '30 days nutritious meals (3 meals + 2 snacks) for 1 child',
  },
  {
    code: 'MicroLoan',
    amount: '$34',
    sub: 'Mother Loan',
    fullAmount: '$34 / ~4,500 ETB',
    purpose: 'Maternal micro-loan + 3-month business mentorship',
  },
  {
    code: 'SchoolKit',
    amount: '$65',
    sub: '1 Yr School Kit',
    fullAmount: '$65 / ~8,500 ETB',
    purpose: 'Full school uniform, shoes, backpack & textbooks for 1 year',
  },
  {
    code: 'FullSponsor',
    amount: '$350',
    sub: 'Full Sponsor',
    fullAmount: '$350 / ~45,000 ETB',
    purpose: 'Full 12-month child nutrition & mother vocational sponsorship',
  },
];

const FAQS = [
  {
    q: 'How do families enroll children in the Legatafo daycare?',
    a: 'Families can visit our center in Legatafo behind the health post or submit our pre-registration inquiry. Our admissions team conducts a friendly family orientation and guides caregivers through necessary documentation.',
  },
  {
    q: 'What ages are supported at ASKBTM?',
    a: 'We provide nurturing care, nutrition, and early childhood education for infants and children aged 6 months to 6 years, with emerging after-school tutoring for primary school students.',
  },
  {
    q: 'Are services free for families facing hardship?',
    a: 'Yes. Daycare, meals, and maternal training are supported by generous donor sponsorships so that no mother is turned away due to financial difficulty.',
  },
  {
    q: 'How can volunteers get involved?',
    a: 'Volunteers are welcome both on-site at Legatafo and remotely! Simply submit a message below or reach Sister Sirgutemikael directly at +251 911 89 27 87.',
  },
];

export default function HomePage() {
  // Hero Slider
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  // Lightbox Modal
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null);

  // Impact Tiers
  const [selectedTier, setSelectedTier] = useState(IMPACT_TIERS[0]);
  const [donorName, setDonorName] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Dynamic Site Content & Visitor Banner
  const [liveStats, setLiveStats] = useState({
    childrenFed: '387+',
    mothersEmpowered: '241+',
    mealsPerDay: '3 / Day',
    allocationPercent: '100%',
    targetYear: '2025–2026',
    targetDescription: 'Providing 3 nutritious meals, early education, daytime shelter, and maternal micro-grants in Legatafo.',
  });
  const [visitorBanner, setVisitorBanner] = useState<{
    enabled: boolean;
    message: string;
    type: string;
    actionText?: string;
    actionLink?: string;
  } | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Donation & Sponsorship',
    message: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content?type=all')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.stats) setLiveStats(data.stats);
          if (data.announcement && data.announcement.enabled) {
            setVisitorBanner(data.announcement);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormSuccess(null);
    setFormError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (data.success) {
        setFormSuccess(data.message || 'Thank you! Your message has been received.');
        setContactForm({
          name: '',
          email: '',
          phone: '',
          subject: 'Donation & Sponsorship',
          message: '',
        });
      } else {
        setFormError(data.error || 'Failed to send message. Please try again or WhatsApp us.');
      }
    } catch (err: any) {
      setFormError('Network error. Please try again or reach Sister Sirgutemikael at +251 911 89 27 87.');
    } finally {
      setFormLoading(false);
    }
  };

  const cleanName = donorName.trim().replace(/[^a-zA-Z0-9]/g, '') || 'Donation';
  const referenceCode = `FREM-2025-${selectedTier.code}-${cleanName}`;

  const handleCopy = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  // FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Scroll to Top
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ==================== VISITOR NOTICE BANNER ==================== */}
      {visitorBanner && visitorBanner.enabled && !bannerDismissed && (
        <div
          className={`fixed top-0 left-0 right-0 z-40 py-2 px-4 border-b-2 border-black text-center text-xs sm:text-sm font-bold shadow-md bg-color-${
            visitorBanner.type || 'yellow'
          }`}
        >
          <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-2">
            <div className="flex-1 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5">
                <i className="ri-notification-3-fill"></i>
                {visitorBanner.message}
              </span>
              {visitorBanner.actionText && visitorBanner.actionLink && (
                <Link
                  href={visitorBanner.actionLink}
                  className="ml-2 px-2.5 py-0.5 bg-white border border-black rounded text-xs font-bold hover:bg-black hover:text-white transition-colors"
                >
                  {visitorBanner.actionText} &rarr;
                </Link>
              )}
            </div>
            <button
              onClick={() => setBannerDismissed(true)}
              aria-label="Dismiss banner"
              className="w-6 h-6 flex items-center justify-center rounded-md border border-black bg-white hover:bg-black hover:text-white text-xs font-bold transition-colors ml-2"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {/* ==================== HERO SECTION ==================== */}
      <section className="pt-32 md:pt-40 pb-20 px-6 relative overflow-hidden" id="home">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6 z-10">
              {/* Pulsing Location & Status Badge */}
              <div className="inline-flex items-center gap-2.5 bg-color-green border-2 border-color-black rounded-lg px-3.5 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-color-black opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-color-black"></span>
                </span>
                <span className="text-xs md:text-sm font-semibold tracking-wide uppercase">
                  Legatafo Center · Daytime Care &amp; Nutrition
                </span>
              </div>

              {/* Main Editorial Heading */}
              <h1 className="font-primary font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
                Where children{' '}
                <span className="inline-block bg-color-yellow px-3 py-0.5 -rotate-1 border-2 border-color-black mx-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  thrive
                </span>{' '}
                and mothers rise together.
                <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl text-color-black/85 italic font-normal">
                  ፍሬሚናጦስ የልጆች እና የእናቶች መርጃ ማዕከል
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-color-black/90 max-w-xl leading-relaxed">
                <strong>Aba Selama Kesate Brihan Terado Mehaber (ASKBTM)</strong>. Founded by Mother
                Sirgutemikael Teklu, we protect family unity through comprehensive daycare, 3 daily
                fortified meals, early education, and maternal micro-loans in Legatafo, Ethiopia.
              </p>

              {/* CTAs with Neobrutalist buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#donate"
                  className="btn-brutal inline-flex items-center justify-center px-6 py-3.5 text-base md:text-lg font-bold rounded-lg bg-color-black text-color-white border-2 border-color-black"
                >
                  <span>Support Our Cause</span>
                  <i className="ri-heart-fill ml-2 text-color-yellow"></i>
                </a>
                <a
                  href="#video"
                  className="btn-brutal inline-flex items-center justify-center px-6 py-3.5 text-base md:text-lg font-bold rounded-lg bg-color-white text-color-black border-2 border-color-black"
                >
                  <span>Watch Story in Motion</span>
                  <i className="ri-play-circle-line ml-2"></i>
                </a>
              </div>

              {/* Location & Center Verification */}
              <div className="flex items-center gap-3 text-sm md:text-base pt-4 border-t-2 border-color-black/20 text-color-black/80 font-medium">
                <i className="ri-map-pin-2-fill text-xl text-red-600"></i>
                <span>
                  Legatafo Town, Oromia Special Zone · 10 km East of Addis Ababa · Reg. No. 3220
                </span>
              </div>
            </div>

            {/* Right Showcase Image / Slideshow with playful neo-brutalist accents */}
            <div className="lg:col-span-5 relative pt-4">
              {/* Main Photo Container */}
              <div className="relative w-full max-w-[480px] mx-auto aspect-[4/3] sm:aspect-[1.15/1] bg-color-yellow border-2 border-color-black rounded-xl p-2.5 sm:p-3.5 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1">
                {/* Slideshow inside brutal frame */}
                <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-color-black bg-color-black">
                  <img
                    src={HERO_SLIDES[currentSlide].src}
                    alt={HERO_SLIDES[currentSlide].alt}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />

                  {/* Navigation Arrows */}
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white text-color-black border-2 border-color-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:bg-color-yellow hover:scale-105 active:scale-95 transition-all z-20"
                  >
                    <i className="ri-arrow-left-s-line text-2xl font-bold"></i>
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white text-color-black border-2 border-color-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:bg-color-yellow hover:scale-105 active:scale-95 transition-all z-20"
                  >
                    <i className="ri-arrow-right-s-line text-2xl font-bold"></i>
                  </button>

                  {/* Slide counter indicator badge */}
                  <div className="absolute bottom-3 right-3 z-20 bg-color-white/95 text-color-black border-2 border-color-black px-2.5 py-1 rounded-md text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 pointer-events-none select-none">
                    <i className="ri-image-2-line text-xs"></i>
                    <span>
                      {currentSlide + 1} / {HERO_SLIDES.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Playful floating accents around the frame */}
              <div className="absolute -top-4 -left-4 w-12 h-12 md:w-16 md:h-16 bg-color-blue border-2 border-color-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-bold">
                <i className="ri-heart-pulse-fill text-xl"></i>
              </div>
              <div className="absolute -bottom-4 right-6 w-12 h-12 md:w-16 md:h-16 bg-color-green border-2 border-color-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-bold">
                <i className="ri-sun-fill text-xl"></i>
              </div>
            </div>
          </div>

          {/* ==================== STATS BAR ==================== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24">
            <div className="border-2 border-color-black rounded-xl p-5 md:p-6 bg-color-blue text-center btn-brutal">
              <p className="font-primary text-4xl md:text-5xl font-normal mb-1">{liveStats.childrenFed}</p>
              <p className="text-sm md:text-base font-semibold">Children Fed &amp; Cared Daily</p>
            </div>
            <div className="border-2 border-color-black rounded-xl p-5 md:p-6 bg-color-yellow text-center btn-brutal">
              <p className="font-primary text-4xl md:text-5xl font-normal mb-1">{liveStats.mothersEmpowered}</p>
              <p className="text-sm md:text-base font-semibold">Mothers Empowered</p>
            </div>
            <div className="border-2 border-color-black rounded-xl p-5 md:p-6 bg-color-green text-center btn-brutal">
              <p className="font-primary text-4xl md:text-5xl font-normal mb-1">{liveStats.mealsPerDay}</p>
              <p className="text-sm md:text-base font-semibold">Nutritious Daily Meals</p>
            </div>
            <div className="border-2 border-color-black rounded-xl p-5 md:p-6 bg-color-pink text-center btn-brutal">
              <p className="font-primary text-4xl md:text-5xl font-normal mb-1">{liveStats.allocationPercent}</p>
              <p className="text-sm md:text-base font-semibold">Direct Program Allocation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== VIDEO: OUR STORY IN MOTION ==================== */}
      <section className="py-20 px-6 bg-color-cream/40 border-y-2 border-color-black" id="video">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center">
          <h2 className="font-primary text-4xl md:text-5xl font-normal bg-color-yellow px-4 py-1.5 border-2 border-color-black rounded-md inline-block relative mb-14 section-title shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            Our Story in Motion
          </h2>
          <p className="text-center text-base sm:text-lg text-color-black/80 max-w-2xl mb-8 -mt-6">
            Witness daily life at our Legatafo campus—warm morning greetings, wholesome nutrition,
            classroom growth, and joyful evening parent reunifications.
          </p>

          {/* Video Player in Neo-brutalist Cinema Frame */}
          <div className="w-full border-2 border-color-black rounded-xl p-3 md:p-5 bg-color-yellow shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <div className="relative w-full overflow-hidden rounded-lg border-2 border-color-black bg-color-black">
              <video
                src="/assets/vid/freminatos  children & mothers.webm"
                autoPlay
                loop
                muted
                controls
                playsInline
                className="w-full h-auto max-h-[580px] mx-auto block object-cover"
              ></video>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm font-semibold text-color-black/80">
              <span>
                <i className="ri-video-line mr-1"></i> Recorded on-site at Legatafo Center
              </span>
              <span>
                <i className="ri-speed-line mr-1"></i> Normal speed playback active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT & MISSION ==================== */}
      <section className="py-24 px-6" id="about">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <h2 className="font-primary text-4xl md:text-5xl font-normal bg-color-yellow px-4 py-1.5 border-2 border-color-black rounded-md inline-block relative mb-20 section-title shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            About &amp; Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            {/* Card 1: Family Unity */}
            <article className="angled-card border-2 border-color-black rounded-xl p-6 bg-color-blue shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between transition-all">
              <div>
                <div className="w-12 h-12 rounded-lg bg-color-white border-2 border-color-black flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <i className="ri-home-heart-line"></i>
                </div>
                <h3 className="font-primary text-2xl md:text-3xl font-normal mb-3">
                  Family Unity First
                </h3>
                <p className="text-color-black/85 leading-relaxed text-sm md:text-base">
                  We believe a child's well-being should never come at the cost of separation from
                  parents. Daytime care allows mothers to work while ensuring children return home
                  each evening.
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-color-black/20 text-xs md:text-sm font-semibold space-y-1.5">
                <li>
                  <i className="ri-check-line font-bold text-green-700 mr-1"></i> Morning reception
                  &amp; check-in
                </li>
                <li>
                  <i className="ri-check-line font-bold text-green-700 mr-1"></i> Evening happy
                  reunification
                </li>
              </ul>
            </article>

            {/* Card 2: Holistic Care & Nutrition */}
            <article className="angled-card border-2 border-color-black rounded-xl p-6 bg-color-yellow shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between transition-all">
              <div>
                <div className="w-12 h-12 rounded-lg bg-color-white border-2 border-color-black flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <i className="ri-restaurant-line"></i>
                </div>
                <h3 className="font-primary text-2xl md:text-3xl font-normal mb-3">
                  Holistic Nutrition
                </h3>
                <p className="text-color-black/85 leading-relaxed text-sm md:text-base">
                  Nutrition is the foundation of cognitive and physical development. We provide
                  balanced, fortified meals daily so hunger never interferes with a child's dream
                  or learning.
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-color-black/20 text-xs md:text-sm font-semibold space-y-1.5">
                <li>
                  <i className="ri-check-line font-bold text-green-700 mr-1"></i> Breakfast, hot
                  lunch &amp; dinner
                </li>
                <li>
                  <i className="ri-check-line font-bold text-green-700 mr-1"></i> Pediatric health
                  monitoring
                </li>
              </ul>
            </article>

            {/* Card 3: Maternal Economic Independence */}
            <article className="angled-card border-2 border-color-black rounded-xl p-6 bg-color-green shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between transition-all">
              <div>
                <div className="w-12 h-12 rounded-lg bg-color-white border-2 border-color-black flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <i className="ri-women-line"></i>
                </div>
                <h3 className="font-primary text-2xl md:text-3xl font-normal mb-3">
                  Maternal Empowerment
                </h3>
                <p className="text-color-black/85 leading-relaxed text-sm md:text-base">
                  A mother's economic independence is the greatest safeguard against poverty. We
                  provide micro-loans, vocational training, and business mentorship for
                  self-reliance.
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-color-black/20 text-xs md:text-sm font-semibold space-y-1.5">
                <li>
                  <i className="ri-check-line font-bold text-green-700 mr-1"></i> Revolving
                  micro-credit loans
                </li>
                <li>
                  <i className="ri-check-line font-bold text-green-700 mr-1"></i> Skills training in
                  coffee &amp; sewing
                </li>
              </ul>
            </article>
          </div>

          {/* Founder Quote Banner */}
          <div className="w-full border-2 border-color-black rounded-xl p-6 md:p-8 bg-color-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full border-2 border-color-black overflow-hidden flex-shrink-0 bg-color-yellow shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <img
                src="/assets/img/testimonial-profile-2.png"
                alt="Sister Sirgutemikael Teklu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="font-primary text-2xl md:text-3xl italic text-color-black leading-snug">
                “No child should ever be left behind while their mother works. No mother should lose
                her child to poverty.”
              </p>
              <p className="mt-2 text-sm md:text-base font-bold text-color-black/75">
                Sister Sirgutemikael Teklu (MSc Public Health) — Founder &amp; Executive Director
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2025–2026 STRATEGIC TARGET ==================== */}
      <section className="py-16 px-6 bg-color-cream/40 border-y-2 border-color-black">
        <div className="max-w-[1100px] mx-auto">
          <div className="border-2 border-color-black rounded-xl p-6 md:p-10 bg-color-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <div className="inline-flex items-center gap-2 bg-color-yellow border-2 border-color-black rounded-lg px-3.5 py-1 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <i className="ri-flag-2-line"></i> {liveStats.targetYear} Strategic Expansion Goals
              </div>
            </div>

            <h3 className="font-primary text-3xl md:text-4xl font-normal mb-6">
              Empowering Children &amp; Mothers in Legatafo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Progress Item 1 */}
              <div className="border-2 border-color-black rounded-lg p-4 bg-color-blue/20">
                <div className="flex justify-between items-center font-bold text-sm md:text-base mb-2">
                  <span>
                    <i className="ri-user-smile-line mr-1 text-blue-700"></i> Children Supported
                    Daily
                  </span>
                  <span>Active Care Program</span>
                </div>
                <p className="text-xs text-color-black/75 mt-1">
                  Providing 3 nutritious meals, early education, and daytime shelter.
                </p>
              </div>

              {/* Progress Item 2 */}
              <div className="border-2 border-color-black rounded-lg p-4 bg-color-yellow/20">
                <div className="flex justify-between items-center font-bold text-sm md:text-base mb-2">
                  <span>
                    <i className="ri-women-line mr-1 text-yellow-700"></i> Mothers Reached with
                    Support
                  </span>
                  <span>Empowerment Initiative</span>
                </div>
                <p className="text-xs text-color-black/75 mt-1">
                  Providing micro-loans, vocational training, and business mentorship.
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-color-black/75 flex items-center gap-2 pt-4 border-t-2 border-color-black/20">
              <i className="ri-shield-check-line text-lg text-green-700"></i>
              <span>
                Every single donation directly funds nutritious meals, educational supplies, and
                maternal micro-grants.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ==================== PROGRAMS & WAYS TO SUPPORT ==================== */}
      <section className="py-24 px-6" id="programs">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <h2 className="font-primary text-4xl md:text-5xl font-normal bg-color-yellow px-4 py-1.5 border-2 border-color-black rounded-md inline-block relative mb-20 section-title shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            Ways to Get Involved
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            {/* Volunteer Card */}
            <article className="angled-card border-2 border-color-black rounded-xl p-5 bg-color-blue shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center transition-all">
              <div className="w-full aspect-[1.6/1] border-2 border-color-black rounded-lg overflow-hidden bg-white mb-5 p-4 flex items-center justify-center">
                <img
                  src="/assets/img/volunteer.svg"
                  alt="Volunteer"
                  className="max-h-full object-contain"
                />
              </div>
              <h3 className="font-primary text-2xl font-normal mb-2">Become a Volunteer</h3>
              <p className="text-sm text-color-black/85 mb-4">
                Share your skills in teaching, art, pediatric healthcare, or recreational
                activities with our children.
              </p>
              <a
                href="#contact"
                className="mt-auto btn-brutal bg-color-white text-color-black font-bold px-4 py-2 border-2 border-color-black rounded-lg text-sm"
              >
                Apply to Volunteer
              </a>
            </article>

            {/* Fundraiser Card */}
            <article className="angled-card border-2 border-color-black rounded-xl p-5 bg-color-yellow shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center transition-all">
              <div className="w-full aspect-[1.6/1] border-2 border-color-black rounded-lg overflow-hidden bg-white mb-5 p-4 flex items-center justify-center">
                <img
                  src="/assets/img/fundraiser.svg"
                  alt="Fundraise"
                  className="max-h-full object-contain"
                />
              </div>
              <h3 className="font-primary text-2xl font-normal mb-2">Host a Campaign</h3>
              <p className="text-sm text-color-black/85 mb-4">
                Mobilize your family, company, or diaspora network to sponsor classrooms and safe
                house units.
              </p>
              <a
                href="#contact"
                className="mt-auto btn-brutal bg-color-white text-color-black font-bold px-4 py-2 border-2 border-color-black rounded-lg text-sm"
              >
                Start a Campaign
              </a>
            </article>

            {/* Child Sponsorship Card */}
            <article className="angled-card border-2 border-color-black rounded-xl p-5 bg-color-green shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center transition-all">
              <div className="w-full aspect-[1.6/1] border-2 border-color-black rounded-lg overflow-hidden bg-white mb-5 p-4 flex items-center justify-center">
                <img
                  src="/assets/img/gifts.svg"
                  alt="Gifts and Donations"
                  className="max-h-full object-contain"
                />
              </div>
              <h3 className="font-primary text-2xl font-normal mb-2">Child Sponsorship</h3>
              <p className="text-sm text-color-black/85 mb-4">
                Direct 1:1 sponsorship ensuring full-year nutrition, textbooks, uniform, and
                maternal vocational mentorship.
              </p>
              <a
                href="#donate"
                className="mt-auto btn-brutal bg-color-black text-color-white font-bold px-4 py-2 border-2 border-color-black rounded-lg text-sm"
              >
                Sponsor Now
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ==================== PARTNERS MARQUEE ==================== */}
      <section className="py-14 bg-color-yellow border-y-2 border-color-black overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 mb-6 text-center">
          <h3 className="font-primary text-3xl font-normal">Our Dedicated Partners &amp; Supporters</h3>
        </div>

        {/* Track 1: Forward */}
        <div className="overflow-hidden w-full mb-4">
          <div className="marquee-track">
            <span className="inline-flex items-center gap-2 bg-color-white border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-hand-heart-line text-lg"></i> Health Alliance
            </span>
            <span className="inline-flex items-center gap-2 bg-color-white border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-bank-line text-lg"></i> Commercial Bank of Ethiopia
            </span>
            <span className="inline-flex items-center gap-2 bg-color-white border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-graduation-cap-line text-lg"></i> EduTech Africa
            </span>
            <span className="inline-flex items-center gap-2 bg-color-white border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-community-line text-lg"></i> Mothers United
            </span>
            <span className="inline-flex items-center gap-2 bg-color-white border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-restaurant-line text-lg"></i> Food For All Network
            </span>
            <span className="inline-flex items-center gap-2 bg-color-white border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-home-heart-line text-lg"></i> ChildCare Network
            </span>
            <span className="inline-flex items-center gap-2 bg-color-white border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-leaf-line text-lg"></i> Green Growth Initiative
            </span>
            {/* Duplicates for infinite scroll */}
            <span className="inline-flex items-center gap-2 bg-color-white border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-hand-heart-line text-lg"></i> Health Alliance
            </span>
            <span className="inline-flex items-center gap-2 bg-color-white border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-bank-line text-lg"></i> Commercial Bank of Ethiopia
            </span>
            <span className="inline-flex items-center gap-2 bg-color-white border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-graduation-cap-line text-lg"></i> EduTech Africa
            </span>
            <span className="inline-flex items-center gap-2 bg-color-white border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-community-line text-lg"></i> Mothers United
            </span>
          </div>
        </div>

        {/* Track 2: Reverse */}
        <div className="overflow-hidden w-full">
          <div className="marquee-track marquee-track-reverse">
            <span className="inline-flex items-center gap-2 bg-color-green border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-hospital-line text-lg"></i> Saint Mary Hospital
            </span>
            <span className="inline-flex items-center gap-2 bg-color-green border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-team-line text-lg"></i> Hope Foundation
            </span>
            <span className="inline-flex items-center gap-2 bg-color-green border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-global-line text-lg"></i> Global Relief Network
            </span>
            <span className="inline-flex items-center gap-2 bg-color-green border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-book-open-line text-lg"></i> Learning Bridge
            </span>
            <span className="inline-flex items-center gap-2 bg-color-green border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-shield-check-line text-lg"></i> Safe Kids Org
            </span>
            {/* Duplicates */}
            <span className="inline-flex items-center gap-2 bg-color-green border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-hospital-line text-lg"></i> Saint Mary Hospital
            </span>
            <span className="inline-flex items-center gap-2 bg-color-green border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-team-line text-lg"></i> Hope Foundation
            </span>
            <span className="inline-flex items-center gap-2 bg-color-green border-2 border-color-black px-4 py-2 rounded-lg font-bold text-sm btn-brutal">
              <i className="ri-global-line text-lg"></i> Global Relief Network
            </span>
          </div>
        </div>
      </section>

      {/* ==================== DUAL ROW PHOTO GALLERY ==================== */}
      <section className="py-24 px-6 overflow-hidden" id="gallery">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center mb-12">
          <h2 className="font-primary text-4xl md:text-5xl font-normal bg-color-yellow px-4 py-1.5 border-2 border-color-black rounded-md inline-block relative mb-8 section-title shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            Life at ASKBTM Center
          </h2>
          <p className="text-center text-sm md:text-base text-color-black/80 max-w-xl">
            Click any photo to zoom in. Real smiles, real nourishment, and real growth at our
            Legatafo center.
          </p>
        </div>

        {/* Row 1 */}
        <div className="overflow-hidden w-full mb-6">
          <div className="marquee-track">
            {GALLERY_ROW_1.map((item, idx) => (
              <div
                key={`r1-${idx}`}
                onClick={() => setLightboxImg(item)}
                className="gallery-thumb w-64 md:w-80 h-48 md:h-56 border-2 border-color-black rounded-lg overflow-hidden flex-shrink-0 bg-white"
              >
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="overflow-hidden w-full">
          <div className="marquee-track marquee-track-reverse">
            {GALLERY_ROW_2.map((item, idx) => (
              <div
                key={`r2-${idx}`}
                onClick={() => setLightboxImg(item)}
                className="gallery-thumb w-64 md:w-80 h-48 md:h-56 border-2 border-color-black rounded-lg overflow-hidden flex-shrink-0 bg-white"
              >
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-24 px-6 bg-color-cream/40 border-y-2 border-color-black" id="testimonial">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <h2 className="font-primary text-4xl md:text-5xl font-normal bg-color-yellow px-4 py-1.5 border-2 border-color-black rounded-md inline-block relative mb-20 section-title shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            Voices of Impact
          </h2>

          <div className="w-full max-w-3xl flex flex-col gap-6">
            <article className="border-2 border-color-black rounded-xl p-8 flex flex-col gap-4 bg-color-blue relative btn-brutal">
              <div className="absolute top-5 left-6 text-7xl font-primary leading-none opacity-20">"</div>
              <p className="text-lg md:text-xl leading-relaxed italic pl-6 text-color-black/90">
                “Thanks to Freminatos, I now earn 450 ETB net daily selling vegetables. My children
                eat three meals every day and learn English. I return home with pride, not worry.”
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="h-0.5 flex-1 bg-color-black"></div>
                <h3 className="font-primary text-xl font-normal">
                  Selamawit Gebreyes, Mother of Three (Legatafo)
                </h3>
              </div>
            </article>

            <article className="border-2 border-color-black rounded-xl p-8 flex flex-col gap-4 bg-color-yellow relative btn-brutal">
              <div className="absolute top-5 left-6 text-7xl font-primary leading-none opacity-20">"</div>
              <p className="text-lg md:text-xl leading-relaxed italic pl-6 text-color-black/90">
                “Before, my stomach hurt every night. Now I eat porridge, injera, shiro, and fruit.
                Teacher Ruth says if I keep reading, I can fly airplanes. I believe her!”
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="h-0.5 flex-1 bg-color-black"></div>
                <h3 className="font-primary text-xl font-normal">
                  Elias Tadesse, age 6 (Day Care Student)
                </h3>
              </div>
            </article>

            <article className="border-2 border-color-black rounded-xl p-8 flex flex-col gap-4 bg-color-green relative btn-brutal">
              <div className="absolute top-5 left-6 text-7xl font-primary leading-none opacity-20">"</div>
              <p className="text-lg md:text-xl leading-relaxed italic pl-6 text-color-black/90">
                “I audited pediatric wards across East Africa. Freminatos achieves what few dare
                attempt: zero severe acute malnutrition in 5 consecutive years. That is medicine
                without borders.”
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="h-0.5 flex-1 bg-color-black"></div>
                <h3 className="font-primary text-xl font-normal">
                  Dr. Henrik Larsen, Pediatrician &amp; Monthly Supporter
                </h3>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ==================== BANK TRANSFER & GIVING TIERS ==================== */}
      <section className="py-24 px-6" id="donate">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <h2 className="font-primary text-4xl md:text-5xl font-normal bg-color-yellow px-4 py-1.5 border-2 border-color-black rounded-md inline-block relative mb-20 section-title shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            Bank Transfer &amp; Giving
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-5xl">
            {/* Bank Coordinates Box */}
            <div className="lg:col-span-7 border-2 border-color-black rounded-xl p-6 md:p-8 bg-color-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 bg-color-green border-2 border-color-black rounded-md px-3 py-1 font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <i className="ri-bank-card-line"></i> Official Account
                </span>
                <span className="text-xs text-color-black/70 font-semibold">CBE Lideta Main Branch</span>
              </div>

              <h3 className="font-primary text-3xl font-normal mb-2">Commercial Bank of Ethiopia</h3>
              <p className="text-sm text-color-black/80 mb-6">
                Account Name: <strong>Freminatos Children and Mothers' Resource Center</strong>
              </p>

              {/* Giving Impact Buttons */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                  <i className="ri-heart-pulse-fill text-red-500 mr-1"></i> Choose Giving Level:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {IMPACT_TIERS.map((tier) => (
                    <button
                      key={tier.code}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`impact-tier-btn border-2 border-color-black rounded-lg p-2.5 text-center btn-brutal ${
                        selectedTier.code === tier.code ? 'bg-color-yellow' : 'bg-white'
                      }`}
                    >
                      <span className="block text-lg font-bold font-primary">{tier.amount}</span>
                      <span className="block text-[11px] font-semibold text-color-black/80">
                        {tier.sub}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-color-cream border-2 border-color-black rounded-lg text-xs md:text-sm font-medium">
                  <strong>Impact:</strong> <span>{selectedTier.purpose} ({selectedTier.fullAmount})</span>
                </div>
              </div>

              {/* Transfer Credentials with Copy Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 border-2 border-color-black rounded-lg bg-color-blue/25 flex items-center justify-between">
                  <div>
                    <span className="block text-xs uppercase font-bold text-color-black/70">SWIFT / BIC</span>
                    <strong className="text-base tracking-wider font-mono">CBETETAA</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('CBETETAA', 'swift')}
                    className="px-2.5 py-1.5 text-xs bg-white border-2 border-color-black rounded font-bold btn-brutal"
                  >
                    {copiedKey === 'swift' ? (
                      <span className="text-green-700">
                        <i className="ri-check-line"></i> Copied!
                      </span>
                    ) : (
                      <>
                        <i className="ri-file-copy-line"></i> Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 border-2 border-color-black rounded-lg bg-color-green/25 flex items-center justify-between">
                  <div>
                    <span className="block text-xs uppercase font-bold text-color-black/70">Account Number</span>
                    <strong className="text-base tracking-wider font-mono">0171855001900</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('0171855001900', 'account')}
                    className="px-2.5 py-1.5 text-xs bg-white border-2 border-color-black rounded font-bold btn-brutal"
                  >
                    {copiedKey === 'account' ? (
                      <span className="text-green-700">
                        <i className="ri-check-line"></i> Copied!
                      </span>
                    ) : (
                      <>
                        <i className="ri-file-copy-line"></i> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Auto Tracking Reference Generator */}
              <div className="p-4 border-2 border-color-black rounded-lg bg-color-yellow/20 mb-6">
                <label htmlFor="donorNameInput" className="block text-xs font-bold uppercase mb-1.5">
                  <i className="ri-barcode-line mr-1"></i> Auto-Tracking Reference Generator:
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    id="donorNameInput"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter your name (e.g. Abebe Kebede)"
                    className="flex-1 px-3 py-2 border-2 border-color-black rounded-md text-sm font-medium outline-none"
                  />
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 border-2 border-color-black rounded-md">
                    <code className="text-xs font-bold font-mono">{referenceCode}</code>
                    <button
                      type="button"
                      onClick={() => handleCopy(referenceCode, 'ref')}
                      className="px-2 py-1 text-xs bg-color-yellow border border-color-black rounded font-bold hover:bg-yellow-300"
                    >
                      {copiedKey === 'ref' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <small className="block text-[11px] text-color-black/70 mt-1.5">
                  Add this code to your bank transfer memo to receive your official tax receipt within 72 hours.
                </small>
              </div>

              {/* PDF Download Link */}
              <a
                href="/assets/document/freminatos children and mothers’ resource center.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center block py-3 bg-color-white text-color-black border-2 border-color-black rounded-lg font-bold text-sm btn-brutal"
              >
                <i className="ri-file-download-line mr-1"></i> Download Official Bank Details PDF (3 Pages)
              </a>
            </div>

            {/* International & Card Giving Box */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* International Correspondent Routing */}
              <div className="border-2 border-color-black rounded-xl p-6 bg-color-blue shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-primary text-2xl font-normal mb-3">International Wire Transfer</h4>
                <p className="text-xs md:text-sm text-color-black/80 leading-relaxed mb-4">
                  Accepted currencies: <strong>ETB · USD · EUR · GBP · CAD</strong>. Auto-converted at CBE central rate with zero hidden spread.
                </p>
                <ul className="text-xs space-y-2 font-medium">
                  <li className="bg-white/70 p-2 rounded border border-color-black">
                    <strong>USA:</strong> Citibank N.A., New York (SWIFT <code className="font-bold">CITIUS33</code>)
                  </li>
                  <li className="bg-white/70 p-2 rounded border border-color-black">
                    <strong>Europe:</strong> Commerzbank AG, Frankfurt (SWIFT <code className="font-bold">COBADEFF</code>)
                  </li>
                  <li className="bg-white/70 p-2 rounded border border-color-black">
                    <strong>UK:</strong> Barclays Bank PLC, London (SWIFT <code className="font-bold">BARCGB22</code>)
                  </li>
                </ul>
              </div>

              {/* Online Payment Redirect */}
              <div className="border-2 border-color-black rounded-xl p-6 bg-color-yellow shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-primary text-2xl font-normal mb-2">Online Card Donations</h4>
                  <p className="text-xs md:text-sm text-color-black/85 mb-4">
                    For secure instant contributions using Visa, Mastercard, or Telebirr via our verified partner platform.
                  </p>
                  <div className="flex justify-center gap-3 text-3xl mb-4">
                    <i className="ri-visa-line"></i>
                    <i className="ri-mastercard-line"></i>
                    <i className="ri-bank-card-2-line"></i>
                  </div>
                </div>
                <a
                  href="https://www.wegenfund.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal bg-color-black text-color-white py-3 px-6 rounded-lg font-bold text-sm block"
                >
                  Proceed to Secure Gateway <i className="ri-external-link-line ml-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="py-20 px-6 bg-color-cream/40 border-t-2 border-color-black" id="faq">
        <div className="max-w-[900px] mx-auto flex flex-col items-center">
          <h2 className="font-primary text-4xl md:text-5xl font-normal bg-color-yellow px-4 py-1.5 border-2 border-color-black rounded-md inline-block relative mb-16 section-title shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            Frequently Asked Questions
          </h2>

          <div className="w-full flex flex-col gap-4">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`faq-item border-2 border-color-black rounded-xl p-5 bg-color-white btn-brutal ${
                    isOpen ? 'active' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="faq-question w-full flex justify-between items-center text-left font-primary text-xl md:text-2xl font-normal"
                  >
                    <span>{faq.q}</span>
                    <span className="faq-icon text-2xl font-bold transition-transform">
                      <i className={`ri-${isOpen ? 'subtract-line' : 'add-line'}`}></i>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="text-color-black/85 text-sm md:text-base leading-relaxed pt-4 pb-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT & MAP SECTION ==================== */}
      <section className="py-24 px-6" id="contact">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <h2 className="font-primary text-4xl md:text-5xl font-normal bg-color-yellow px-4 py-1.5 border-2 border-color-black rounded-md inline-block relative mb-20 section-title shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            Get in Touch
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
            {/* Contact Form Box */}
            <div className="lg:col-span-7 border-2 border-color-black rounded-xl p-6 md:p-8 bg-color-blue shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-primary text-3xl font-normal mb-2">Send Us a Direct Message</h3>
              <p className="text-sm text-color-black/80 mb-6">
                Inquiries regarding child enrollment, sponsorships, volunteer opportunities, and partnerships.
              </p>

              {/* Success Banner */}
              {formSuccess && (
                <div className="mb-6 p-4 bg-color-green border-2 border-black rounded-xl text-black font-bold text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                  <i className="ri-checkbox-circle-fill text-xl"></i>
                  <span>{formSuccess}</span>
                </div>
              )}

              {/* Error Banner */}
              {formError && (
                <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 rounded-xl text-red-800 font-bold text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                  <i className="ri-error-warning-fill text-xl"></i>
                  <span>{formError}</span>
                </div>
              )}

              {/* WhatsApp Quick Connect Pill */}
              <div className="mb-6 p-3.5 bg-color-white border-2 border-black rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-lg">
                    <i className="ri-whatsapp-fill"></i>
                  </span>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider">Prefer Instant Messaging?</strong>
                    <span className="text-xs text-black/75">Chat directly with Sister Sirgutemikael &amp; team</span>
                  </div>
                </div>
                <a
                  href="https://wa.me/251911892787?text=Hello%20Sister%20Sirgutemikael%2C%20I%20am%20reaching%20out%20from%20the%20ASKBTM%20website%20regarding..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-color-green text-black border-2 border-black rounded-lg text-xs font-bold btn-brutal inline-flex items-center gap-1.5 hover:bg-green-300"
                >
                  <i className="ri-whatsapp-line text-sm"></i>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Abebe Kebede"
                      className="w-full px-4 py-3 bg-white border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+251 911 23 45 67"
                      className="w-full px-4 py-3 bg-white border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-white border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold uppercase mb-1">
                      Inquiry Topic *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                    >
                      <option value="Donation & Sponsorship">Donation &amp; Sponsorship</option>
                      <option value="Volunteer Work">Volunteer Opportunity</option>
                      <option value="Child Enrollment">Child Enrollment</option>
                      <option value="Center Tour & Visit">Center Tour &amp; Visit Request</option>
                      <option value="Corporate Partnership">Corporate Partnership</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="How can we assist you or collaborate?"
                    className="w-full px-4 py-3 bg-white border-2 border-color-black rounded-lg text-sm font-medium outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 bg-color-black text-color-white font-bold rounded-lg border-2 border-color-black text-base btn-brutal flex items-center justify-center gap-2 hover:bg-neutral-800 disabled:opacity-60"
                >
                  {formLoading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message Directly</span>
                      <i className="ri-send-plane-fill"></i>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Details & Map Embed */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Contact Info Card */}
              <div className="border-2 border-color-black rounded-xl p-6 bg-color-yellow shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                <div className="flex items-start gap-3">
                  <i className="ri-map-pin-line text-2xl flex-shrink-0 text-red-600"></i>
                  <div>
                    <h4 className="font-bold text-sm">Center Location</h4>
                    <p className="text-xs text-color-black/80">
                      Legatafo Town (10 km east of Addis Ababa), P.O. Box 20461
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-phone-line text-2xl flex-shrink-0 text-green-700"></i>
                  <div>
                    <h4 className="font-bold text-sm">Direct Phone &amp; WhatsApp</h4>
                    <a href="tel:+251911892787" className="text-xs font-bold hover:underline">
                      +251 911 89 27 87
                    </a>
                    <p className="text-[11px] text-color-black/70">Sister Sirgutemikael (24/7)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-mail-line text-2xl flex-shrink-0 text-blue-700"></i>
                  <div>
                    <h4 className="font-bold text-sm">Email Address</h4>
                    <a
                      href="mailto:freminatos.center@gmail.com"
                      className="text-xs font-bold hover:underline"
                    >
                      freminatos.center@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="border-2 border-color-black rounded-xl overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex-1 min-h-[220px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3939.5712172329654!2d38.94571!3d9.102767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMDYnMTAuMCJOIDM4wrA1Nic0NC42IkU!5e0!3m2!1sen!2set!4v1762429431323!5m2!1sen!2set"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '240px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== GALLERY LIGHTBOX MODAL ==================== */}
      {lightboxImg && (
        <div className="lightbox active">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-40"
            onClick={() => setLightboxImg(null)}
          ></div>
          <div className="relative z-50 max-w-4xl max-h-[85vh] p-4 flex flex-col items-center">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-color-yellow transition-colors"
              aria-label="Close Lightbox"
            >
              <i className="ri-close-circle-fill"></i>
            </button>
            <img
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              className="max-w-full max-h-[75vh] object-contain rounded-xl border-2 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.4)]"
            />
            <p className="text-white text-sm md:text-base font-medium mt-3 text-center">
              {lightboxImg.alt || 'ASKBTM Center - Legatafo, Ethiopia'}
            </p>
          </div>
        </div>
      )}

      {/* Scroll to Top / Back Up Button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 bg-color-yellow text-color-black p-3.5 rounded-full shadow-lg border-2 border-black transition-all duration-300 hover:scale-110 btn-brutal flex items-center justify-center ${
          showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <i className="ri-arrow-up-line text-xl font-bold"></i>
      </button>
    </>
  );
}
