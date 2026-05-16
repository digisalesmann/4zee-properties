'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Calendar, ArrowLeft, CheckCircle2, HardHat, Send } from 'lucide-react';
import Link from 'next/link';
import { INFRASTRUCTURE_PROJECTS } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';
import { notFound } from 'next/navigation';

const STATUS_COLORS: Record<string, 'gold' | 'green' | 'blue' | 'purple'> = {
  'Under Construction': 'gold',
  'Phase 2 Active':     'green',
  'Phase 1 Complete':   'blue',
  'Active Development': 'purple',
};

const PROJECT_DETAILS: Record<string, {
  highlights: string[];
  investmentMin: string;
  area: string;
  units?: string;
}> = {
  'inf-001': {
    highlights: ['10 km² of reclaimed land', '1,500-acre master-planned city', 'Eko Atlantic Marina waterfront', 'Residential, commercial & retail zones'],
    investmentMin: '$250,000', area: '10 km²', units: '250,000+ residents capacity',
  },
  'inf-002': {
    highlights: ['2,500 acres of integrated living', 'International school campus', 'Technology & business park', 'Zero-carbon residential zones'],
    investmentMin: '$80,000', area: '2,500 acres', units: '150,000 planned residents',
  },
  'inf-003': {
    highlights: ['21 residential districts', 'New parliament & ministries', '40 km from central Cairo', 'Smart traffic management city-wide'],
    investmentMin: '$45,000', area: '700 km²', units: '7M residents at full capacity',
  },
  'inf-004': {
    highlights: ['25 km from Dakar city centre', 'University campus hub', 'AIBD Airport proximity', 'Digital economy special zone'],
    investmentMin: '$60,000', area: '1,600 ha', units: '300,000+ planned population',
  },
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = INFRASTRUCTURE_PROJECTS.find(p => p.id === id);

  if (!project) notFound();

  const details = PROJECT_DETAILS[id] ?? {
    highlights: ['Government-backed initiative', 'Investment grade returns', 'Verified developer', 'Transparent timeline'],
    investmentMin: 'TBC', area: 'TBC', units: 'TBC',
  };

  return (
    <div className="min-h-screen bg-[#0d0b1a] pt-20">

      {/* Hero image */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b1a] via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b1a]/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="container-premium">
            <Link href="/construction/smart-cities" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Projects
            </Link>
            <div className="flex items-start gap-3 mb-4 flex-wrap">
              <Badge variant={STATUS_COLORS[project.status] || 'purple'}>{project.status}</Badge>
              <span className="text-amber-400 text-sm font-bold uppercase tracking-widest">{project.type}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
              {project.title}
            </h1>
            <div className="flex items-center gap-2 text-white/60 text-base">
              <MapPin className="w-4 h-4 text-amber-400" />
              {project.location}, {project.country}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display text-2xl font-bold text-white mb-4">About This Project</h2>
                <p className="text-white/55 text-lg leading-relaxed">{project.description}</p>
                <p className="text-white/45 text-base leading-relaxed mt-4">
                  This landmark initiative represents one of Africa&apos;s most significant infrastructure investments, designed to transform urban living, attract international capital, and create lasting economic impact for the region.
                </p>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="font-display text-2xl font-bold text-white mb-6">Project Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {details.highlights.map(h => (
                    <div key={h} className="flex items-start gap-3 p-4 rounded-xl bg-[#14112a] border border-white/8">
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/65 text-sm leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Investment opportunity */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="p-8 rounded-2xl bg-[#14112a] border border-amber-500/20"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-5">
                  Investment Opportunity
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">Invest in {project.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-6">
                  Properties and commercial units within this development are open for early-stage investment. Off-plan purchases offer preferred pricing and strong appreciation potential as the project matures.
                </p>
                <div className="grid grid-cols-3 gap-px bg-white/8 rounded-xl overflow-hidden mb-6">
                  {[
                    { label: 'Minimum Investment', value: details.investmentMin },
                    { label: 'Project Area', value: details.area },
                    { label: 'Planned Capacity', value: details.units },
                  ].map(item => (
                    <div key={item.label} className="bg-[#14112a] py-4 px-3 text-center">
                      <div className="text-sm font-bold text-amber-400 mb-0.5">{item.value}</div>
                      <div className="text-[10px] text-white/35 uppercase tracking-wider leading-tight">{item.label}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/invest"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold transition-all shadow-lg shadow-amber-900/30 text-sm"
                >
                  Explore Investment Options <Send className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Key facts */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#14112a] rounded-2xl border border-white/8 overflow-hidden"
              >
                <div className="px-6 py-5 border-b border-white/8">
                  <h3 className="font-bold text-white text-base">Project Facts</h3>
                </div>
                <div className="divide-y divide-white/8">
                  {[
                    { icon: DollarSign, label: 'Total Value', value: project.value, color: 'text-amber-400' },
                    { icon: Calendar,   label: 'Est. Completion', value: project.completion, color: 'text-white' },
                    { icon: MapPin,     label: 'Country', value: project.country, color: 'text-white' },
                    { icon: MapPin,     label: 'Location', value: project.location, color: 'text-white' },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="flex items-center justify-between px-6 py-4">
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <Icon className="w-4 h-4" />
                        {label}
                      </div>
                      <span className={`font-semibold text-sm ${color}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA: Post a project */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-2xl border border-purple-500/20 p-6"
              >
                <HardHat className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="font-bold text-white text-base mb-2">Involved in this project?</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5">
                  If you're a contractor, developer, or supplier active on this project, post your profile to attract new opportunities.
                </p>
                <Link
                  href="/construction#request-form"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all"
                >
                  Post a Project Brief
                </Link>
              </motion.div>

              {/* Related projects */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="font-bold text-white/60 text-xs uppercase tracking-widest mb-4">Other Projects</h3>
                <div className="space-y-3">
                  {INFRASTRUCTURE_PROJECTS.filter(p => p.id !== id).slice(0, 3).map(p => (
                    <Link
                      key={p.id}
                      href={`/construction/${p.id}`}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-[#14112a] border border-white/8 hover:border-purple-500/30 transition-all"
                    >
                      <div className="w-14 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white/80 text-sm font-semibold group-hover:text-purple-300 transition-colors truncate">{p.title}</div>
                        <div className="text-white/35 text-xs mt-0.5">{p.country} · {p.value}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
