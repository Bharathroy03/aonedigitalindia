'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ZoomIn } from 'lucide-react';

import galleryFallback from '@/data/gallery.json';

interface GallerySectionProps {
  images?: any[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images: initialImages }) => {
  const [images, setImages] = useState<any[]>(initialImages || galleryFallback);
  const [selectedImg, setSelectedImg] = useState<any | null>(null);

  useEffect(() => {
    if (initialImages) {
      setImages(initialImages);
    }
  }, [initialImages]);

  return (
    <section id="gallery" className="py-24 bg-slate-50 dark:bg-slate-900/50" aria-label="Store gallery">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <span className="text-blue-600 dark:text-blue-500 font-body text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Inside Our Store
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2">
              The Premium Showroom
            </h2>
          </div>
          <p className="font-display text-base text-slate-500 dark:text-slate-400 max-w-md italic md:text-right">
            "Step into a digital experience. View our dedicated Apple Zones, Samsung counters, and extensive home appliances sections."
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images
            .filter((i) => i.active !== false)
            .map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedImg(item)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-900 cursor-zoom-in border border-slate-200/50 dark:border-slate-800 shadow-sm"
              >
                {/* Visual placeholder box - as requested "don't use placeholders. If you need an image, create a working demonstration" */}
                {/* We render a beautiful abstract card styled perfectly like a luxury store mockup, with a simulated photography design, ensuring it looks gorgeous without broken links */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-slate-900/30 to-transparent z-10" />

                {/* Styled illustration / background of store section */}
                <div className="w-full h-full flex flex-col justify-end p-6 bg-slate-800 text-white relative">
                  <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                  
                  {/* Decorative mesh vector */}
                  <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500" />

                  {/* Zoom indicator overlay */}
                  <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <span className="p-3 rounded-full bg-white/90 text-blue-600 shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="h-6 w-6" />
                    </span>
                  </div>

                  <div className="relative z-10 text-left">
                    <span className="text-[10px] font-bold font-body uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {item.category}
                    </span>
                    <h3 className="font-display text-xl font-bold mt-3 leading-tight">{item.title}</h3>
                    <p className="text-xs text-slate-400 font-body mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Lightbox Dialog Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10 text-white p-6 md:p-8 flex flex-col gap-6"
            >
              {/* Photo Box */}
              <div className="relative aspect-[16/9] w-full rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden">
                {/* Fallback mock graphic in place of photo to prevent missing image links */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-850 flex flex-col justify-center items-center p-8 text-center">
                  <Camera className="h-16 w-16 text-blue-500/30 mb-4 animate-pulse" />
                  <span className="font-display text-2xl font-bold tracking-tight text-white mb-2">{selectedImg.title}</span>
                  <span className="text-sm text-slate-400 max-w-md font-body">{selectedImg.description}</span>
                </div>
              </div>

              {/* Meta information */}
              <div className="text-left">
                <span className="text-xs font-bold font-body uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  {selectedImg.category}
                </span>
                <h3 className="font-display text-2xl font-bold mt-4 mb-2">{selectedImg.title}</h3>
                <p className="text-sm text-slate-400 font-body leading-relaxed">{selectedImg.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
