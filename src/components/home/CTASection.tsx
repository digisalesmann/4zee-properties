'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building2, Users, Briefcase, HardHat } from 'lucide-react';
import Link from 'next/link';

const CTA_ITEMS = [
  {
    num: '01',
    icon: Building2,
    title: 'List Your Property',
    desc: 'Reach 120,000+ verified buyers, investors, and tenants across Africa. Free to list, no upfront fees.',
    cta: 'Start Listing',
    href: '/list-property',
  },
  {
    num: '02',
    icon: Users,
    title: 'Join as an Agent',
    desc: "Build your brand on Africa's fastest-growing real estate platform. KYC-verified, trusted by thousands.",
    cta: 'Become an Agent',
    href: '/agents/register',
  },
  {
    num: '03',
    icon: Briefcase,
    title: 'Invest in Africa',
    desc: 'Discover high-ROI real estate investment opportunities across 28 markets, from Lagos to Cape Town.',
    cta: 'Explore Investments',
    href: '/invest',
  },
  {
    num: '04',
    icon: HardHat,
    title: 'Construction Projects',
    desc: 'Connect with verified contractors, architects, and developers. Manage builds from end to end.',
    cta: 'Find Contractors',
    href: '/construction',
  },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export function CTASection() {
  return (
    <section className="bg-[#0d0b1a] relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-40">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-700/40 to-transparent" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-premium relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-5">
              Get Started
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.08]">
              Everything You Need<br />
              <span className="gradient-text">in One Platform</span>
            </h2>
          </div>
          <p className="text-white/45 text-base max-w-sm leading-relaxed lg:text-right">
            Join 120,000+ buyers, sellers, and investors building wealth through Africa&apos;s premier property platform.
          </p>
        </motion.div>

        {/* Items grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6 border border-white/6 rounded-2xl overflow-hidden"
        >
          {CTA_ITEMS.map((item) => (
            <motion.div key={item.title} variants={fadeUp} transition={{ duration: 0.55 }}>
              <Link
                href={item.href}
                className="group flex flex-col p-6 sm:p-10 bg-[#0d0b1a] hover:bg-white/3 transition-colors h-full"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <item.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-white/15 font-mono text-sm font-bold">{item.num}</span>
                </div>

                <h3 className="text-white font-bold text-xl mb-3 group-hover:text-purple-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-8 flex-1">{item.desc}</p>

                <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  {item.cta}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-5 sm:px-8 py-5 sm:py-6 rounded-2xl border border-white/8 bg-white/2"
        >
          <p className="text-white/50 text-sm">
            Africa&apos;s most trusted real estate platform — verified agents, transparent listings.
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/properties"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors"
            >
              Browse Properties
            </Link>
            <Link
              href="/list-property"
              className="px-6 py-2.5 rounded-xl border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-semibold text-sm transition-all"
            >
              List for Free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
