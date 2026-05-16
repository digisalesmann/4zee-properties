'use client';

import { motion } from 'framer-motion';
import {
  Globe, Users, Building2, TrendingUp, Shield, Gem,
  MapPin, ArrowRight, CheckCircle2, Star, Award,
  Target, Heart, Lightbulb, Handshake,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const STATS = [
  { value: '12,000+', label: 'Investors & Buyers', icon: Users },
  { value: '54',      label: 'African Cities',     icon: MapPin },
  { value: '$2.4B',   label: 'Transaction Volume', icon: TrendingUp },
  { value: '98%',     label: 'Client Satisfaction',icon: Star },
];

const VALUES = [
  {
    icon: Shield,
    title: 'Transparency First',
    desc: 'Every listing is verified, every agent is KYC-checked. No hidden fees, no phantom listings, just honest real estate.',
  },
  {
    icon: Globe,
    title: 'Pan-African Vision',
    desc: 'We believe Africa\'s property markets deserve world-class infrastructure. We build for Lagos, Nairobi, Accra, Cairo and everywhere in between.',
  },
  {
    icon: Lightbulb,
    title: 'Technology-Driven',
    desc: 'AI-powered matching, virtual tours, real-time market data, we bring the tools of tomorrow to Africa\'s real estate today.',
  },
  {
    icon: Handshake,
    title: 'Community-Rooted',
    desc: 'We partner with local agents, developers, and communities, because the best deals are built on trust, not just transactions.',
  },
];

const TEAM = [
  {
    name: 'Adaeze Okonkwo',
    role: 'Co-founder & CEO',
    location: 'Lagos, Nigeria',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
    bio: 'Former Goldman Sachs VP. Built her first real estate portfolio at 26. Obsessed with making African property accessible to everyone.',
  },
  {
    name: 'Kofi Mensah',
    role: 'Co-founder & CTO',
    location: 'Accra, Ghana',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    bio: 'Ex-Google engineer. Led platform teams at Flutterwave. Believes the best fintech and proptech is built on the continent, for the continent.',
  },
  {
    name: 'Nadia Al-Rashid',
    role: 'Head of Markets',
    location: 'Cairo, Egypt',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    bio: 'MENA real estate veteran with 14 years across Dubai, Cairo and Casablanca. Fluent in four languages and three property cycles.',
  },
  {
    name: 'Thabo Dlamini',
    role: 'Head of Agents',
    location: 'Johannesburg, South Africa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    bio: 'Built Africa\'s largest certified agent network from scratch. Trained over 2,000 agents across 12 countries.',
  },
];

const MILESTONES = [
  { year: '2020', title: 'Founded in Lagos', desc: 'Started with a simple idea, make African real estate as transparent and accessible as possible.' },
  { year: '2021', title: 'First 1,000 listings', desc: 'Launched in Nigeria and Kenya, onboarding 400+ verified agents in the first six months.' },
  { year: '2022', title: 'Series A - $8M', desc: 'Expanded into Ghana, Egypt, and South Africa. Launched the AI-powered matching engine.' },
  { year: '2023', title: '$1B in transactions', desc: 'Crossed $1B in facilitated transaction volume across 30 cities and 8 countries.' },
  { year: '2024', title: 'Pan-African platform', desc: 'Now operating in 54 cities across 14 countries. Launched virtual tours and investment analytics.' },
  { year: '2025', title: 'The next chapter', desc: 'Building the infrastructure for Africa\'s next generation of property owners and investors.' },
];

const INVESTORS = [
  'Sequoia Africa', 'TLcom Capital', 'Partech Africa', 'Future Africa', 'Orange Ventures',
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f7ff]">

      {/* ── Hero ── */}
      <section className="relative bg-[#0d0b1a] overflow-hidden pt-20 sm:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-[#0d0b1a]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/60 to-transparent" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-premium relative pt-10 pb-20 sm:pt-12 sm:pb-28 lg:pt-16 lg:pb-36">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-4xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-6">
              <Gem className="w-3.5 h-3.5" />
              Our Story
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Building Africa&apos;s{' '}
              <span className="gradient-text">Property Future</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/55 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10">
              4zee Properties was born from a simple belief: every African deserves access to transparent, trustworthy, and world-class real estate, whether they&apos;re buying their first home or building a continent-spanning portfolio.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Link href="/properties" className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all">
                Browse Properties <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/agents" className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-semibold transition-all">
                Meet Our Agents
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-white/8">
          <div className="container-premium py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/6 rounded-2xl overflow-hidden">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                  className="bg-[#0d0b1a] px-6 py-6 text-center"
                >
                  <s.icon className="w-4 h-4 text-purple-400 mx-auto mb-2" />
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-white/40 text-xs font-medium">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-20 sm:py-28">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-100 text-purple-700 text-sm font-semibold mb-5">
                <Target className="w-3.5 h-3.5" /> Our Mission
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Making property ownership possible for every African
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Africa has the youngest population on earth and the fastest-growing urban centres. Yet real estate remains opaque, fragmented, and inaccessible. We&apos;re changing that, one verified listing, one trusted agent, one transparent deal at a time.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                We don&apos;t just list properties. We build trust infrastructure, KYC-verified agents, legally-reviewed listings, escrow-ready transactions, and AI-powered market intelligence, so that every buyer, seller, and investor can act with confidence.
              </p>
              <div className="space-y-3">
                {['Verified agents in every market', 'AI-powered property matching', 'Real-time investment analytics', 'End-to-end transaction support'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
                  alt="African cityscape"
                  width={800} height={600}
                  className="w-full h-[420px] object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">Operating across Africa</div>
                        <div className="text-white/60 text-xs">54 cities · 14 countries · 1 platform</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 sm:py-24 bg-[#0d0b1a]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/40 to-transparent" />
        <div className="container-premium">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-4">
              <Heart className="w-3.5 h-3.5" /> What We Stand For
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Built on values that last
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/45 max-w-xl mx-auto">
              These aren&apos;t words on a wall. They&apos;re the decisions we make every day.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/6 rounded-2xl overflow-hidden border border-white/6">
            {VALUES.map((v) => (
              <motion.div key={v.title} variants={fadeUp} className="bg-[#0d0b1a] hover:bg-white/3 transition-colors p-8 sm:p-10">
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5">
                  <v.icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{v.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 sm:py-28">
        <div className="container-premium">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
              <Award className="w-3.5 h-3.5" /> Our Journey
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Five years of building
            </motion.h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-300 via-purple-200 to-transparent -translate-x-1/2" />

            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`pl-14 sm:pl-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10'}`}>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-purple-100 hover:shadow-md transition-all">
                      <div className="text-xs font-bold text-purple-600 mb-1">{m.year}</div>
                      <h3 className="font-bold text-gray-900 mb-1">{m.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-600 ring-4 ring-purple-100 flex-shrink-0 mt-5" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container-premium">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
              <Users className="w-3.5 h-3.5" /> The Team
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet the people behind 4zee
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-xl mx-auto">
              A team of Africans who have lived and built across the continent and are obsessed with what comes next.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member) => (
              <motion.div key={member.name} variants={fadeUp}
                className="group bg-[#f8f7ff] rounded-2xl border border-gray-100 overflow-hidden hover:border-purple-200 hover:shadow-lg transition-all">
                <div className="relative h-56 overflow-hidden">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-white/70 text-xs">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {member.location}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-0.5">{member.name}</h3>
                  <div className="text-purple-600 text-xs font-semibold mb-3">{member.role}</div>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Investors ── */}
      <section className="py-16 border-t border-gray-100">
        <div className="container-premium text-center">
          <p className="text-gray-400 text-sm font-medium mb-8 uppercase tracking-widest">Backed by</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {INVESTORS.map(name => (
              <span key={name} className="text-gray-300 font-bold text-lg tracking-tight hover:text-purple-400 transition-colors cursor-default">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-24 bg-[#0d0b1a]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-700 via-purple-800 to-purple-950 p-10 sm:p-16 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <Gem className="w-10 h-10 text-purple-300 mx-auto mb-5" />
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
                Ready to find your place in Africa?
              </h2>
              <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto">
                Join 12,000+ buyers, sellers, and investors already using 4zee Properties.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/properties" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-purple-900 font-bold hover:bg-purple-50 transition-colors">
                  Browse Properties <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/list-property" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white hover:border-white/40 font-semibold transition-all">
                  List Your Property
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
