import { IMAGES } from '@/data';
import { SectionTag, Reveal } from '@/components/Primitives';

export function Articles() {
  return (
    <section className="relative py-20 md:py-32 bg-sand">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionTag index="08" label="Article" />
            <h2 className="mt-6 font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight text-balance">
              From the
              <br />
              <span className="text-ember italic font-light">journal.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium hover:text-ember transition-colors"
          >
            View all articles
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {IMAGES.articles.map((art, i) => (
            <Reveal key={art.n} delay={i * 80}>
              <a href="#contact" className="group block">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                  <img
                    src={art.img}
                    alt={art.title}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-cream/90 text-ink text-xs font-medium px-3 py-1">
                    {art.n}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-medium">
                      {art.title}
                    </h3>
                    <p className="text-sm text-ink/60">{art.tag}</p>
                  </div>
                  <span className="text-xs text-ink/40">© 2025</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
