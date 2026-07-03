'use client';

import React, { useState, useEffect } from 'react';


import brandsFallback from '@/data/brands.json';

interface BrandsSectionProps {
  brands?: any[];
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ brands: initialBrands }) => {
  const [brands, setBrands] = useState<any[]>(initialBrands || brandsFallback);

  useEffect(() => {
    if (initialBrands) {
      setBrands(initialBrands);
    }
  }, [initialBrands]);

  // Double the array to make a seamless infinite loop marquee
  const marqueeItems = [...brands, ...brands];

  return (
    <section
      id="brands"
      className="py-12 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900 overflow-hidden"
      aria-label="Our partner brands"
    >
      <div className="container-site mb-6 text-center">
        <h2 className="font-body text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Authorized Dealer of Leading Global Brands
        </h2>
      </div>

      {/* Infinite scrolling marquee wrapper */}
      <div className="relative flex w-full overflow-hidden whitespace-nowrap mask-marquee">
        <div className="flex gap-16 items-center animate-marquee whitespace-nowrap min-w-full justify-around py-4">
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex flex-col items-center justify-center min-w-[120px] select-none group"
            >
              {/* Display text name in elegant display serif or bold sans depending on design */}
              <span className="font-display text-2xl font-bold tracking-tight text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300">
                {brand.name}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-700 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {brand.category ? brand.category[0] : 'electronics'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .mask-marquee {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BrandsSection;
