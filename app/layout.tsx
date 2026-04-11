import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#121212',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Kilo | Voice-First Workout Tracker',
  description: 'Log your sets, reps, and weights in real-time using only your voice. Get AI-powered insights and progressive overload tracking.',
  keywords: ['workout tracker', 'voice logging', 'fitness app', 'AI coach', 'progressive overload', 'Kilo'],
  openGraph: {
    title: 'Kilo | Voice-First Workout Tracker',
    description: 'Log your sets, reps, and weights in real-time using only your voice.',
    type: 'website',
    url: 'https://kilo-landing.vercel.app',
    siteName: 'Kilo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kilo | Voice-First Workout Tracker',
    description: 'Log your sets, reps, and weights in real-time using only your voice.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#121212] text-white antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
