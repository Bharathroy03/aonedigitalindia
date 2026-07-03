'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Smartphone, Waves, Tv, Wind, Laptop, Headphones, Watch, ArrowUpRight } from 'lucide-react';

import categoriesFallback from '@/data/categories.json';

// Mapping icons by string key
const iconMap: Record<string, React.ComponentType<any>> = {
  Smartphone,
  Waves, // washing machines
  Refrigerator: Waves, // fallback Refrigerator
  Tv,
  Wind, // air conditioners
  Laptop,
  Headphones,
  Watch,
};

interface CategoriesSectionProps {
  categories?: any[];
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories: initialCategories }) => {
  const [categories, setCategories] = useState<any[]>(initialCategories || categoriesFallback);

  useEffect(() => {
    if (initialCategories) {
      setCategories(initialCategories);
    }
  }, [initialCategories]);

  return (
    <section id="categories" className="py-24 bg-slate-50 dark:bg-slate-900/50" aria-label="Product categories">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <span className="text-blue-600 dark:text-blue-500 font-body text-sm font-bold uppercase tracking-wider">
              Browse Collections
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2">
              Shop by Category
            </h2>
          </div>
          <p className="font-display text-base text-slate-500 dark:text-slate-400 max-w-md italic md:text-right">
            "Discover premium, high-performance electronics crafted by global manufacturers to elevate your comfort and utility."
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories
            .filter((c) => c.featured)
            .map((cat, idx) => {
              const IconComp = iconMap[cat.icon] || Smartphone;

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative h-72 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Decorative background hover glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full group-hover:scale-150 transition-transform duration-500" />

                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <IconComp className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="text-left mt-auto">
                    <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-body leading-relaxed mb-4">
                      {cat.description}
                    </p>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold font-body text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group/link"
                    >
                      Explore Products
                      <ArrowUpRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
