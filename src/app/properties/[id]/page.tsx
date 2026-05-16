'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Bed, Bath, Maximize, Heart, Share2, Phone,
  Star, Verified, ChevronLeft, ChevronRight, Calendar, Calculator,
  Eye, Bookmark, ArrowLeft, CheckCircle, Home, Building2, Car,
  Play, X, ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FEATURED_PROPERTIES } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { use } from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

function MortgageCalculator({ price }: { price: number }) {
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(25);

  const down = price * (downPct / 100);
  const loan = price - down;
  const monthly = (loan * (rate / 100 / 12)) / (1 - Math.pow(1 + rate / 100 / 12, -years * 12));

  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-purple-700" />
        <h3 className="font-bold text-gray-900">Mortgage Estimator</h3>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Down Payment</span>
            <span className="font-bold text-purple-700">{downPct}% — {formatCurrency(down, 'USD')}</span>
          </div>
          <input type="range" min={5} max={50} value={downPct} onChange={e => setDownPct(+e.target.value)}
            className="w-full accent-purple-600" />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Interest Rate</span>
            <span className="font-bold text-purple-700">{rate}% p.a.</span>
          </div>
          <input type="range" min={4} max={20} step={0.5} value={rate} onChange={e => setRate(+e.target.value)}
            className="w-full accent-purple-600" />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Loan Duration</span>
            <span className="font-bold text-purple-700">{years} years</span>
          </div>
          <input type="range" min={5} max={30} step={5} value={years} onChange={e => setYears(+e.target.value)}
            className="w-full accent-purple-600" />
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-600 rounded-xl text-center">
        <div className="text-white/70 text-sm mb-1">Estimated Monthly Payment</div>
        <div className="text-white text-3xl font-bold">{formatCurrency(monthly, 'USD')}</div>
        <div className="text-white/60 text-xs mt-1">Principal + Interest only</div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Estimates are for illustration only. Contact our mortgage partners for actual rates.
      </div>
    </div>
  );
}

