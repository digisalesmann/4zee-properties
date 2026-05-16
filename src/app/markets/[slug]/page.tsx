'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, TrendingUp, Building2, Users, DollarSign, ArrowRight, Globe, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { AFRICAN_COUNTRIES, FEATURED_PROPERTIES } from '@/lib/data';
import { PropertyCard } from '@/components/ui/PropertyCard';

interface Props {
  params: Promise<{ slug: string }>;
}

const MARKET_INSIGHTS: Record<string, { cities: string[]; highlights: string[]; investmentZones: string[] }> = {
  nigeria: {
    cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan'],
    highlights: ['Fastest growing PropTech market in West Africa', 'Strong expat demand in Ikoyi & Victoria Island', 'Off-plan market growing 40% YoY'],
    investmentZones: ['Ikoyi', 'Victoria Island', 'Lekki Phase 1', 'Maitama Abuja', 'Banana Island'],
  },
  'south-africa': {
    cities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Sandton'],
    highlights: ['Most developed real estate market in Africa', 'Strong rental yields in Cape Town Waterfront', 'Major infrastructure investments in Gauteng'],
    investmentZones: ['Sandton', 'V&A Waterfront', 'Umhlanga', 'Centurion', 'Rosebank'],
  },
  kenya: {
    cities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
    highlights: ['Tech hub driving demand for premium apartments', 'Westlands & Karen are top investment areas', 'Tourism driving coastal property boom'],
    investmentZones: ['Westlands', 'Karen', 'Kilimani', 'Diani Beach', 'Runda'],
  },
  ghana: {
    cities: ['Accra', 'Kumasi', 'Tamale', 'Sekondi-Takoradi', 'Cape Coast'],
    highlights: ['Stable economy with growing middle class', 'Airport City becoming key commercial hub', 'Strong diaspora investment from UK & US'],
    investmentZones: ['Airport City', 'East Legon', 'Cantonments', 'Labone', 'Tema'],
  },
  egypt: {
    cities: ['Cairo', 'Alexandria', 'Giza', 'New Administrative Capital', 'Hurghada'],
    highlights: ["New Administrative Capital is Africa's largest urban project", 'North Coast luxury market expanding rapidly', 'Strong government-backed infrastructure'],
    investmentZones: ['New Administrative Capital', 'North Coast', 'New Cairo', 'Sheikh Zayed', 'Ain Sokhna'],
  },
  morocco: {
    cities: ['Casablanca', 'Marrakech', 'Rabat', 'Fez', 'Tangier'],
    highlights: ['Gateway between Europe and Africa for investors', 'Luxury riad market in Marrakech booming', 'Tanger Med port driving industrial real estate'],
    investmentZones: ['Casablanca Finance City', 'Marrakech Palmeraie', 'Rabat Hay Riad', 'Tangier Free Zone'],
  },
  tanzania: {
    cities: ['Dar es Salaam', 'Zanzibar', 'Arusha', 'Dodoma', 'Mwanza'],
    highlights: ['Tourism-driven luxury villa market in Zanzibar', 'Dar es Salaam CBD office demand growing', 'East African gateway for logistics real estate'],
    investmentZones: ['Masaki', 'Oyster Bay', 'Zanzibar Stone Town', 'Upanga', 'Kariakoo'],
  },
  ethiopia: {
    cities: ['Addis Ababa', 'Dire Dawa', 'Hawassa', 'Bahir Dar', 'Mekele'],
    highlights: ['Fastest growing economy in Africa (IMF 2024)', 'Bole district is the new commercial hotspot', 'Major international brands entering market'],
    investmentZones: ['Bole', 'CMC', 'Sarbet', 'Ayat', 'Summit'],
  },
  'ivory-coast': {
    cities: ['Abidjan', 'Bouake', 'Daloa', 'San-Pedro', 'Yamoussoukro'],
    highlights: ["Francophone Africa's fastest real estate market", 'Cocody and Plateau prime for luxury', 'Heavy French & Lebanese investor presence'],
    investmentZones: ['Cocody', 'Plateau', 'Marcory', 'Riviera', 'Bingerville'],
  },
  rwanda: {
    cities: ['Kigali', 'Gisenyi', 'Butare', 'Ruhengeri', 'Kibuye'],
    highlights: ["Africa's cleanest, most business-friendly city", 'Kigali Convention Centre driving hotel demand', 'Fastest rising real estate values on continent'],
    investmentZones: ['Kicukiro', 'Kimihurura', 'Kiyovu', 'Nyarutarama', 'Gacuriro'],
  },
};

