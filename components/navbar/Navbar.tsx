'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, MessageSquare } from 'lucide-react';

import navigationFallback from '@/data/navigation.json';
import socialsFallback from '@/data/socials.json';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  navItems?: any[];
  socialLinks?: any[];
}

export const Navbar: React.FC<NavbarProps> = ({
  navItems: initialNavItems,
  socialLinks: initialSocialLinks,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navItems, setNavItems] = useState<any[]>(initialNavItems || navigationFallback.main);
  const [whatsappNumber, setWhatsappNumber] = useState('91XXXXXXXXXX');
  const pathname = usePathname();

  useEffect(() => {
    if (initialNavItems) {
      setNavItems(initialNavItems);
    }
  }, [initialNavItems]);

  useEffect(() => {
    // Check WhatsApp link from socials
    const socials = initialSocialLinks || socialsFallback;
    const whatsapp = socials.find((s) => s.id === 'whatsapp');
    if (whatsapp) {
      const cleanPhone = whatsapp.url.replace('https://wa.me/', '');
      setWhatsappNumber(cleanPhone);
    }

    // Scroll listener for sticky header styling
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialSocialLinks]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full border-b',
          scrolled
            ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-4 shadow-sm border-slate-200/50 dark:border-slate-800/50'
            : 'bg-transparent py-6 border-transparent'
        )}
      >
        <div className="container-site flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group focus:outline-none">
            <span className="font-display text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-500 group-hover:scale-105 transition-transform duration-300">
              Aone
            </span>
            <span className="font-body text-lg font-extrabold uppercase tracking-widest text-slate-900 dark:text-white border-l border-slate-300 dark:border-slate-700 pl-2">
              Digital
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const hasDropdown = item.has_dropdown || item.hasDropdown;
              const dropdownItems = item.dropdown || [];

              return (
                <div key={item.id} className="relative group/nav">
                  <Link
                    href={item.href}
                    className={cn(
                      'px-4 py-2 text-sm font-semibold rounded-lg font-body flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                    )}
                  >
                    {item.label}
                    {hasDropdown && (
                      <ChevronDown className="h-4 w-4 opacity-70 group-hover/nav:rotate-180 transition-transform duration-300" />
                    )}
                  </Link>

                  {/* Dropdown menu */}
                  {hasDropdown && dropdownItems.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-2 shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300">
                      {dropdownItems.map((dropItem: any, idx: number) => (
                        <Link
                          key={idx}
                          href={dropItem.href}
                          className="block px-4 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-950 dark:hover:text-white transition-colors"
                        >
                          {dropItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={`https://wa.me/${whatsappNumber}?text=Hi%20Aone%20Digital,%20I'm%20interested%2520in%2520your%2520latest%2520offers.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="primary"
                size="sm"
                glow
                leftIcon={<MessageSquare className="h-4 w-4" />}
              >
                Inquire on WhatsApp
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-950 p-6 flex flex-col shadow-2xl h-full"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-xl font-bold text-blue-600">Aone Digital</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-600 dark:text-slate-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile links */}
              <nav className="flex flex-col gap-2 flex-grow overflow-y-auto pr-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const hasDropdown = item.has_dropdown || item.hasDropdown;
                  const dropdownItems = item.dropdown || [];

                  return (
                    <div key={item.id} className="flex flex-col">
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'px-4 py-3 text-base font-bold rounded-lg transition-colors flex items-center justify-between',
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                        )}
                      >
                        {item.label}
                      </Link>

                      {hasDropdown && dropdownItems.length > 0 && (
                        <div className="pl-6 border-l border-slate-100 dark:border-slate-800 ml-4 flex flex-col gap-1.5 py-1.5">
                          {dropdownItems.map((dropItem: any, idx: number) => (
                            <Link
                              key={idx}
                              href={dropItem.href}
                              onClick={() => setIsOpen(false)}
                              className="px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white rounded-md transition-colors"
                            >
                              {dropItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-slate-150 dark:border-slate-850">
                <Link
                  href={`https://wa.me/${whatsappNumber}?text=Hi%20Aone%20Digital,%20I'm%2520interested%2520in%2520your%2520latest%2520offers.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full block"
                >
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    leftIcon={<MessageSquare className="h-4 w-4" />}
                  >
                    Inquire on WhatsApp
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
