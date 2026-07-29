'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { IMAGES } from '@/data';
import { Reveal } from '@/components/Primitives';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  // 1. Track scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  // 2. Animate the slant perfectly over the sticky hero
  const clipY = useTransform(scrollYProgress, [0, 1], [0, 7]);
  const dynamicClipPath = useMotionTemplate`polygon(0 ${clipY}vw, 100% 0, 100% 100%, 0 100%)`;

  const baseCities = ['☑ Basel', 'Manila.', '▤ monaco', 'oslo.', 'SAVANNAH'];
  const marqueeItems = [...baseCities, ...baseCities, ...baseCities, ...baseCities, ...baseCities, ...baseCities];

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      // z-30 is crucial here so it slides OVER the Hero section
      className="relative z-30 bg-white text-black -mt-[7vw] pb-24 md:pb-32 overflow-hidden"
      style={{
        clipPath: dynamicClipPath,
        paddingTop: 'calc(7vw + 4rem)',
      }}
    >
      
      {/* ── Top Header Row with the thin straight border from the image ── */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="w-full border-t border-black/15 pt-6 mb-16 md:mb-32 flex justify-between md:grid md:grid-cols-3 items-start text-[11px] font-semibold tracking-wide uppercase text-black">
          <div className="flex items-center gap-1">
            <span className="text-[10px]">✦</span>
            <span>(01)</span>
          </div>
          <div className="hidden md:block text-center">
            <span>(About Us)</span>
          </div>
          <div className="text-right text-black md:text-black/80">
            <span className="md:hidden">(About Us)</span>
            <span className="hidden md:inline">© 2025</span>
          </div>
        </div>
      </div>

      {/* ── Huge Headline (Centered & Balanced like Desktop Image) ── */}
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 mb-20 md:mb-40">
        <Reveal>
          <h2 className="font-display text-[2.4rem] leading-[1.05] md:text-6xl lg:text-[5.5rem] font-medium md:leading-[0.95] tracking-tighter text-left md:text-center text-balance text-black">
            <span className="inline-block ml-[20vw] md:ml-0">Design-</span>
            <br className="md:hidden" />
            forward impressive agency crafting bold visuals, structured
            layouts, and high-impact digital 3D Swiss inspired by modern
            aesthetics®.
          </h2>
        </Reveal>
      </div>

      {/* ── Split Layout Grid (Image + Text) ── */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* LEFT: Portrait Image */}
        <div className="lg:col-span-4 lg:col-start-2">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)]">
              <img
                src={IMAGES.aboutMan}
                alt="Fuel creative at work"
                className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        {/* RIGHT: Text Content & Stats */}
        <div className="lg:col-span-5 lg:col-start-7 flex flex-col gap-10 md:gap-16">
          <Reveal delay={100}>
            <div className="flex flex-col md:flex-row gap-2 md:gap-10 items-start">
              <span className="text-[11px] font-semibold tracking-wide md:w-1/4 text-black">
                (Pre)
              </span>
              <p className="text-[14px] md:text-[14px] leading-relaxed text-black/70 md:w-3/4">
                Igniting ideas with precision and intentional design. Fuel
                transforms raw creativity into structured visual systems that
                shape brands and elevate digital experiences.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-col md:flex-row gap-2 md:gap-10 items-start">
              <span className="text-[11px] font-semibold tracking-wide md:w-1/4 text-black">
                (+Post)
              </span>
              <p className="text-[14px] md:text-[14px] leading-relaxed text-black/70 md:w-3/4">
                Driven by bold aesthetics and functional simplicity. Fuel blends
                modern form with purposeful detail, delivering refined
                experiences that push brands forward.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col md:flex-row gap-2 md:gap-10 items-start">
              <span className="text-[11px] font-semibold tracking-wide md:w-1/4 md:pt-3 text-black">
                (=Results)
              </span>
              <div className="w-full md:w-3/4 flex flex-col mt-2 md:mt-0">
                <div className="flex justify-between items-center py-3 border-b border-black/15">
                  <span className="text-[12px] font-semibold text-black">New clients</span>
                  <span className="text-[12px] text-black/50">15</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/15">
                  <span className="text-[12px] font-semibold text-black">Success rate</span>
                  <span className="text-[12px] text-black/50">100%</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-col md:flex-row gap-2 md:gap-10 items-start mt-2">
              <span className="md:w-1/4 hidden md:block"></span>
              <div className="w-full md:w-3/4">
                <a
                  href="#portfolio"
                  className="group flex justify-between items-center w-full max-w-full md:max-w-[260px] border-b border-black/20 pb-2 hover:border-black transition-colors text-black"
                >
                  <span className="text-[13px] font-semibold tracking-wide">
                    Explore Now
                  </span>
                  <span className="text-[14px] leading-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Infinite Continuous Marquee (Bottom) ── */}
      <div className="mt-20 md:mt-32 w-full overflow-hidden flex relative">
        <motion.div 
          className="flex gap-4 pr-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35, 
          }}
        >
          {marqueeItems.map((city, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 bg-[#F7F7F7] rounded-xl flex items-center justify-center w-40 md:w-64 aspect-[2.2/1]"
            >
              <span className="font-display font-bold tracking-tight text-[15px] md:text-lg text-black">
                {city}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}