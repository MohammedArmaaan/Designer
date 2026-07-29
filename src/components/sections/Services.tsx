'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { IMAGES, SERVICES } from '@/data';
import { Reveal } from '@/components/Primitives';

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  // ─── DIAGONAL SCROLL ANIMATION ───
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  const clipY = useTransform(scrollYProgress, [0, 1], [0, 7]);
  const dynamicClipPath = useMotionTemplate`polygon(0 ${clipY}vw, 100% 0, 100% 100%, 0 100%)`;

  const rowImages = [
    IMAGES.portfolio?.[3]?.img || IMAGES.servicesWoman,
    IMAGES.portfolio?.[1]?.img || IMAGES.aboutMan,
    IMAGES.portfolio?.[2]?.img || IMAGES.heroWoman,
    IMAGES.portfolio?.[0]?.img || IMAGES.servicesWoman,
  ];

  return (
    <motion.section
      id="services"
      ref={sectionRef}
      // THE FIX: Changed text to pure white (text-white) 
      className="relative z-20 bg-ink text-white -mt-[7vw]"
      style={{
        clipPath: dynamicClipPath,
        paddingTop: 'calc(7vw + 4rem)',
      }}
    >
      {/* ── Top Separator & Header Row ── */}
      <div className="w-full border-t border-white/15" />

      <div className="grid grid-cols-3 items-start text-[11px] font-semibold tracking-wide uppercase px-6 md:px-10 max-w-[1600px] mx-auto pt-8 mb-20 md:mb-32">
        <div className="flex items-center gap-1">
          <span className="text-[9px]">✦</span>
          <span>(03)</span>
        </div>
        <div className="text-center">
          <span>(Premium Services)</span>
        </div>
        <div className="text-right text-white/70">
          <span>© 2025</span>
        </div>
      </div>

      {/* ── Intro Section (Red Portrait + Huge Text) ── */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pb-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* Left Portrait Image */}
          <Reveal>
            <div className="w-40 md:w-56 lg:w-64 aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl shrink-0">
              <img 
                src={IMAGES.aboutMan} 
                alt="Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Right Huge Text */}
          <Reveal delay={100}>
            <h2 className="font-display-service text-4xl md:text-6xl lg:text-[5.5rem] font-medium leading-[0.95] tracking-tight text-balance pt-2 lg:pt-8 text-white">
              Design-driven studio delivering the structured visuals, refined digital system, and{' '}
              {/* Opacity applied directly to pure white */}
              <span className="text-white/40">high-impact brand experiences shaped by aesthetics & Fuel®.</span>
            </h2>
          </Reveal>
        </div>

        {/* Explore More & Crosshairs Divider */}
        <Reveal delay={200}>
          <div className="flex flex-col md:flex-row items-end justify-between mt-16 md:mt-24 mb-12 gap-8">
            <a
              href="#pricing"
              className="group border-b border-white/30 pb-2 flex justify-between items-center w-full md:w-56 hover:border-white transition-colors"
            >
              <span className="text-[13px] font-semibold tracking-wide text-white">Explore More</span>
            </a>
            
            <div className="hidden md:flex justify-between w-full max-w-3xl text-white/40 font-mono text-xl pr-10">
              <span>+</span>
              <span>+</span>
              <span>+</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Services Grid Rows ── */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pb-24 md:pb-40 overflow-hidden">
        {SERVICES.map((s, i) => (
          // THE ANIMATION FIX: Using whileInView so every row elegantly slides up as you scroll to it!
          <motion.div 
            key={s.n} 
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/15 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-8 group"
          >
            
            {/* 1. HUGE Number */}
            <div className="w-full md:w-[25%] flex justify-start">
              <span className="font-display-service text-[8rem] md:text-[10rem] lg:text-[13rem] leading-none tracking-tighter text-white transition-transform duration-700 group-hover:-translate-y-4">
                {s.n}
              </span>
            </div>

            {/* 2. Center Image */}
            <div className="w-full md:w-[35%]">
              <div className="aspect-[4/3] md:aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={s.img || rowImages[i % rowImages.length]} 
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
              </div>
            </div>

            {/* 3. Right Text Content */}
            <div className="w-full md:w-[35%] flex flex-col justify-center pt-6 md:pt-0">
              <h3 className="font-display-service text-4xl md:text-5xl lg:text-6xl font-medium mb-6 md:mb-10 tracking-tight text-white">
                {s.title}
              </h3>
              
              <div className="flex flex-col gap-3">
                <h4 className="text-[12px] font-bold uppercase tracking-wide text-white">
                  {s.sub}
                </h4>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-white/60">
                  {s.body}
                </p>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </motion.section>
  );
}