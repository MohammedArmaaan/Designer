'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, IMAGES } from '@/data'; 

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      // THE FIX: 'absolute' instead of 'fixed'. 
      // It stays perfectly at the top of the page and scrolls away with the Hero section!
      className="absolute top-0 inset-x-0 z-50 bg-transparent"
    >
      <nav className="mx-auto max-w-[1600px] px-6 md:px-10 h-20 md:h-24 flex items-center justify-between relative">
        
        {/* 1. LOGO (Left) */}
        {/* Text is always cream (white) because it only lives over the dark hero */}
        <a href="#top" className="flex items-center gap-2 text-cream hover:opacity-70 transition-opacity z-20">
          <div className="flex gap-[3px]">
            <div className="w-2 h-2 bg-cream" />
            <div className="w-2 h-2 bg-cream" />
            <div className="w-2 h-2 bg-cream" />
          </div>
          <span className="font-display text-xl md:text-2xl font-bold tracking-widest uppercase">
            Fuel<span className="text-[10px] align-top relative -top-0.5">®</span>
          </span>
        </a>

        {/* 2. CENTER NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 absolute left-1/2 -translate-x-1/2">
          <a href="#top" className="text-[13px] font-medium text-cream hover:opacity-60 transition-opacity flex items-start gap-1">
            Home <span className="text-[9px] opacity-60 font-mono mt-0.5">01</span>
          </a>
          
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-cream hover:opacity-60 transition-opacity flex items-start gap-1"
            >
              {l.label}
              <span className="text-[9px] opacity-60 font-mono mt-0.5">
                0{i + 2}
              </span>
            </a>
          ))}
        </div>

        {/* 3. RIGHT WIDGET (Meet the CEO Card) */}
        <div className="hidden md:flex z-20">
          <a 
            href="#about" 
            className="flex items-center gap-3 bg-white p-1.5 pr-5 rounded-[18px] shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-black/5 hover:scale-105 transition-transform"
          >
            <img 
              src={IMAGES.ceoPortrait} 
              alt="CEO" 
              className="w-11 h-11 rounded-xl object-cover"
            />
            <div className="flex flex-col min-w-[100px]">
              <div className="flex justify-between items-start">
                <span className="text-[12px] font-bold text-ink leading-none">Meet the CEO</span>
                <div className="w-1.5 h-1.5 bg-ink rounded-sm" />
              </div>
              <span className="text-[11px] font-medium text-ink/70 mt-1.5 leading-none">Lousiana KD6</span>
              <span className="text-[9px] text-ink/40 mt-0.5 uppercase tracking-wide leading-none">CEO</span>
            </div>
          </a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden p-2 -mr-2 text-cream z-20"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-ink border-t border-cream/10 px-6 py-8 flex flex-col gap-6 absolute top-full left-0 w-full shadow-2xl">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-xl font-medium text-cream hover:text-white flex items-start gap-2"
            >
              {l.label}
              <span className="text-xs opacity-50 font-mono mt-1">
                0{i + 1}
              </span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}