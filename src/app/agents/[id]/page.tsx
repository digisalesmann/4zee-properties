'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import {
  Star, Phone, Mail, MapPin,
  Building2, TrendingUp, Award, ArrowLeft, ArrowRight, BadgeCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ALL_AGENTS } from '@/lib/agents';
import { FEATURED_PROPERTIES } from '@/lib/data';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

interface Props {
  params: Promise<{ id: string }>;
}

export default function AgentProfilePage({ params }: Props) {
  const { id } = use(params);
  const agent = ALL_AGENTS.find(a => a.id === id) ?? ALL_AGENTS[0];
  const listings = FEATURED_PROPERTIES.filter(p => p.agent.id === agent.id).slice(0, 4);

  const firstName = agent.name.split(' ')[0];

  return (
    <div className="min-h-screen bg-[#f8f7ff] pt-20">

      {/* Hero banner */}
      <div className="bg-[#0d0b1a] relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="py-12 sm:py-16">
          <div className="container-premium relative">
            <Link href="/agents" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium mb-10 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              All Agents
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-white/10">
                  <Image src={agent.avatar} alt={agent.name} fill className="object-cover" sizes="112px" />
                </div>
                {agent.verified && (
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center ring-3 ring-[#0d0b1a]">
                    <BadgeCheck className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Name block */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <div className="text-purple-400 text-xs font-bold uppercase tracking-widest">Agent Profile</div>
                  {agent.verified && (
                    <span className="text-xs font-bold text-purple-300 bg-purple-500/15 border border-purple-500/20 px-2.5 py-0.5 rounded-md">KYC Verified</span>
                  )}
                </div>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-1">{agent.name}</h1>
                <p className="text-white/50 text-base mb-3">{agent.title} &middot; {agent.agency}</p>

                <div className="flex items-center gap-2.5">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-4 h-4 ${i <= Math.floor(agent.rating) ? 'fill-amber-400 text-amber-400' : 'fill-white/15 text-white/15'}`} />
                    ))}
                  </div>
                  <span className="text-white font-bold text-sm">{agent.rating}</span>
                  <span className="text-white/40 text-sm">({agent.reviews} reviews)</span>
                </div>
              </div>

              {/* Quick contact — desktop */}
              <div className="hidden sm:flex items-center gap-2.5 flex-shrink-0 self-end">
                <a href={`tel:${agent.phone}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-semibold text-sm transition-all">
                  <Phone className="w-4 h-4" />
                  Call
                </a>
                <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors">
                  <WhatsAppIcon className="w-4 h-4" />
                  WhatsApp
                </a>
                <a href={`mailto:${agent.email}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors">
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </div>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden mt-10"
            >
              {[
                { icon: Building2, label: 'Active Listings', value: agent.listings },
                { icon: TrendingUp, label: 'Properties Sold', value: agent.sold },
                { icon: Star, label: 'Client Rating', value: agent.rating },
                { icon: Award, label: 'Years Active', value: `${agent.experience}yr` },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 px-5 sm:px-6 py-5 sm:py-6">
                  <stat.icon className="w-4 h-4 text-purple-400/70 mb-3" />
                  <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                  <div className="text-white/35 text-xs">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Mobile contact bar */}
            <div className="sm:hidden flex gap-2.5 mt-6">
              <a href={`tel:${agent.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/15 text-white/70 font-semibold text-sm transition-all">
                <Phone className="w-4 h-4" />
                Call
              </a>
              <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 text-white font-semibold text-sm">
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </a>
              <a href={`mailto:${agent.email}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm">
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="py-12 pb-24">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ── Sidebar ── */}
            <div className="order-2 lg:order-1 space-y-8">

              {/* About */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-xl font-bold text-gray-900 mb-1">About {firstName}</h2>
                <p className="text-sm text-gray-400 mb-4">Professional background</p>
                <p className="text-gray-600 leading-relaxed text-sm">{agent.bio}</p>
              </motion.div>

              {/* Markets */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="font-bold text-gray-900 mb-1">Markets Covered</h3>
                <p className="text-sm text-gray-400 mb-4">Countries {firstName} operates in</p>
                <div className="divide-y divide-gray-100">
                  {agent.countries.map((c, i) => (
                    <div key={c} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                      <span className="text-xs font-bold text-gray-300 w-4 tabular-nums">{i + 1}</span>
                      <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                      <span className="text-sm font-semibold text-gray-800">{c}</span>
                      {i === 0 && <span className="ml-auto text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Primary</span>}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Languages */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="font-bold text-gray-900 mb-1">Languages</h3>
                <p className="text-sm text-gray-400 mb-4">Spoken fluently</p>
                <div className="flex flex-wrap gap-2">
                  {agent.languages.map(lang => (
                    <Badge key={lang} variant="purple" size="sm">{lang}</Badge>
                  ))}
                </div>
              </motion.div>

              {/* Contact card */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="bg-[#0d0b1a] rounded-2xl p-6 text-white">
                  <div className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">Get in touch</div>
                  <h3 className="font-display font-bold text-xl text-white mb-1">Work with {firstName}</h3>
                  <p className="text-white/45 text-sm mb-6 leading-relaxed">
                    Reach out directly to discuss listings, viewings, or investment advice.
                  </p>
                  <div className="space-y-2.5">
                    <a href={`tel:${agent.phone}`}
                      className="flex items-center gap-3 w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors">
                      <Phone className="w-4 h-4" />
                      {agent.phone}
                    </a>
                    <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors">
                      <WhatsAppIcon className="w-4 h-4" />
                      Message on WhatsApp
                    </a>
                    <a href={`mailto:${agent.email}`}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 font-semibold text-sm transition-all">
                      <Mail className="w-4 h-4" />
                      Send Email
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Main column ── */}
            <div className="order-1 lg:order-2 lg:col-span-2 space-y-12">

              {/* Listings */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-baseline justify-between mb-1">
                  <h2 className="font-display text-2xl font-bold text-gray-900">
                    Active Listings
                  </h2>
                  {listings.length > 0 && (
                    <Link href="/properties" className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-semibold text-sm transition-colors">
                      View all <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-6">Properties currently listed by {firstName}</p>

                {listings.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {listings.map((p, i) => (
                      <PropertyCard key={p.id} property={p} index={i} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-200 rounded-2xl text-center">
                    <Building2 className="w-10 h-10 text-gray-200 mb-3" />
                    <p className="text-gray-500 text-sm mb-4">No current listings from {firstName}</p>
                    <Link href="/properties"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 text-white font-semibold text-sm hover:bg-purple-600 transition-colors">
                      Browse All Properties <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Performance */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Performance</h2>
                <p className="text-sm text-gray-400 mb-6">Track record and client satisfaction</p>
                <div className="divide-y divide-gray-100">
                  {[
                    { label: 'Active Listings', value: agent.listings, note: 'currently live' },
                    { label: 'Properties Sold', value: agent.sold, note: 'lifetime closings' },
                    { label: 'Client Rating', value: `${agent.rating} / 5.0`, note: `from ${agent.reviews} reviews` },
                    { label: 'Years Active', value: `${agent.experience} years`, note: 'on the market' },
                    { label: 'Agency', value: agent.agency, note: agent.title },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-4">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900">{item.value}</span>
                        <div className="text-xs text-gray-400">{item.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA strip */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="bg-[#0d0b1a] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative overflow-hidden">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                  <div className="relative flex-1">
                    <div className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">Ready to move?</div>
                    <h3 className="font-display text-2xl font-bold text-white mb-1">Start your journey with {firstName}</h3>
                    <p className="text-white/45 text-sm">Book a consultation or request a property viewing today.</p>
                  </div>
                  <a href={`tel:${agent.phone}`}
                    className="relative flex-shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-colors">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
