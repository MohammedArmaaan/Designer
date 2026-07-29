import { useState } from 'react';
import { Plus, Play } from 'lucide-react';
import { FAQS, IMAGES } from '@/data';
import { SectionTag, Reveal } from '@/components/Primitives';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-20 md:py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-12 items-start">
          {/* Left: showreel */}
          <div className="md:col-span-5 md:sticky md:top-28">
            <SectionTag index="09" label="Frequently Asked Questions" />
            <Reveal>
              <a
                href="#contact"
                className="group relative mt-8 block overflow-hidden rounded-2xl aspect-[4/5] max-w-sm"
              >
                <img
                  src={IMAGES.faqWoman}
                  alt="Showreel"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-cream">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/20 backdrop-blur-md border border-cream/40 group-hover:bg-ember group-hover:border-ember transition-colors">
                    <Play size={22} className="ml-1" />
                  </span>
                  <p className="mt-4 text-sm tracking-ultra uppercase">Showreel</p>
                </div>
              </a>
            </Reveal>
          </div>

          {/* Right: accordion */}
          <div className="md:col-span-7 md:pl-8">
            <div className="border-t border-ink/10">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={f.q} delay={i * 60}>
                    <div className="border-b border-ink/10">
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                      >
                        <span className="font-display text-xl md:text-2xl font-medium pr-4">
                          {f.q}
                        </span>
                        <span
                          className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 transition-all duration-300 ${
                            isOpen ? 'bg-ember border-ember text-white rotate-45' : 'group-hover:bg-ink group-hover:text-cream'
                          }`}
                        >
                          <Plus size={18} />
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-6 pr-12 text-base md:text-lg text-ink/70 leading-relaxed">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
