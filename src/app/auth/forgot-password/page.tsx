'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState('');
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#0d0b1a] flex items-center justify-center px-6 py-16">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-10">
          <div className="relative w-9 h-9 flex-shrink-0">
            <Image src="/images/logo.webp" alt="4zee Properties" fill className="object-contain" />
          </div>
          <div className="font-bold text-lg text-white">4zee Properties</div>
        </Link>

        {!sent ? (
          <>
            <h1 className="font-display text-3xl font-bold text-white mb-2">Reset your password</h1>
            <p className="text-white/45 text-sm mb-8 leading-relaxed">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Email address</label>
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

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-bold text-sm transition-all shadow-lg shadow-purple-900/30"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Send Reset Link <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Check your inbox</h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8">
              We&apos;ve sent a password reset link to <span className="text-white/70 font-semibold">{email}</span>. The link expires in 30 minutes.
            </p>
            <p className="text-white/25 text-xs mb-6">
              Didn&apos;t receive it? Check your spam folder or{' '}
              <button onClick={() => setSent(false)} className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                try again
              </button>.
            </p>
          </motion.div>
        )}

        <Link
          href="/auth/login"
          className="flex items-center gap-2 text-white/35 hover:text-white/60 text-sm font-semibold transition-colors mt-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
      </motion.div>
    </div>
  );
}
