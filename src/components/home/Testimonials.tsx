'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section className="py-24 bg-[#0d0b1a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/15 rounded-full blur-3xl" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container-premium relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg glass-purple text-purple-300 text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-current" />
            Client Stories
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Africa&apos;s <span className="gradient-text">Top Investors</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Real stories from clients who found their perfect property through 4zee Properties.
          </p>
        </motion.div>

        {/* Featured testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Mini cards - left */}
          <div className="hidden lg:flex flex-col gap-4">
            {TESTIMONIALS.filter((_, i) => i !== current).slice(0, 1).map((t) => (
              <div key={t.id} className="glass-dark rounded-2xl p-5 border border-white/8 opacity-50 hover:opacity-80 transition-opacity cursor-pointer" onClick={prev}>
                <div className="flex items-center gap-3 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.country}</div>
                  </div>
                </div>
                <p className="text-white/60 text-xs line-clamp-3">{t.text}</p>
              </div>
            ))}
          </div>

          {/* Main testimonial */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="relative glass-dark rounded-3xl p-10 border border-white/10 shadow-2xl"
              >
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-900/50">
                  <Quote className="w-5 h-5 text-white fill-current" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(TESTIMONIALS[current].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-white text-xl leading-relaxed font-light mb-8">
                  &ldquo;{TESTIMONIALS[current].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={TESTIMONIALS[current].avatar}
                      alt={TESTIMONIALS[current].name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/30"
                    />
                    <div>
                      <div className="text-white font-bold text-lg">{TESTIMONIALS[current].name}</div>
                      <div className="text-purple-300 text-sm">{TESTIMONIALS[current].role}</div>
                      <div className="text-white/40 text-xs">{TESTIMONIALS[current].company}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/30 text-xs mb-1">Property Type</div>
                    <div className="text-purple-400 text-sm font-semibold">{TESTIMONIALS[current].propertyType}</div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3 mt-8 pt-8 border-t border-white/8">
                  <button onClick={prev} className="p-2.5 rounded-xl border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1.5 flex-1 justify-center">
                    {TESTIMONIALS.map((_, i) => (
                      <button key={i} onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all ${i === current ? 'w-8 bg-purple-500' : 'w-2 bg-white/20'}`} />
                    ))}
                  </div>
                  <button onClick={next} className="p-2.5 rounded-xl border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mini cards - right */}
          <div className="hidden lg:flex flex-col gap-4">
            {TESTIMONIALS.filter((_, i) => i !== current).slice(1, 2).map((t) => (
              <div key={t.id} className="glass-dark rounded-2xl p-5 border border-white/8 opacity-50 hover:opacity-80 transition-opacity cursor-pointer" onClick={next}>
                <div className="flex items-center gap-3 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.country}</div>
                  </div>
                </div>
                <p className="text-white/60 text-xs line-clamp-3">{t.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust numbers row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-10 border-t border-white/8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden">
          {[
            { label: 'Average Rating', value: '4.9/5.0', sub: 'From 18,000+ reviews' },
            { label: 'Repeat Clients', value: '73%', sub: 'Returning investors' },
            { label: 'Referral Rate', value: '64%', sub: 'Word-of-mouth growth' },
            { label: 'Net Promoter Score', value: '91', sub: 'Industry-leading NPS' },
          ].map((item) => (
            <div key={item.label} className="text-center px-4 py-6 bg-[#0d0b1a]">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{item.value}</div>
              <div className="text-xs sm:text-sm font-semibold text-purple-300 mb-0.5">{item.label}</div>
              <div className="text-xs text-white/40 hidden sm:block">{item.sub}</div>
            </div>
          ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
