import { IMAGES } from '@/data';
import { LiquidCanvas } from '@/components/LiquidCanvas';

export function Hero() {
  return (
    <section
      id="top"
      // ── THE FIX: h-[calc(100vh+7vw)] ──
      // Ye extra 7vw about section ke negative margin ko cancel kar dega,
      // jisse white part initial load par poora screen ke bahar (neeche) chala jayega.
      className="sticky top-0 h-[calc(100vh+7vw)] w-full overflow-hidden z-0"
    >
      {/* ── Liquid water-ripple background ── */}
      <div className="absolute inset-0">
        <LiquidCanvas
          imageSrc={IMAGES.heroWoman}
          className="h-full w-full block object-cover"
        />
      </div>

      {/* ── Foreground content (UI) ── */}
      {/* 
        h-full ensures the container takes the new height.
        pb-[calc(7vw+2rem)] ensures your bottom text doesn't hide behind the fold.
      */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10 h-full pt-24 md:pt-28 flex flex-col text-cream pointer-events-none pb-[calc(7vw+2rem)]">
        
        {/* top meta row */}
        <div className="flex items-start justify-between pt-6 md:pt-10">
          <div className="max-w-xs">
            {/* <p className="text-[10px] font-semibold tracking-widest uppercase text-cream/50 mb-1">
              Meet the CEO
            </p>
            <p className="font-display text-lg font-medium leading-none">
              Lousiana KD6
            </p>
            <p className="text-[11px] uppercase tracking-widest text-cream/50 mt-1">
              CEO
            </p> */}
          </div>

          <div className="hidden md:block text-right max-w-xs">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-cream/50 mb-2">
              01 / Strategy
            </p>
            <p className="text-[13px] text-cream/70 leading-relaxed">
              Pick a plan, submit a job request,
              <br />
              and your project will kickoff within 24 hours.
            </p>
          </div>
        </div>

        {/* headline + cta */}
        <div className="flex-1 flex flex-col justify-end pb-16 md:pb-24 max-w-2xl">
          {/* <p className="mb-6 text-[10px] font-semibold tracking-widest uppercase text-cream/60 animate-fade-up">
            01 / Strategy · Videography · Branding
          </p> */}
          {/* <h1
            className="font-display font-medium leading-[0.85] tracking-[-0.02em] text-[clamp(4rem,9vw,8.5rem)] animate-fade-up"
            style={{ animationDelay: '100ms' }}
          >
            Bold visuals,
            <br />
            structured
            <br />
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.8)',
                fontStyle: 'italic',
                fontWeight: 300,
              }}
            >
              systems.
            </span>
          </h1> */}

          <div
            className="mt-12 flex items-center gap-4 animate-fade-up pointer-events-auto"
            style={{ animationDelay: '250ms' }}
          >
            <a
              href="#about"
              className="group inline-flex items-center gap-2 border-b border-cream/40 pb-1.5 text-[13px] font-semibold tracking-wide text-cream hover:border-cream transition-colors"
            >
              Explore Now
              <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </div>
        </div>

        {/* bottom strip */}
        <div className="flex items-center justify-between text-[11px] font-semibold tracking-widest uppercase text-cream/50">
          <span>© 2025</span>
          <span className="hidden md:inline">Scroll to explore</span>
          <span>Fuel Studio®</span>
        </div>
      </div>
    </section>
  );
}