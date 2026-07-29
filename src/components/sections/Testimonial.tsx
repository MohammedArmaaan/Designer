'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '@/data'; // Adjust path if needed

// ─── EXACT DATA FROM YOUR VIDEO ──────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 1,
    quote: "“Fuel delivered with clarity. Their structured workflow and fast turnaround made our redesign launch seamless. They’ve become our trusted partner for every major creative push.”",
    author: "Adrian Velasco",
    role: "NovaLabs / Creative Lead",
    img: IMAGES.aboutMan || 'https://via.placeholder.com/600x800', 
    avatar: IMAGES.ceoPortrait || 'https://via.placeholder.com/150',
    overlayText: "oslo.",
    metrics: {
      val1: "122+", label1: "Success Rate", sub1: "Reliable execution",
      val2: "99%",  label2: "Client Satisfaction", sub2: "Seamless delivery"
    }
  },
  {
    id: 2,
    quote: "“The team understood our vision instantly. Clean replies, flexible timelines, and consistently refined work with punch. Fuel gave our brand the modern edge we were missing.”",
    author: "Gracia Michelle",
    role: "Apple Co. / Senior Lead Engineer",
    img: IMAGES.heroWoman || 'https://via.placeholder.com/600x800',
    avatar: IMAGES.ceoPortrait || 'https://via.placeholder.com/150',
    overlayText: "Manila",
    metrics: {
      val1: "257+", label1: "Success Rate", sub1: "Reliable execution",
      val2: "84%",  label2: "Client Satisfaction", sub2: "Seamless delivery"
    }
  },
  {
    id: 3,
    quote: "“Professional, thoughtful, and incredibly detail-driven. Fuel supported us through multiple product rollouts with steady direction and polished execution. Highly dependable every time.”",
    author: "Kasandra, Leon, Miles",
    role: "Miro One / Team Lead Members",
    img: IMAGES.testimonialWoman || 'https://via.placeholder.com/600x800',
    avatar: IMAGES.ceoPortrait || 'https://via.placeholder.com/150',
    overlayText: "theo",
    metrics: {
      val1: "315+", label1: "Success Rate", sub1: "Reliable execution",
      val2: "94%",  label2: "Client Satisfaction", sub2: "Seamless delivery"
    }
  }
];

export function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  // ─── EXACT ANIMATION VARIANTS FROM VIDEO ───
  // Text slides up smoothly and fades in. Exits quickly.
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  // Image just crossfades gently
  const imageVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative z-20 py-24 md:py-32 bg-white text-black overflow-hidden">
      
      {/* ── Top Header Row ── */}
      <div className="w-full border-t border-black/15" />
      <div className="grid grid-cols-3 items-start text-[11px] font-semibold tracking-wide uppercase px-6 md:px-10 max-w-[1600px] mx-auto pt-8 mb-16 md:mb-24 text-black">
        <div className="flex items-center gap-1">
          <span className="text-[9px]">✦</span>
          <span>(05)</span>
        </div>
        <div className="text-center hidden md:block">
          <span>(Testimonial)</span>
        </div>
        <div className="text-right text-black/80">
          <span>© 2025</span>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: Image & Navigation Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
          
          {/* Crossfading Image Box */}
          <div className="relative overflow-hidden rounded-2xl aspect-[4/5] w-full max-w-sm bg-[#F5F5F5]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                variants={imageVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0"
              >
                <img
                  src={current.img}
                  alt={current.author}
                  className="h-full w-full object-cover"
                />
                {/* Overlay Text (oslo, Manila, theo) */}
                {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-display text-5xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-lg mix-blend-overlay">
                    {current.overlayText}
                  </span>
                </div> */}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls (Matched to video position) */}
          <div className="flex gap-4">
            <button 
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F9F9F9] hover:bg-[#F0F0F0] transition-colors border border-black/5 group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-1">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F9F9F9] hover:bg-[#F0F0F0] transition-colors border border-black/5 group"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Quote, Profile & Metrics */}
        <div className="lg:col-span-8 flex flex-col h-full justify-between pt-2">
          
          {/* Animated Slide-Up Quote */}
          <div className="min-h-[45vh] md:min-h-[40vh] flex items-start">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                variants={textVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="font-display text-4xl md:text-5xl lg:text-[2.5rem] font-medium leading-[1.05] tracking-tight text-balance text-black"
              >
                {current.quote}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Bottom Info Row (Profile on left, Metrics on right) */}
          <div className="mt-12 md:mt-auto flex flex-col lg:flex-row lg:items-center justify-between gap-12 border-t border-black/10 pt-10">
            
            {/* Animated Profile Box */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={current.id}
                variants={textVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-4 bg-[#F9F9F9] border border-black/5 p-3 pr-10 rounded-2xl w-max"
              >
                <img 
                  src={current.avatar} 
                  alt={current.author} 
                  className="h-12 w-12 rounded-xl object-cover" 
                />
                <div>
                  <p className="font-semibold text-[13px] tracking-wide text-black">{current.author}</p>
                  <p className="text-[12px] text-black/50">{current.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Animated Metrics */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={current.id}
                variants={textVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-row gap-12 md:gap-16"
              >
                <Metric 
                  value={current.metrics.val1} 
                  label={current.metrics.label1} 
                  sub={current.metrics.sub1} 
                />
                <Metric 
                  value={current.metrics.val2} 
                  label={current.metrics.label2} 
                  sub={current.metrics.sub2} 
                />
              </motion.div>
            </AnimatePresence>
            
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── SMALL METRIC COMPONENT ────────────────────────────────────────────────────
function Metric({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="flex flex-col">
      <p className="font-display text-4xl lg:text-5xl font-medium tracking-tighter text-black leading-none mb-3">
        {value}
      </p>
      <p className="text-[11px] font-bold tracking-wide text-black mb-0.5">
        {label}
      </p>
      <p className="text-[11px] text-black/50 tracking-wide">
        {sub}
      </p>
    </div>
  );
}