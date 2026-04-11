'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 md:p-24 selection:bg-[#CCFF00]/30 selection:text-[#CCFF00]">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#CCFF00] hover:opacity-80 mb-12 transition-opacity font-bold uppercase tracking-widest text-xs">
          <ArrowLeft className="w-4 h-4" /> Back to Landing Page
        </Link>
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="text-[#CCFF00] w-6 h-6" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">Terms of Service</h1>
        </div>

        <div className="space-y-12 text-gray-400 leading-relaxed font-medium">
          <section>
            <p className="text-xl text-white font-bold mb-6 italic">
              By accessing the website at kilo-landing.vercel.app, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
          </section>

          <section className="bg-[#2D2D2D]/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Kilo&apos;s website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section className="bg-[#2D2D2D]/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Disclaimer</h2>
            <p>
              The fitness tracking and AI suggestions provided by Kilo are for informational purposes only. Always consult with a healthcare professional before starting any new exercise program.
            </p>
          </section>

          <section className="bg-[#2D2D2D]/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Pakistan.
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
