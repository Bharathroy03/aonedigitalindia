'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log exception to logging services
    console.error('[Application Exception Boundary]:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.04),transparent_50%)]" />

      <div className="max-w-md w-full text-center relative z-10 p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        {/* Warning Icon Container */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/5">
          <AlertTriangle className="h-8 w-8" />
        </div>

        {/* Heading */}
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
          Application Error
        </h1>
        
        {/* Sub-text */}
        <p className="font-body text-sm text-slate-400 mb-8 leading-relaxed">
          An unexpected exception occurred while rendering this page. Our engineers have been alerted.
        </p>

        {/* Details Card */}
        {error.message && (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left font-mono text-xs text-slate-500 max-h-32 overflow-y-auto mb-8 leading-normal scrollbar-thin">
            <span className="text-amber-500 font-semibold">Error:</span> {error.message}
            {error.digest && (
              <div className="mt-1 text-[10px] text-slate-600">Digest: {error.digest}</div>
            )}
          </div>
        )}

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Button
            onClick={() => reset()}
            variant="gold"
            className="w-full sm:w-auto flex items-center justify-center gap-2 group"
          >
            <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
            Try Again
          </Button>
          
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 text-slate-350 hover:text-white"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>

        {/* Support Help link */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-center gap-2 text-xs text-slate-500">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Need help? Contact support advisors.</span>
        </div>
      </div>
    </div>
  );
}
