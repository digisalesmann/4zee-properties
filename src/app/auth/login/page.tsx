'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

const TRUST_ITEMS = [
  '48,750+ verified property listings',
  'Trusted by 12,000+ investors',
  'Verified agents across 28 countries',
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPassword, setShow]     = useState(false);
  const [loading, setLoading]       = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push('/dashboard'), 1200);
  };

  return (
    <div className="min-h-screen bg-[#0d0b1a] flex">

      {/* ── Left panel — brand ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80"
          alt="4zee Properties"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0b1a]/90 via-purple-900/60 to-[#0d0b1a]/80" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image src="/images/logo.webp" alt="4zee Properties" fill className="object-contain" />
            </div>
            <div>
              <div className="font-bold text-xl text-white leading-none">4zee</div>
              <div className="text-xs text-white/50 leading-none">Properties</div>
            </div>
          </Link>

          {/* Main copy */}
          <div className="flex-1 flex flex-col justify-center max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/25 text-purple-300 text-xs font-semibold mb-6 uppercase tracking-wider">
                Africa&apos;s #1 PropTech Platform
              </div>
              <h1 className="font-display text-4xl xl:text-5xl font-bold text-white leading-[1.1] mb-5">
                Your Gateway to African Real Estate
              </h1>
              <p className="text-white/50 text-base leading-relaxed mb-10">
                Access premium listings, verified agents, and real-time market intelligence across 28 African markets.
              </p>

              <div className="space-y-3">
                {TRUST_ITEMS.map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-white/60 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom testimonial */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/50 text-sm italic leading-relaxed mb-3">
              &ldquo;4zee transformed how I invest in African real estate. Found my Lagos portfolio in a weekend.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&fit=crop&crop=face" alt="Chidi" width={36} height={36} className="rounded-full object-cover" unoptimized />
              <div>
                <div className="text-white text-sm font-semibold">Chidi Okafor</div>
                <div className="text-white/35 text-xs">CEO, Meridian Capital</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-12">

        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image src="/images/logo.webp" alt="4zee Properties" fill className="object-contain" />
          </div>
          <div className="font-bold text-lg text-white">4zee Properties</div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <h2 className="font-display text-3xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-white/45 text-sm mb-8">Sign in to your 4zee account</p>

          {/* Social auth */}
          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-semibold hover:bg-white/10 hover:border-white/20 transition-all mb-6">
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/25 text-xs uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-white/40 uppercase tracking-wider">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-11 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                  style={{ colorScheme: 'dark' }}
                />
                <button
                  type="button"
                  onClick={() => setShow(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-bold text-sm transition-all shadow-lg shadow-purple-900/30 mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-white/35 text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Create account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
