'use client';

import React from 'react';

import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

import contactFallback from '@/data/contact.json';
import ContactForm from './ContactForm';

interface ContactSectionProps {
  productList?: any[];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ productList }) => {
  const company = contactFallback.company;
  const hours = contactFallback.businessHours;

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950" aria-label="Contact us">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column - Contact Details */}
          <div className="lg:col-span-5 text-left">
            <span className="text-blue-600 dark:text-blue-500 font-body text-sm font-bold uppercase tracking-wider">
              Get in Touch
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-6">
              Connect With Us
            </h2>
            <p className="font-display text-base text-slate-500 dark:text-slate-400 mb-10 italic leading-relaxed">
              "We welcome you to visit our premium showroom to experience flagship devices first hand. Contact our advisory advisors for quick answers."
            </p>

            {/* Quick Details Cards */}
            <div className="space-y-6 mb-8">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-body text-xs font-bold uppercase tracking-wider text-slate-400">Call/WhatsApp</h4>
                  <Link href={`tel:${company.phone}`} className="font-display text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {company.phone}
                  </Link>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-body text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</h4>
                  <Link href={`mailto:${company.email}`} className="font-display text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block max-w-xs sm:max-w-none">
                    {company.email}
                  </Link>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-body text-xs font-bold uppercase tracking-wider text-slate-400">Showroom Address</h4>
                  <p className="font-display text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-semibold">
                    {company.address.full}
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-450">
              <h4 className="font-body text-xs font-bold uppercase tracking-wider text-slate-450 mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <Clock className="h-4 w-4 text-blue-500" />
                Showroom Timings
              </h4>
              <div className="space-y-2.5 text-sm font-body">
                {hours.map((h, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="font-medium">{h.day}</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {h.closed ? 'Closed' : `${h.open} AM - ${h.close} PM`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm productList={productList} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
