'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Tag, Percent, Calendar } from 'lucide-react';

import offersFallback from '@/data/offers.json';
import { Button } from '@/components/ui/Button';

interface OffersSectionProps {
  offers?: any[];
}

export const OffersSection: React.FC<OffersSectionProps> = ({ offers: initialOffers }) => {
  const [offers, setOffers] = useState<any[]>(initialOffers || offersFallback);

  useEffect(() => {
    if (initialOffers) {
      setOffers(initialOffers);
    }
  }, [initialOffers]);

  return (
    <section id="offers" className="py-24 bg-white dark:bg-slate-950" aria-label="Featured offers">
      <div className="container-site">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 dark:text-blue-500 font-body text-sm font-bold uppercase tracking-wider">
            Limited Time Promotions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2">
            Exclusive Deals & EMI Offers
          </h2>
          <p className="font-display text-base text-slate-500 dark:text-slate-400 mt-4 italic">
            "Upgrade your home and lifestyle with premium deals. Benefit from zero-interest credit schemes and instant store cashbacks."
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {offers
            .filter((o) => o.active)
            .map((offer, idx) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between min-h-[380px] shadow-lg border border-slate-800"
              >
                {/* Background visual abstract design */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/50 via-slate-900 to-slate-950 opacity-90 -z-10" />
                <div className="absolute right-0 bottom-0 w-80 h-80 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 -z-10" />

                {/* Top Badge & Discount Label */}
                <div className="flex flex-wrap items-center gap-3 justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider font-body">
                    <Tag className="h-3.5 w-3.5" />
                    {offer.badge}
                  </span>
                  <span className="font-body text-2xl font-black text-amber-400 flex items-center gap-1">
                    <Percent className="h-5 w-5 shrink-0" />
                    {offer.discountLabel}
                  </span>
                </div>

                {/* Content */}
                <div className="my-8 text-left">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                    {offer.title}
                  </h3>
                  <p className="font-display text-lg text-slate-300 italic mb-2">
                    {offer.subtitle}
                  </p>
                  <p className="text-sm text-slate-400 font-body leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Bottom dates & CTA */}
                <div className="border-t border-white/10 pt-6 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-body">
                    <Calendar className="h-4 w-4 shrink-0 text-blue-500" />
                    <span>Valid until: {offer.validUntil}</span>
                  </div>
                  <Link href={offer.ctaLink} className="w-full sm:w-auto">
                    <Button
                      variant="gold"
                      size="sm"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      {offer.ctaText}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
