'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HardHat, Star, ArrowRight, MapPin, DollarSign,
  Wrench, Send, BadgeCheck, Globe, Layers, Compass, Cpu,
  SquareStack, CheckCircle2, Calendar, ClipboardList,
} from 'lucide-react';
import Link from 'next/link';
import { DarkSelect as Select } from '@/components/ui/Select';
import { INFRASTRUCTURE_PROJECTS } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';

const SERVICES = [
  { icon: HardHat,     title: 'General Contractors',   count: '380+', desc: 'Full-service construction management' },
  { icon: Compass,     title: 'Architects & Designers', count: '240+', desc: 'Bespoke design and planning' },
  { icon: Wrench,      title: 'Civil Engineers',        count: '195+', desc: 'Structural and civil expertise' },
  { icon: Cpu,         title: 'MEP Specialists',        count: '167+', desc: 'Electrical, plumbing, HVAC' },
  { icon: SquareStack, title: 'Real Estate Developers', count: '128+', desc: 'Full project development' },
  { icon: Layers,      title: 'Project Managers',       count: '210+', desc: 'End-to-end project delivery' },
];

const FEATURED_CONTRACTORS = [
  {
    id: 1, name: 'Julius Berger Nigeria', type: 'General Contractor',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=face',
    rating: 4.9, projects: 234, countries: ['Nigeria', 'Ghana'],
    specialties: ['Commercial', 'Infrastructure', 'Industrial'], verified: true,
    desc: "West Africa's leading construction firm with 60+ years of excellence.",
  },
  {
    id: 2, name: 'WBHO Construction', type: 'General Contractor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face',
    rating: 4.8, projects: 312, countries: ['South Africa', 'Botswana', 'Zimbabwe'],
    specialties: ['Mining', 'Commercial', 'Residential'], verified: true,
    desc: "South Africa's most awarded construction group.",
  },
  {
    id: 3, name: 'Arab Contractors', type: 'Developer & Contractor',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=96&h=96&fit=crop&crop=face',
    rating: 4.9, projects: 580, countries: ['Egypt', 'Libya', 'UAE'],
    specialties: ['Government', 'Mega-projects', 'Infrastructure'], verified: true,
    desc: "North Africa's largest construction enterprise.",
  },
  {
    id: 4, name: 'Roko Construction', type: 'Civil Contractor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
    rating: 4.7, projects: 167, countries: ['Kenya', 'Uganda', 'Tanzania'],
    specialties: ['Civil', 'Roads', 'Residential'], verified: true,
    desc: "East Africa's trusted construction partner.",
  },
];

const PROCESS_STEPS = [
  { step: '01', icon: HardHat,     title: 'Post Your Project',  desc: 'Describe your construction needs, budget, timeline, and location.' },
  { step: '02', icon: ClipboardList, title: 'Receive Bids',       desc: 'Verified contractors review your brief and submit competitive proposals.' },
  { step: '03', icon: CheckCircle2,title: 'Compare & Select',   desc: 'Review proposals, portfolios, and ratings to choose the right partner.' },
  { step: '04', icon: Globe,       title: 'Manage & Track',     desc: 'Use our dashboard to track milestones, payments, and communications.' },
];

const HERO_STATS = [
  { label: 'Verified Firms',       value: '1,300+' },
  { label: 'Countries Active',     value: '28' },
  { label: 'Projects Completed',   value: '8,400+' },
  { label: 'Total Project Value',  value: '$12B+' },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fadeUp  = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };

const STATUS_COLORS: Record<string, 'gold' | 'green' | 'blue' | 'purple'> = {
  'Under Construction': 'gold',
  'Phase 2 Active':     'green',
  'Phase 1 Complete':   'blue',
  'Active Development': 'purple',
};

