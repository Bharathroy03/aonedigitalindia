'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, BadgePercent, Wrench, Headphones } from 'lucide-react';

const usps = [
  {
    icon: ShieldCheck,
    title: '100% Genuine Products',
    description: 'Direct authorizations from Apple, Samsung, LG, Whirlpool, etc. Official manufacturer warranty and GST invoice on every purchase.',
  },
  {
    icon: Users,
    title: '10,000+ Happy Customers',
    description: 'Serving local households for years. Renowned for our absolute customer satisfaction and advisors recommendation.',
  },
  {
    icon: BadgePercent,
    title: 'Zero Cost EMI Plans',
    description: 'Collaborations with major financial institutions (Bajaj Finserv, HDFC, ICICI) to provide interest-free monthly installments.',
  },
  {
    icon: Wrench,
    title: 'Free Setup & Delivery',
    description: 'We handle secure transit and structural installation of large home appliances for free inside our service zone.',
  },
  {
    icon: Headphones,
    title: 'Lifetime Support Assist',
    description: 'Our dedicated support desk coordinates directly with brand service centers on your behalf if any warranty claims arise.',
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section id="why-choose-us" className="py-24 bg-slate-950 text-white relative overflow-hidden" aria-label="Why choose us">
      {/* Decorative neon blur element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] -z-10" />

      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Description Column */}
          <div className="lg:col-span-5 text-left">
            <span className="text-blue-400 font-body text-sm font-bold uppercase tracking-wider">
              The Store USP
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
              Why Buy From Aone Digital India?
            </h2>
            <p className="font-display text-base text-slate-400 mb-10 italic leading-relaxed">
              "We believe purchasing electronics should be transparent, secure, and stress-free. Every service token we offer is tailored around providing peace of mind."
            </p>

            {/* Simulated Statistics widget */}
            <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8 font-body">
              <div>
                <div className="text-4xl font-extrabold text-blue-500">100%</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Genuine Guarantee</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-amber-500">0%</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Interest EMI Options</div>
              </div>
            </div>
          </div>

          {/* Right Cards List Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {usps.map((usp, idx) => {
              const IconComp = usp.icon;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex gap-5 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      {usp.title}
                    </h3>
                    <p className="text-sm text-slate-400 font-body leading-relaxed">
                      {usp.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
