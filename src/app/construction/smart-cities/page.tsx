'use client';

import { motion } from 'framer-motion';
import { MapPin, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { INFRASTRUCTURE_PROJECTS } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';

const STATUS_COLORS: Record<string, 'gold' | 'green' | 'blue' | 'purple'> = {
  'Under Construction': 'gold',
  'Phase 2 Active':     'green',
  'Phase 1 Complete':   'blue',
  'Active Development': 'purple',
};

const EXTRA_PROJECTS = [
  {
    id: 'inf-005',
    title: 'Konza Technopolis',
    location: 'Machakos County',
    country: 'Kenya',
    type: 'Tech City',
    value: '$14.5 Billion',
    status: 'Phase 2 Active',
    completion: '2030',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    description: "Kenya's Silicon Savannah — a world-class technology hub 60km from Nairobi.",
  },
  {
    id: 'inf-006',
    title: 'Hope City, Accra',
    location: 'Greater Accra',
    country: 'Ghana',
    type: 'Smart City',
    value: '$10 Billion',
    status: 'Active Development',
    completion: '2029',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
    description: "West Africa's first truly integrated smart city — housing, retail, tech, and green spaces.",
  },
  {
    id: 'inf-007',
    title: 'Mohamed bin Zayed City',
    location: 'Greater Cairo',
    country: 'Egypt',
    type: 'Residential City',
    value: '$4.2 Billion',
    status: 'Phase 1 Complete',
    completion: '2027',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80',
    description: "A vast residential city project serving as a satellite hub to Egypt's new capital.",
  },
];

const ALL_PROJECTS = [...INFRASTRUCTURE_PROJECTS, ...EXTRA_PROJECTS];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp  = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function SmartCitiesPage() {
  return (
    <div className="min-h-screen bg-[#0d0b1a] pt-20">

      {/* Header */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="absolute top-10 right-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-premium relative">
          <Link href="/construction" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            ← Back to Construction
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-5">
              Infrastructure & Smart Cities
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              Africa&apos;s Boldest{' '}
              <span className="gradient-text">Development Projects</span>
            </h1>
            <p className="text-white/45 text-lg max-w-2xl">
              {ALL_PROJECTS.length} landmark initiatives shaping the future of African urban life and investment. From smart cities to government capitals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-t border-b border-white/6">
        <div className="container-premium">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
            {[
              { value: '$95B+', label: 'Combined Project Value' },
              { value: '7',     label: 'Active Projects' },
              { value: '6',     label: 'Countries' },
              { value: '2030',  label: 'Latest Completion' },
            ].map(item => (
              <div key={item.label} className="bg-[#0d0b1a] py-6 px-6 text-center">
                <div className="text-2xl font-bold text-amber-400 mb-1 font-display">{item.value}</div>
                <div className="text-white/40 text-xs uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-20">
        <div className="container-premium">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {ALL_PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                transition={{ duration: 0.55 }}
                className={i === 0 ? 'md:col-span-2' : ''}
              >
                <Link
                  href={`/construction/${project.id}`}
                  className={`group block bg-[#14112a] rounded-2xl border border-white/8 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-900/20 transition-all overflow-hidden ${i === 0 ? 'grid grid-cols-1 lg:grid-cols-5' : ''}`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${i === 0 ? 'lg:col-span-3 h-80 lg:h-auto min-h-[300px]' : 'h-56'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant={STATUS_COLORS[project.status] || 'purple'}>{project.status}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/70 text-sm">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      {project.location}, {project.country}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex flex-col justify-between p-7 ${i === 0 ? 'lg:col-span-2' : ''}`}>
                    <div>
                      <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">{project.type}</div>
                      <h2 className={`font-display font-bold text-white group-hover:text-purple-300 transition-colors leading-snug mb-3 ${i === 0 ? 'text-2xl' : 'text-xl'}`}>
                        {project.title}
                      </h2>
                      <p className="text-white/45 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/8 flex items-center justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-3.5 h-3.5 text-amber-500/60" />
                          <span className="text-amber-400 font-bold">{project.value}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/40">
                          <Calendar className="w-3.5 h-3.5 text-purple-400/60" />
                          Est. {project.completion}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-purple-400 font-semibold text-sm group-hover:gap-2.5 transition-all">
                        View Details <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