export default function MarketPage({ params }: Props) {
  const { slug } = use(params);

  const country = AFRICAN_COUNTRIES.find(
    c => c.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!country) {
    return (
      <div className="min-h-screen bg-[#f8f7ff] pt-20 flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-16 h-16 mx-auto mb-4 text-purple-300" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Market Not Found</h1>
          <p className="text-gray-500 mb-6">We don&apos;t have data for this market yet.</p>
          <Link href="/markets" className="px-6 py-3 rounded-xl bg-purple-700 text-white font-semibold hover:bg-purple-600 transition-colors">
            Browse All Markets
          </Link>
        </div>
      </div>
    );
  }

  const insights = MARKET_INSIGHTS[slug] ?? {
    cities: [],
    highlights: ['Growing real estate market with strong fundamentals'],
    investmentZones: [],
  };

  const relatedProperties = FEATURED_PROPERTIES.filter(
    p => p.location.country.toLowerCase() === country.name.toLowerCase()
  );

  const growthPositive = country.growth.startsWith('+');

  return (
    <div className="min-h-screen bg-[#f8f7ff] pt-20">

      {/* Hero */}
      <div className="bg-[#0d0b1a] relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="py-14 sm:py-20">
          <div className="container-premium relative">
            <Link href="/markets" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium mb-10 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              All Markets
            </Link>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">Property Market</div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-none mb-4">
                {country.name}
              </h1>
              <p className="text-white/50 text-lg max-w-xl">
                Real estate data, investment insights, and premium listings across {country.name}&apos;s top cities.
              </p>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden mt-12"
            >
              {[
                { icon: Building2, label: 'Properties', value: country.properties.toLocaleString(), accent: false },
                { icon: Users, label: 'Active Agents', value: country.agents, accent: false },
                { icon: DollarSign, label: 'Avg. Price', value: country.avgPrice, accent: false },
                { icon: TrendingUp, label: 'YoY Growth', value: country.growth, accent: true },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 px-6 py-6">
                  <stat.icon className="w-4 h-4 text-purple-400/70 mb-3" />
                  <div className={`text-2xl font-bold mb-0.5 ${stat.accent ? (growthPositive ? 'text-emerald-400' : 'text-red-400') : 'text-white'}`}>
                    {stat.value}
                  </div>
                  <div className="text-white/35 text-xs">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="py-14 pb-24">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ── Main column ── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Market Highlights */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Market Highlights</h2>
                <p className="text-sm text-gray-400 mb-6">Key drivers shaping {country.name}&apos;s real estate market</p>
                <div className="divide-y divide-gray-100">
                  {insights.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 leading-relaxed">{h}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Key Cities */}
              {insights.cities.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Key Cities</h2>
                  <p className="text-sm text-gray-400 mb-6">Major urban centres in {country.name}</p>
                  <div className="divide-y divide-gray-100">
                    {insights.cities.map((city, i) => (
                      <div key={city} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-300 w-5 tabular-nums">0{i + 1}</span>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-purple-400" />
                            <span className="font-semibold text-gray-800">{city}</span>
                          </div>
                        </div>
                        {i === 0 && (
                          <span className="text-xs font-bold px-2.5 py-1 bg-purple-50 text-purple-600 rounded-md">Primary</span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Properties */}
              {relatedProperties.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="flex items-baseline justify-between mb-1">
                    <h2 className="font-display text-2xl font-bold text-gray-900">Listings in {country.name}</h2>
                    <Link href={`/properties?country=${country.name}`}
                      className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-semibold text-sm transition-colors">
                      View all <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">Featured properties available now</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {relatedProperties.slice(0, 4).map((p, i) => (
                      <PropertyCard key={p.id} property={p} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}

              {relatedProperties.length === 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Listings in {country.name}</h2>
                  <p className="text-sm text-gray-400 mb-6">Featured properties available now</p>
                  <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-200 rounded-2xl text-center">
                    <Building2 className="w-10 h-10 text-gray-200 mb-3" />
                    <p className="text-gray-500 mb-4 text-sm">No featured listings yet for {country.name}</p>
                    <Link href="/properties"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 text-white font-semibold text-sm hover:bg-purple-600 transition-colors">
                      Browse All Properties <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-8">

              {/* Market Data */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Market Data</h3>
                <p className="text-sm text-gray-400 mb-4">At-a-glance statistics</p>
                <div className="divide-y divide-gray-100">
                  {[
                    { label: 'Currency', value: country.currency },
                    { label: 'Avg. Property Price', value: country.avgPrice },
                    { label: 'Listed Properties', value: country.properties.toLocaleString() },
                    { label: 'Active Agents', value: country.agents },
                    { label: 'Market Growth', value: country.growth },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-3.5">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className={`text-sm font-bold ${item.label === 'Market Growth' ? (growthPositive ? 'text-emerald-600' : 'text-red-500') : 'text-gray-900'}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Investment Zones */}
              {insights.investmentZones.length > 0 && (
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Top Investment Zones</h3>
                  <p className="text-sm text-gray-400 mb-4">Prime areas for capital growth</p>
                  <div className="divide-y divide-gray-100">
                    {insights.investmentZones.map((zone, i) => (
                      <div key={zone} className="flex items-center gap-3 py-3.5">
                        <span className="text-xs font-bold text-gray-300 w-4 tabular-nums">{i + 1}</span>
                        <span className="text-sm font-semibold text-gray-800">{zone}</span>
                        {i === 0 && (
                          <span className="ml-auto text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Top</span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div className="bg-[#0d0b1a] rounded-2xl p-6 text-white">
                  <div className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">Ready to invest?</div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">Explore {country.name}</h3>
                  <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    Connect with verified local agents and access premium listings in this market.
                  </p>
                  <Link
                    href={`/properties?country=${country.name}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors"
                  >
                    Browse Properties
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/agents"
                    className="mt-2.5 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-semibold text-sm transition-all"
                  >
                    Find Local Agents
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
