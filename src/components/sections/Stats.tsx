'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { STATS } from '@/data';
import { Reveal } from '@/components/Primitives';

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  // 1. Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  // 2. Animate the slant perfectly over the previous section
  const clipY = useTransform(scrollYProgress, [0, 1], [0, 7]);
  const dynamicClipPath = useMotionTemplate`polygon(0 ${clipY}vw, 100% 0, 100% 100%, 0 100%)`;

  return (
    <motion.section
      id="stats"
      ref={sectionRef}
      // z-30 ensures it slides smoothly OVER the previous section
      className="relative z-30 bg-white text-black -mt-[7vw] pb-24 md:pb-32 overflow-hidden"
      style={{
        clipPath: dynamicClipPath,
        paddingTop: 'calc(7vw + 4rem)',
      }}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        
        {/* ── Top Header Row (Matched with your reference design) ── */}
        <div className="w-full border-t border-black/15 pt-6 mb-16 md:mb-24 flex justify-between md:grid md:grid-cols-3 items-start text-[11px] font-semibold tracking-wide uppercase text-black">
          <div className="flex items-center gap-1">
            <span className="text-[10px]">✦</span>
            <span>(07)</span>
          </div>
          <div className="hidden md:block text-center">
            <span>(Stats)</span>
          </div>
          <div className="text-right text-black md:text-black/80">
            <span className="md:hidden">(Stats)</span>
            <span className="hidden md:inline">© 2025</span>
          </div>
        </div>

        {/* ── Main Headline ── */}
        <div className="max-w-[1300px] mb-16 md:mb-24">
          <Reveal>
            <h2 className="font-display text-[2.4rem] md:text-6xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight max-w-4xl text-balance text-black">
              Numbers that shape
              <span className="italic font-light text-black/50"> digital presence.</span>
            </h2>
          </Reveal>
        </div>

        {/* ── Stats Grid ── */}
        {/* bg-black/10 acts as the 1px gap/border between grid items */}
        <div className="grid gap-px bg-black/10 rounded-[2rem] overflow-hidden md:grid-cols-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={(i % 2) * 100}>
              <div className="group bg-[#F9F9F9] p-10 md:p-16 lg:p-20 h-full hover:bg-black hover:text-white transition-colors duration-500 flex flex-col justify-center">
                
                {/* Big Number */}
                <p className="font-display text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-medium tracking-tighter leading-none text-black group-hover:text-white transition-colors">
                  {s.value}
                </p>
                
                {/* Label */}
                <p className="mt-6 text-[12px] md:text-[13px] tracking-widest uppercase font-semibold text-black/50 group-hover:text-white/60 transition-colors">
                  {s.label}
                </p>
                
                {/* Description Text */}
                <p className="mt-4 text-[14px] leading-relaxed text-black/70 group-hover:text-white/70 max-w-sm transition-colors">
                  {s.body}
                </p>
                
              </div>
            </Reveal>
          ))}
        </div>
        
      </div>
    </motion.section>
  );
}