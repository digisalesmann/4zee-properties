'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal, List, Search,
  X, LayoutGrid, ArrowDown,
} from 'lucide-react';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { FEATURED_PROPERTIES, PROPERTY_TYPES, LISTING_STATUSES, AFRICAN_CITIES } from '@/lib/data';
import { Select } from '@/components/ui/Select';
import type { Property } from '@/types';

const BEDROOMS = ['Any', '1', '2', '3', '4', '5+'];
const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Viewed', value: 'views' },
  { label: 'Most Saved', value: 'saved' },
];

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-purple-100 text-purple-700 text-sm font-semibold border border-purple-200">
      {label}
      <button onClick={onRemove} className="hover:text-purple-900 transition-colors">
        <X className="w-3.5 h-3.5" />
      </button>
    </span>
  );
}

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('');
  const [activeStatus, setActiveStatus] = useState('');
  const [activeBeds, setActiveBeds] = useState('Any');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);

  // Combine real data with duplicated entries for richer listing
  const allProperties: Property[] = useMemo(() => [...FEATURED_PROPERTIES, ...FEATURED_PROPERTIES.map(p => ({ ...p, id: `${p.id}-b` }))], []);

  const filtered = useMemo(() => {
    let result = allProperties.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.location.city.toLowerCase().includes(search.toLowerCase()) &&
        !p.location.country.toLowerCase().includes(search.toLowerCase())) return false;
      if (activeType && p.type !== activeType) return false;
      if (activeStatus && p.status !== activeStatus) return false;
      if (activeBeds !== 'Any' && p.bedrooms) {
        const beds = activeBeds === '5+' ? 5 : parseInt(activeBeds);
        if (activeBeds === '5+' ? (p.bedrooms ?? 0) < 5 : p.bedrooms !== beds) return false;
      }
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'views': result.sort((a, b) => b.views - a.views); break;
      case 'saved': result.sort((a, b) => b.savedCount - a.savedCount); break;
    }

    return result;
  }, [allProperties, search, activeType, activeStatus, activeBeds, priceRange, sortBy]);

  const activeFilters = [
    activeType && { label: PROPERTY_TYPES.find(t => t.value === activeType)?.label || activeType, clear: () => setActiveType('') },
    activeStatus && { label: LISTING_STATUSES.find(s => s.value === activeStatus)?.label || activeStatus, clear: () => setActiveStatus('') },
    activeBeds !== 'Any' && { label: `${activeBeds} Beds`, clear: () => setActiveBeds('Any') },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <div className="min-h-screen bg-[#f8f7ff] pt-20">
      {/* Hero bar */}
      <div className="bg-gradient-to-r from-[#1e1a3a] to-[#2e1065] py-12">
        <div className="container-premium">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                Find Your Perfect Property
              </h1>
              <p className="text-white/60">
                {filtered.length.toLocaleString()} properties across Africa
              </p>
            </div>

            {/* Search bar */}
            <div className="flex gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="City, neighborhood, country..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 rounded-xl text-white placeholder-white/40 border border-white/15 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all text-sm"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  showFilters ? 'bg-purple-500 text-white' : 'bg-white/10 text-white border border-white/15 hover:bg-white/20'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilters.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-gray-900 text-xs font-bold flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white border-b border-gray-100 overflow-hidden shadow-md"
          >
            <div className="py-8">
            <div className="container-premium">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {/* Property Type */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Property Type</label>
                  <div className="flex flex-wrap gap-1.5">
                    {PROPERTY_TYPES.map(t => (
                      <button key={t.value} onClick={() => setActiveType(t.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          activeType === t.value ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                        }`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Listing Status</label>
                  <div className="flex flex-wrap gap-1.5">
                    {LISTING_STATUSES.map(s => (
                      <button key={s.value} onClick={() => setActiveStatus(s.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          activeStatus === s.value ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                        }`}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Bedrooms</label>
                  <div className="flex flex-wrap gap-1.5">
                    {BEDROOMS.map(b => (
                      <button key={b} onClick={() => setActiveBeds(b)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeBeds === b ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                        }`}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Price Range — <span className="text-purple-600">${priceRange[0].toLocaleString()} – ${priceRange[1].toLocaleString()}</span>
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-gray-400 mb-1 block">Min Price</label>
                      <input type="range" min={0} max={5000000} step={50000} value={priceRange[0]}
                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                        className="w-full accent-purple-600" />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-400 mb-1 block">Max Price</label>
                      <input type="range" min={100000} max={10000000} step={100000} value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                        className="w-full accent-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <button onClick={() => { setActiveType(''); setActiveStatus(''); setActiveBeds('Any'); setPriceRange([0, 10000000]); }}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Clear All
                </button>
                <button onClick={() => setShowFilters(false)}
                  className="px-5 py-2.5 rounded-xl bg-purple-700 text-white text-sm font-semibold hover:bg-purple-600 transition-colors">
                  Apply Filters ({filtered.length})
                </button>
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="py-8 pb-16">
      <div className="container-premium">
        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-sm text-gray-500 font-medium">Active filters:</span>
            {activeFilters.map((f) => (
              <FilterChip key={f.label} label={f.label} onRemove={f.clear} />
            ))}
            <button onClick={() => { setActiveType(''); setActiveStatus(''); setActiveBeds('Any'); }}
              className="text-sm text-purple-600 hover:text-purple-800 font-semibold">
              Clear all
            </button>
          </div>
        )}

        {/* Sort & View controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">
              Showing <span className="font-bold text-gray-900">{filtered.length}</span> properties
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <Select
              value={sortBy}
              onChange={setSortBy}
              options={SORT_OPTIONS}
              className="w-44"
            />

            {/* View toggle */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Properties */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-purple-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
            <button onClick={() => { setSearch(''); setActiveType(''); setActiveStatus(''); setActiveBeds('Any'); }}
              className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-colors">
              Clear Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((property, i) => (
              <PropertyCard key={property.id} property={property} variant="list" index={i} />
            ))}
          </div>
        )}

        {/* Load more */}
        {filtered.length > 0 && (
          <div className="flex justify-center mt-12">
            <button className="flex items-center gap-3 px-10 py-4 rounded-2xl border-2 border-purple-200 hover:border-purple-500 text-purple-700 hover:bg-purple-50 font-semibold transition-all">
              Load More Properties
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
