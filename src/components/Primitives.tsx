import { type ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface SectionTagProps {
  index: string;
  label: string;
  dark?: boolean;
}

export function SectionTag({ index, label, dark = false }: SectionTagProps) {
  return (
    <div
      className={`flex items-center gap-3 text-xs font-medium tracking-ultra uppercase ${
        dark ? 'text-cream/60' : 'text-ink/50'
      }`}
    >
      <span className="font-display">{index}</span>
      <span className="h-px w-8 bg-current opacity-40" />
      <span>{label}</span>
    </div>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
