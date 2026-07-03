'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

import faqFallback from '@/data/faq.json';

interface FAQSectionProps {
  faqs?: any[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs: initialFaqs }) => {
  const [faqs, setFaqs] = useState<any[]>(initialFaqs || faqFallback);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (initialFaqs) {
      setFaqs(initialFaqs);
    }
  }, [initialFaqs]);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-900/50" aria-label="Frequently asked questions">
      <div className="container-site max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 dark:text-blue-500 font-body text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Support Center
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2">
            Questions & Answers
          </h2>
          <p className="font-display text-base text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto italic">
            "Find immediate answers regarding product warranty, payment options, exchange policies, and home delivery service."
          </p>
        </div>

        {/* Accordions Container */}
        <div className="flex flex-col gap-4">
          {faqs
            .filter((f) => f.active !== false)
            .map((item, idx) => {
              const isOpen = openId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-sm hover:border-slate-350 dark:hover:border-slate-700 transition-colors"
                >
                  <button
                    onClick={() => toggleOpen(item.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none group/btn"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-500 transition-colors">
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 shrink-0 ml-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blue-600 dark:text-blue-500' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1.5 text-sm text-slate-650 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-900 font-body text-left">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
