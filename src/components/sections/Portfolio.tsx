'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { IMAGES } from '@/data';

// ─── STACKED CARD SUB-COMPONENT ────────────────────────────────────────────────
interface StackedCardProps {
  p: any;
  index: number;
}

function StackedCard({ p, index }: StackedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track the scroll relative to this specific card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    // Start tracking when the card sticks (15% from top).
    // End tracking far past the viewport (-300%) so the scale continues 
    // to smoothly shrink as more cards pile on top!
    offset: ['start 15%', 'start -300%'], 
  });

  // Buttery soft spring physics for the premium feel
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, // Lower stiffness for a floatier, elegant glide
    damping: 20, 
    restDelta: 0.001 
  });

  // 1. Shrinks continuously down to 0.85 the further back it gets stacked
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.85]);
  
  // 2. Subtle dimming keeps the colors vibrant but pushes it to the background
  const opacity = useTransform(smoothProgress, [0, 1], [1, 0.65]);
  
  // 3. Fades the text perfectly as the NEXT card slides over it
  const textOpacity = useTransform(smoothProgress, [0, 0.1, 0.2], [1, 1, 0]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full mb-[50vh] last:mb-[30vh]"
      style={{
        // 24px increments create that tight, perfect stair-step top edge
        top: `calc(15vh + ${index * 24}px)`, 
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          transformOrigin: 'top center',
        }}
        className="flex flex-col transform-gpu"
      >
        {/* ── 1. The Main Image Card Container ── */}
        <a
          href="#contact"
          className="group relative w-full aspect-[1.4/1] md:aspect-[1.6/1] overflow-hidden rounded-[24px] bg-[#F7F7F7] block transform-gpu border border-black/[0.04] shadow-[0_-15px_30px_rgba(0,0,0,0.06)]"
        >
          {/* Milky Blurred Background - zooms slowly on hover */}
          <img
            src={p.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-[45px] scale-110 opacity-80 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125 transform-gpu"
            aria-hidden="true"
          />

          {/* Sharp Center Image - zooms and lifts on hover */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[55%] aspect-[16/10] overflow-hidden rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-white/5">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </a>

        {/* ── 2. Bottom Info Row (Animated to fade out) ── */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="flex items-start justify-between text-ink mt-5 px-2"
        >
          <span className="text-[11px] font-semibold tracking-wide w-16 text-ink">
            ({p.id})
          </span>
          
          <div className="flex-1 text-center">
            <h3 className="font-display text-[15.5px] font-semibold leading-none text-ink">
              {p.title}
            </h3>
            <p className="mt-1.5 text-[11px] tracking-wide text-ink/50">
              {p.tag}
            </p>
          </div>
          
          <span className="text-[11px] font-semibold tracking-wide w-16 text-right text-ink/80">
            © 2025
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── MAIN PORTFOLIO SECTION ────────────────────────────────────────────────────
export function Portfolio() {
  return (
    <section 
      id="portfolio" 
      className="relative z-20 bg-white text-ink pt-8"
    >
      
      {/* ── Top Separator & Header Row ── */}
      <div className="w-full border-t border-ink/15" />

      <div className="grid grid-cols-3 items-start text-[11px] font-semibold tracking-wide uppercase px-6 md:px-10 max-w-[1600px] mx-auto pt-8 mb-24 md:mb-32 text-ink">
        <div className="flex items-center gap-1">
          <span className="text-[9px]">✦</span>
          <span>(02)</span>
        </div>
        <div className="text-center">
          <span>(Portfolio)</span>
        </div>
        <div className="text-right text-ink/80">
          <span>© 2025</span>
        </div>
      </div>
      
      {/* 3-Column Grid */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 flex flex-col lg:flex-row items-start justify-between gap-12 pb-24 md:pb-40">
        
        {/* LEFT COLUMN: Large Title & Link */}
        <div className="lg:w-[22%] lg:sticky lg:top-[18vh] z-10">
          <h2 className="font-display text-7xl md:text-8xl lg:text-[5.5rem] font-medium tracking-tighter leading-[0.85] text-ink">
            FX-25'
          </h2>
          <a
            href="#contact"
            className="mt-12 md:mt-16 w-full max-w-[200px] border-b border-ink/20 pb-3 flex justify-between items-center group hover:border-ink transition-colors text-ink"
          >
            <span className="text-[13px] font-semibold tracking-wide">Join Us Now</span>
            <span className="text-[14px] text-ink/30 group-hover:text-ink transition-colors group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </a>
        </div>

        {/* CENTER COLUMN: The Stacking Deck */}
        <div className="lg:w-[56%] w-full relative z-20">
          {IMAGES.portfolio.map((p, i) => (
            <StackedCard 
              key={p.id} 
              p={p} 
              index={i} 
            />
          ))}
        </div>

        {/* RIGHT COLUMN: Sticky Floating Pill Button */}
        <div className="hidden lg:flex lg:w-[22%] lg:sticky lg:top-[18vh] justify-end z-30">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-2xl bg-[#F9F9F9] p-1.5 pr-5 shadow-[0_8px_20px_rgb(0,0,0,0.06)] hover:scale-105 transition-transform border border-ink/5"
          >
            <img 
              src={IMAGES.ceoPortrait} 
              alt="Profile" 
              className="w-9 h-9 rounded-xl object-cover"
            />
            <span className="text-[12px] font-semibold tracking-wide text-ink">See all (07)</span>
          </a>
        </div>

      </div>
    </section>
  );
}