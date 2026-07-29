interface MarqueeProps {
  items: string[];
  speed?: 'normal' | 'slow';
  dark?: boolean;
}

export function Marquee({ items, speed = 'normal', dark = false }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden py-6">
      <div
        className={`flex w-max ${speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee'}`}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span
              className={`font-display text-5xl md:text-7xl font-medium tracking-tight px-8 ${
                dark ? 'text-cream' : 'text-ink'
              }`}
            >
              {item}
            </span>
            <span
              className={`text-3xl md:text-5xl ${dark ? 'text-ember' : 'text-ember'}`}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
