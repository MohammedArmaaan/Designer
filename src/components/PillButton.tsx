import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'light';
  href?: string;
}

export function PillButton({
  children,
  variant = 'solid',
  href,
  className = '',
  ...rest
}: PillButtonProps) {
  const base =
    'group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 active:scale-95';
  const variants = {
    solid:
      'bg-ink text-cream hover:bg-ember hover:text-white',
    outline:
      'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream',
    light:
      'bg-cream/10 text-cream border border-cream/20 hover:bg-cream hover:text-ink',
  } as const;

  const content = (
    <>
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {content}
      </a>
    );
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {content}
    </button>
  );
}
