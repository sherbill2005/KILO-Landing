'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  Zap, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Twitter, 
  Instagram
} from 'lucide-react';
import Link from 'next/link';
import {
  GOOGLE_WAITLIST_STORAGE_KEY,
  signInWithGoogle,
} from '@/lib/supabase/auth';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { ensureWaitlistEmail, submitWaitlistEmail } from '@/lib/waitlist';

// --- Components ---

const InteractiveDemo = () => {
  const [step, setStep] = useState<'hook' | 'listening' | 'success'>('hook');
  const [text, setText] = useState('');
  const fullText = "Now Say: 3 sets of 10 reps Bench Press";

  useEffect(() => {
    if (step === 'listening') {
      let i = 0;
      setText('');
      const interval = setInterval(() => {
        setText(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) clearInterval(interval);
      }, 50);

      const timer = setTimeout(() => {
        setStep('success');
      }, 3500);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [step]);

  return (
    <div className="relative group w-full max-w-[320px] mx-auto">
      <div className="absolute -inset-4 bg-[#CCFF00]/10 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
      <div className="relative rounded-[3rem] border-[12px] border-[#2D2D2D] bg-[#0A0A0C] overflow-hidden shadow-2xl shadow-[#CCFF00]/10 aspect-[9/19.5] flex flex-col items-center justify-center p-8 border-white/10">
        <AnimatePresence mode="wait">
          {step === 'hook' && (
            <motion.div
              key="hook"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute -inset-8 bg-[#CCFF00]/20 blur-2xl rounded-full"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setStep('listening')}
                  className="relative w-24 h-24 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] border-4 border-white/10"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
                </motion.button>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-white font-black text-xl tracking-tighter uppercase italic">Tap to Log via Voice</p>
                <p className="text-[#CCFF00] text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">Ready to train</p>
              </div>
            </motion.div>
          )}

          {step === 'listening' && (
            <motion.div
              key="listening"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="flex flex-col items-center gap-12 w-full"
            >
              <div className="flex items-center justify-center gap-1.5 h-16">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [15, 60, 15],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.4 + Math.random() * 0.4,
                      delay: i * 0.05,
                    }}
                    className="w-1.5 rounded-full bg-gradient-to-t from-[#CCFF00] via-[#CCFF00] to-white"
                  />
                ))}
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none text-center px-4 min-h-[4rem]">
                {text}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="inline-block w-1.5 h-8 bg-[#CCFF00] ml-1 align-middle"
                />
              </h3>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-between h-full w-full pt-12 pb-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 10, stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-[#CCFF00] flex items-center justify-center shadow-[0_0_40px_rgba(204,255,0,0.3)]"
              >
                <CheckCircle2 className="text-black w-12 h-12 stroke-[3]" />
              </motion.div>

              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 150, delay: 0.2 }}
                className="w-full bg-[#2D2D2D]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 text-left shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4">
                  <div className="flex items-center gap-1.5 bg-[#CCFF00]/10 px-2 py-1 rounded-full border border-[#CCFF00]/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                    <span className="text-[8px] text-[#CCFF00] font-black uppercase tracking-widest">Kilo AI</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mb-2">Exercise</p>
                  <p className="text-2xl font-black text-white tracking-tighter uppercase italic">Bench Press</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mb-2">Details</p>
                    <p className="text-lg font-black text-white tracking-tighter">3 × 10 <span className="text-xs text-gray-500">REPS</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mb-2">Weight</p>
                    <p className="text-lg font-black text-[#CCFF00] tracking-tighter">100 <span className="text-xs opacity-60">KG</span></p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <p className="text-[10px] text-gray-400 font-bold italic">Logged via Kilo AI</p>
                  <button 
                    onClick={() => setStep('hook')}
                    className="text-[10px] font-black text-[#CCFF00] uppercase tracking-widest hover:opacity-80 transition-opacity"
                  >
                    Reset
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-[#2D2D2D] border border-white/5 shadow-[0_0_15px_rgba(204,255,0,0.15)]">
          <Image 
            src="/images/logo.jpg" 
            alt="Kilo Official Logo" 
            fill
            className="object-contain p-1"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">KILO</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm text-gray-400 hover:text-[#CCFF00] transition-colors">Features</a>
        <a href="#support" className="text-sm text-gray-400 hover:text-[#CCFF00] transition-colors">Support</a>
        <a href="#waitlist" className="bg-[#CCFF00] text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-[#CCFF00]/90 transition-colors">
          Join Waitlist
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const processGoogleWaitlistReturn = async () => {
      if (typeof window === 'undefined') {
        return;
      }

      const hasPendingGoogleWaitlist =
        window.sessionStorage.getItem(GOOGLE_WAITLIST_STORAGE_KEY) === 'true';

      if (!hasPendingGoogleWaitlist) {
        return;
      }

      const supabase = getSupabaseBrowserClient();

      const finalizeWaitlistJoin = async (userEmail?: string | null) => {
        if (!isMounted) {
          return;
        }

        if (!userEmail) {
          setSubmitError("We couldn't read your Google email address. Please try another sign-in method.");
          return;
        }

        const result = await ensureWaitlistEmail(supabase, userEmail);

        if (!isMounted) {
          return;
        }

        if (!result.success) {
          setSubmitError(result.error);
          return;
        }

        setSubmitted(true);
        setSubmitError(null);
      };

      setSubmitError(null);
      setIsGoogleSubmitting(true);

      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        await finalizeWaitlistJoin(user?.email);
      } catch {
        if (isMounted) {
          setSubmitError("Google sign-in worked, but we couldn't finish your waitlist signup. Please try again.");
        }
      } finally {
        if (typeof window !== 'undefined') {
          window.sessionStorage.removeItem(GOOGLE_WAITLIST_STORAGE_KEY);
          window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
        }

        if (isMounted) {
          setIsGoogleSubmitting(false);
        }
      }
    };

    processGoogleWaitlistReturn();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const result = await submitWaitlistEmail(supabase, email);

      if (!result.success) {
        setSubmitError(result.error);
        return;
      }

      setEmail('');
      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't connect to the waitlist right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (typeof window === 'undefined') {
      return;
    }

    setSubmitError(null);
    setIsGoogleSubmitting(true);

    try {
      const supabase = getSupabaseBrowserClient();
      window.sessionStorage.setItem(GOOGLE_WAITLIST_STORAGE_KEY, 'true');

      const { error } = await signInWithGoogle(supabase, window.location.origin);

      if (error) {
        window.sessionStorage.removeItem(GOOGLE_WAITLIST_STORAGE_KEY);
        setSubmitError("We couldn't start Google sign-in. Please try again.");
        setIsGoogleSubmitting(false);
      }
    } catch {
      window.sessionStorage.removeItem(GOOGLE_WAITLIST_STORAGE_KEY);
      setSubmitError("We couldn't start Google sign-in. Please try again.");
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="relative pt-32 pb-20 overflow-hidden bg-[#121212]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] text-xs font-bold mb-6 tracking-widest uppercase">
            <Zap className="w-3 h-3" />
            <span>Voice-First Training is Here</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase italic">
            Track your <br />
            <span className="text-[#CCFF00] not-italic">Workout</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-medium">
            Kilo uses voice recognition to log your sets and reps in real-time.
            <span className="block mt-4 text-white font-bold">
              Join as a <span className="text-[#CCFF00]">Founding Member</span> and get a lifetime pro-plan.
            </span>
          </p>

          {!submitted ? (
            <div className="flex flex-col gap-4 max-w-md">
              <form onSubmit={handleSubmit} className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-[#2D2D2D]/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#CCFF00]/50 transition-all"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (submitError) {
                      setSubmitError(null);
                    }
                  }}
                  disabled={isSubmitting || isGoogleSubmitting}
                  required
                />
                <button 
                  type="submit"
                  disabled={isSubmitting || isGoogleSubmitting}
                  className="absolute right-2 top-2 bottom-2 bg-[#CCFF00] text-black px-6 rounded-xl font-bold hover:bg-[#CCFF00]/90 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Joining...' : 'Join'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {submitError && (
                <p className="text-sm text-red-400" aria-live="polite">
                  {submitError}
                </p>
              )}
              
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-xs text-gray-600 uppercase tracking-widest font-bold">or</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <button 
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting || isGoogleSubmitting}
                className="w-full bg-[#2D2D2D]/30 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold hover:bg-[#2D2D2D]/50 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" />
                </svg>
                {isGoogleSubmitting ? 'Connecting to Google...' : 'Continue with Google'}
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] flex items-center gap-4"
            >
              <CheckCircle2 className="w-8 h-8" />
              <div>
                <p className="font-bold text-lg">You&apos;re on the list!</p>
                <p className="text-sm opacity-80 text-white">We&apos;ll notify you as soon as Kilo is ready for training.</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <InteractiveDemo />
        </motion.div>
      </div>
    </section>
  );
};

