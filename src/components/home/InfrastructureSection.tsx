'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, DollarSign, Calendar, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { INFRASTRUCTURE_PROJECTS } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';

const STATUS_COLORS: Record<string, 'gold' | 'green' | 'blue' | 'purple'> = {
  'Under Construction': 'gold',
  'Phase 2 Active': 'green',
  'Phase 1 Complete': 'blue',
  'Active Development': 'purple',
};

const TRUST_ITEMS = [
  { icon: CheckCircle2, text: 'Government Backed', color: 'text-emerald-400' },
  { icon: CheckCircle2, text: 'Investment Grade Returns', color: 'text-blue-400' },
  { icon: CheckCircle2, text: 'Transparent Timelines', color: 'text-purple-400' },
  { icon: CheckCircle2, text: 'Verified Developers', color: 'text-amber-400' },
];

export function InfrastructureSection() {
  const featured = INFRASTRUCTURE_PROJECTS[0];
  const others = INFRASTRUCTURE_PROJECTS.slice(1);

  return (
    <section className="py-24 bg-[#0d0b1a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-700/40 to-transparent" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container-premium relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-4">
              Infrastructure & Smart Cities
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Africa&apos;s Boldest <span className="gradient-text">Development Projects</span>
            </h2>
            <p className="text-white/50 text-lg mt-3 max-w-xl">
              Landmark infrastructure projects shaping the future of African urban life and investment.
            </p>
          </div>
          <Link
            href="/construction/smart-cities"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:border-purple-500/50 text-white/70 hover:text-white font-semibold transition-all whitespace-nowrap text-sm"
          >
            View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Featured project — image left + dark content panel right */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden mb-6 border border-white/8"
          >
            {/* Image side */}
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

            {/* Dark content panel */}
            <div className="lg:col-span-2 bg-[#14112a] p-8 lg:p-10 flex flex-col justify-between gap-8">
              <div>
                <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">{featured.type}</div>
                <h3 className="font-display text-3xl font-bold text-white mb-4 leading-snug">{featured.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{featured.description}</p>
              </div>

              <div className="space-y-0">
                <div className="flex items-center justify-between py-5 border-b border-white/8 first:border-t first:border-white/8">
                  <span className="text-white/45 text-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-500/60" />Project Value
                  </span>
                  <span className="text-amber-400 font-bold text-xl">{featured.value}</span>
                </div>
                <div className="flex items-center justify-between py-5 border-b border-white/8">
                  <span className="text-white/45 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400/60" />Est. Completion
                  </span>
                  <span className="text-white font-semibold">{featured.completion}</span>
                </div>
                <div className="flex items-center justify-between py-5 border-b border-white/8">
                  <span className="text-white/45 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400/60" />Location
                  </span>
                  <span className="text-white font-semibold">{featured.country}</span>
                </div>

                <Link
                  href={`/construction/${featured.id}`}
                  className="mt-8 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg shadow-purple-900/30"
                >
                  View Full Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Remaining projects — full-bleed image cards with overlay */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <Badge variant={STATUS_COLORS[project.status] || 'purple'}>{project.status}</Badge>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">{project.type}</div>
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-purple-300 transition-colors leading-snug">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-white/55 text-xs mb-3">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  {project.location}, {project.country}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-amber-400 font-bold">{project.value}</div>
                  <Link
                    href={`/construction/${project.id}`}
                    className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-semibold transition-colors"
                  >
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden mt-4"
        >
          {TRUST_ITEMS.map((item) => (
            <div key={item.text} className="flex items-center gap-2.5 py-4 px-5 bg-[#0d0b1a]">
              <item.icon className={`w-4 h-4 flex-shrink-0 ${item.color}`} />
              <span className="text-sm font-medium text-white/65">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
