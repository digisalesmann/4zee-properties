'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Star, Phone, MapPin, Building2,
  Users, Award, TrendingUp, ArrowRight, CheckCircle2, Globe,
  BadgeCheck, Filter,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { ALL_AGENTS } from '@/lib/agents';
import { DarkSelect } from '@/components/ui/Select';

const COUNTRIES = ['All Countries', 'Nigeria', 'South Africa', 'Kenya', 'Ghana', 'Egypt', 'Morocco'];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  );
}

function AgentCard({ agent, index }: { agent: typeof ALL_AGENTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: Math.min(index * 0.06, 0.35), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/8 transition-all duration-300 overflow-hidden"
    >
      {/* Top section */}
      <div className="p-6 sm:p-7 flex gap-5">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden">
            <Image src={agent.avatar} alt={agent.name} fill className="object-cover" sizes="96px" />
          </div>
          {agent.verified && (
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center ring-2 ring-white">
              <BadgeCheck className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <h3 className="font-bold text-gray-900 text-lg leading-tight">{agent.name}</h3>
            {agent.verified && (
              <span className="flex-shrink-0 text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">Verified</span>
            )}
          </div>
          <p className="text-gray-500 text-sm mb-0.5">{agent.title}</p>
          <p className="text-purple-600 text-sm font-semibold mb-3">{agent.agency}</p>

          <div className="flex items-center gap-2">
            <StarRating rating={agent.rating} />
            <span className="text-sm font-bold text-gray-800">{agent.rating}</span>
            <span className="text-xs text-gray-400">({agent.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px bg-gray-100 border-t border-b border-gray-100">
        {[
          { label: 'Active Listings', value: agent.listings },
          { label: 'Properties Sold', value: agent.sold },
          { label: 'Years Active', value: `${agent.experience}yr` },
        ].map((stat) => (
          <div key={stat.label} className="bg-white py-4 text-center">
            <div className="font-bold text-gray-900 text-xl leading-none mb-1">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Markets & languages */}
      <div className="px-6 sm:px-7 py-5 space-y-3">
        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-gray-600 leading-snug">{agent.countries.join(' · ')}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Globe className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          {agent.languages.map(lang => (
            <Badge key={lang} variant="purple" size="sm">{lang}</Badge>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 sm:px-7 pb-6 sm:pb-7 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <a
            href={`tel:${agent.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-700 text-sm font-semibold transition-all"
          >
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            Call
          </a>
          <a
            href={`https://wa.me/${agent.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 flex-shrink-0" />
            WhatsApp
          </a>
        </div>
        <Link
          href={`/agents/${agent.id}`}
          className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-sm font-semibold transition-colors"
        >
          View Profile
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function AgentsPage() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('All Countries');

  const filtered = ALL_AGENTS.filter(a => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) &&
      !a.agency.toLowerCase().includes(search.toLowerCase())) return false;
    if (country !== 'All Countries' && !a.countries.includes(country)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8f7ff] pt-20">

      {/* Hero */}
      <div className="bg-[#0d0b1a] relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="py-16 sm:py-24">
          <div className="container-premium relative">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-6">
                <Users className="w-4 h-4" />
                {ALL_AGENTS.length}+ Verified Agents Across Africa
              </div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-none mb-4">
                Find Your<br /><span className="text-purple-400">Expert Agent</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl max-w-xl mb-10">
                Work with Africa&apos;s most trusted, KYC-verified real estate professionals.
              </p>

              {/* Search bar */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search by name or agency..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all"
                  />
                </div>
                <DarkSelect
                  value={country}
                  onChange={setCountry}
                  options={COUNTRIES.map(c => ({ value: c, label: c }))}
                  className="sm:min-w-44"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust strip inside hero */}
        <div className="border-t border-white/8">
          <div className="relative">
            {/* fade hint on right edge */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0d0b1a] to-transparent z-10 md:hidden" />
            <div className="overflow-x-auto scrollbar-hide py-4 px-4 sm:px-6 lg:px-10">
              <div className="flex gap-px bg-white/8 rounded-xl overflow-hidden w-max md:w-full">
                {[
                  { icon: CheckCircle2, text: 'KYC Verified' },
                  { icon: Award, text: 'Background Checked' },
                  { icon: Star, text: 'Client Rated' },
                  { icon: Globe, text: 'Multi-Country' },
                  { icon: TrendingUp, text: 'Performance Tracked' },
                ].map((item) => (
                  <div key={item.text} className="bg-white/5 flex items-center gap-2 py-3 px-5 text-white/50 text-xs font-medium whitespace-nowrap flex-1 justify-center">
                    <item.icon className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results body */}
      <div className="py-12 pb-24">
        <div className="container-premium">

          {/* Results header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filtered.length} Agent{filtered.length !== 1 ? 's' : ''} Found
                {country !== 'All Countries' && <span className="text-purple-600"> in {country}</span>}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">All agents are KYC-verified and background-checked</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
              <Filter className="w-4 h-4" />
              Top Rated
            </div>
          </div>

          {/* Agents grid — 2 columns so cards are wide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 border border-dashed border-gray-200 rounded-2xl text-center">
              <Users className="w-12 h-12 mb-4 text-gray-200" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No agents found</h3>
              <p className="text-gray-400 text-sm">Try a different search or country filter.</p>
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 bg-[#0d0b1a] rounded-3xl overflow-hidden relative"
          >
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/8">
              {/* Left — copy */}
              <div className="bg-[#0d0b1a] p-10 sm:p-14">
                <div className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">Join the network</div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                  Are You a Real Estate Professional?
                </h2>
                <p className="text-white/50 text-base leading-relaxed mb-8">
                  Join Africa&apos;s fastest-growing platform. Get verified, build your profile, and close more deals.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="mailto:agents@4zee.com"
                    className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors">
                    Apply to Join <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link href="/dashboard"
                    className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-white/25 font-semibold transition-all">
                    Agent Dashboard
                  </Link>
                </div>
              </div>

              {/* Right — benefit list */}
              <div className="bg-white/3 p-10 sm:p-14">
                <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">What you get</div>
                <div className="divide-y divide-white/8">
                  {[
                    { label: 'Verified Badge', desc: 'Build trust with a KYC-verified profile' },
                    { label: 'Pan-African Reach', desc: 'List across 28 African markets' },
                    { label: 'Lead Generation', desc: 'Direct buyer and renter enquiries' },
                    { label: 'Analytics Dashboard', desc: 'Track views, saves, and conversions' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                      <Building2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white font-semibold text-sm">{item.label}</div>
                        <div className="text-white/40 text-xs mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