const SupportSection = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  return (
    <section id="support" className="py-24 bg-[#121212] border-y border-white/5">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Help me build Kilo faster</h2>
        <p className="text-xl text-[#CCFF00] font-bold mb-8 italic">
          &quot;Kilo started from my own frustration: I love training, but I hate breaking workout flow just to type reps and weights.&quot;
        </p>
        
        <div className="bg-[#2D2D2D]/40 border border-white/5 rounded-3xl p-8 text-left mb-12 backdrop-blur-sm">
          <p className="text-gray-300 leading-relaxed mb-6">
            I’m not a big company — just one person building the workout app I wish I had.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            Kilo is for people who care about training but hate the friction of tracking every set manually. 
            If that sounds like you, and you want to help this product get built faster, consider supporting the project.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Your support helps me improve the app, test with more users, and keep building Kilo the right way.
          </p>
        </div>

        {!showOptions ? (
          <button 
            onClick={() => setShowOptions(true)}
            className="bg-[#CCFF00] text-black px-10 py-4 rounded-full text-lg font-bold hover:bg-[#CCFF00]/90 transition-all shadow-lg shadow-[#CCFF00]/20"
          >
            Help Build Kilo
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <button className="p-6 rounded-2xl bg-[#2D2D2D]/50 border border-white/10 text-white hover:bg-[#2D2D2D]/80 transition-all font-bold">
              <span className="block text-2xl font-bold">$1</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Coffee support</span>
            </button>
            <button className="p-6 rounded-2xl bg-[#2D2D2D]/50 border border-white/10 text-white hover:bg-[#2D2D2D]/80 transition-all font-bold">
              <span className="block text-2xl font-bold">$3</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Protein shake support</span>
            </button>
            <div className="relative">
              <input 
                type="number" 
                placeholder="Custom $" 
                className="w-full h-full p-6 rounded-2xl bg-[#2D2D2D]/50 border border-white/10 text-white text-center focus:outline-none focus:ring-2 focus:ring-[#CCFF00] font-bold"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const Features = () => (
  <section id="features" className="py-24 bg-[#121212]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Built for performance.</h2>
        <p className="text-gray-400">Everything you need to crush your goals, nothing you don&apos;t.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Mic className="w-6 h-6 text-[#CCFF00]" />,
            title: "Voice-First Logging",
            desc: "Just say 'Bench press, 100 kilos for 8 reps' and Kilo handles the rest."
          },
          {
            icon: <Zap className="w-6 h-6 text-[#CCFF00]" />,
            title: "Smart Progression",
            desc: "Kilo analyzes your history and suggests the perfect weight for your next set."
          },
          {
            icon: <Shield className="w-6 h-6 text-[#CCFF00]" />,
            title: "Privacy Focused",
            desc: "Your data stays on your device. We don't sell your training secrets."
          }
        ].map((feature, i) => (
          <motion.div 
            key={i} 
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 0.5, 0, -0.5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.7
            }}
            className="p-8 rounded-3xl bg-[#2D2D2D]/40 backdrop-blur-xl border border-white/5 hover:border-[#CCFF00]/50 hover:bg-[#2D2D2D]/60 transition-all group shadow-2xl shadow-black/50"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#CCFF00]/10 transition-all">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-white/5 bg-[#121212]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 overflow-hidden rounded-lg bg-[#2D2D2D] border border-white/5 shadow-[0_0_10px_rgba(204,255,0,0.1)]">
            <Image 
              src="/images/logo.jpg" 
              alt="Kilo Official Logo" 
              fill
              className="object-contain p-0.5"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-lg font-bold tracking-tighter text-white uppercase">KILO</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/terms" className="text-sm text-gray-500 hover:text-[#CCFF00] transition-colors font-medium">Terms of Service</Link>
          <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#CCFF00] transition-colors font-medium">Privacy Policy</Link>
          <a href="mailto:support@kilo.app" className="text-sm text-gray-500 hover:text-[#CCFF00] transition-colors font-medium">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-[#2D2D2D]/50 flex items-center justify-center text-gray-400 hover:text-[#CCFF00] hover:bg-[#2D2D2D]/80 transition-all border border-white/5">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-[#2D2D2D]/50 flex items-center justify-center text-gray-400 hover:text-[#CCFF00] hover:bg-[#2D2D2D]/80 transition-all border border-white/5">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="text-center text-gray-600 text-xs font-bold tracking-widest uppercase">
        © 2026 Kilo App. Built with passion for the iron.
      </div>
    </div>
  </footer>
);

const AppShowcase = () => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'coach' | 'overload'>('tracker');

  return (
    <section className="py-24 bg-[#121212] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">A peek inside Kilo.</h2>
          <p className="text-gray-400">Designed for focus. Built for results.</p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button 
              onClick={() => setActiveTab('tracker')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'tracker' ? 'bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.2)]' : 'bg-[#2D2D2D]/50 text-gray-400 hover:text-white'}`}
            >
              Workout Tracker
            </button>
            <button 
              onClick={() => setActiveTab('coach')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'coach' ? 'bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.2)]' : 'bg-[#2D2D2D]/50 text-gray-400 hover:text-white'}`}
            >
              AI Coach
            </button>
            <button 
              onClick={() => setActiveTab('overload')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'overload' ? 'bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.2)]' : 'bg-[#2D2D2D]/50 text-gray-400 hover:text-white'}`}
            >
              Progress Comparison
            </button>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'tracker' ? (
              <motion.div 
                key="tracker"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="relative rounded-[3rem] border-[12px] border-[#2D2D2D] bg-[#0A0A0C] overflow-hidden shadow-2xl shadow-[#CCFF00]/10 aspect-[9/19.5] max-w-[320px] mx-auto"
              >
                {/* App Header */}
                <div className="p-6 flex justify-between items-center border-b border-white/5">
                  <div className="w-6 h-6 flex flex-col justify-between">
                    <div className="h-0.5 w-full bg-white/60" />
                    <div className="h-0.5 w-full bg-white/60" />
                    <div className="h-0.5 w-full bg-white/60" />
                  </div>
                  <span className="text-white font-bold tracking-tighter">KILO</span>
                  <span className="text-[#CCFF00] font-bold text-sm uppercase tracking-widest">Finish</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 p-6 text-center">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Time</p>
                    <p className="text-2xl font-bold text-white">33:12</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Volume</p>
                    <p className="text-2xl font-bold text-white">6,820 <span className="text-xs text-gray-500">LB</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Sets</p>
                    <p className="text-2xl font-bold text-white">18</p>
                  </div>
                </div>

                {/* Exercise Title */}
                <div className="px-6 mb-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white leading-tight">Bench Press <br /> (Barbell)</h3>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center min-w-[80px]">
                    <p className="text-[8px] text-gray-500 uppercase font-bold">Rest</p>
                    <p className="text-lg font-bold text-white">01:30</p>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="px-6 mb-6">
                  <div className="bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-2xl p-4 flex gap-3 items-start">
                    <div className="mt-1">
                      <Zap className="w-4 h-4 text-[#CCFF00]" />
                    </div>
                    <p className="text-xs text-[#CCFF00]/80 leading-relaxed font-medium">
                      &quot;Excellent work! That&apos;s a 3% progressive overload from your last session. You&apos;re getting stronger.&quot;
                    </p>
                  </div>
                </div>

                {/* Sets List */}
                <div className="px-6 space-y-3">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between opacity-60">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600 font-bold text-sm">{s}</span>
                        <div>
                          <p className="text-[8px] text-gray-500 uppercase font-bold">Prev</p>
                          <p className="text-sm font-bold text-white">165 lb x 5</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <span className="text-sm font-bold text-white">170</span>
                        <span className="text-sm font-bold text-white">5</span>
                        <CheckCircle2 className="w-5 h-5 text-[#CCFF00]" />
                      </div>
                    </div>
                  ))}

                  {/* Active Set */}
                  <div className="bg-[#CCFF00]/10 border-2 border-[#CCFF00] rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-[#CCFF00] font-bold text-sm">4</span>
                      <div>
                        <p className="text-[8px] text-[#CCFF00] uppercase font-bold">Active</p>
                        <p className="text-sm font-bold text-white">Target: 170 lb x 5+</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-[8px] text-gray-500 uppercase font-bold">Weight</p>
                        <p className="text-lg font-bold text-white">170</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] text-gray-500 uppercase font-bold">Reps</p>
                        <p className="text-lg font-bold text-white">5</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-white font-bold">+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voice Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <div className="bg-[#2D2D2D]/80 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center justify-between">
                    <div className="flex items-center gap-3 px-4">
                      <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse shadow-[0_0_8px_#CCFF00]" />
                      <p className="text-[10px] text-gray-400 italic">&quot;I just did 3 sets of bench press...&quot;</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#CCFF00] flex items-center justify-center shadow-lg shadow-[#CCFF00]/40">
                      <Mic className="text-black w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'coach' ? (
              <motion.div 
                key="coach"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="relative rounded-[3rem] border-[12px] border-[#2D2D2D] bg-[#0A0A0C] overflow-hidden shadow-2xl shadow-[#CCFF00]/10 aspect-[9/19.5] max-w-[320px] mx-auto flex flex-col"
              >
                {/* AI Coach Header */}
                <div className="p-6 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(i => <div key={i} className="w-0.5 h-4 bg-[#CCFF00]" />)}
                    </div>
                    <span className="text-white font-bold text-xs tracking-widest uppercase">AI COACH</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#2D2D2D] overflow-hidden border border-white/5">
                    <div className="w-full h-full bg-gradient-to-br from-[#CCFF00] to-[#CCFF00]/50" />
                  </div>
                </div>

                <div className="px-6 flex-1 overflow-y-auto pb-24 scrollbar-hide">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Intelligence Input</p>
                  <h3 className="text-lg font-bold text-white italic mb-6 leading-tight">
                    &quot;Design a push pull legs split with 4 exercises in each day, covering all muscles&quot;
                  </h3>

                  {/* Waveform */}
                  <div className="flex justify-center gap-1 mb-8">
                    {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                      <div key={i} className="w-1 bg-[#CCFF00] rounded-full" style={{ height: `${h * 4}px` }} />
                    ))}
                  </div>

                  {/* Split Cards */}
                  <div className="space-y-4">
                    {[
                      { day: '01', type: 'PUSH', chain: 'ANTERIOR CHAIN', exercises: [['Bench Press', '3x8-10'], ['Overhead Press', '3x10'], ['Incline Fly', '3x12'], ['Tricep Dips', '4xAMR']] },
                      { day: '02', type: 'PULL', chain: 'POSTERIOR CHAIN', exercises: [['Deadlift', '3x5'], ['Pull Ups', '3x8'], ['Cable Row', '3x12'], ['Face Pulls', '3x15']] },
                      { day: '03', type: 'LEGS', chain: 'LOWER BODY', exercises: [['Squats', '4x6'], ['RDL', '3x10'], ['Split Squats', '3x10'], ['Calf Raises', '4x20']] }
                    ].map((split, i) => (
                      <div key={i} className="bg-[#2D2D2D]/40 border border-white/5 rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest">Day {split.day}: {split.type}</span>
                          <span className="text-[8px] text-gray-600 font-bold uppercase">{split.chain}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                          {split.exercises.map((ex, j) => (
                            <div key={j} className="flex justify-between items-center">
                              <span className={`text-[10px] font-bold ${j === 3 ? 'text-[#CCFF00]' : 'text-white'}`}>{ex[0]}</span>
                              <span className="text-[8px] text-gray-500">{ex[1]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Coach Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <div className="bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-2xl p-4 mb-4 flex gap-3 items-center">
                    <Zap className="w-4 h-4 text-[#CCFF00] shrink-0" />
                    <p className="text-[10px] text-[#CCFF00]/80 leading-tight font-medium">
                      Optimized for <span className="text-white font-bold">metabolic stress</span>. Rest exactly 90s between sets for peak hypertrophy.
                    </p>
                  </div>
                  <button className="w-full bg-[#CCFF00] text-black py-3 rounded-xl font-bold text-xs hover:bg-[#CCFF00]/90 transition-all flex items-center justify-center gap-2">
                    GET EARLY ACCESS <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="overload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="relative rounded-[3rem] border-[12px] border-[#2D2D2D] bg-[#0A0A0C] overflow-hidden shadow-2xl shadow-[#CCFF00]/10 aspect-[9/19.5] max-w-[320px] mx-auto flex flex-col"
              >
                {/* Overload Header */}
                <div className="p-6 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(i => <div key={i} className="w-0.5 h-4 bg-[#CCFF00]" />)}
                    </div>
                    <span className="text-white font-bold text-xs tracking-widest uppercase">KILO</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#2D2D2D] overflow-hidden border border-white/5">
                    <div className="w-full h-full bg-gradient-to-br from-[#CCFF00] to-[#CCFF00]/50" />
                  </div>
                </div>

                <div className="px-6 flex-1 overflow-y-auto pb-24 scrollbar-hide">
                  <div className="flex gap-3 mb-4">
                    <Mic className="w-4 h-4 text-[#CCFF00] shrink-0 mt-1" />
                    <h3 className="text-xs font-bold text-white italic leading-tight">
                      &quot;Compare my progress from last Monday&apos;s chest session to today&apos;s workout.&quot;
                    </h3>
                  </div>

                  {/* Waveform */}
                  <div className="flex justify-center gap-0.5 mb-6">
                    {[2, 4, 6, 8, 10, 8, 6, 4, 6, 8, 4, 2].map((h, i) => (
                      <div key={i} className="w-1 bg-[#CCFF00]/60 rounded-full" style={{ height: `${h * 2}px` }} />
                    ))}
                  </div>

                  {/* Summary Card */}
                  <div className="bg-[#2D2D2D]/40 border border-white/5 rounded-2xl p-4 mb-4 flex justify-between items-center">
                    <div>
                      <p className="text-[8px] text-gray-500 uppercase font-bold mb-1">Last Week</p>
                      <p className="text-lg font-bold text-white">12,450 lb</p>
                    </div>
                    <div className="bg-[#CCFF00]/20 border border-[#CCFF00]/30 rounded-full px-2 py-1 flex items-center gap-1">
                      <Zap className="w-2 h-2 text-[#CCFF00]" />
                      <span className="text-[8px] text-[#CCFF00] font-bold uppercase tracking-widest">+5.4% OVERLOAD</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] text-gray-500 uppercase font-bold mb-1">Today</p>
                      <p className="text-lg font-bold text-[#CCFF00]">13,120 lb</p>
                    </div>
                  </div>

                  {/* Exercise Comparisons */}
                  <div className="space-y-3">
                    {[
                      { name: 'BENCH PRESS', change: '+15 LB / SET', color: '[#CCFF00]', prev: '225 lb', prevReps: '8', now: '240 lb', nowReps: '8' },
                      { name: 'INCLINE DB PRESS', change: 'STABLE', color: 'gray-500', prev: '85 lb', prevReps: '10', now: '85 lb', nowReps: '12' },
                      { name: 'CABLE FLYES', change: '+2 REPS', color: 'white', prev: '45 lb', prevReps: '12', now: '45 lb', nowReps: '14' }
                    ].map((ex, i) => (
                      <div key={i} className={`bg-[#2D2D2D]/40 border-l-2 border-${ex.color} rounded-r-2xl p-4`}>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] text-white font-bold uppercase">{ex.name}</span>
                          <span className={`text-[8px] text-${ex.color} font-bold uppercase tracking-widest`}>{ex.change}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-[8px] text-gray-600 uppercase font-bold">Prev</p>
                              <p className="text-sm font-bold text-white">{ex.prev}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[8px] text-gray-600 uppercase font-bold">Reps</p>
                              <p className="text-sm font-bold text-white">{ex.prevReps}</p>
                            </div>
                          </div>
                          <div className="flex justify-between border-l border-white/5 pl-4">
                            <div>
                              <p className="text-[8px] text-gray-600 uppercase font-bold">Now</p>
                              <p className="text-sm font-bold text-white">{ex.now}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[8px] text-gray-600 uppercase font-bold">Reps</p>
                              <p className="text-sm font-bold text-white">{ex.nowReps}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coach Insight */}
                  <div className="mt-4 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-2xl p-4 flex gap-3 items-start">
                    <Zap className="w-4 h-4 text-[#CCFF00] shrink-0 mt-1" />
                    <div>
                      <p className="text-[8px] text-[#CCFF00] uppercase font-bold mb-1 tracking-widest">Coach Insight</p>
                      <p className="text-[10px] text-[#CCFF00]/80 leading-tight font-medium">
                        Significant volume increase in Bench Press (+15 lb per set). Recovery appears optimal. Suggest 5% increase in Incline DB next session.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Overload Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <button className="w-full bg-[#CCFF00] text-black py-3 rounded-xl font-bold text-xs hover:bg-[#CCFF00]/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#CCFF00]/20">
                    GET EARLY ACCESS <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#121212] text-white selection:bg-[#CCFF00]/30 selection:text-[#CCFF00]">
      <Navbar />
      <Hero />
      <AppShowcase />
      <Features />
      <SupportSection />
      <Footer />
    </main>
  );
}
