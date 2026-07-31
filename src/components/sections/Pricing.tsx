'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Reveal } from '@/components/Primitives'; // Adjust import if needed

// Hardcoded to match the reference image exactly
const PLANS_DATA = [
  {
    name: 'Starter',
    blurb: 'Essential design support for new brands taking the first step.',
    price: '999',
    period: 'Month',
    features: [
      'Custom-crafted visual identity',
      'Responsive, modern website design',
      'High-quality imagery and production',
    ],
  },
  {
    name: 'Professional',
    blurb: 'Ideal for brands seeking refined systems and digital presence.',
    price: '7299',
    period: 'Month',
    features: [
      'Custom-crafted visual identity',
      'Responsive, modern website design',
      'High-quality imagery and production',
      'Structured layouts with clean typography',
      'Conversion-focused page strategy',
      'Fast, optimized performance setup',
    ],
  },
  {
    name: 'Elite',
    blurb: 'High-touch and a fully crafted brand experience by Fuel.',
    price: '10999',
    period: 'Month',
    features: [
      'Custom-crafted visual identity',
      'Responsive, modern website design',
      'High-quality imagery and production',
      'Structured layouts with clean typography',
      'Conversion-focused page strategy',
      'Fast, optimized performance setup',
      'Seamless CMS and organization',
      'Dedicated support for revisions',
    ],
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  // ─── DIAGONAL SCROLL ANIMATION (UNCHANGED) ───
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  const clipY = useTransform(scrollYProgress, [0, 1], [0, 7]);
  const dynamicClipPath = useMotionTemplate`polygon(0 ${clipY}vw, 100% 0, 100% 100%, 0 100%)`;

  return (
    <motion.section
      id="pricing"
      ref={sectionRef}
      className="relative z-20 bg-white text-black -mt-[7vw]"
      style={{
        clipPath: dynamicClipPath,
        paddingTop: 'calc(7vw + 4rem)',
      }}
    >
      {/* ── Top Separator & Header Row (Optional - keep if needed for layout) ── */}
      <div className="w-full border-t border-black/15" />

      <div className="grid grid-cols-3 items-start text-[11px] font-semibold tracking-wide uppercase px-6 md:px-10 max-w-[1600px] mx-auto pt-8 mb-20 md:mb-32 text-black">
        <div className="flex items-center gap-1">
          <span className="text-[9px]">✦</span>
          <span>(04)</span>
        </div>
        <div className="text-center">
          <span>(Pricing)</span>
        </div>
        <div className="text-right text-black/80">
          <span>© 2026</span>
        </div>
      </div>

      {/* ── Pricing Grid ── */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pb-24 md:pb-40">
        <div className="grid gap-6 lg:gap-8 md:grid-cols-3 items-start">
          {PLANS_DATA.map((plan, i) => {
            // Make the 3rd card Dark
            const isDark = i === 2;

            return (
              <Reveal key={plan.name} delay={i * 150}>
                <div
                  className={`relative flex flex-col p-10 lg:p-12 transition-transform duration-700 rounded-2xl ${
                    isDark
                      ? 'bg-[#111111] text-white shadow-xl'
                      : 'bg-[#F9F9F9] text-black'
                  }`}
                >
                  {/* 1. Plan Name & Description */}
                  <h3
                    className={`font-display text-2xl font-medium tracking-tight ${
                      isDark ? 'text-white' : 'text-black'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`mt-4 text-[14px] leading-relaxed max-w-[260px] ${
                      isDark ? 'text-white/60' : 'text-black/60'
                    }`}
                  >
                    {plan.blurb}
                  </p>

                  {/* 2. Price Tag */}
                  <div className="mt-12 mb-10 flex items-start">
                    <span
                      className={`text-xl lg:text-2xl font-medium mt-3 mr-1 ${
                        isDark ? 'text-white' : 'text-black'
                      }`}
                    >
                      $
                    </span>
                    <div className="flex items-baseline">
                      <span
                        className={`text-6xl lg:text-[5.5rem] font-medium tracking-tighter leading-none ${
                          isDark ? 'text-white' : 'text-black'
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-[15px] font-medium ml-2 ${
                          isDark ? 'text-white/90' : 'text-black/90'
                        }`}
                      >
                        / {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* 3. Underlined "Join Us Now" Button */}
                  <a
                    href="/contact"
                    className={`group flex justify-between items-center w-full max-w-[240px] border-b pb-4 mb-14 transition-colors ${
                      isDark
                        ? 'border-white/40 hover:border-white text-white'
                        : 'border-black/30 hover:border-black text-black'
                    }`}
                  >
                    <span className="text-[15px] font-medium tracking-wide">
                      Join Us Now
                    </span>

                    {/* Right-angle bracket icon (┐) matching the image exactly */}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      className={`transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                        isDark ? 'text-white' : 'text-black'
                      }`}
                    >
                      <path
                        d="M2 2H10V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </a>

                  {/* 4. Features List */}
                  <div className="mt-auto">
                    <h4
                      className={`text-[15px] font-medium mb-6 ${
                        isDark ? 'text-white' : 'text-black'
                      }`}
                    >
                      What's included
                    </h4>
                    <ul className="space-y-4">
                      {plan.features.map((f, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-3 text-[13px] tracking-wide ${
                            isDark ? 'text-[#a3a3a3]' : 'text-[#666666]'
                          }`}
                        >
                          <span
                            className={`shrink-0 font-mono text-[14px] ${
                              isDark ? 'text-[#666666]' : 'text-[#a3a3a3]'
                            }`}
                          >
                            +
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}