'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 md:p-24 selection:bg-[#CCFF00]/30 selection:text-[#CCFF00]">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#CCFF00] hover:opacity-80 mb-12 transition-opacity font-bold uppercase tracking-widest text-xs">
          <ArrowLeft className="w-4 h-4" /> Back to Landing Page
        </Link>
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-2xl flex items-center justify-center">
            <RotateCcw className="text-[#CCFF00] w-6 h-6" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">Refund Policy</h1>
        </div>

        <div className="space-y-12 text-gray-400 leading-relaxed font-medium">
          <section>
            <p className="text-xl text-white font-bold mb-6 italic">
              Thank you for supporting the development of Kilo.
            </p>
          </section>

          <section className="bg-[#2D2D2D]/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Digital Products & Subscriptions</h2>
            <p>
              Because our products are digital software delivered via internet download or cloud access, we generally offer a no-refund policy. Once the service is accessed or the support donation is made, it is considered consumed.
            </p>
          </section>

          <section className="bg-[#2D2D2D]/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Exceptions</h2>
            <p>
              We believe in fairness. If you have experienced a technical issue that prevented you from using the service, please contact us within 7 days of purchase, and we will review your case for a manual refund.
            </p>
          </section>

          <section className="bg-[#2D2D2D]/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Contact for Refunds</h2>
            <p>
              If you require a refund or have any questions, please contact us at: <span className="text-[#CCFF00] font-bold">sherbill2005@gmail.com</span>
            </p>
          </section>

          <div className="pt-12 border-t border-white/5 text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">
            Last updated: April 11, 2026
          </div>
        </div>
      </div>
    </div>
  );
}
