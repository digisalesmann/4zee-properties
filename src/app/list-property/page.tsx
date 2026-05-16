'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, CheckCircle2, ArrowRight, ArrowLeft, Home,
  MapPin, Camera, Phone, ChevronRight,
  Minus, Plus, Trees, Landmark, Briefcase, Key,
  Users, TrendingUp, Eye, BadgeCheck, CalendarDays, Check,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';

/* ─── Config ─── */
const LISTING_TYPES = [
  { value: 'sale',     label: 'For Sale',   icon: Building2, desc: 'Sell your property outright' },
  { value: 'rent',     label: 'For Rent',   icon: Key,       desc: 'Long-term monthly rental' },
  { value: 'shortlet', label: 'Short Let',  icon: CalendarDays, desc: '1–90 day holiday rental' },
];

const PROPERTY_TYPES = [
  { value: 'apartment',   label: 'Apartment',   icon: Building2 },
  { value: 'house',       label: 'House',        icon: Home },
  { value: 'villa',       label: 'Villa',        icon: Landmark },
  { value: 'penthouse',   label: 'Penthouse',    icon: Building2 },
  { value: 'commercial',  label: 'Commercial',   icon: Briefcase },
  { value: 'land',        label: 'Land / Plot',  icon: Trees },
  { value: 'office',      label: 'Office',       icon: Users },
  { value: 'shortlet',    label: 'Short Let',    icon: Key },
];

const AMENITIES = [
  'Swimming Pool', 'Gym / Fitness Centre', '24/7 Security', 'Backup Generator',
  'Covered Parking', 'Smart Home', 'Concierge Service', 'Rooftop Access',
  'Elevator / Lift', 'Garden / Compound', 'CCTV Surveillance', 'Water Treatment',
  'Fiber Internet', 'Solar Power', 'Kids Play Area', 'Laundry Room',
];

const STEPS = [
  { n: 1, label: 'Property Type' },
  { n: 2, label: 'Location & Size' },
  { n: 3, label: 'Price & Details' },
  { n: 4, label: 'Media & Contact' },
];

