'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

import testimonialsFallback from '@/data/testimonials.json';

interface TestimonialsSectionProps {
  reviews?: any[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ reviews: initialReviews }) => {
  const [reviews, setReviews] = useState<any[]>(initialReviews || testimonialsFallback);

  useEffect(() => {
    if (initialReviews) {
      setReviews(initialReviews);
    }
  }, [initialReviews]);

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-950" aria-label="Customer testimonials">
      <div className="container-site">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 dark:text-blue-500 font-body text-sm font-bold uppercase tracking-wider">
            Customer Reviews
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2">
            Trusted by Thousands
          </h2>
          <p className="font-display text-base text-slate-500 dark:text-slate-400 mt-4 italic">
            "Read customer testimonials from verified buyers who bought their smartphones and home appliances from our showroom."
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews
            .filter((r) => r.active !== false)
            .map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-3xl bg-slate-50 dark:bg-slate-900 p-8 flex flex-col justify-between shadow-sm border border-slate-100 dark:border-slate-850 hover:shadow-lg transition-all duration-300"
              >
                {/* Quote Icon background decoration */}
                <div className="absolute right-6 top-6 text-slate-200/50 dark:text-slate-800/30 group-hover:text-blue-500/10 transition-colors duration-500">
                  <Quote className="h-12 w-12" />
                </div>

                <div className="text-left relative z-10">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-6 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4.5 w-4.5 ${
                          i < item.rating ? 'fill-amber-400' : 'text-slate-350 dark:text-slate-800'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="font-display text-base text-slate-700 dark:text-slate-300 italic leading-relaxed mb-6">
                    "{item.review}"
                  </p>
                </div>

                {/* Customer Details */}
                <div className="border-t border-slate-200/60 dark:border-slate-800 pt-5 flex items-center gap-4 text-left">
                  {/* Avatar fallback letter */}
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-body font-bold flex items-center justify-center shrink-0 shadow-md">
                    {item.name[0]}
                  </div>

                  <div className="truncate">
                    <h4 className="font-body text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {item.name}
                      {item.verified && (
                        <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" aria-label="Verified Buyer" />
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body">
                      {item.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
