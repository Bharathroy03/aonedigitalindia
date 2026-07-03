'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

import footerFallback from '@/data/footer.json';
import socialsFallback from '@/data/socials.json';

// Mapping icons dynamically by string name
const iconMap: Record<string, React.ComponentType<any>> = {
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
};

interface FooterProps {
  socialLinks?: any[];
}

export const Footer: React.FC<FooterProps> = ({ socialLinks: initialSocialLinks }) => {
  const [socialLinks, setSocialLinks] = useState<any[]>(initialSocialLinks || socialsFallback);

  useEffect(() => {
    if (initialSocialLinks) {
      setSocialLinks(initialSocialLinks);
    }
  }, [initialSocialLinks]);

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8" role="contentinfo" aria-label="Site footer">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info Column */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-blue-500">
                Aone
              </span>
              <span className="font-body text-lg font-extrabold uppercase tracking-widest text-white border-l border-slate-800 pl-2">
                Digital
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              {footerFallback.brand.description}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks
                .filter((s) => s.active)
                .map((social) => {
                  const IconComp = iconMap[social.icon] || Facebook;
                  return (
                    <Link
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white transition-all hover:scale-110"
                      aria-label={social.label}
                    >
                      <IconComp className="h-5 w-5" />
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* Navigation Links Columns */}
          {footerFallback.linkGroups.map((group) => (
            <div key={group.id} className="flex flex-col gap-4">
              <h3 className="font-body text-sm font-bold text-white uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm">
                {group.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors hover:underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Details Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-body text-sm font-bold text-white uppercase tracking-wider">
              Store Location
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Aone Digital India</strong>
                  <br />
                  [Store Address Placeholder], City, State - PIN Code
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                <Link href="tel:+91XXXXXXXXXX" className="hover:text-white transition-colors">
                  +91 XXXXX XXXXX
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <Link href="mailto:info@aonedigitalindia.com" className="hover:text-white transition-colors">
                  info@aonedigitalindia.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom copyright and legal */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            {footerFallback.copyright}
          </p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            {footerFallback.legal.map((item, idx) => (
              <Link key={idx} href={item.href} className="hover:text-slate-400 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
