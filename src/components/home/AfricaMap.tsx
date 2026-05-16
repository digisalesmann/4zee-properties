'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, Building, Users, ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';
import { AFRICAN_COUNTRIES } from '@/lib/data';

/* Country markers — x/y positions on the 220×260 viewBox Africa SVG */
const MARKER_POSITIONS: Record<string, { x: number; y: number }> = {
  NG: { x: 82, y: 103 },   // Nigeria
  ZA: { x: 135, y: 215 },  // South Africa
  KE: { x: 176, y: 132 },  // Kenya
  GH: { x: 53, y: 107 },   // Ghana
  EG: { x: 151, y: 43 },   // Egypt
  MA: { x: 41, y: 21 },    // Morocco
  TZ: { x: 168, y: 148 },  // Tanzania
  ET: { x: 178, y: 95 },   // Ethiopia
  CI: { x: 44, y: 112 },   // Ivory Coast
  RW: { x: 155, y: 138 },  // Rwanda
};

function FlagImage({ code, size = 20 }: { code: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt={code}
      width={size}
      height={size * 0.67}
      className="rounded-sm object-cover shadow-sm"
    />
  );
}

export function AfricaMap() {
  const [activeCountry, setActiveCountry] = useState(AFRICAN_COUNTRIES[0]);

  return (
    <section className="py-24 bg-[#0d0b1a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-900/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-800/20 rounded-full blur-3xl" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container-premium relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — headline + country list */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg glass-purple text-purple-300 text-sm font-semibold mb-6">
                <Globe className="w-4 h-4" />
                Pan-African Coverage
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Property Markets <br />
                <span className="gradient-text">Across Africa</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                From the skyscrapers of Lagos to the smart cities of Kigali, explore real estate investment opportunities across 28 African nations.
              </p>
            </motion.div>

            {/* Country list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AFRICAN_COUNTRIES.slice(0, 8).map((country, i) => (
                <motion.button
                  key={country.code}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  onClick={() => setActiveCountry(country)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border transition-all text-left ${
                    activeCountry.code === country.code
                      ? 'border-purple-500/50 bg-purple-900/40 shadow-lg shadow-purple-900/20'
                      : 'border-white/8 hover:border-purple-500/30 hover:bg-purple-900/20'
                  }`}
                >
                  <FlagImage code={country.code} size={22} />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{country.name}</div>
                    <div className="text-xs text-white/50">{country.properties.toLocaleString()} properties</div>
                  </div>
                  <div className={`ml-auto text-xs font-bold flex-shrink-0 ${country.growth.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {country.growth}
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <Link href="/markets" className="group flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                View All 28 African Markets
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right — Real Africa map + detail card */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Glow */}
              <div className="absolute inset-12 rounded-full bg-purple-700/15 blur-3xl pointer-events-none" />

              {/* Real Africa SVG outline */}
              <svg
                viewBox="0 0 220 260"
                className="w-full h-auto drop-shadow-2xl"
                aria-label="Map of Africa"
              >
                {/* Continent fill */}
                <path
                  d="M 38 8 L 50 8 L 68 6 L 80 5 L 85 5 L 91 14 L 97 18 L 108 24 L 130 20 L 147 24 L 155 23 L 163 29 L 175 55 L 190 84 C 210 84 217 88 215 92 L 197 112 L 184 131 L 178 137 L 177 145 L 180 157 L 181 170 L 163 187 L 156 207 L 151 220 L 143 231 L 137 234 L 119 237 L 114 236 L 112 231 L 99 212 L 101 200 L 99 196 L 93 182 L 98 165 L 96 151 L 92 134 L 87 122 L 83 120 L 67 112 L 57 115 L 44 116 L 32 119 L 22 113 L 15 105 L 14 101 L 5 83 L 5 73 L 5 63 L 7 55 L 17 41 L 26 33 L 32 16 Z"
                  fill="rgba(109,40,217,0.18)"
                  stroke="rgba(139,92,246,0.45)"
                  strokeWidth="1"
                />

                {/* Country dot markers */}
                {AFRICAN_COUNTRIES.slice(0, 10).map((country) => {
                  const pos = MARKER_POSITIONS[country.code];
                  if (!pos) return null;
                  const isActive = activeCountry.code === country.code;
                  return (
                    <g key={country.code}>
                      <motion.circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isActive ? 6 : 4}
                        fill={isActive ? '#f59e0b' : 'rgba(167,139,250,0.7)'}
                        stroke={isActive ? '#fbbf24' : 'rgba(139,92,246,0.4)'}
                        strokeWidth={isActive ? 2 : 1}
                        className="cursor-pointer"
                        onClick={() => setActiveCountry(country)}
                        animate={isActive ? { r: [5, 7, 5] } : { r: 4 }}
                        transition={isActive ? { repeat: Infinity, duration: 2 } : {}}
                      />
                      {isActive && (
                        <motion.circle
                          cx={pos.x}
                          cy={pos.y}
                          r={10}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          opacity={0.4}
                          animate={{ r: [8, 14, 8], opacity: [0.5, 0, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Active country detail card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCountry.code}
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="mt-4 glass-dark rounded-2xl p-5 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <FlagImage code={activeCountry.code} size={28} />
                    <div>
                      <div className="text-white font-bold text-base">{activeCountry.name}</div>
                      <div className="text-white/50 text-xs">{activeCountry.currency} Market</div>
                    </div>
                    <div className="ml-auto text-emerald-400 font-bold text-base">{activeCountry.growth}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center py-3 border-r border-white/8">
                      <Building className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                      <div className="text-white font-bold text-sm">{activeCountry.properties.toLocaleString()}</div>
                      <div className="text-white/40 text-xs">Properties</div>
                    </div>
                    <div className="text-center py-3 border-r border-white/8">
                      <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                      <div className="text-white font-bold text-sm">{activeCountry.agents}</div>
                      <div className="text-white/40 text-xs">Agents</div>
                    </div>
                    <div className="text-center py-3">
                      <TrendingUp className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                      <div className="text-white font-bold text-sm">{activeCountry.avgPrice}</div>
                      <div className="text-white/40 text-xs">Avg. Price</div>
                    </div>
                  </div>

                  <Link href="/markets"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors">
                    Explore {activeCountry.name} Market
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
