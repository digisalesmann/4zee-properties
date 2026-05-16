'use client';

import { motion } from 'framer-motion';
import { Heart, MapPin, Bed, Bath, Maximize, Eye, Star, Verified } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from './Badge';
import { WhatsAppIcon } from './WhatsAppIcon';
import { cn, formatCurrency } from '@/lib/utils';
import type { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'featured' | 'list' | 'hero';
  index?: number;
}

const STATUS_LABELS: Record<string, { label: string; color: 'purple' | 'green' | 'gold' | 'red' | 'blue' }> = {
  'for-sale': { label: 'For Sale', color: 'purple' },
  'for-rent': { label: 'For Rent', color: 'green' },
  'for-lease': { label: 'For Lease', color: 'blue' },
  'sold': { label: 'Sold', color: 'red' },
  'off-plan': { label: 'Off-Plan', color: 'gold' },
};

export function PropertyCard({ property, variant = 'default', index = 0 }: PropertyCardProps) {
  const [saved, setSaved] = useState(false);
  const statusInfo = STATUS_LABELS[property.status];

  /* ── HERO variant: full-bleed image, everything as overlay ── */
  if (variant === 'hero') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="relative rounded-2xl overflow-hidden h-full min-h-[540px] group"
      >
        <Link href={`/properties/${property.id}`} className="absolute inset-0 z-0">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </Link>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

        {/* Top row */}
        <div className="absolute top-5 left-5 flex gap-2 z-10">
          <Badge variant={statusInfo.color}>{statusInfo.label}</Badge>
          {property.luxury && <Badge variant="gold">Luxury</Badge>}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
          className="absolute top-5 right-5 z-10 p-2.5 glass rounded-xl hover:bg-white/20 transition-colors"
        >
          <Heart className={cn('w-4 h-4 transition-all', saved ? 'fill-red-500 text-red-500' : 'text-white')} />
        </button>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
          <div className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 font-display">
            {formatCurrency(property.price, property.currency)}
          </div>
          <Link href={`/properties/${property.id}`}>
            <h3 className="font-display text-lg sm:text-2xl font-bold text-white mb-1.5 sm:mb-2 hover:text-purple-300 transition-colors leading-snug line-clamp-2">
              {property.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-white/60 text-sm mb-3 sm:mb-5">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
            <span className="truncate">{property.location.city}, {property.location.country}</span>
          </div>
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 text-white/60 text-sm mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-white/15">
            {property.bedrooms && (
              <span className="flex items-center gap-1.5 flex-shrink-0"><Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />{property.bedrooms} Beds</span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-1.5 flex-shrink-0"><Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />{property.bathrooms} Baths</span>
            )}
            <span className="flex items-center gap-1.5 flex-shrink-0"><Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />{property.size} {property.sizeUnit}</span>
            <span className="flex items-center gap-1 text-white/40 flex-shrink-0 ml-auto"><Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{property.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden relative ring-2 ring-white/20 flex-shrink-0">
                <Image src={property.agent.avatar} alt={property.agent.name} fill sizes="40px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <div className="text-white font-semibold text-xs sm:text-sm flex items-center gap-1 min-w-0">
                  <span className="truncate">{property.agent.name}</span>
                  {property.agent.verified && <Verified className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400 flex-shrink-0" />}
                </div>
                <div className="flex items-center gap-0.5 text-amber-400 mt-0.5">
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                  <span className="text-[10px] sm:text-xs text-white/50 ml-0.5">{property.agent.rating} ({property.agent.reviews})</span>
                </div>
              </div>
            </div>
            <a
              href={`https://wa.me/${property.agent.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-500/90 hover:bg-green-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Chat
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ── LIST variant ── */
  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/8 transition-all duration-300 group"
      >
        {/* Image */}
        <Link href={`/properties/${property.id}`} className="relative h-52 sm:h-auto sm:w-56 sm:flex-shrink-0 overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, 224px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            <Badge variant={statusInfo.color}>{statusInfo.label}</Badge>
            {property.luxury && <Badge variant="gold">Luxury</Badge>}
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <Link href={`/properties/${property.id}`} className="min-w-0">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 hover:text-purple-700 transition-colors line-clamp-1">{property.title}</h3>
              </Link>
              <button onClick={() => setSaved(!saved)} className="flex-shrink-0 p-2 rounded-xl hover:bg-purple-50 transition-colors">
                <Heart className={cn('w-4 h-4 sm:w-5 sm:h-5 transition-colors', saved ? 'fill-red-500 text-red-500' : 'text-gray-400')} />
              </button>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm mb-2 sm:mb-3">
              <MapPin className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
              <span className="truncate">{property.location.city}, {property.location.country}</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 hidden sm:block">{property.description}</p>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600">
              {property.bedrooms && (
                <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-purple-400" />{property.bedrooms} Beds</span>
              )}
              {property.bathrooms && (
                <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-purple-400" />{property.bathrooms} Baths</span>
              )}
              <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5 text-purple-400" />{property.size} {property.sizeUnit}</span>
              <span className="flex items-center gap-1 text-gray-400 ml-auto"><Eye className="w-3.5 h-3.5" />{property.views.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 sm:pt-4 mt-3 sm:mt-0 border-t border-gray-100">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-purple-700">{formatCurrency(property.price, property.currency)}</div>
              {property.status === 'for-rent' && <div className="text-xs text-gray-500">per month</div>}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image src={property.agent.avatar} alt={property.agent.name} fill sizes="32px" className="object-cover" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-semibold text-gray-800 whitespace-nowrap">{property.agent.name}</div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-medium">{property.agent.rating}</span>
                  </div>
                </div>
              </div>
              <a href={`https://wa.me/${property.agent.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex-shrink-0">
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ── DEFAULT / FEATURED variant ── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 group flex flex-col',
        variant === 'featured' && 'ring-1 ring-purple-200'
      )}
    >
      <Link href={`/properties/${property.id}`} className="relative h-64 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          <Badge variant={statusInfo.color}>{statusInfo.label}</Badge>
          {property.luxury && <Badge variant="gold">Luxury</Badge>}
          {property.featured && <Badge variant="dark">Featured</Badge>}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
          className="absolute top-4 right-4 p-2.5 glass rounded-xl hover:bg-white/30 transition-colors"
        >
          <Heart className={cn('w-4 h-4 transition-all', saved ? 'fill-red-500 text-red-500 scale-110' : 'text-white')} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="text-white">
            <div className="text-2xl font-bold">{formatCurrency(property.price, property.currency)}</div>
            {property.status === 'for-rent' && <div className="text-xs text-white/70">per month</div>}
          </div>
          <div className="flex items-center gap-1 text-white/80 text-xs">
            <Eye className="w-3 h-3" />
            {property.views.toLocaleString()}
          </div>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/properties/${property.id}`}>
            <h3 className="font-bold text-gray-900 text-base leading-snug hover:text-purple-700 transition-colors line-clamp-2">
              {property.title}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <MapPin className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
          <span className="truncate">{property.location.city}, {property.location.country}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 pb-4 border-b border-gray-100 mb-4">
          {property.bedrooms && (
            <span className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-purple-400" />{property.bedrooms}</span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-purple-400" />{property.bathrooms}</span>
          )}
          <span className="flex items-center gap-1.5 ml-auto"><Maximize className="w-4 h-4 text-purple-400" />{property.size} {property.sizeUnit}</span>
        </div>

        <div className="flex items-center gap-3 mt-auto">
          <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-purple-100">
            <Image src={property.agent.avatar} alt={property.agent.name} fill sizes="36px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-800 truncate">{property.agent.name}</span>
              {property.agent.verified && <Verified className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />}
            </div>
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-medium text-gray-600">{property.agent.rating} ({property.agent.reviews})</span>
            </div>
          </div>
          <a
            href={`https://wa.me/${property.agent.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-500 hover:text-white transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
