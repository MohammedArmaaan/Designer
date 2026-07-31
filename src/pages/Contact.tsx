'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Faq } from '@/components/sections/Faq';

// --- Placeholder Images ---
const IMAGES = {
  contactHero: "https://framerusercontent.com/images/bFbEQ6JZkAoHLWCpyzfCKp69U.png?width=896&height=1280",
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

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState(null);
  const contentRef = useRef(null);

  // 1. Track scroll progress specifically for the Sliding FAQ Section
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['start end', 'start start'],
  });

  // 2. The Dynamic Diagonal Slant Animation
  const clipY = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const dynamicClipPath = useMotionTemplate`polygon(0 ${clipY}vw, 100% 0, 100% 100%, 0 100%)`;

  return (
    <main className="bg-[#0a0a0a] text-black min-h-screen font-sans selection:bg-white selection:text-black">
      
      {/* ── 00. CONTACT HERO SECTION (DARK) ── */}
      {/* 
        FIX: Removed 'sticky', 'top-0', and locked heights.
        Ab yeh section totally normal behave karega aur scroll karte hi upar jayega.
      */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a] z-0">
        
        {/* pb-[18vw] lg:pb-[14vw] ensures submit button is safe from the overlapping slant */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start relative z-10 pt-[140px] pb-[18vw] lg:pb-[14vw]">
          
          {/* Left: Big Portrait Image */}
          <Reveal>
            <div className="w-full aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 max-h-[50vh] lg:max-h-[75vh]">
              <img 
                src={IMAGES.contactHero} 
                alt="Contact representation" 
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-all duration-700 hover:scale-105 object-top" 
              />
            </div>
          </Reveal>

          {/* Right: Contact Form Area */}
          <div className="flex flex-col gap-6 lg:gap-8">
            
            {/* Headers */}
            <div className="flex flex-col gap-3">
              <Reveal delay={0.1}>
                <h1 className="text-5xl lg:text-[4.5rem] leading-[1] font-display font-medium tracking-tight text-white">
                  Get In Touch”
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-white/50 text-sm md:text-base leading-relaxed tracking-wide max-w-sm">
                  Pick a plan, submit a job request, and your kickoff will be within 24 hours.
                </p>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={0.3}>
              <form className="flex flex-col gap-6 lg:gap-7 w-full mt-2" onSubmit={(e) => e.preventDefault()}>
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">First Name*</label>
                    <input 
                      type="text" 
                      placeholder="Jim" 
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Last Name*</label>
                    <input 
                      type="text" 
                      placeholder="Hopper" 
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Category</label>
                    <select className="w-full bg-transparent border-b border-white/20 pb-3 text-white/50 focus:text-white focus:outline-none focus:border-white transition-colors text-sm appearance-none cursor-pointer">
                      <option value="" disabled selected>Select</option>
                      <option value="design" className="text-black">Design</option>
                      <option value="dev" className="text-black">Development</option>
                      <option value="other" className="text-black">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Email</label>
                    <input 
                      type="email" 
                      placeholder="fuel@mail.com" 
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Message</label>
                  <textarea 
                    placeholder="Enter your message..." 
                    rows="2"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors text-sm resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button className="w-full bg-[#222] hover:bg-white text-white hover:text-black transition-colors duration-300 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase mt-2">
                  Submit
                </button>
              </form>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT SLIDING OVERLAY (WITH ANIMATED SLANT) ── */}
      <motion.div 
        ref={contentRef}
        className="relative z-20 bg-white pb-32"
        style={{ 
          clipPath: dynamicClipPath,
        //   marginTop: '-12vw', // Overlaps the bottom of the hero section seamlessly
          paddingTop: 'calc(12vw + 4rem)' 
        }}
      >
        
        {/* ── 01. FAQ SECTION ── */}
        {/* <section className="max-w-[1600px] mx-auto px-6 md:px-10">
          
          <div className="border-t border-black/15 pt-6 mb-16 flex justify-between text-[11px] font-semibold tracking-widest uppercase text-black">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-black/50">✦</span>
              <span>(01)</span>
            </div>
            <span className="hidden md:block">(Frequently Asked Questions)</span>
            <span className="md:hidden">FAQ</span>
            <span className="opacity-0 md:opacity-100 hidden md:block">Questions</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Reveal>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 relative group cursor-pointer">
                  <img src={IMAGES.faqSide} alt="FAQ Side visual" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white py-2 px-4 rounded text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <span>▶</span> Play
                    </div>
                    <span className="text-black/40 flex-shrink-0">Showreel</span>
                  </div>
                </div>
              </Reveal>
            </div>

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
        </section> */}
        <Faq />

      </motion.div>
    </main>
  );
}