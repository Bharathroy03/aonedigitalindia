import React from 'react';
import Link from 'next/link';
import { FileQuestion, Home, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.04),transparent_50%)]" />

      <div className="max-w-md w-full text-center relative z-10 p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        {/* Help Circle Icon Container */}
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/5">
          <FileQuestion className="h-8 w-8" />
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl font-extrabold text-white tracking-tight mb-3">
          404
        </h1>
        <h2 className="font-display text-lg font-bold text-slate-200 tracking-tight mb-3">
          Page Not Found
        </h2>
        
        {/* Sub-text */}
        <p className="font-body text-sm text-slate-400 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="gold"
              className="w-full flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>

        {/* Support Help link */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-center gap-2 text-xs text-slate-500">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Questions? Contact showroom advisory desk.</span>
        </div>
      </div>
    </div>
  );
}
