'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    label: 'Luxury Homes',
    desc: 'Villas, estates & penthouses',
    count: '12,400+',
    href: '/properties?type=villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  },
  {
    label: 'Apartments',
    desc: 'Premium urban living',
    count: '18,200+',
    href: '/properties?type=apartment',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
  {
    label: 'Commercial',
    desc: 'Offices, retail & warehouses',
    count: '5,800+',
    href: '/properties?type=commercial',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    label: 'Land & Plots',
    desc: 'Development-ready land',
    count: '8,100+',
    href: '/properties?type=land',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  },
  {
    label: 'Construction Projects',
    desc: 'Build from ground up',
    count: '1,200+',
    href: '/construction',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    label: 'Smart Cities',
    desc: 'Future urban developments',
    count: '340+',
    href: '/invest#smart-cities',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export function PropertyCategories() {
  return (
    <section className="py-24 bg-white">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-50 border border-purple-100 text-purple-700 text-sm font-semibold mb-4">
              <Building2 className="w-4 h-4" />
              Property Categories
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
              Find What <span className="gradient-text">You Need</span>
            </h2>
            <p className="text-gray-500 text-lg mt-2">Explore every property category across Africa&apos;s markets.</p>
          </div>
          <Link href="/properties" className="group flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold transition-colors whitespace-nowrap">
            Browse all categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {CATEGORIES.map((cat) => (
            <motion.div key={cat.label} variants={item}>
              <Link href={cat.href} className="group block relative rounded-2xl overflow-hidden h-72 hover:shadow-2xl hover:shadow-black/20 transition-all duration-500">
                {/* Photo — visible, not masked */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark vignette — bottom only, subtle */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Top row */}
                <div className="absolute top-5 right-5">
                  <div className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white text-xs font-bold border border-white/10">
                    {cat.count}
                  </div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-0.5">{cat.label}</h3>
                  <p className="text-white/70 text-sm mb-4">{cat.desc}</p>
                  <div className="flex items-center gap-2 text-white/90 text-sm font-semibold group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
