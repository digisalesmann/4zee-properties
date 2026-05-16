'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HardHat, Star, ArrowRight, BadgeCheck, Globe,
  SquareStack, Search, MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { DarkSelect } from '@/components/ui/Select';

const ALL_CONTRACTORS = [
  {
    id: 1, name: 'Julius Berger Nigeria', type: 'General Contractor',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=face',
    rating: 4.9, projects: 234, countries: ['Nigeria', 'Ghana'], region: 'West Africa',
    specialties: ['Commercial', 'Infrastructure', 'Industrial'], verified: true,
    desc: "West Africa's leading construction firm with 60+ years of excellence.",
  },
  {
    id: 2, name: 'WBHO Construction', type: 'General Contractor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face',
    rating: 4.8, projects: 312, countries: ['South Africa', 'Botswana', 'Zimbabwe'], region: 'Southern Africa',
    specialties: ['Mining', 'Commercial', 'Residential'], verified: true,
    desc: "South Africa's most awarded construction group.",
  },
  {
    id: 3, name: 'Arab Contractors', type: 'Developer & Contractor',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=96&h=96&fit=crop&crop=face',
    rating: 4.9, projects: 580, countries: ['Egypt', 'Libya', 'UAE'], region: 'North Africa',
    specialties: ['Government', 'Mega-projects', 'Infrastructure'], verified: true,
    desc: "North Africa's largest construction enterprise.",
  },
  {
    id: 4, name: 'Roko Construction', type: 'Civil Contractor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
    rating: 4.7, projects: 167, countries: ['Kenya', 'Uganda', 'Tanzania'], region: 'East Africa',
    specialties: ['Civil', 'Roads', 'Residential'], verified: true,
    desc: "East Africa's trusted construction partner.",
  },
  {
    id: 5, name: 'Colas West Africa', type: 'Infrastructure Specialist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face',
    rating: 4.6, projects: 143, countries: ['Ivory Coast', 'Senegal', 'Mali'], region: 'West Africa',
    specialties: ['Roads', 'Airports', 'Rail'], verified: true,
    desc: "Francophone West Africa's leading infrastructure contractor.",
  },
  {
    id: 6, name: 'Murray & Roberts', type: 'General Contractor',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=face',
    rating: 4.8, projects: 421, countries: ['South Africa', 'Zambia', 'Mozambique'], region: 'Southern Africa',
    specialties: ['Mining', 'Oil & Gas', 'Engineering'], verified: true,
    desc: "A century of engineering excellence across Southern Africa.",
  },
  {
    id: 7, name: 'Techno Brain Construction', type: 'Smart Building Specialist',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=96&h=96&fit=crop&crop=face',
    rating: 4.5, projects: 89, countries: ['Kenya', 'Rwanda', 'Ethiopia'], region: 'East Africa',
    specialties: ['Smart Buildings', 'Data Centres', 'Commercial'], verified: true,
    desc: "East Africa's pioneer in smart and sustainable construction.",
  },
  {
    id: 8, name: 'Orascom Construction', type: 'Mega-Project Contractor',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=96&h=96&fit=crop&crop=face',
    rating: 4.9, projects: 720, countries: ['Egypt', 'Algeria', 'Morocco'], region: 'North Africa',
    specialties: ['Mega-projects', 'Energy', 'Industrial'], verified: true,
    desc: "One of the world's largest contractors with deep African roots.",
  },
];

const REGIONS = ['All Regions', 'West Africa', 'East Africa', 'Southern Africa', 'North Africa'];
const TYPES   = ['All Types', 'General Contractor', 'Civil Contractor', 'Developer & Contractor', 'Infrastructure Specialist', 'Smart Building Specialist', 'Mega-Project Contractor'];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp  = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function AllContractorsPage() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All Regions');
  const [type, setType]     = useState('All Types');

  const filtered = ALL_CONTRACTORS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                        c.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchRegion = region === 'All Regions' || c.region === region;
    const matchType   = type   === 'All Types'   || c.type   === type;
    return matchSearch && matchRegion && matchType;
  });

  return (
    <div className="min-h-screen bg-[#0d0b1a] pt-20">

      {/* Header */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-700/40 to-transparent" />
        <div className="absolute top-10 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-premium relative">
          <Link href="/construction" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            ← Back to Construction
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-5">
              <HardHat className="w-4 h-4" />
              Verified Partners
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              All <span className="gradient-text">Contractors</span>
            </h1>
            <p className="text-white/45 text-lg max-w-xl">
              {ALL_CONTRACTORS.length} verified construction professionals across Africa. KYC-checked, rated, and ready to build.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-[#0d0b1a]/95 backdrop-blur-xl border-b border-white/6 py-4">
        <div className="container-premium flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-purple-500 text-sm transition-colors"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <DarkSelect
            value={region}
            onChange={setRegion}
            options={REGIONS.map(r => ({ value: r, label: r }))}
            className="sm:w-48"
          />
          <DarkSelect
            value={type}
            onChange={setType}
            options={TYPES.map(t => ({ value: t, label: t }))}
            className="sm:w-56"
          />
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container-premium">
          <div className="text-white/35 text-sm mb-8">
            Showing {filtered.length} of {ALL_CONTRACTORS.length} contractors
          </div>

          {filtered.length > 0 ? (
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {filtered.map(contractor => (
                <motion.div
                  key={contractor.id}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
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

                  {/* Stats row + Contact */}
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
                      <Link
                        href="/construction#request-form"
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-purple-600/20 text-purple-300 text-sm font-semibold hover:bg-purple-600/40 transition-colors"
                      >
                        Contact <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
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
          ) : (
            <div className="text-center py-24 text-white/30">
              <HardHat className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-semibold">No contractors match your filters.</p>
              <button onClick={() => { setSearch(''); setRegion('All Regions'); setType('All Types'); }} className="mt-4 text-purple-400 hover:text-purple-300 text-sm font-semibold">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
