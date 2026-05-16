'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HERO_STATS = [
  { value: 48750, suffix: '+', label: 'Properties Listed', sub: 'Across 28 African nations' },
  { value: 3200, suffix: '+', label: 'Verified Agents', sub: 'KYC background-checked' },
  { value: 28, suffix: '', label: 'Countries', sub: 'Full continent coverage' },
  { value: 14500, suffix: '+', label: 'Deals Closed', sub: 'Total transactions to date' },
];

const TRUST_STRIP = [
  { value: '4.9/5', label: 'Platform Rating' },
  { value: '73%', label: 'Repeat Clients' },
  { value: '$2.4B', label: 'Transaction Volume' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '64%', label: 'Referral Rate' },
  { value: '91', label: 'NPS Score' },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-[#0d0b1a] relative overflow-hidden pt-28 pb-24 lg:pt-36 lg:pb-32">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-premium relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-20">

          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4" />
              Platform by the Numbers
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6">
              Africa&apos;s Most Trusted{' '}
              <span className="gradient-text">PropTech Platform</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
              From first-time buyers to institutional investors. 4zee Properties powers real estate across the continent with verified data and the widest agent network.
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg shadow-purple-900/30"
            >
              Start Exploring
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right — stats as clean bordered grid, no card backgrounds */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 divide-x divide-y divide-white/8 border border-white/8 rounded-2xl overflow-hidden"
          >
            {HERO_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="p-8 xl:p-10 hover:bg-white/3 transition-colors"
              >
                <div className="font-display text-4xl xl:text-5xl font-bold gradient-text mb-3 leading-none tabular-nums">
                  {inView
                    ? <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
                    : `0${stat.suffix}`}
                </div>
                <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
                <div className="text-white/35 text-xs">{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.65 }}
          className="grid grid-cols-3 lg:grid-cols-6 gap-px bg-white/8 rounded-2xl overflow-hidden mt-16"
        >
          {TRUST_STRIP.map((item) => (
            <div key={item.label} className="bg-[#0d0b1a] py-5 px-3 text-center">
              <div className="text-lg sm:text-xl font-bold text-white mb-0.5">{item.value}</div>
              <div className="text-[10px] sm:text-xs text-white/35 font-medium uppercase tracking-wider leading-tight">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