export default function PropertyDetailPage({ params }: Props) {
  const { id } = use(params);
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const property = FEATURED_PROPERTIES.find(p => p.id === id) ?? FEATURED_PROPERTIES[0];
  const related = FEATURED_PROPERTIES.filter(p => p.id !== property.id && p.location.country === property.location.country).slice(0, 3);

  const STATUS_COLORS: Record<string, 'purple' | 'green' | 'gold' | 'red' | 'blue'> = {
    'for-sale': 'purple', 'for-rent': 'green', 'for-lease': 'blue', 'sold': 'red', 'off-plan': 'gold',
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container-premium flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-purple-700 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/properties" className="hover:text-purple-700 transition-colors">Properties</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium truncate">{property.title}</span>
        </div>
      </div>

      <div className="py-8 pb-16">
      <div className="container-premium">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left/Main content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Image gallery */}
            <div className="rounded-3xl overflow-hidden bg-gray-100">
              {/* Main image */}
              <div className="relative h-[480px] group cursor-pointer" onClick={() => setLightbox(true)}>
                <AnimatePresence mode="sync">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image src={property.images[activeImage]} alt={property.title} fill className="object-cover" priority />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                {/* Gallery arrows */}
                {property.images.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setActiveImage(i => (i - 1 + property.images.length) % property.images.length); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white/30">
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setActiveImage(i => (i + 1) % property.images.length); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white/30">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-5 left-5 flex gap-2 flex-wrap">
                  <Badge variant={STATUS_COLORS[property.status] || 'purple'}>
                    {property.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                  {property.luxury && <Badge variant="gold">Luxury</Badge>}
                  {property.featured && <Badge variant="dark">Featured</Badge>}
                </div>

                {/* View count */}
                <div className="absolute top-5 right-5 flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-white text-sm">
                  <Eye className="w-4 h-4" />
                  {property.views.toLocaleString()} views
                </div>

                {/* Virtual Tour button */}
                <div className="absolute bottom-5 left-5">
                  <button className="flex items-center gap-2 glass px-4 py-2.5 rounded-xl text-white font-semibold text-sm hover:bg-white/20 transition-colors">
                    <Play className="w-4 h-4 fill-current" />
                    Virtual Tour
                  </button>
                </div>

                {/* Image counter */}
                <div className="absolute bottom-5 right-5 glass px-3 py-1.5 rounded-full text-white text-sm">
                  {activeImage + 1} / {property.images.length}
                </div>
              </div>

              {/* Thumbnail strip */}
              {property.images.length > 1 && (
                <div className="flex gap-2 p-3 bg-gray-50">
                  {property.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all ${i === activeImage ? 'ring-2 ring-purple-600 ring-offset-1' : 'opacity-60 hover:opacity-100'}`}>
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property header */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">{property.title}</h1>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <span>{property.location.address}, {property.location.city}, {property.location.country}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => setSaved(!saved)}
                    className={`p-3 rounded-xl border transition-all ${saved ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-500 hover:border-purple-200 hover:text-purple-600'}`}>
                    <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-xl border border-gray-200 text-gray-500 hover:border-purple-200 hover:text-purple-600 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
                <div className="text-4xl font-bold text-purple-700">{formatCurrency(property.price, property.currency)}</div>
                {property.status === 'for-rent' && <div className="text-gray-500 text-lg mb-1">/ month</div>}
                <div className="ml-auto text-sm text-gray-400 text-right">
                  <div className="font-semibold text-gray-600">{formatCurrency(Math.round(property.price / property.size), 'USD')} / {property.sizeUnit}</div>
                  <div>Price per unit</div>
                </div>
              </div>

              {/* Key specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Bed, label: 'Bedrooms', value: property.bedrooms || 'N/A' },
                  { icon: Bath, label: 'Bathrooms', value: property.bathrooms || 'N/A' },
                  { icon: Maximize, label: 'Area', value: `${property.size} ${property.sizeUnit}` },
                  { icon: Car, label: 'Parking', value: property.parking || 'N/A' },
                ].map((spec) => (
                  <div key={spec.label} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <spec.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{spec.value}</div>
                      <div className="text-xs text-gray-500">{spec.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100">
                {['overview', 'amenities', 'location', 'details'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-semibold capitalize transition-all ${
                      activeTab === tab ? 'text-purple-700 border-b-2 border-purple-600 bg-purple-50/50' : 'text-gray-500 hover:text-gray-800'
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-4">About This Property</h3>
                    <p className="text-gray-600 leading-relaxed text-base">{property.description}</p>
                    <div className="mt-6 text-sm">
                      {[
                        { label: 'Property Type', value: property.type.charAt(0).toUpperCase() + property.type.slice(1) },
                        { label: 'Year Built', value: property.yearBuilt || 'N/A' },
                        { label: 'Floors', value: property.floors || 'N/A' },
                        { label: 'Listed Date', value: new Date(property.createdAt).toLocaleDateString() },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                          <span className="text-gray-500">{item.label}</span>
                          <span className="font-semibold text-gray-800">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-6">Property Amenities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {property.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2.5 p-3 rounded-xl bg-green-50 border border-green-100">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'location' && (
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-4">Location Details</h3>
                    <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center mb-4">
                      <div className="text-center text-gray-500">
                        <MapPin className="w-10 h-10 mx-auto mb-2 text-purple-400" />
                        <p className="font-medium">{property.location.address}</p>
                        <p className="text-sm">{property.location.city}, {property.location.country}</p>
                        <a href={`https://maps.google.com/?q=${property.location.city},${property.location.country}`}
                          target="_blank" rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1 text-purple-600 text-sm font-semibold hover:text-purple-800">
                          Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['Airport — 25 min', 'CBD — 8 min', 'Schools — 5 min'].map(loc => (
                        <div key={loc} className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-center font-medium text-gray-600">{loc}</div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-6">Property Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      {[
                        { label: 'Listing ID', value: property.id },
                        { label: 'Property Type', value: property.type },
                        { label: 'Status', value: property.status },
                        { label: 'Size', value: `${property.size} ${property.sizeUnit}` },
                        { label: 'Bedrooms', value: property.bedrooms || 'N/A' },
                        { label: 'Bathrooms', value: property.bathrooms || 'N/A' },
                        { label: 'Parking', value: property.parking || 'N/A' },
                        { label: 'Year Built', value: property.yearBuilt || 'N/A' },
                        { label: 'Floors', value: property.floors || 'N/A' },
                        { label: 'Tags', value: property.tags.join(', ') },
                      ].map(item => (
                        <div key={item.label} className="flex justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-500">{item.label}</span>
                          <span className="font-semibold text-gray-800 capitalize">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related properties */}
            {related.length > 0 && (
              <div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-6">Similar Properties in {property.location.country}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {related.map((p, i) => (
                    <Link key={p.id} href={`/properties/${p.id}`}
                      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all">
                      <div className="relative h-44 overflow-hidden">
                        <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <div className="font-bold text-gray-800 text-sm mb-1 line-clamp-1 group-hover:text-purple-700 transition-colors">{p.title}</div>
                        <div className="text-purple-700 font-bold">{formatCurrency(p.price, p.currency)}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Agent card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-purple-100">
                  <Image src={property.agent.avatar} alt={property.agent.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-900 truncate">{property.agent.name}</span>
                    {property.agent.verified && <Verified className="w-4 h-4 text-purple-600 flex-shrink-0" />}
                  </div>
                  <div className="text-sm text-gray-500 truncate">{property.agent.title}</div>
                  <div className="text-xs text-purple-600 font-medium truncate">{property.agent.agency}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(property.agent.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({property.agent.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Contact actions */}
              <div className="space-y-3 mb-6">
                <a href={`tel:${property.agent.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-semibold transition-colors">
                  <Phone className="w-4 h-4" />
                  Call Agent
                </a>
                <a href={`https://wa.me/${property.agent.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors">
                  <WhatsAppIcon className="w-4 h-4" />
                  WhatsApp
                </a>
                <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-purple-200 hover:border-purple-500 text-purple-700 hover:bg-purple-50 font-semibold transition-all">
                  <Calendar className="w-4 h-4" />
                  Schedule Inspection
                </button>
              </div>

              {/* Agent stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="font-bold text-gray-900">{property.agent.listings}</div>
                  <div className="text-xs text-gray-500">Listings</div>
                </div>
                <div className="text-center border-x border-gray-100">
                  <div className="font-bold text-gray-900">{property.agent.sold}</div>
                  <div className="text-xs text-gray-500">Deals Closed</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">{property.agent.experience}yr</div>
                  <div className="text-xs text-gray-500">Experience</div>
                </div>
              </div>

              <Link href={`/agents/${property.agent.id}`}
                className="mt-4 flex items-center justify-center gap-1.5 w-full text-sm text-purple-600 hover:text-purple-800 font-semibold transition-colors">
                View Full Profile <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mortgage calculator */}
            <MortgageCalculator price={property.price} />

            {/* Tags */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4">Property Tags</h4>
              <div className="flex flex-wrap gap-2">
                {property.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button className="absolute top-6 right-6 p-3 glass rounded-xl text-white hover:bg-white/20">
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <Image src={property.images[activeImage]} alt="" fill className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
