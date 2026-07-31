'use client';

import { IMAGES } from '@/data'; // Adjust path if needed

// ─── EXACT DATA FROM YOUR IMAGE ─────────────────────────────
const ARCHIVE_DATA = [
  {
    year: '2025',
    title: 'Outside',
    thumbnails: [
      IMAGES.portfolio?.[0]?.img || 'https://images.unsplash.com/photo-1512413914406-88fb735f4229?q=80&w=200&auto=format&fit=crop'
    ]
  },
  {
    year: '2024',
    title: 'Juvede',
    thumbnails: [
      IMAGES.portfolio?.[1]?.img || 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=200&auto=format&fit=crop',
      IMAGES.portfolio?.[2]?.img || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop',
      IMAGES.portfolio?.[3]?.img || 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=200&auto=format&fit=crop'
    ]
  },
  {
    year: '2025',
    title: 'Zaine',
    thumbnails: [
      IMAGES.portfolio?.[4]?.img || 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=200&auto=format&fit=crop'
    ]
  },
  {
    year: '2024',
    title: 'Wall Out',
    thumbnails: [
      IMAGES.portfolio?.[5]?.img || 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=200&auto=format&fit=crop',
      IMAGES.portfolio?.[0]?.img || 'https://images.unsplash.com/photo-1449247666642-264389f5f5b1?q=80&w=200&auto=format&fit=crop'
    ]
  },
  {
    year: '2019',
    title: 'Geaton',
    thumbnails: [
      IMAGES.portfolio?.[1]?.img || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      IMAGES.portfolio?.[2]?.img || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      IMAGES.portfolio?.[3]?.img || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    ]
  },
  {
    year: '2020',
    title: 'Skate',
    thumbnails: [
      IMAGES.portfolio?.[4]?.img || 'https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?q=80&w=200&auto=format&fit=crop'
    ]
  }
];

export function Archive() {
  return (
    <section id="archive" className="relative z-20 py-20 md:py-32 bg-white text-black overflow-hidden">
      
      {/* ── Top Header Row ── */}
      <div className="w-full border-t border-black/15" />
      <div className="grid grid-cols-3 items-start text-[11px] font-semibold tracking-wide uppercase px-6 md:px-10 max-w-[1600px] mx-auto pt-8 mb-16 md:mb-24 text-black">
        <div className="flex items-center gap-1">
          <span className="text-[9px]">✦</span>
          <span>(06)</span>
        </div>
        <div className="text-center hidden md:block">
          <span>(Archive)</span>
        </div>
        <div className="text-right text-black/80">
          <span>© 2025</span>
        </div>
      </div>

      {/* ── List Layout Container ── */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        
        {/* Table/List Wrapper */}
        <div className="flex flex-col border-b border-black/15">
          {ARCHIVE_DATA.map((item, index) => (
            <a
              key={index}
              href="#contact"
              className="group relative flex items-center border-t border-black/15 py-6 md:py-8 transition-colors hover:bg-black/[0.02]"
            >
              {/* Row Grid */}
              <div className="grid grid-cols-12 w-full items-center">
                
                {/* 1. Year Column (Matches the left spacing in your image) */}
                <div className="col-span-3 lg:col-span-4">
                  <span className="text-[13px] md:text-[14px] font-semibold tracking-wider text-black">
                    {item.year}
                  </span>
                </div>
                
                {/* 2. Project Title Column (Big Typography) */}
                <div className="col-span-5 lg:col-span-4">
                  <h3 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-black leading-none">
                    {item.title}
                  </h3>
                </div>

                {/* 3. Static Thumbnails with Hover Zoom (Right Side) */}
                <div className="col-span-4 lg:col-span-4 flex justify-end items-center gap-2 lg:gap-3">
                  {item.thumbnails.map((thumb, tIdx) => (
                    // The container hides the overflow when the image scales up
                    <div 
                      key={tIdx} 
                      className="overflow-hidden rounded-md md:rounded-lg w-16 md:w-20 lg:w-28 aspect-[3/2] shadow-sm border border-black/5 bg-[#f5f5f5]"
                    >
                      <img
                        src={thumb}
                        alt={`${item.title} thumbnail ${tIdx + 1}`}
                        // group-hover:scale-110 applies the smooth zoom effect when the ROW is hovered!
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                
              </div>
            </a>
          ))}
        </div>
        
      </div>
    </section>
  );
}