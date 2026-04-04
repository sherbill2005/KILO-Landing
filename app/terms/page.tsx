'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Landing Page
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        </div>

        <div className="space-y-8 text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Kilo mobile application and website, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p>
              Kilo is a voice-first workout tracking application currently in development. 
              We provide tools to help users log their physical training sessions using voice recognition technology.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. User Responsibilities</h2>
            <p>
              You are responsible for your own physical safety while using Kilo. 
              Always prioritize proper form and safety over app interaction. 
              Kilo is not a medical device and does not provide professional medical advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Intellectual Property</h2>
            <p>
              All content, features, and functionality of Kilo are the exclusive property of the developer. 
              You may not reproduce, distribute, or create derivative works without explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
            <p>
              Kilo is provided &quot;as is&quot; without any warranties. 
              The developer shall not be liable for any injuries, data loss, or damages resulting from the use of the application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. 
              Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <div className="pt-12 border-t border-white/10 text-sm text-gray-600">
            Last updated: April 2, 2026
          </div>
        </div>
      </div>
    </div>
  );
}
