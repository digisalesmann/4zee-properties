'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Building2, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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

const ROLES = [
  { id: 'buyer',    icon: User,      label: 'Buyer / Tenant',   desc: 'I want to buy or rent property' },
  { id: 'investor', icon: Briefcase, label: 'Investor',         desc: 'I want to invest in real estate' },
  { id: 'agent',    icon: Users,     label: 'Agent / Broker',   desc: 'I list and sell properties' },
  { id: 'developer',icon: Building2, label: 'Developer',        desc: 'I develop real estate projects' },
];

export default function SignupPage() {
  const router = useRouter();
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPassword, setShow]   = useState(false);
  const [role, setRole]           = useState('buyer');
  const [loading, setLoading]     = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push('/dashboard'), 1200);
  };

  return (
    <div className="min-h-screen bg-[#0d0b1a] flex">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80"
          alt="4zee Properties"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0b1a]/90 via-purple-900/55 to-[#0d0b1a]/80" />

        <div className="relative z-10 flex flex-col h-full p-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image src="/images/logo.webp" alt="4zee Properties" fill className="object-contain" />
            </div>
            <div>
              <div className="font-bold text-xl text-white leading-none">4zee</div>
              <div className="text-xs text-white/50 leading-none">Properties</div>
            </div>
          </Link>

          <div className="flex-1 flex flex-col justify-center max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-display text-4xl font-bold text-white leading-[1.1] mb-4">
                Join Africa&apos;s Premier Property Platform
              </h1>
              <p className="text-white/50 text-base leading-relaxed mb-10">
                Connect with 3,200+ verified agents, browse 48,000+ listings, and invest in 28 African markets.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-px bg-white/8 rounded-2xl overflow-hidden">
                {[
                  { value: '48K+',  label: 'Listings' },
                  { value: '3.2K+', label: 'Agents' },
                  { value: '28',    label: 'Countries' },
                  { value: '$2.4B', label: 'Transacted' },
                ].map(s => (
                  <div key={s.label} className="bg-white/3 py-4 px-4 text-center">
                    <div className="text-lg font-bold text-purple-300">{s.value}</div>
                    <div className="text-xs text-white/35">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-white/35 text-xs">
              Already a member?{' '}
              <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">Sign in →</Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-16 py-10 overflow-y-auto">

        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
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
          <h2 className="font-display text-3xl font-bold text-white mb-2">Create your account</h2>
          <p className="text-white/45 text-sm mb-8">Get started for free, no credit card required</p>

          {/* Social */}
          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm font-semibold hover:bg-white/10 hover:border-white/20 transition-all mb-6">
            <GoogleIcon />
            Sign up with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/25 text-xs uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role picker */}
            <div>
              <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-3">I am a</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={cn(
                      'flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all',
                      role === r.id
                        ? 'bg-purple-600/20 border-purple-500/60 text-white'
                        : 'bg-white/3 border-white/8 text-white/50 hover:bg-white/6 hover:border-white/15'
                    )}
                  >
                    <r.icon className={cn('w-4 h-4 flex-shrink-0 mt-0.5', role === r.id ? 'text-purple-400' : 'text-white/30')} />
                    <div>
                      <div className="text-xs font-bold leading-tight">{r.label}</div>
                      <div className="text-[10px] text-white/30 leading-tight mt-0.5 hidden sm:block">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Full name */}
            <div>
              <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
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
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-white/25 text-xs text-center leading-relaxed">
              By creating an account you agree to our{' '}
              <span className="text-white/45 hover:text-white/60 cursor-pointer transition-colors">Terms of Service</span>
              {' '}and{' '}
              <span className="text-white/45 hover:text-white/60 cursor-pointer transition-colors">Privacy Policy</span>.
            </p>
          </form>

          <p className="text-center text-white/35 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