export default function ConstructionPage() {
  const [formData, setFormData] = useState({
    type: '', location: '', budget: '', description: '', name: '', email: '',
  });

  const featured = INFRASTRUCTURE_PROJECTS[0];
  const others   = INFRASTRUCTURE_PROJECTS.slice(1);

  return (
    <div className="min-h-screen bg-[#0d0b1a] pt-20">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-40">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-900/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-40"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.07) 1px, transparent 1px)', backgroundSize: '44px 44px' }}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
              <HardHat className="w-4 h-4" />
              Africa&apos;s Construction Hub
            </div>

            <div className="max-w-4xl mb-14">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.04]">
                Build Africa&apos;s{' '}
                <span className="gradient-text">Future</span>
                <br />— Together
              </h1>
              <p className="text-white/55 text-xl leading-relaxed max-w-2xl">
                Connect with verified construction firms, architects, engineers, and developers across 28 African nations.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href="#request-form"
                className="flex items-center gap-2 px-7 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold transition-all shadow-lg shadow-amber-900/30"
              >
                <HardHat className="w-5 h-5" /> Post a Project
              </a>
              <a
                href="#contractors"
                className="flex items-center gap-2 px-7 py-4 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-semibold transition-all"
              >
                Find Contractors <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="bg-[#0d0b1a] py-6 px-6 text-center hover:bg-white/3 transition-colors">
                  <div className="text-3xl font-bold text-amber-400 mb-1 font-display">{stat.value}</div>
                  <div className="text-white/45 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 bg-[#0d0b1a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-700/40 to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-5">
                Specialists
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.08]">
                Find the Right{' '}
                <span className="gradient-text">Professional</span>
              </h2>
            </div>
            <p className="text-white/45 text-base max-w-sm leading-relaxed lg:text-right">
              Every specialist you need, all KYC-verified and rated by past clients across Africa.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6 border border-white/6 rounded-2xl overflow-hidden"
          >
            {SERVICES.map((service) => (
              <motion.div key={service.title} variants={fadeUp} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-4 p-7 bg-[#0d0b1a] h-full">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-white text-sm truncate">{service.title}</h3>
                      <span className="text-amber-400 font-bold text-xs whitespace-nowrap">{service.count}</span>
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Contractors ── */}
      <section id="contractors" className="py-24 bg-[#0d0b1a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex items-end justify-between gap-6 mb-14"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-5">
                Verified Partners
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Featured <span className="gradient-text">Contractors</span>
              </h2>
            </div>
            <Link
              href="/construction/all"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:border-purple-500/50 text-white/60 hover:text-white font-semibold text-sm transition-all whitespace-nowrap"
            >
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {FEATURED_CONTRACTORS.map((contractor) => (
              <motion.div
                key={contractor.id}
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className="group bg-[#14112a] rounded-2xl border border-white/8 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-900/20 transition-all overflow-hidden"
              >
                <div className="p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={contractor.avatar} alt={contractor.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3 className="font-bold text-white text-base sm:text-lg truncate group-hover:text-purple-300 transition-colors">{contractor.name}</h3>
                      {contractor.verified && <BadgeCheck className="w-4 h-4 text-purple-400 flex-shrink-0" />}
                    </div>
                    <p className="text-xs sm:text-sm text-white/40 mb-2">{contractor.type}</p>
                    <p className="text-white/55 text-sm leading-relaxed line-clamp-2">{contractor.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-white text-sm">{contractor.rating}</span>
                  </div>
                </div>

                <div className="border-t border-white/8">
                  <div className="flex">
                    <div className="flex-1 px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-white/40 border-r border-white/8">
                      <SquareStack className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span><strong className="text-white/80">{contractor.projects}</strong> Projects</span>
                    </div>
                    <div className="flex-1 px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-white/40">
                      <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span><strong className="text-white/80">{contractor.countries.length}</strong> Countries</span>
                    </div>
                  </div>
                  <div className="px-4 sm:px-6 py-3 border-t border-white/8">
                    <a href="#request-form" className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-purple-600/20 text-purple-300 text-sm font-semibold hover:bg-purple-600/40 transition-colors">
                      Contact <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="px-6 pb-5 flex flex-wrap gap-1.5">
                  {contractor.specialties.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Infrastructure Projects ── */}
      <section className="py-24 bg-[#0d0b1a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-5">
                Infrastructure & Smart Cities
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Landmark <span className="gradient-text">Development Projects</span>
              </h2>
              <p className="text-white/45 text-lg mt-3 max-w-xl">
                Join Africa&apos;s most ambitious infrastructure initiatives shaping the future of urban life.
              </p>
            </div>
            <Link
              href="/construction/smart-cities"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:border-purple-500/50 text-white/70 hover:text-white font-semibold text-sm transition-all whitespace-nowrap"
            >
              All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Featured project: image 3-col + dark panel 2-col */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden mb-6 border border-white/8"
            >
              <div className="lg:col-span-3 relative h-80 lg:h-auto min-h-[380px] group overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                <div className="absolute top-5 left-5">
                  <Badge variant={STATUS_COLORS[featured.status] || 'purple'}>{featured.status}</Badge>
                </div>
                <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white/80 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  {featured.location}, {featured.country}
                </div>
              </div>

              <div className="lg:col-span-2 bg-[#14112a] p-8 lg:p-10 flex flex-col justify-between gap-8">
                <div>
                  <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">{featured.type}</div>
                  <h3 className="font-display text-3xl font-bold text-white mb-4 leading-snug">{featured.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{featured.description}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between py-5 border-t border-white/8">
                    <span className="text-white/45 text-sm flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-amber-500/60" />Project Value
                    </span>
                    <span className="text-amber-400 font-bold text-xl">{featured.value}</span>
                  </div>
                  <div className="flex items-center justify-between py-5 border-t border-white/8">
                    <span className="text-white/45 text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400/60" />Est. Completion
                    </span>
                    <span className="text-white font-semibold">{featured.completion}</span>
                  </div>
                  <div className="flex items-center justify-between py-5 border-t border-white/8">
                    <span className="text-white/45 text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400/60" />Location
                    </span>
                    <span className="text-white font-semibold">{featured.country}</span>
                  </div>
                  <Link
                    href={`/construction/${featured.id}`}
                    className="mt-6 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg shadow-purple-900/30"
                  >
                    View Full Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Remaining projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {others.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant={STATUS_COLORS[project.status] || 'purple'}>{project.status}</Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">{project.type}</div>
                  <h3 className="text-white font-bold text-base mb-1 group-hover:text-purple-300 transition-colors leading-snug">{project.title}</h3>
                  <div className="flex items-center gap-1 text-white/50 text-xs mb-3">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {project.location}, {project.country}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold text-sm">{project.value}</span>
                    <Link
                      href={`/construction/${project.id}`}
                      className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-semibold transition-colors"
                    >
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 bg-[#0d0b1a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-700/30 to-transparent" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-5">
              Simple Process
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              How <span className="gradient-text">Project Bidding</span> Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/6 border border-white/6 rounded-2xl overflow-hidden">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="bg-[#0d0b1a] hover:bg-white/3 transition-colors p-8 lg:p-10 flex flex-col"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-white/12 font-mono text-sm font-bold">{step.step}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Request Form ── */}
      <section id="request-form" className="py-24 bg-[#0d0b1a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-amber-900/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-premium relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — editorial */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
                <HardHat className="w-4 h-4" />
                Start Your Project
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.08]">
                Post Your Construction<br />
                <span className="gradient-text">Brief Today</span>
              </h2>
              <p className="text-white/45 text-lg leading-relaxed mb-10">
                Share your project details and receive competitive bids from Africa&apos;s best construction professionals within 48 hours.
              </p>

              <div className="space-y-4">
                {[
                  'Free to post your project brief',
                  'Receive up to 5 competitive bids',
                  'All firms KYC & license verified',
                  'Secure payment & milestone tracking',
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-purple-400" />
                    <span className="text-white/65 text-base">{text}</span>
                  </div>
                ))}
              </div>

              {/* Mini trust strip */}
              <div className="mt-14 grid grid-cols-2 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
                {[
                  { value: '48h', label: 'Avg. First Bid' },
                  { value: '5',   label: 'Bids per Project' },
                  { value: '98%', label: 'Verified Firms' },
                  { value: '$0',  label: 'Posting Fee' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#0d0b1a] py-5 px-6 text-center">
                    <div className="text-xl font-bold text-amber-400 mb-0.5">{item.value}</div>
                    <div className="text-xs text-white/35 uppercase tracking-wider">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — dark form panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-[#14112a] rounded-2xl p-8 border border-white/8 shadow-2xl shadow-black/30">
                <h3 className="font-display font-bold text-white text-2xl mb-8">Project Request Form</h3>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Your Name</label>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Project Type</label>
                    <Select
                      value={formData.type}
                      onChange={v => setFormData({ ...formData, type: v })}
                      placeholder="Select project type"
                      options={['Residential Build', 'Commercial Development', 'Renovation', 'Infrastructure', 'Interior Design', 'Landscaping'].map(t => ({ value: t, label: t }))}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Budget Range</label>
                    <Select
                      value={formData.budget}
                      onChange={v => setFormData({ ...formData, budget: v })}
                      placeholder="Select budget range"
                      options={['Under ₦50M', '₦50M – ₦200M', '₦200M – ₦500M', '₦500M – $2M', '$2M – $10M', '$10M+'].map(b => ({ value: b, label: b }))}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Project Description</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your project requirements, timeline, and any special considerations..."
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-base transition-all shadow-lg shadow-amber-900/30">
                    <Send className="w-5 h-5" />
                    Submit Project Brief
                  </button>

                  <p className="text-xs text-white/25 text-center">
                    By submitting, you agree to our Terms of Service. Contractors will contact you within 48 hours.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
