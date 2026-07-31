'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  // 1. Track scroll progress specifically for the Footer
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  // 2. The Diagonal Slant Reveal Animation (Slides over the sticky CtaBanner)
  const clipY = useTransform(scrollYProgress, [0, 1], [0, 7]);
  const dynamicClipPath = useMotionTemplate`polygon(0 ${clipY}vw, 100% 0, 100% 100%, 0 100%)`;

  const footerLinks = [
    { label: 'Home', num: '01', href: '/' },
    { label: 'Portfolio', num: '02', href: '/portfolio' },
    { label: 'About', num: '03', href: '/about' },
    { label: 'Contact', num: '04', href: '/contact' },
  ];

  return (
    <motion.footer
      id="footer"
      ref={sectionRef}
      // z-30 ensures it slides smoothly OVER the sticky CtaBanner section
      // -mt-[7vw] pulls it up to create the diagonal overlapping effect
      className="relative z-30 bg-[#111] text-white -mt-[7vw] overflow-hidden"
      style={{
        clipPath: dynamicClipPath,
        paddingTop: 'calc(7vw + 4rem)',
      }}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-20 pb-8 flex flex-col h-full justify-between">
        
        {/* ── Top Section (Text & Links) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start w-full">
          
          {/* LEFT: Massive Headline & CTA */}
          <div className="lg:col-span-8 flex flex-col items-start">
            <h2 className="font-display-service text-[2.5rem] md:text-6xl lg:text-[5.5rem] font-medium tracking-tight leading-[1.05] text-white/50">
              Let's work together
              <br />
              <a 
                href="mailto:sayhi@fuelstudio.com" 
                className="text-white hover:text-white/80 transition-colors"
              >
                sayhi@fuelstudio.com
              </a>
            </h2>

            <a
              href="#contact"
              className="group mt-16 md:mt-24 flex items-center justify-between w-full max-w-[200px] md:max-w-[240px] border-b border-white/20 pb-4 hover:border-white transition-colors"
            >
              <span className="text-[14px] md:text-[15px] font-semibold tracking-wide">
                Contact Now
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path d="M2 2H10V10" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>

          {/* RIGHT: Navigation Links with Borders */}
          <div className="lg:col-span-4 w-full">
            <ul className="flex flex-col w-full border-t border-white/10 lg:border-t-0">
              {footerLinks.map((link, i) => (
                <li key={i} className="w-full border-b border-white/10">
                  <a 
                    href={link.href} 
                    className="group flex items-start gap-4 py-5 md:py-6 text-white/80 hover:text-white transition-colors"
                  >
                    <span className="text-xl md:text-[22px] font-medium tracking-wide">
                      {link.label}
                    </span>
                    <span className="text-[10px] font-mono opacity-40 mt-1 group-hover:opacity-100 transition-opacity">
                      {link.num}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Decorative Line with Crosshairs (+) ── */}
        <div className="relative w-full mt-24 mb-16 md:mb-10">
          <div className="w-full border-t border-white/10" />
          {/* Crosshairs positioned along the line just like the screenshot */}
          <span className="absolute left-[30%] md:left-[25%] -top-3 text-white/30 text-xl font-light leading-none bg-[#111] px-2">+</span>
          <span className="absolute left-[60%] md:left-[50%] -top-3 text-white/30 text-xl font-light leading-none bg-[#111] px-2">+</span>
          <span className="absolute hidden md:block left-[75%] -top-3 text-white/30 text-xl font-light leading-none bg-[#111] px-2">+</span>
        </div>

        {/* ── Bottom Section (Massive 'FUEL X' Logo) ── */}
        <div className="flex flex-col md:flex-row items-end justify-between w-full overflow-hidden">
          <h1 className="font-display-service text-[26vw] md:text-[20vw] leading-[0.75] tracking-[-0.04em] font-bold text-white m-0 p-0 select-none">
            FUEL <span className="ml-2 md:ml-10">X</span>
          </h1>
          <span className="text-[12px] md:text-[14px] font-semibold tracking-widest text-white/80 pb-2 md:pb-6 shrink-0">
            © 2025
          </span>
        </div>

      </div>
    </motion.footer>
  );
}