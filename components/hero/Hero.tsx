'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Smartphone, Waves } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { GridBackground, MeshGradient } from '@/components/ui/Backgrounds';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-slate-950 text-white"
      role="banner"
      aria-label="Aone Digital India Showcase Hero"
    >
      {/* Dynamic visual backgrounds */}
      <GridBackground size={48} color="rgba(59, 130, 246, 0.08)" className="opacity-60" />
      <MeshGradient colors={['rgba(37, 99, 235, 0.25)', 'rgba(124, 58, 237, 0.15)', 'rgba(236, 72, 153, 0.1)']} />

      {/* Radial fade mask for grid layout */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 pointer-events-none" />

      <div className="container-site relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 font-body"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Premium Electronics Destination
          </motion.div>

          {/* Headline (Libre Caslon Text) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
          >
            Ethos, Elegance & <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
              Exceptional Tech.
            </span>
          </motion.h1>

          {/* Subheading (Libre Caslon for elegance) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-lg sm:text-xl text-slate-355 leading-relaxed mb-10 max-w-xl italic text-slate-300"
          >
            "Curating the finest mobile smartphones and premium home appliances for modern living. Where genuine brand partnership meets absolute customer dedication."
          </motion.p>

          {/* Interactive CTA buttons (Plus Jakarta Sans) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <Link href="/categories" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                glow
                fullWidth
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Browse Collections
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="glass" size="lg" fullWidth>
                Visit Store
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Showcase Column (floating mockup cards) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[400px] aspect-[4/5]"
          >
            {/* Background glowing orb */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[80px] -z-10" />

            {/* Smart Phone Showcase Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[10%] left-[5%] w-[75%] aspect-[9/16] rounded-[24px] bg-slate-900/80 border border-white/10 p-4 backdrop-blur-md shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              <div className="flex justify-between items-center text-xs text-slate-500 font-body">
                <span>Showcase</span>
                <Smartphone className="h-4 w-4 text-blue-400" />
              </div>
              <div className="my-auto text-left">
                <div className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1 font-body">Featured Brand</div>
                <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight">Apple iPhone 16 Pro Max</h3>
                <p className="text-xs text-slate-400 font-body leading-relaxed">Experience ultimate control with Camera Capture buttons.</p>
              </div>
              <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                <span className="text-sm font-bold font-body text-white">₹1,39,900</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold uppercase tracking-wider font-body">Explore</span>
              </div>
            </motion.div>

            {/* Home Appliance Showcase Card (overlap) */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-[10%] right-[5%] w-[65%] aspect-[1/1] rounded-[24px] bg-slate-900/60 border border-white/10 p-5 backdrop-blur-md shadow-2xl flex flex-col justify-between text-left"
            >
              <div className="flex justify-between items-center text-xs text-slate-500 font-body">
                <span>Living</span>
                <Waves className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1 font-body">Eco Bubble</div>
                <h4 className="font-display text-lg font-bold text-white leading-tight">Samsung AI Washing Machine</h4>
              </div>
              <div className="border-t border-white/5 pt-2 flex justify-between items-center">
                <span className="text-xs font-bold text-white font-body">₹38,999</span>
                <span className="text-[10px] text-slate-400 font-body">5 Star Rating</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating scroll down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-widest font-body font-semibold">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-3 rounded-full bg-white"
        />
      </div>
    </section>
  );
};

export default Hero;
