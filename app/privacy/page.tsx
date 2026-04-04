'use client';

import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Landing Page
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Lock className="text-white w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        </div>

        <div className="space-y-8 text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Data Collection</h2>
            <p>
              Kilo is designed with privacy in mind. We collect minimal personal data. 
              If you join our waitlist, we store your email address and name. 
              We do not sell or share this information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Voice Recognition</h2>
            <p>
              Voice recognition processing happens on your device whenever possible. 
              We do not store audio recordings of your workout sessions on our servers. 
              We only process the text commands to log your training data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Training Data</h2>
            <p>
              Your workout logs (sets, reps, weights, exercises) are stored to provide you with progress tracking and analytics. 
              This data is kept secure and is only accessible by you through your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Third-Party Services</h2>
            <p>
              We use standard analytics tools to improve the application&apos;s performance. 
              These tools may collect anonymous usage data such as device type and session duration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal data. 
              If you wish to delete your account or waitlist entry, please contact us at support@kilo.app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. 
              However, no method of transmission over the internet is 100% secure.
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
