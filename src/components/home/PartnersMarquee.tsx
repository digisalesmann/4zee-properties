'use client';

import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const PARTNERS = [
  { name: 'Access Bank', category: 'Banking Partner' },
  { name: 'Stanbic IBTC', category: 'Mortgage Partner' },
  { name: 'First National Bank', category: 'Financial Services' },
  { name: 'Kenya Commercial Bank', category: 'Banking Partner' },
  { name: 'Standard Bank SA', category: 'Investment Partner' },
  { name: 'Equity Bank', category: 'Mortgage Lender' },
  { name: 'ABSA Group', category: 'Banking Partner' },
  { name: 'AfDB', category: 'Development Finance' },
  { name: 'Zenith Bank', category: 'Investment Partner' },
  { name: 'Shoprite Holdings', category: 'Commercial Partner' },
  { name: 'Dangote Group', category: 'Development Partner' },
  { name: 'Old Mutual', category: 'Insurance Partner' },
];

function PartnerItem({ name, category }: { name: string; category: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-7 py-4 mx-3 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all group">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center flex-shrink-0">
        <Building2 className="w-4 h-4 text-purple-600" />
      </div>
      <div>
        <div className="text-sm font-bold text-gray-900 whitespace-nowrap group-hover:text-purple-700 transition-colors">{name}</div>
        <div className="text-xs text-gray-400">{category}</div>
      </div>
    </div>
  );
}

export function PartnersMarquee() {
  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container-premium mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Trusted Partners &amp; Integrations</p>
          <h3 className="text-2xl font-bold text-gray-900">
            Backed by Africa&apos;s Leading <span className="gradient-text">Financial Institutions</span>
          </h3>
        </motion.div>
      </div>

      <div className="relative overflow-hidden mb-3">
        <div className="flex marquee-track">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <PartnerItem key={`${partner.name}-${i}`} {...partner} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>

      <div className="relative overflow-hidden">
        <div className="flex" style={{ animation: 'marquee 30s linear infinite reverse' }}>
          {[...PARTNERS.slice().reverse(), ...PARTNERS.slice().reverse()].map((partner, i) => (
            <PartnerItem key={`rev-${partner.name}-${i}`} {...partner} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
