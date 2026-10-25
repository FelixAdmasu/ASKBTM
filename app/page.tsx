'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Apple, 
  Activity, 
  Users, 
  CheckCircle, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  ExternalLink
} from 'lucide-react';

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video runs at normal 1.0x speed
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#faf6ed] border-b-2 border-stone-900 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-300 border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917]">
                <Sparkles className="w-3.5 h-3.5 text-stone-900" />
                OFFICIAL NGO INITIATIVE • TIGRAY, ETHIOPIA
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight leading-[1.08]">
                A Sanctuary of Hope, Education &amp; Warm Meals for Every Child.
              </h1>

              <p className="text-stone-700 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                Freminatos Children and Mothers&apos; Resource Center (ASKBTM) provides daily hot nutritional lunches, comprehensive schooling supplies, and vocational training to orphaned youth and widowed mothers across Tigray.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/donate"
                  className="bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#1c1917] transition-all flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-stone-950" />
                  <span>Start Donation Wizard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/portal"
                  className="bg-amber-300 hover:bg-amber-200 text-stone-950 font-black text-sm uppercase tracking-wider px-6 py-4 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#1c1917] transition-all"
                >
                  Donor Portal &rarr;
                </Link>

                <Link
                  href="/support"
                  className="bg-white hover:bg-stone-100 text-stone-900 font-bold text-sm uppercase tracking-wider px-5 py-4 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#1c1917] transition-all"
                >
                  Direct Bank Details
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-600 font-mono">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Gov. Registered NGO #0253</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Direct Bank Transfers (CBE &amp; Telebirr)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Audited Field Ledgers</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-white border-2 border-stone-900 rounded-2xl p-4 shadow-[8px_8px_0px_0px_#1c1917]">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border-2 border-stone-900 bg-stone-100 relative">
                  <img
                    src="/assets/img/home-img-1.png"
                    alt="Children at ASKBTM Resource Center"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to svg illustration
                      (e.target as HTMLImageElement).src = '/assets/img/children learning at askbtm.svg';
                    }}
                  />
                  <div className="absolute bottom-3 left-3 bg-stone-900/90 text-amber-300 text-[11px] font-mono font-bold px-3 py-1 rounded border border-stone-700">
                    Mekelle Resource Center, Tigray
                  </div>
                </div>

                <div className="mt-4 p-4 bg-amber-50 rounded-xl border-2 border-stone-900 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 font-mono">Current Campaign</span>
                    <h3 className="font-black text-sm text-stone-900">Winter Nutrition &amp; School Supplies</h3>
                  </div>
                  <Link
                    href="/donate"
                    className="text-xs font-black uppercase text-amber-700 hover:underline flex items-center gap-1"
                  >
                    Support <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT METRICS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { metric: '1,200+', label: 'Children Supported', detail: 'In primary education & nutrition' },
            { metric: '5,000+', label: 'Hot Meals / Month', detail: 'Prepared daily in community kitchen' },
            { metric: '300+', label: 'Mothers Empowered', detail: 'Vocational craft training cohorts' },
            { metric: '100%', label: 'Direct Field Aid', detail: 'Strict charity accounting oversight' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white p-6 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] text-center"
            >
              <div className="text-3xl sm:text-4xl font-black text-stone-900 font-mono">{item.metric}</div>
              <div className="font-extrabold text-sm text-amber-700 mt-1 uppercase tracking-wide">{item.label}</div>
              <p className="text-xs text-stone-500 mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE PILLARS OF WORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
            Holistic Community Transformation
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 mt-1">Our Core Pillars</h2>
          <p className="text-stone-600 text-sm max-w-xl mx-auto mt-2 font-medium">
            We operate transparent on-the-ground programs that nurture young minds and build generational independence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#fffdfa] p-6 rounded-2xl border-2 border-stone-900 shadow-[5px_5px_0px_0px_#1c1917] space-y-4">
            <div className="w-12 h-12 bg-amber-300 rounded-xl border-2 border-stone-900 flex items-center justify-center">
              <Apple className="w-6 h-6 text-stone-900" />
            </div>
            <h3 className="font-black text-xl text-stone-900">Daily Nutritional Nourishment</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Malnutrition remains one of the largest obstacles to childhood development. We serve balanced hot meals every school day, ensuring every child can focus, learn, and thrive.
            </p>
            <div className="pt-2">
              <Link href="/donate" className="text-xs font-black text-stone-900 underline hover:text-amber-700">
                Fund 1 Month of Lunches ($25) &rarr;
              </Link>
            </div>
          </div>

          <div className="bg-[#fffdfa] p-6 rounded-2xl border-2 border-stone-900 shadow-[5px_5px_0px_0px_#1c1917] space-y-4">
            <div className="w-12 h-12 bg-emerald-300 rounded-xl border-2 border-stone-900 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-stone-900" />
            </div>
            <h3 className="font-black text-xl text-stone-900">Education &amp; School Kits</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              We provide textbooks, stationery, uniform replacements, and afternoon tutoring in reading, mathematics, and English for vulnerable youth across the community.
            </p>
            <div className="pt-2">
              <Link href="/donate" className="text-xs font-black text-stone-900 underline hover:text-amber-700">
                Sponsor a Classroom ($50) &rarr;
              </Link>
            </div>
          </div>

          <div className="bg-[#fffdfa] p-6 rounded-2xl border-2 border-stone-900 shadow-[5px_5px_0px_0px_#1c1917] space-y-4">
            <div className="w-12 h-12 bg-sky-300 rounded-xl border-2 border-stone-900 flex items-center justify-center">
              <Users className="w-6 h-6 text-stone-900" />
            </div>
            <h3 className="font-black text-xl text-stone-900">Mother&apos;s Vocational Independence</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Empowering widowed and single mothers with vocational textile training, micro-grant financing, and cooperative retail support so they can sustainably support their households.
            </p>
            <div className="pt-2">
              <Link href="/donate" className="text-xs font-black text-stone-900 underline hover:text-amber-700">
                Support Mother Cohort ($100) &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SPOTLIGHT (NORMAL SPEED 1.0X) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-10 border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1c1917]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                Field Video Dispatch
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                See Our Daily Programs in Action
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed">
                Experience the smiling faces, classroom engagement, and community meal preparation directly from our Mekelle center.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs uppercase px-4 py-2.5 rounded-lg border border-stone-900 flex items-center gap-1.5"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause Video' : 'Play Video'}</span>
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-200 p-2.5 rounded-lg border border-stone-700"
                  aria-label="Toggle mute"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-video rounded-xl overflow-hidden border-2 border-stone-700 bg-stone-950 relative">
                <video
                  ref={videoRef}
                  id="slowVideo"
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src="/assets/vid/video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* URGENT FIELD CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-200 rounded-2xl p-8 sm:p-12 border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1c1917] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-900 font-extrabold">
              Direct &amp; Transparent Giving
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
              Need to donate directly via CBE or Telebirr?
            </h3>
            <p className="text-xs sm:text-sm text-stone-800 font-medium">
              We provide verified commercial bank account numbers and instantaneous mobile transfer details with official receipts.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/support"
              className="bg-stone-900 hover:bg-stone-800 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] text-center"
            >
              View Bank Accounts
            </Link>
            <Link
              href="/donate"
              className="bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1c1917] text-center"
            >
              Donation Wizard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
