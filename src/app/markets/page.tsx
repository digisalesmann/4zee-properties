'use client';

import { motion } from 'framer-motion';
import { Globe, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import { AFRICAN_COUNTRIES } from '@/lib/data';
import { useState } from 'react';

export default function MarketsPage() {
  const [search, setSearch] = useState('');
  const filtered = AFRICAN_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f7ff] pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0d0b1a] to-[#2e1065] py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-premium relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg glass-purple text-purple-300 text-sm font-semibold mb-6">
              <Globe className="w-4 h-4" />
              28 African Markets & Counting
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              Explore African <span className="gradient-text">Property Markets</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto mb-10">
              Real-time property data, market intelligence, and investment insights from across the African continent.
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input type="text" placeholder="Search a country..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-12 pb-20">
      <div className="container-premium">
        {/* Continent overview — flat stat bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden mb-12">
          {[
            { label: 'Countries', value: '28' },
            { label: 'Total Properties', value: '48K+' },
            { label: 'Active Agents', value: '3.2K+' },
            { label: 'Avg Market Growth', value: '+28%' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white text-center py-6 px-4">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-0.5">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Markets grid */}
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">All African Markets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((country, i) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/markets/${country.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group block bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/8 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                    alt={country.name}
                    width={36}
                    height={24}
                    className="rounded shadow-sm object-cover"
                  />
                  <span className={`text-sm font-bold px-2.5 py-1 rounded-md ${country.growth.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {country.growth}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-xl mb-1 group-hover:text-purple-700 transition-colors">{country.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Avg. Price: <span className="font-bold text-gray-700">{country.avgPrice}</span></p>

                <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-gray-100">
                  <div>
                    <div className="text-sm font-bold text-gray-800">{country.properties.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Properties</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">{country.agents}</div>
                    <div className="text-xs text-gray-500">Agents</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Explore Market <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Globe className="w-16 h-16 mx-auto mb-4 text-purple-200" />
            <h3 className="text-xl font-bold text-gray-800">No markets found for &ldquo;{search}&rdquo;</h3>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
