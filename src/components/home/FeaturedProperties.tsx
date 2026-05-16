'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, SlidersHorizontal, Gem } from 'lucide-react';
import Link from 'next/link';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { FEATURED_PROPERTIES } from '@/lib/data';

const FILTER_TABS = [
  { label: 'All', value: '' },
  { label: 'For Sale', value: 'for-sale' },
  { label: 'For Rent', value: 'for-rent' },
  { label: 'Off-Plan', value: 'off-plan' },
  { label: 'Luxury', value: 'luxury' },
];

export function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState('');

  const filtered = FEATURED_PROPERTIES.filter((p) => {
    if (!activeTab) return true;
    if (activeTab === 'luxury') return p.luxury;
    return p.status === activeTab;
  });

  const hero = filtered[0];
  const supporting = filtered.slice(1, 3);
  const rest = filtered.slice(3, 6);

  return (
    <section className="py-24 bg-[#f8f7ff] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container-premium relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-100 border border-purple-200 text-purple-700 text-sm font-semibold mb-4">
              <Gem className="w-4 h-4" />
              Curated For You
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
              Featured <span className="gradient-text">Properties</span>
            </h2>
            <p className="text-gray-500 text-lg mt-2">Hand-picked premium listings across Africa&apos;s top markets.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/properties"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-semibold transition-all text-sm shadow-lg shadow-purple-900/20"
            >
              Browse All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-8 flex-wrap"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.value
                  ? 'bg-purple-700 text-white shadow-lg shadow-purple-900/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <Link href="/properties" className="ml-auto flex items-center gap-1.5 text-sm text-purple-600 hover:text-purple-800 font-medium">
            <SlidersHorizontal className="w-4 h-4" />
            Advanced Filters
          </Link>
        </motion.div>

        {/* Magazine grid — hero card + 2 supporting */}
        {hero && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6"
          >
            {/* Hero — full-bleed */}
            <div className="lg:col-span-7">
              <PropertyCard property={hero} variant="hero" index={0} />
            </div>

            {/* Supporting 2 cards stacked */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              {supporting.map((p, i) => (
                <PropertyCard key={p.id} property={p} variant="featured" index={i + 1} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom row — remaining cards */}
        {rest.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {rest.map((property, i) => (
              <motion.div
                key={property.id}
                variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
              >
                <PropertyCard property={property} variant="featured" index={i + 3} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/properties"
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-purple-200 hover:border-purple-500 text-purple-700 hover:bg-purple-50 font-semibold transition-all"
          >
            View All 48,750+ Properties
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