/* ─── Stepper control ─── */
function Stepper({ value, onChange, min = 0, max = 20 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}
        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-purple-300 hover:text-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-8 text-center font-bold text-gray-900 text-lg tabular-nums">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}
        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-purple-300 hover:text-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

const inputCls = 'w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all text-sm';
const labelCls = 'block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2';

/* ════════════════════════════════════════════ */
export default function ListPropertyPage() {
  const [step, setStep]               = useState(1);
  const [submitted, setSubmitted]     = useState(false);
  const [listingType, setListingType] = useState('sale');
  const [propType, setPropType]       = useState('apartment');
  const [condition, setCondition]     = useState('good');

  const [country, setCountry]       = useState('');
  const [city, setCity]             = useState('');
  const [neighborhood, setNeighbor] = useState('');
  const [address, setAddress]       = useState('');
  const [beds, setBeds]             = useState(3);
  const [baths, setBaths]           = useState(2);
  const [area, setArea]             = useState('');

  const [price, setPrice]           = useState('');
  const [currency, setCurrency]     = useState('USD');
  const [title, setTitle]           = useState('');
  const [desc, setDesc]             = useState('');
  const [amenities, setAmenities]   = useState<string[]>([]);

  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [phone, setPhone]           = useState('');
  const [role, setRole]             = useState('owner');

  const toggleAmenity = (a: string) =>
    setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const progress = (step / 4) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-3">You&apos;re All Set!</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-2">
            Your listing request has been received.
          </p>
          <p className="text-gray-400 text-sm mb-10">
            Our verification team will review your property details and contact you within <span className="text-gray-700 font-semibold">24 hours</span> to confirm your listing goes live.
          </p>
          <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden mb-10">
            {[{ v: '48hrs', l: 'Go-live time' }, { v: '12M+', l: 'Buyers reached' }, { v: '₦0', l: 'Listing cost' }].map(s => (
              <div key={s.l} className="bg-white py-5 text-center">
                <div className="font-bold text-xl text-purple-700">{s.v}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/properties" className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition-colors">
              Browse Properties <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/dashboard" className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-purple-300 transition-colors">
              Go to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="bg-[#0d0b1a] pt-28 pb-12 md:pt-36 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container-premium relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-5">
                <Building2 className="w-4 h-4" />
                List With Africa&apos;s #1 Platform
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-4">
                Sell or Rent Your<br />
                <span className="gradient-text">Property Fast</span>
              </h1>
              <p className="text-white/55 text-lg max-w-xl leading-relaxed">
                Reach 12M+ verified buyers across Africa and the global diaspora. List in minutes, go live in 48 hours.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap gap-2">
              {['Free to list', 'No upfront commission', '48hr go-live', 'Dedicated agent support'].map(tag => (
                <span key={tag} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-white/70 text-sm font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Benefits bar ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-premium">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
            {[
              { icon: Eye,        color: 'text-purple-600 bg-purple-50', title: 'Maximum Visibility',  desc: '12M+ monthly buyers & investors' },
              { icon: Users,      color: 'text-blue-600 bg-blue-50',     title: 'Verified Buyers',      desc: 'Pre-screened, serious buyers only' },
              { icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50',title: 'Market Analytics',   desc: 'Real-time pricing for your area' },
              { icon: BadgeCheck, color: 'text-amber-600 bg-amber-50',   title: 'Agent Support',        desc: 'Dedicated agent manages viewings' },
            ].map((b, i) => (
              <div key={b.title} className="flex items-start gap-3 p-4 lg:p-6 bg-white">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${b.color}`}>
                  <b.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{b.title}</div>
                  <div className="text-gray-400 text-xs mt-0.5 leading-relaxed">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container-premium py-8 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* ══ FORM ══ */}
          <div className="lg:col-span-3">

            {/* Progress header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                {STEPS.map((s, i) => (
                  <div key={s.n} className="flex items-center flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <div className={cn(
                        'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all flex-shrink-0',
                        step > s.n ? 'bg-purple-600 text-white' : step === s.n ? 'bg-purple-600 text-white ring-4 ring-purple-100' : 'bg-gray-100 text-gray-400'
                      )}>
                        {step > s.n ? <Check className="w-3.5 h-3.5" /> : s.n}
                      </div>
                      <span className={cn('text-xs font-semibold hidden md:block truncate max-w-[80px]', step === s.n ? 'text-gray-900' : 'text-gray-400')}>{s.label}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="flex-1 mx-2 h-px bg-gray-200 relative min-w-[12px]">
                        <div className="absolute inset-0 bg-purple-500 transition-all duration-500 origin-left" style={{ transform: `scaleX(${step > s.n ? 1 : 0})` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <motion.div className="bg-purple-600 h-1.5 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-400">Step {step} of 4</p>
                <p className="text-xs font-semibold text-purple-600">{Math.round(progress)}% complete</p>
              </div>
            </div>

            {/* Step cards */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <AnimatePresence mode="wait">

                {/* ─── STEP 1: Property Type ─── */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
                    <div className="px-4 sm:px-7 py-5 sm:py-6 border-b border-gray-100">
                      <h2 className="font-display text-xl font-bold text-gray-900">What are you listing?</h2>
                      <p className="text-gray-400 text-sm mt-0.5">Tell us about the type of property you want to list.</p>
                    </div>
                    <div className="px-4 sm:px-7 py-5 sm:py-7 space-y-6 sm:space-y-7">

                      {/* Listing type */}
                      <div>
                        <label className={labelCls}>Listing Type</label>
                        <div className="space-y-2 sm:grid sm:grid-cols-3 sm:space-y-0 sm:gap-3">
                          {LISTING_TYPES.map(t => (
                            <button key={t.value} onClick={() => setListingType(t.value)}
                              className={cn('w-full flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2 p-3 sm:p-4 rounded-2xl border-2 text-left sm:text-center transition-all',
                                listingType === t.value ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50')}>
                              <div className={cn('w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0', listingType === t.value ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500')}>
                                <t.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <div className="flex-1 sm:flex-none">
                                <div className={cn('font-bold text-sm', listingType === t.value ? 'text-purple-700' : 'text-gray-700')}>{t.label}</div>
                                <div className="text-xs text-gray-400 leading-tight mt-0.5 sm:hidden">{t.desc}</div>
                              </div>
                              {listingType === t.value && <Check className="w-4 h-4 text-purple-600 flex-shrink-0 sm:hidden" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Property type */}
                      <div>
                        <label className={labelCls}>Property Type</label>
                        <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                          {PROPERTY_TYPES.map(t => (
                            <button key={t.value} onClick={() => setPropType(t.value)}
                              className={cn('flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl border text-center transition-all',
                                propType === t.value ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500 hover:border-purple-200 hover:bg-gray-50')}>
                              <t.icon className="w-4 h-4 flex-shrink-0" />
                              <span className="text-[10px] sm:text-xs font-semibold leading-tight">{t.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Condition */}
                      <div>
                        <label className={labelCls}>Property Condition</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['New Build', 'Good Condition', 'Renovated', 'Needs Work'].map(c => (
                            <button key={c} onClick={() => setCondition(c)}
                              className={cn('py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all',
                                condition === c ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500 hover:border-purple-200')}>
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 2: Location & Size ─── */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
                    <div className="px-4 sm:px-7 py-5 sm:py-6 border-b border-gray-100">
                      <h2 className="font-display text-xl font-bold text-gray-900">Where is it located?</h2>
                      <p className="text-gray-400 text-sm mt-0.5">Help buyers find your property on the map.</p>
                    </div>
                    <div className="px-4 sm:px-7 py-5 sm:py-7 space-y-5">

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Country</label>
                          <input className={inputCls} placeholder="Nigeria" value={country} onChange={e => setCountry(e.target.value)} />
                        </div>
                        <div>
                          <label className={labelCls}>City</label>
                          <input className={inputCls} placeholder="Lagos" value={city} onChange={e => setCity(e.target.value)} />
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>Neighborhood / Area</label>
                        <input className={inputCls} placeholder="Ikoyi, Victoria Island, Lekki Phase 1..." value={neighborhood} onChange={e => setNeighbor(e.target.value)} />
                      </div>

                      <div>
                        <label className={labelCls}>Full Address</label>
                        <input className={inputCls} placeholder="15 Glover Road, Ikoyi" value={address} onChange={e => setAddress(e.target.value)} />
                        <p className="text-xs text-gray-400 mt-1.5">Exact address is only shown to verified buyers after inquiry.</p>
                      </div>

                      <div className="border-t border-gray-100 pt-5">
                        <label className={labelCls}>Property Size</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="flex items-center justify-between sm:block p-3 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-gray-100">
                            <p className="text-xs text-gray-500 sm:mb-3 font-medium">Bedrooms</p>
                            <Stepper value={beds} onChange={setBeds} min={0} max={20} />
                          </div>
                          <div className="flex items-center justify-between sm:block p-3 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-gray-100">
                            <p className="text-xs text-gray-500 sm:mb-3 font-medium">Bathrooms</p>
                            <Stepper value={baths} onChange={setBaths} min={0} max={20} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-2 font-medium">Total Area (sqm)</p>
                            <input className={inputCls} placeholder="250" value={area} onChange={e => setArea(e.target.value)} type="number" min="0" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 3: Price & Details ─── */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
                    <div className="px-4 sm:px-7 py-5 sm:py-6 border-b border-gray-100">
                      <h2 className="font-display text-xl font-bold text-gray-900">Pricing & Details</h2>
                      <p className="text-gray-400 text-sm mt-0.5">Set your asking price and describe the property.</p>
                    </div>
                    <div className="px-4 sm:px-7 py-5 sm:py-7 space-y-6">

                      {/* Price */}
                      <div>
                        <label className={labelCls}>Asking Price</label>
                        <div className="flex gap-3">
                          <div className="w-28 flex-shrink-0">
                            <Select value={currency} onChange={setCurrency}
                              options={['USD', 'NGN', 'ZAR', 'KES', 'GHS', 'EGP', 'MAD', 'XOF'].map(c => ({ value: c, label: c }))} />
                          </div>
                          <input className={cn(inputCls, 'flex-1')} placeholder="4,500,000" value={price} onChange={e => setPrice(e.target.value)} type="text" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1.5">Enter 0 for &quot;price on request&quot;.</p>
                      </div>

                      {/* Title */}
                      <div>
                        <label className={labelCls}>Listing Title</label>
                        <input className={inputCls} placeholder="Luxury 4-Bed Penthouse in Ikoyi with Pool" value={title} onChange={e => setTitle(e.target.value)} />
                        <p className="text-xs text-gray-400 mt-1.5">{title.length}/80 characters · A great title gets 3× more views.</p>
                      </div>

                      {/* Description */}
                      <div>
                        <label className={labelCls}>Description</label>
                        <textarea rows={5} value={desc} onChange={e => setDesc(e.target.value)}
                          className={cn(inputCls, 'resize-none')}
                          placeholder="Describe the property in detail — key features, finishes, nearby landmarks, access roads, unique selling points..." />
                        <p className="text-xs text-gray-400 mt-1.5">{desc.split(' ').filter(Boolean).length} words · Aim for at least 100 words.</p>
                      </div>

                      {/* Amenities */}
                      <div>
                        <label className={labelCls}>Amenities & Features</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {AMENITIES.map(a => (
                            <button key={a} onClick={() => toggleAmenity(a)}
                              className={cn('flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm font-medium text-left transition-all',
                                amenities.includes(a) ? 'border-purple-400 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500 hover:border-purple-200')}>
                              <div className={cn('w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 transition-all',
                                amenities.includes(a) ? 'bg-purple-600 border-purple-600' : 'border-gray-300')}>
                                {amenities.includes(a) && <Check className="w-2.5 h-2.5 text-white" />}
                              </div>
                              {a}
                            </button>
                          ))}
                        </div>
                        {amenities.length > 0 && (
                          <p className="text-xs text-purple-600 font-medium mt-2">{amenities.length} amenities selected</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 4: Media & Contact ─── */}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
                    <div className="px-4 sm:px-7 py-5 sm:py-6 border-b border-gray-100">
                      <h2 className="font-display text-xl font-bold text-gray-900">Photos & Your Details</h2>
                      <p className="text-gray-400 text-sm mt-0.5">Properties with photos get 10× more inquiries.</p>
                    </div>
                    <div className="px-4 sm:px-7 py-5 sm:py-7 space-y-6">

                      {/* Photo upload */}
                      <div>
                        <label className={labelCls}>Property Photos</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                          {[0, 1, 2].map(i => (
                            <div key={i} className="aspect-video rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50/30 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all group">
                              <Camera className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors" />
                              <span className="text-[10px] text-gray-300 group-hover:text-purple-400 transition-colors">{i === 0 ? 'Cover' : `Photo ${i + 1}`}</span>
                            </div>
                          ))}
                        </div>
                        <button className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-300 text-sm text-gray-500 hover:text-purple-600 transition-all font-medium flex items-center justify-center gap-2">
                          <Camera className="w-4 h-4" /> Upload more photos (up to 20)
                        </button>
                        <p className="text-xs text-gray-400 mt-2">JPG, PNG, WebP &middot; Max 5MB per image &middot; <span className="text-purple-600 cursor-pointer hover:underline">Request a free professional photo shoot</span></p>
                      </div>

                      <div className="border-t border-gray-100" />

                      {/* Who are you */}
                      <div>
                        <label className={labelCls}>I am the property</label>
                        <div className="flex gap-2">
                          {['Owner', 'Agent', 'Developer'].map(r => (
                            <button key={r} onClick={() => setRole(r.toLowerCase())}
                              className={cn('flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all',
                                role === r.toLowerCase() ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500 hover:border-purple-200')}>
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div>
                        <label className={labelCls}>Contact Details</label>
                        <div className="space-y-3">
                          <input className={inputCls} placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
                          <input className={inputCls} type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
                          <input className={inputCls} type="tel" placeholder="Phone / WhatsApp (+234...)" value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Navigation */}
              <div className="px-4 sm:px-7 py-4 sm:py-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:border-purple-300 hover:text-purple-700 transition-all">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {step < 4 ? (
                  <button onClick={() => setStep(s => s + 1)} className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold transition-all shadow-lg shadow-purple-900/20">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={() => setSubmitted(true)} className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold transition-all shadow-lg shadow-purple-900/20">
                    Submit Listing <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">By submitting you agree to our Terms of Service and Privacy Policy.</p>
          </div>

          {/* ══ SIDEBAR ══ */}
          <div className="lg:col-span-2 space-y-5 lg:sticky lg:top-28">

            {/* Live summary */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm">Your Listing Preview</h3>
                <p className="text-xs text-gray-400 mt-0.5">Updates as you fill in details</p>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-700 text-xs font-bold capitalize">{LISTING_TYPES.find(t => t.value === listingType)?.label}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold capitalize">{PROPERTY_TYPES.find(t => t.value === propType)?.label}</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{title || 'Your listing title will appear here'}</h4>
                {(city || country) && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3 text-purple-400" />{[neighborhood, city, country].filter(Boolean).join(', ')}
                  </div>
                )}
                {(beds > 0 || baths > 0 || area) && (
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    {beds > 0 && <span>{beds} bed{beds !== 1 ? 's' : ''}</span>}
                    {baths > 0 && <span>{baths} bath{baths !== 1 ? 's' : ''}</span>}
                    {area && <span>{area} sqm</span>}
                  </div>
                )}
                {price && <div className="font-bold text-purple-700 text-base">{currency} {Number(price.replace(/,/g, '')).toLocaleString() || price}</div>}
                {amenities.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {amenities.slice(0, 3).map(a => <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{a}</span>)}
                    {amenities.length > 3 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">+{amenities.length - 3} more</span>}
                  </div>
                )}
              </div>
            </motion.div>

            {/* How it works */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22, duration: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm">How It Works</h3>
              </div>
              {[
                { n: '01', title: 'Submit Your Details', desc: 'Fill in property info and photos — takes about 5 minutes.' },
                { n: '02', title: 'Our Team Verifies',   desc: 'We confirm ownership and create a premium listing.' },
                { n: '03', title: 'Go Live in 48hrs',    desc: 'Reach 12M+ buyers across Africa and the diaspora.' },
              ].map((s, i) => (
                <div key={s.n} className={`flex items-start gap-4 px-5 py-4 ${i < 2 ? 'border-b border-gray-50' : ''}`}>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0 font-bold text-purple-600 text-xs">{s.n}</div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{s.title}</div>
                    <div className="text-gray-400 text-xs mt-0.5 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
              className="grid grid-cols-2 gap-px bg-gray-100 rounded-2xl overflow-hidden">
              {[
                { v: '12M+', l: 'Monthly visitors' },
                { v: '48hrs', l: 'To go live' },
                { v: '₦0', l: 'Listing fee' },
                { v: '73%', l: 'Repeat sellers' },
              ].map(s => (
                <div key={s.l} className="bg-white py-5 text-center">
                  <div className="font-bold text-xl text-purple-700 mb-0.5">{s.v}</div>
                  <div className="text-xs text-gray-400">{s.l}</div>
                </div>
              ))}
            </motion.div>

            {/* Talk to us */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.38, duration: 0.5 }}
              className="bg-[#100d23] rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <h3 className="font-bold text-white text-sm">Prefer to talk?</h3>
                </div>
                <p className="text-white/45 text-xs mb-4 leading-relaxed">Our listing team is available Mon–Fri, 9am–6pm WAT.</p>
                <a href="tel:+2348001234567" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/8 hover:bg-white/14 border border-white/10 text-white text-sm font-semibold transition-all mb-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400" /> +234 800 123 4567
                </a>
                <a href="https://wa.me/2348001234567" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/8 hover:bg-white/14 border border-white/10 text-white text-sm font-semibold transition-all">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-emerald-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg> WhatsApp Us
                </a>
              </div>
            </motion.div>

            {/* Agent CTA */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.44, duration: 0.5 }} className="pb-2">
              <Link href="/agents" className="flex items-center justify-between px-6 py-5 rounded-2xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/30 transition-all group">
                <div>
                  <div className="font-bold text-gray-900 text-sm">Find an Agent Instead</div>
                  <div className="text-xs text-gray-400 mt-1">Let a verified agent handle everything</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0 ml-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
