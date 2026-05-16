'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, Building2, Landmark, Trees, ArrowRight } from 'lucide-react';
import { AFRICAN_CITIES, PROPERTY_TYPES } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { DarkSelect } from '@/components/ui/Select';

const PROPERTY_FILTERS = [
  { label: 'Buy', value: 'for-sale', icon: Home },
  { label: 'Rent', value: 'for-rent', icon: Building2 },
  { label: 'Off-Plan', value: 'off-plan', icon: Landmark },
  { label: 'Land', value: 'land', icon: Trees },
];

const QUICK_STATS = [
  { value: '48K+', label: 'Properties Listed' },
  { value: '28', label: 'Countries' },
  { value: '3.2K+', label: 'Verified Agents' },
  { value: '$2.4B', label: 'Transaction Volume' },
];

export function Hero() {
  const [activeFilter, setActiveFilter] = useState('for-sale');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('city', location);
    if (propertyType) params.set('type', propertyType);
    if (budget) params.set('maxPrice', budget);
    if (activeFilter) params.set('status', activeFilter);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-[#0d0b1a]">
      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/50 to-transparent" />

      {/* Content — left-aligned */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center px-4 pt-24 pb-20 sm:pb-12">

        <div className="container-premium">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight">
            Africa&apos;s Future<br />
            <span className="gradient-text">in Real Estate</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg font-light mt-5 max-w-xl leading-relaxed">
            Premium properties across 28 African countries. AI-powered, verified, and ready to invest.
          </p>
        </motion.div>

        {/* Search box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-3xl"
        >
          {/* Filter tabs */}
          <div className="flex gap-1 mb-0 overflow-x-auto scrollbar-hide">
            {PROPERTY_FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-t-xl text-sm font-semibold transition-all flex-shrink-0 ${
                  activeFilter === filter.value
                    ? 'bg-white/10 backdrop-blur-md text-white border border-white/15 border-b-0'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                <filter.icon className="w-3.5 h-3.5" />
                {filter.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl rounded-tl-none border border-white/15 p-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                <input
                  type="text"
                  list="cities-list"
                  placeholder="City, neighborhood, or country…"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/40 bg-white/8 border border-white/10 focus:outline-none focus:border-white/30 focus:bg-white/12 transition-all"
                  style={{ colorScheme: 'dark' }}
                />
                <datalist id="cities-list">
                  {AFRICAN_CITIES.map(c => <option key={c} value={c} />)}
                </datalist>
              </div>

              <DarkSelect
                value={propertyType}
                onChange={setPropertyType}
                placeholder="Property Type"
                options={PROPERTY_TYPES.map(t => ({ value: t.value, label: t.label }))}
                className="sm:w-44"
              />

              <DarkSelect
                value={budget}
                onChange={setBudget}
                placeholder="Any Budget"
                options={[
                  { value: '100000', label: 'Up to ₦100M' },
                  { value: '300000', label: 'Up to ₦300M' },
                  { value: '500000', label: 'Up to ₦500M' },
                  { value: '1000000', label: 'Up to $1M' },
                  { value: '5000000', label: 'Up to $5M' },
                  { value: '99999999', label: 'No Limit' },
                ]}
                className="sm:w-40"
              />

              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold rounded-xl transition-colors whitespace-nowrap text-sm shadow-lg shadow-purple-900/40"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2 px-2 flex-wrap">
              <span className="text-white/30 text-xs">Popular:</span>
              {['Lagos Penthouse', 'Nairobi Apartment', 'Cape Town Villa', 'Abuja Land'].map((s) => (
                <button
                  key={s}
                  onClick={() => setLocation(s.split(' ')[0])}
                  className="text-xs text-white/50 hover:text-purple-300 transition-colors hover:underline underline-offset-2"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        </div>
      </div>

      {/* Bottom stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="flex items-center overflow-x-auto border-t border-white/10 bg-black/30 backdrop-blur-sm divide-x divide-white/10">
          {QUICK_STATS.map((stat) => (
            <div key={stat.label} className="flex-shrink-0 py-3 px-4 sm:py-4 sm:px-6 text-center min-w-[80px]">
              <div className="text-sm sm:text-lg font-bold text-white leading-none">{stat.value}</div>
              <div className="text-white/45 text-[10px] sm:text-xs mt-0.5 whitespace-nowrap">{stat.label}</div>
            </div>
          ))}
          <button
            onClick={() => router.push('/properties')}
            className="flex-shrink-0 py-3 px-4 sm:py-4 sm:px-6 flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-medium transition-colors group whitespace-nowrap"
          >
            Browse All
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>


    </section>
  );
}
