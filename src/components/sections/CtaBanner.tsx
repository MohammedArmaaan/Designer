'use client';

import { motion } from 'framer-motion';
import { IMAGES } from '@/data';

export function CtaBanner() {
  const marqueeText = 'We Are Faster, Better And Cheaper ';
  const scrollingContent = Array(4).fill(marqueeText).join('  —  ');

  return (
    <section className="sticky top-0 h-[calc(100vh+7vw)] w-full overflow-hidden z-0 bg-[#111]">
      
      {/* ── 1. Full Screen Background ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/ctabg.avif" // ✅ Direct public folder path
          alt="Background"
          className="h-full w-full object-cover opacity-70" 
        />
        <div className="absolute inset-0 bg-black/40" /> 
      </div>
      


      {/* ── Wrapper for Centering Content ── */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center pb-[7vw]">
        
        {/* ── 2. Marquee Text ── */}
        <div 
          className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none select-none pb-[7vw]"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 100,
            }}
          >
            <h2 
              className="font-display text-[8vw] md:text-[5rem] lg:text-[7rem] font-medium tracking-tight pr-12 text-white"
              style={{ color: '#ffffff' }}
            >
              {scrollingContent}
            </h2>
            <h2 
              className="font-display text-[8vw] md:text-[5rem] lg:text-[7rem] font-medium tracking-tight pr-12 text-white"
              style={{ color: '#ffffff' }}
            >
              {scrollingContent}
            </h2>
          </motion.div>
        </div>

        {/* ── 3. Center Content (Image + Plus Icons) ── */}
        <div className="relative z-20 flex flex-col items-center justify-center mt-12">
          <div className="relative">
            
            <div className="w-[240px] md:w-[320px] aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] bg-black/20">
              <img
                src={IMAGES.ctaWoman} 
                alt="Start a project"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <span className="absolute -top-10 -left-10 md:-top-16 md:-left-16 text-white/50 text-xl font-light leading-none">+</span>
            <span className="absolute -top-10 -right-10 md:-top-16 md:-right-16 text-white/50 text-xl font-light leading-none">+</span>
            <span className="absolute -bottom-16 -left-10 md:-bottom-24 md:-left-16 text-white/50 text-xl font-light leading-none">+</span>
            <span className="absolute -bottom-16 -right-10 md:-bottom-24 md:-right-16 text-white/50 text-xl font-light leading-none">+</span>
          </div>

          {/* ── 4. Underlined CTA Link ── */}
          <a
            href="#contact"
            className="group mt-12 md:mt-16 flex items-center justify-between w-full max-w-[240px] md:max-w-[280px] border-b border-white/30 pb-3 hover:border-white transition-colors"
          >
            <span className="text-white text-[13px] md:text-[14px] font-semibold tracking-wide">
              Contact Now
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <path d="M2 2H10V10" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}