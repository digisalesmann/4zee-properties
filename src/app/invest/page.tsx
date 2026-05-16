'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, DollarSign, Calculator, ArrowRight,
  ArrowUpRight, CheckCircle2, Star, BarChart2, Target,
  PieChart, MapPin, Building, Globe,
} from 'lucide-react';
import Link from 'next/link';
import { AFRICAN_COUNTRIES } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';

const MARKET_DATA = [
  { country: 'Nigeria',      growth: '+23%', roi: '18–25%', risk: 'Medium',   rating: 4.2, entry: '$45K' },
  { country: 'Kenya',        growth: '+31%', roi: '20–28%', risk: 'Low',      rating: 4.5, entry: '$35K' },
  { country: 'Egypt',        growth: '+35%', roi: '22–30%', risk: 'Medium',   rating: 4.3, entry: '$25K' },
  { country: 'Rwanda',       growth: '+51%', roi: '28–40%', risk: 'Low',      rating: 4.7, entry: '$30K' },
  { country: 'Ghana',        growth: '+27%', roi: '19–26%', risk: 'Low',      rating: 4.4, entry: '$40K' },
  { country: 'South Africa', growth: '+18%', roi: '12–18%', risk: 'Very Low', rating: 4.6, entry: '$60K' },
];

const RISK_DOT: Record<string, string> = {
  'Very Low': 'bg-emerald-400',
  'Low':      'bg-blue-400',
  'Medium':   'bg-amber-400',
  'High':     'bg-red-400',
};

const INVESTMENT_TYPES = [
  {
    num: '01', icon: Building, title: 'Residential Investment', returns: '15–25% ROI',
    desc: 'Buy-to-let apartments and villas in high-demand urban corridors across Africa.',
    features: ['Steady rental income', 'Capital appreciation', 'Portfolio diversification'],
  },
  {
    num: '02', icon: BarChart2, title: 'Commercial Real Estate', returns: '18–30% ROI',
    desc: "Office parks, retail centers, and logistics hubs in Africa's fastest-growing cities.",
    features: ['Long-term tenants', 'Inflation hedge', 'High yield potential'],
  },
  {
    num: '03', icon: Target, title: 'Off-Plan Projects', returns: '25–45% ROI',
    desc: 'Early-stage investments in planned developments before completion.',
    features: ['Below-market entry pricing', 'Capital uplift on delivery', 'Flexible payment plans'],
  },
  {
    num: '04', icon: Globe, title: 'Smart City Developments', returns: '20–35% ROI',
    desc: 'Government-backed smart city and infrastructure investment opportunities.',
    features: ['Sovereign backing', 'Future-proof assets', 'ESG compliant'],
  },
];

