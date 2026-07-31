'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView, animate, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

// --- Placeholder Images ---
const IMAGES = {
    hero: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
    landscape: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop",
    team: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800&auto=format&fit=crop"
    ],
    faqSide: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800&auto=format&fit=crop"
};

// --- Helper Components ---
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

const AnimatedCounter = ({ value }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView && ref.current) {
            const controls = animate(0, value, {
                duration: 2,
                ease: "easeOut",
                onUpdate: (v) => {
                    if (ref.current) ref.current.textContent = Math.round(v).toString();
                }
            });
            return () => controls.stop();
        }
    }, [value, inView]);

    return <span ref={ref}>0</span>;
};

export default function About() {
    const [activeFaq, setActiveFaq] = useState(null);
    const contentRef = useRef(null);

    // 1. Track scroll progress specifically for the Main Content Section
    const { scrollYProgress } = useScroll({
        target: contentRef,
        offset: ['start end', 'start start'],
    });

    // 2. The Diagonal Slant Reveal Animation
    // Adjusted to 10vw to give a perfect premium slant without eating up the whole screen
    const clipY = useTransform(scrollYProgress, [0, 1], [0, 10]);
    const dynamicClipPath = useMotionTemplate`polygon(0 ${clipY}vw, 100% 0, 100% 100%, 0 100%)`;

    const baseTeam = [
        { name: "Ariana Voss", role: "Creative Director" },
        { name: "Mira Leone", role: "Brand Designer" },
        { name: "Selena Hart", role: "UX Strategist" },
        { name: "Nora Bennett", role: "Visual Designer" },
        { name: "Chloe Richter", role: "Content Lead" }
    ];
    const marqueeTeam = [...baseTeam, ...baseTeam, ...baseTeam, ...baseTeam];

    return (
        <main className="bg-[#0a0a0a] text-black min-h-screen font-sans selection:bg-black selection:text-white">

            {/* ── 00. STATIC HERO SECTION ── */}
            <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <img src={IMAGES.hero} alt="Fuel Studio" className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-black/40"></div>
                </motion.div>

                {/* THE FIX: Added padding-bottom (pb-[15vw] md:pb-[8vw]) to push the text up safely above the slanted overlap! */}
                <Reveal className="relative z-10 flex items-center justify-center w-full px-4 pb-[15vw] md:pb-[8vw]">
                    <h1 className="text-[14vw] md:text-[12vw] leading-[0.8] font-display font-bold tracking-tighter uppercase text-white text-center whitespace-nowrap">
                        WE ARE HERE
                    </h1>
                </Reveal>
            </section>

            {/* ── MAIN CONTENT SLIDING OVERLAY (WITH ANIMATED SLANT) ── */}
            <motion.div
                ref={contentRef}
                className="relative z-10 bg-white pb-32"
                style={{
                    clipPath: dynamicClipPath,
                    //   marginTop: '-10vw', // Reduced slightly to balance with the text
                    paddingTop: 'calc(10vw + 4rem)'
                }}
            >

                {/* ── 01. HUGE HEADLINE & IMAGE ── */}
                <section className="max-w-[1600px] mx-auto px-6 md:px-10 mb-20 md:mb-32">
                    <div className="border-t border-black/15 pt-6 mb-12 md:mb-24 flex justify-between text-[11px] font-semibold tracking-widest uppercase text-black">
                        <span>(01) (About Us)</span>
                        <span className="hidden md:block">(Our Vision)</span>
                        <span>© 2025</span>
                    </div>

                    <Reveal>
                        <h2 className="text-[2.5rem] leading-[1.05] md:text-5xl lg:text-[5.5rem] font-display font-medium tracking-tight mb-16 md:mb-24 text-balance md:text-center md:px-10">
                            Design-driven expression blends structured clarity and modern 3D visual systems with Swiss digital ideas, shaped by aesthetics & Fuel®.
                        </h2>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="w-full aspect-[21/9] md:aspect-[21/7] overflow-hidden rounded-xl bg-gray-100">
                            <img src={IMAGES.landscape} alt="Creative process" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s] hover:scale-105" />
                        </div>
                    </Reveal>
                </section>

                {/* ── 02. PROCESS ── */}
                <section className="max-w-[1600px] mx-auto px-6 md:px-10 mb-40 space-y-24">
                    {[
                        { num: "001", title: "Research", desc: "Exploring insights through structured analysis and clear intention. Fuel uncovers patterns and direction, creating a grounded foundation that shapes purposeful design decisions.", list: ["Market discovery & visual mapping", "Brand positioning review", "Dedicated creative, 20 hrs weekly"] },
                        { num: "002", title: "Experiment", desc: "Translating ideas into visual concepts with clarity, balance, and exploration. Fuel moves beyond predictable form, crafting variations that reveal new creative possibilities.", list: ["Concept sketches & directions", "Visual style development", "Dedicated creative, 20 hrs weekly"] },
                        { num: "003", title: "Refinement", desc: "Polishing every detail with precision and structure. Fuel refines layout, tone, and expression, delivering a cohesive system shaped for clarity and long-term impact.", list: ["Final design adjustments", "System-wide consistency check", "Dedicated creative, 20 hrs weekly"] }
                    ].map((step, idx) => (
                        <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4 items-start border-b border-black/10 pb-16 last:border-0">
                            <div className="md:col-span-5 flex items-start gap-4 md:gap-10">
                                <span className="text-[11px] font-mono tracking-widest text-black/40 mt-3">{step.num}</span>
                                <h3 className="text-4xl md:text-6xl font-display">{step.title}</h3>
                            </div>
                            <div className="md:col-span-6 md:col-start-7 flex flex-col gap-8">
                                <Reveal delay={0.1}>
                                    <p className="text-base md:text-lg text-black/70 leading-relaxed md:w-5/6">{step.desc}</p>
                                </Reveal>
                                <Reveal delay={0.2}>
                                    <ul className="space-y-3 mt-4">
                                        {step.list.map((item, i) => (
                                            <li key={i} className="text-xs md:text-sm font-semibold tracking-wide flex flex-col gap-2">
                                                <span className="text-black/40 text-[10px] uppercase">✦ Detail</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Reveal>
                            </div>
                        </div>
                    ))}
                </section>

                {/* ── 03. MEET OUR TEAM (Continuous Marquee) ── */}
                <section className="mb-40 overflow-hidden bg-black text-white py-20 md:py-32">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-16 flex justify-between text-[11px] font-semibold tracking-widest uppercase text-white/50 border-t border-white/20 pt-6">
                        <span>(03) (Meet Our Team)</span>
                        <span>Our Creative Minds</span>
                    </div>

                    <div className="relative flex w-full">
                        <motion.div
                            className="flex w-max items-center"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                        >
                            {marqueeTeam.map((member, idx) => {
                                const imageIdx = idx % baseTeam.length;
                                return (
                                    <div key={idx} className="w-[280px] md:w-[400px] flex-shrink-0 group px-4 md:px-6">
                                        <div className="aspect-[3/4] overflow-hidden bg-zinc-900 mb-6">
                                            <img
                                                src={IMAGES.team[imageIdx]}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center border-t border-white/20 pt-4">
                                            <h4 className="text-lg font-medium">{member.name}</h4>
                                            <p className="text-[10px] uppercase tracking-widest text-white/50">{member.role}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* ── 04. AWARDS ── */}
                <section className="max-w-[1600px] mx-auto px-6 md:px-10 mb-40">
                    <div className="border-t border-black/15 pt-6 mb-16 text-[11px] font-semibold tracking-widest uppercase text-black/50">
                        <span>(04) (Awards)</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-0">
                        {[
                            { count: "2x", body: "Awwwards", project: "Bruten Website", cat: "SOTD" },
                            { count: "1x", body: "CSSD Awards", project: "Fuel Portfolio", cat: "WOTD" },
                            { count: "7x", body: "Behance", project: "Branding Showcase", cat: "Featured" },
                            { count: "5x", body: "FWA", project: "Digital Experience", cat: "FOTD" },
                            { count: "2x", body: "CSS Winner", project: "Creative Website", cat: "SOTD" },
                            { count: "4x", body: "Mindsparkle", project: "Modern Design", cat: "Feature" },
                            { count: "3x", body: "Dribbble", project: "Visual Design", cat: "Highlighted" },
                            { count: "8x", body: "Web Exc. Awards", project: "Brand System", cat: "Winner" }
                        ].map((award, idx) => (
                            <Reveal key={idx} delay={idx * 0.05}>
                                <div className="flex justify-between items-center py-6 border-b border-black/10 group hover:border-black transition-colors">
                                    <div className="flex gap-6 md:gap-10 items-center w-1/2">
                                        <span className="text-[11px] font-mono text-black/40">{award.count}</span>
                                        <span className="text-sm md:text-base font-semibold">{award.body}</span>
                                    </div>
                                    <div className="flex justify-between w-1/2 text-right md:text-left">
                                        <span className="text-sm text-black/60 hidden md:block">{award.project}</span>
                                        <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40">{award.cat}</span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ── 05. CLIENTS ── */}
                <section className="max-w-[1600px] mx-auto px-6 md:px-10 mb-40">
                    <div className="border-t border-black/15 pt-6 mb-16 text-[11px] font-semibold tracking-widest uppercase text-black/50">
                        <span>(05) (Clients)</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {['Nike', 'Figma', 'Uber', 'Github', 'Vercel', 'Stripe', 'Apple', 'Framer'].map((client, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <div className="group bg-[#f7f7f7] aspect-[4/3] flex items-center justify-center rounded-xl hover:bg-black transition-colors duration-300 cursor-pointer">
                                    <span className="text-black group-hover:text-white text-xl md:text-3xl font-display font-bold uppercase tracking-widest transition-colors duration-300">
                                        {client}
                                    </span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ── 06. STATS ── */}
                <section className="max-w-[1600px] mx-auto px-6 md:px-10 mb-40">
                    <div className="border-t border-black/15 pt-6 mb-16 text-[11px] font-semibold tracking-widest uppercase text-black/50">
                        <span>(06) (Stats)</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {[
                            { val: 2.06, suffix: "M", title: "Global Impressions", desc: "Fuel moves beyond simple authenticity, creating refined systems that shape digital presence." },
                            { val: 160, suffix: "K", title: "Community Reach", desc: "Elevating identity with structured clarity. Fuel crafts experiences that extend far beyond visual form." },
                            { val: 750, suffix: "+", title: "Creative Hours Logged", desc: "Through precision and intention, Fuel transforms ideas into cohesive narratives that define brands." },
                            { val: 257, suffix: "+", title: "Projects Completed", desc: "Blending modern aesthetics with functional design, Fuel delivers refined solutions that push brands." }
                        ].map((stat, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-6xl md:text-7xl lg:text-8xl font-display font-light tracking-tighter">
                                        <AnimatedCounter value={stat.val} />{stat.suffix}
                                    </h3>
                                    <h4 className="text-[11px] font-semibold uppercase tracking-widest mt-2">{stat.title}</h4>
                                    <p className="text-sm text-black/50 leading-relaxed md:w-5/6">{stat.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ── 07. FAQ ── */}
                <section className="max-w-[1600px] mx-auto px-6 md:px-10">
                    <div className="border-t border-black/15 pt-6 mb-16 text-[11px] font-semibold tracking-widest uppercase text-black/50">
                        <span>(07) (Frequently Asked Questions)</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <Reveal>
                                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                                    <img src={IMAGES.faqSide} alt="FAQ Side visual" className="w-full h-full object-cover grayscale" />
                                </div>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <button className="flex items-center gap-4 text-sm font-semibold uppercase tracking-widest hover:opacity-60 transition-opacity">
                                    <div className="w-10 h-10 border border-black rounded-full flex items-center justify-center">▶</div>
                                    Play Showreel
                                </button>
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
                                        <span className="text-xl md:text-2xl font-display pr-8">{faq.q}</span>
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
                                                <p className="pb-8 text-black/60 leading-relaxed max-w-2xl">{faq.a}</p>
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