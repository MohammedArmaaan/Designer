'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

// --- Placeholder Images ---
const IMAGES = {
  hero: "https://framerusercontent.com/images/0QX3pXudAdkorY10w1qHeika50.png?width=1408&height=768", // Woman with flowers aesthetic
  portfolio: [
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop", // Minimal fashion 1
    "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=1000&auto=format&fit=crop", // Minimal fashion 2
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", // Abstract/studio
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop"  // Active/running
  ],
  faqSide: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800&auto=format&fit=crop"
};

// --- Helper Component ---
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [activeFaq, setActiveFaq] = useState(null);
  const contentRef = useRef(null);

  // 1. Track scroll progress specifically for the Main Content Section
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['start end', 'start start'],
  });

  // 2. The Diagonal Slant Reveal Animation
  const clipY = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const dynamicClipPath = useMotionTemplate`polygon(0 ${clipY}vw, 100% 0, 100% 100%, 0 100%)`;

  const projects = [
    { num: "[01]", title: "Unfilter Collection", cat: "Art Direction", year: "© 2025" },
    { num: "[02]", title: "Darnell Jensen", cat: "Photography", year: "© 2024" },
    { num: "[03]", title: "Noble M&A", cat: "Strategy", year: "© 2025" },
    { num: "[04]", title: "Nike Skokie", cat: "Art Direction", year: "© 2025" }
  ];

  return (
    <main className="bg-[#0a0a0a] text-black min-h-screen font-sans selection:bg-black selection:text-white">
      
      {/* ── 00. STATIC HERO SECTION ── */}
      <section className="sticky top-0 h-screen w-full flex items-end overflow-hidden bg-[#0a0a0a]">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img src={IMAGES.hero} alt="Portfolio Hero" className="w-full h-full object-cover opacity-80" />
          {/* Stronger bottom gradient to make pure white text pop perfectly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        </motion.div>
        
        {/* Container aligned to bottom with padding */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto mt-10 px-6 md:px-10 pb-[5vw] md:pb-[2vw] flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          
          {/* Left: Massive Typography (Pure White) */}
          <Reveal>
            <h1 className="text-[13vw] md:text-[5vw] leading-[0.9] font-display-service font-bold tracking-tighter text-white m-0">
              <span className="relative inline-block">
                Latest
                {/* (07) floats at the top right of 'Latest' */}
                <span className="absolute -top-4 md:-top-6 -right-10 md:-right-16 text-white font-sans text-sm md:text-lg font-bold tracking-widest">
                  (07)
                </span>
              </span>
              <br/>
              Portfolio
            </h1>
          </Reveal>
          
          {/* Right: Small Description (Pure White) */}
          <Reveal delay={0.2} className="md:mb-4 lg:mr-[10%]">
            <p className="text-white font-medium text-xs md:text-sm leading-relaxed tracking-wide max-w-[200px] md:max-w-[260px] drop-shadow-md">
              A curated collection of structured visuals and modern digital systems
            </p>
          </Reveal>

        </div>
      </section>

      {/* ── MAIN CONTENT SLIDING OVERLAY (WITH ANIMATED SLANT) ── */}
      <motion.div 
        ref={contentRef}
        className="relative z-10 bg-white pb-32"
        style={{ 
          clipPath: dynamicClipPath,
        //   marginTop: '-10vw', 
          paddingTop: 'calc(10vw + 4rem)' 
        }}
      >
        
        {/* ── 01. PORTFOLIO GRID ── */}
        <section className="max-w-[1600px] mx-auto px-6 md:px-10 mb-32">
          
          {/* Header Line */}
          <div className="border-t border-black/15 pt-6 mb-12 flex justify-between text-[11px] font-semibold tracking-widest uppercase text-black">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-black/50">✦</span>
              <span>01</span>
            </div>
            <span>Portfolio</span>
            <span>© 2025</span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
            {projects.map((project, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="group cursor-pointer">
                  
                  {/* The Image Container with Blurred BG & Sharp Inset (Matched to your image) */}
                  <div className="relative w-full aspect-[4/3] md:aspect-[1.4/1] overflow-hidden bg-gray-100 rounded-xl mb-6">
                    {/* Blurred Background Image */}
                    <img 
                      src={IMAGES.portfolio[idx]} 
                      alt="Background blur" 
                      className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60 group-hover:scale-125 transition-transform duration-[1.5s]" 
                    />
                    
                    {/* Sharp Foreground Image (Inset) */}
                    <div className="absolute inset-0 flex items-center justify-center p-12 md:p-16">
                      <img 
                        src={IMAGES.portfolio[idx]} 
                        alt={project.title} 
                        className="w-full h-full object-cover shadow-2xl group-hover:scale-105 transition-transform duration-[1s]" 
                      />
                    </div>
                  </div>

                  {/* Text Details below the image */}
                  <div className="flex justify-between items-start text-[11px] font-semibold uppercase tracking-widest text-black">
                    <span className="text-black/50">{project.num}</span>
                    <div className="text-center flex flex-col gap-1">
                      <span>{project.title}</span>
                      <span className="text-black/50 font-normal">{project.cat}</span>
                    </div>
                    <span className="text-black/50">{project.year}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── 02. FAQ SECTION ── */}
        <section className="max-w-[1600px] mx-auto px-6 md:px-10">
          
          {/* Header Line */}
          <div className="border-t border-black/15 pt-6 mb-16 flex justify-between text-[11px] font-semibold tracking-widest uppercase text-black">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-black/50">✦</span>
              <span>02</span>
            </div>
            <span className="hidden md:block">Frequently Asked Questions</span>
            <span className="md:hidden">FAQ</span>
            <span className="opacity-0 md:opacity-100 hidden md:block">Questions</span> {/* Spacing balancer */}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Small Image & Showreel Button */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Reveal>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 relative group cursor-pointer">
                  <img src={IMAGES.faqSide} alt="FAQ Side visual" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  
                  {/* Play Button Overlay (bottom-left) matched to reference */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white py-2 px-4 rounded text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <span>▶</span> Play
                    </div>
                    <span className="text-black/40">Showreel</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Accordion */}
            <div className="lg:col-span-8 flex flex-col border-t border-black/10">
              {[
                { q: "What distinguishes us from other agencies?", a: "We blend the strategic depth of a large firm with the agile, personalized touch of an independent studio." },
                { q: "Why not hire an in-house designer or freelancer?", a: "Hiring in-house brings overhead and singular style. We provide a full spectrum of design expertise on-demand, without the full-time bloat." },
                { q: "Are creative requests truly unlimited?", a: "Yes. Once subscribed, you can queue as many requests as you'd like, and we deliver them sequentially with uncompromising quality." },
                { q: "How fast will I receive my work?", a: "Most requests are completed within 48-72 hours, depending on complexity. We prioritize consistency and speed." },
                { q: "What if I have a single project?", a: "While we specialize in ongoing partnerships, we do take on select standalone projects if the scope and vision align." }
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-black/10 overflow-hidden">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full py-6 flex justify-between items-center text-left hover:text-black/60 transition-colors"
                  >
                    <span className="text-[17px] md:text-xl font-medium tracking-tight pr-8">{faq.q}</span>
                    <span className="text-2xl font-light">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="pb-8 text-black/60 text-sm md:text-base leading-relaxed max-w-2xl">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

      </motion.div>
    </main>
  );
}