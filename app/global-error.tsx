'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans antialiased text-slate-350">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
          {/* Warning Icon Container */}
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/5">
            <AlertTriangle className="h-8 w-8" />
          </div>

          {/* Heading */}
          <h1 className="font-display text-2xl font-bold text-white tracking-tight mb-3">
            Critical Global Error
          </h1>
          
          {/* Sub-text */}
          <p className="text-sm text-slate-400 mb-8 leading-relaxed">
            A critical system-level exception occurred inside the application's root layout structure.
          </p>

          {/* CTA Actions */}
          <div className="flex justify-center">
            <Button
              onClick={() => reset()}
              variant="gold"
              className="flex items-center justify-center gap-2 group"
            >
              <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
              Reset System Layout
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