function ROICalculator() {
  const [investment, setInvestment] = useState(100000);
  const [roi, setRoi]               = useState(20);
  const [years, setYears]           = useState(5);
  const [rental, setRental]         = useState(8);

  const totalReturn    = investment * Math.pow(1 + roi / 100, years);
  const annualRental   = investment * (rental / 100);
  const totalRental    = annualRental * years;
  const combinedReturn = totalReturn + totalRental - investment;

  const fmt = (n: number) => '$' + n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div id="calculator" className="bg-[#14112a] rounded-2xl border border-white/8 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-8">
        <Calculator className="w-5 h-5 text-purple-400" />
        <h3 className="font-display font-bold text-white text-xl">ROI Calculator</h3>
      </div>

      <div className="space-y-7 mb-8">
        {[
          { label: 'Investment Amount', display: `$${investment.toLocaleString()}`, min: 10000, max: 5000000, step: 10000, value: investment, set: setInvestment, range: ['$10K', '$5M'] },
          { label: 'Annual Capital Growth', display: `${roi}%`, min: 5, max: 50, step: 1, value: roi, set: setRoi, range: ['5%', '50%'] },
          { label: 'Rental Yield', display: `${rental}% p.a.`, min: 2, max: 20, step: 0.5, value: rental, set: setRental, range: ['2%', '20%'] },
          { label: 'Investment Horizon', display: `${years} years`, min: 1, max: 20, step: 1, value: years, set: setYears, range: ['1yr', '20yr'] },
        ].map(s => (
          <div key={s.label}>
            <div className="flex justify-between text-sm mb-2.5">
              <span className="text-white/50">{s.label}</span>
              <span className="font-bold text-purple-300">{s.display}</span>
            </div>
            <input
              type="range" min={s.min} max={s.max} step={s.step} value={s.value}
              onChange={e => s.set(+e.target.value)}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-white/25 mt-1">
              <span>{s.range[0]}</span><span>{s.range[1]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Output grid */}
      <div className="grid grid-cols-3 gap-px bg-white/8 rounded-xl overflow-hidden mb-5">
        {[
          { label: 'Capital Gain',    value: fmt(totalReturn - investment),  color: 'text-purple-300' },
          { label: 'Rental Income',   value: fmt(totalRental),               color: 'text-blue-300'   },
          { label: 'Total Return',    value: fmt(combinedReturn),            color: 'text-emerald-400' },
        ].map(item => (
          <div key={item.label} className="bg-[#14112a] py-4 text-center">
            <div className={`text-base font-bold mb-0.5 ${item.color}`}>{item.value}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Final output */}
      <div className="p-5 rounded-xl bg-gradient-to-br from-purple-700 to-purple-900 text-center">
        <div className="text-white/55 text-xs uppercase tracking-wider mb-2">Portfolio Value After {years} Years</div>
        <div className="text-white text-4xl font-bold font-display">{fmt(totalReturn + totalRental)}</div>
        <div className="text-purple-300 text-xs mt-2">
          {((combinedReturn / investment) * 100).toFixed(0)}% total return on {fmt(investment)}
        </div>
      </div>

      <p className="text-xs text-white/20 text-center mt-4">
        Illustrative estimates only. Consult a 4zee Investment Advisor for personalised guidance.
      </p>
    </div>
  );
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };

export default function InvestPage() {
  return (
    <div className="min-h-screen bg-[#0d0b1a] pt-20">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-40">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.07) 1px, transparent 1px)', backgroundSize: '44px 44px' }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-700/40 to-transparent" />

        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4" />
              Africa&apos;s Highest-Growth Real Estate Markets
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.04]">
              Invest in Africa&apos;s{' '}
              <span className="gradient-text">Real Estate Renaissance</span>
            </h1>
            <p className="text-white/50 text-xl leading-relaxed max-w-2xl">
              Africa&apos;s markets are growing 3× faster than global averages. Position your portfolio at the centre of the world&apos;s most exciting economic story.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a href="#calculator" className="flex items-center gap-2 px-7 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-900/30">
              <Calculator className="w-5 h-5" /> Calculate ROI
            </a>
            <a href="#markets" className="flex items-center gap-2 px-7 py-4 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-semibold transition-all">
              Explore Markets <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
            {[
              { label: 'Avg. Market Growth',  value: '28%',   sub: 'Year-over-year'  },
              { label: 'Avg. Rental Yield',   value: '12–22%',sub: 'Annual income'   },
              { label: 'Countries Tracked',   value: '28',    sub: 'With live data'  },
              { label: 'Investor Network',    value: '12K+',  sub: 'Active investors'},
            ].map(stat => (
              <div key={stat.label} className="bg-[#0d0b1a] py-6 px-4 text-center hover:bg-white/3 transition-colors">
                <div className="text-2xl font-bold text-emerald-400 mb-1 font-display">{stat.value}</div>
                <div className="text-white/60 text-xs font-semibold mb-0.5">{stat.label}</div>
                <div className="text-white/30 text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Investment Types ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-700/30 to-transparent" />
        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-5">
                Asset Classes
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.08]">
                Investment <span className="gradient-text">Opportunities</span>
              </h2>
            </div>
            <p className="text-white/40 text-base max-w-sm leading-relaxed lg:text-right">
              Multiple asset classes across Africa&apos;s diverse real estate landscape.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6 border border-white/6 rounded-2xl overflow-hidden"
          >
            {INVESTMENT_TYPES.map(type => (
              <motion.div key={type.title} variants={fadeUp} transition={{ duration: 0.55 }}>
                <Link
                  href="/properties"
                  className="group flex flex-col p-7 sm:p-10 bg-[#0d0b1a] hover:bg-white/3 transition-colors h-full"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <type.icon className="w-5 h-5 text-purple-400" />
                      <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">{type.returns}</span>
                    </div>
                    <span className="text-white/12 font-mono text-sm font-bold">{type.num}</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-purple-200 transition-colors">{type.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-7 flex-1">{type.desc}</p>
                  <div className="space-y-2 mb-8">
                    {type.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-white/50 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Market Intelligence ── */}
      <section id="markets" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-5">
                Live Data
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Market <span className="gradient-text">Intelligence</span>
              </h2>
            </div>
            <p className="text-white/40 text-base max-w-sm leading-relaxed lg:text-right">
              Real-time investment data from Africa&apos;s top-performing real estate markets.
            </p>
          </motion.div>

          <div className="rounded-2xl border border-white/8 overflow-hidden">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-7 bg-[#14112a] border-b border-white/8">
              {['Market', 'YoY Growth', 'Expected ROI', 'Risk Level', 'Rating', 'Min Entry', ''].map(h => (
                <div key={h} className="px-5 py-4 text-xs font-bold text-white/35 uppercase tracking-widest">{h}</div>
              ))}
            </div>

            {/* Rows */}
            {MARKET_DATA.map((market, i) => {
              const country = AFRICAN_COUNTRIES.find(c => c.name === market.country);
              return (
                <motion.div
                  key={market.country}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-7 gap-y-3 md:gap-y-0 px-5 py-5 border-b border-white/6 last:border-0 hover:bg-white/3 transition-colors"
                >
                  {/* Market */}
                  <div className="col-span-2 md:col-span-1 flex items-center gap-3">
                    {country && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} alt={country.name} width={26} height={18} className="rounded flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-bold text-white text-sm">{market.country}</div>
                      <div className="text-white/30 text-xs">{country?.properties.toLocaleString()} listings</div>
                    </div>
                  </div>
                  {/* Growth */}
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] text-white/30 uppercase tracking-wider md:hidden mb-0.5">Growth</span>
                    <span className="text-emerald-400 font-bold text-sm">{market.growth}</span>
                  </div>
                  {/* ROI */}
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] text-white/30 uppercase tracking-wider md:hidden mb-0.5">ROI</span>
                    <span className="text-white/80 font-semibold text-sm">{market.roi}</span>
                  </div>
                  {/* Risk */}
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] text-white/30 uppercase tracking-wider md:hidden mb-0.5">Risk</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${RISK_DOT[market.risk] ?? 'bg-white/40'}`} />
                      <span className="text-white/65 text-sm">{market.risk}</span>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] text-white/30 uppercase tracking-wider md:hidden mb-0.5">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-white text-sm">{market.rating}</span>
                    </div>
                  </div>
                  {/* Entry */}
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] text-white/30 uppercase tracking-wider md:hidden mb-0.5">Min Entry</span>
                    <span className="text-purple-300 font-bold text-sm">{market.entry}</span>
                  </div>
                  {/* Link */}
                  <div className="flex items-center justify-end">
                    <Link
                      href={`/markets/${market.country.toLowerCase().replace(' ', '-')}`}
                      className="flex items-center gap-1 text-white/40 hover:text-white text-xs font-semibold transition-colors"
                    >
                      Explore <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ROI Calculator ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-700/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-premium relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — editorial */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-6">
                <Calculator className="w-4 h-4" />
                Investment Calculator
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.08]">
                Model Your<br />
                <span className="gradient-text">Investment Returns</span>
              </h2>
              <p className="text-white/45 text-lg leading-relaxed mb-10">
                Use our ROI calculator to model different investment scenarios across African real estate markets.
              </p>

              <div className="space-y-3 mb-12">
                {[
                  { icon: BarChart2, text: 'Multi-scenario modeling'             },
                  { icon: TrendingUp, text: 'Capital appreciation projections'   },
                  { icon: DollarSign, text: 'Rental income estimates'            },
                  { icon: PieChart,   text: 'Portfolio diversification analysis' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-white/60 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Advisory strip */}
              <div className="p-6 rounded-2xl bg-[#14112a] border border-amber-500/15">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-white text-sm">Expert Advisory</span>
                </div>
                <p className="text-white/45 text-sm leading-relaxed mb-4">
                  Connect with a 4zee Investment Advisor for a free 30-minute portfolio consultation tailored to African markets.
                </p>
                <button className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors">
                  Book Free Consultation <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Right — calculator */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <ROICalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Smart Cities ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-900/8 rounded-full blur-3xl pointer-events-none" />

        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-5">
                Infrastructure Plays
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Smart City <span className="gradient-text">Investment</span>
              </h2>
            </div>
            <Link
              href="/construction/smart-cities"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:border-purple-500/50 text-white/60 hover:text-white font-semibold text-sm transition-all whitespace-nowrap"
            >
              All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { city: 'Eko Atlantic',      country: 'Nigeria', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80', value: '$6B',  units: '150K+', stage: 'Active' },
              { city: 'New Capital Cairo', country: 'Egypt',   image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=700&q=80', value: '$58B', units: '2M+',   stage: 'Phase 1' },
              { city: 'Konza Technopolis', country: 'Kenya',   image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80', value: '$15B', units: '800K+', stage: 'Active' },
            ].map((city, i) => (
              <motion.div
                key={city.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative h-80 rounded-2xl overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={city.image} alt={city.city} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4"><Badge variant="gold">{city.stage}</Badge></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-bold text-white text-lg mb-1">{city.city}</h3>
                  <div className="flex items-center gap-1 text-white/50 text-xs mb-4">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />{city.country}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-amber-400 font-bold text-sm">{city.value}</div>
                    <Link
                      href="/construction/smart-cities"
                      className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-semibold transition-colors"
                    >
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-700/30 to-transparent" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="container-premium relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-6 px-6 sm:px-10 py-8 rounded-2xl border border-white/8 bg-white/2 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to start investing in <span className="gradient-text">African real estate?</span>
              </h2>
              <p className="text-white/40 text-sm">Join 12,000+ investors already building wealth through 4zee Properties.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto sm:flex-shrink-0">
              <Link
                href="/properties?status=for-sale"
                className="text-center px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors whitespace-nowrap"
              >
                Browse Properties
              </Link>
              <Link
                href="/agents"
                className="text-center px-6 py-3 rounded-xl border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-semibold text-sm transition-all whitespace-nowrap"
              >
                Talk to Advisor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
