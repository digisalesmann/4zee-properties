'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, User,
  Building2, MapPin, Users, BarChart3, Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  {
    label: 'Properties',
    href: '/properties',
    icon: Home,
    megaMenu: [
      { label: 'All Properties', href: '/properties', desc: 'Browse entire catalog' },
      { label: 'Luxury Homes', href: '/properties?type=villa', desc: 'Premium estates & villas' },
      { label: 'Apartments', href: '/properties?type=apartment', desc: 'Urban living spaces' },
      { label: 'Commercial', href: '/properties?type=commercial', desc: 'Office & retail spaces' },
      { label: 'Land & Plots', href: '/properties?type=land', desc: 'Development opportunities' },
      { label: 'Off-Plan', href: '/properties?status=off-plan', desc: 'New developments' },
    ],
  },
  {
    label: 'Markets',
    href: '/markets',
    icon: MapPin,
    megaMenu: [
      { label: 'Nigeria', href: '/markets', desc: 'Lagos, Abuja, Port Harcourt' },
      { label: 'South Africa', href: '/markets', desc: 'Johannesburg, Cape Town' },
      { label: 'Kenya', href: '/markets', desc: 'Nairobi, Mombasa' },
      { label: 'Ghana', href: '/markets', desc: 'Accra, Kumasi' },
      { label: 'Egypt', href: '/markets', desc: 'Cairo, Alexandria' },
      { label: 'All 28 Markets', href: '/markets', desc: 'Pan-African coverage' },
    ],
  },
  {
    label: 'Agents',
    href: '/agents',
    icon: Users,
    megaMenu: null,
  },
  {
    label: 'Construction',
    href: '/construction',
    icon: Building2,
    megaMenu: [
      { label: 'Construction Firms', href: '/construction', desc: 'Verified contractors' },
      { label: 'Request a Build', href: '/construction', desc: 'Start your project' },
      { label: 'Investment Projects', href: '/invest', desc: 'Infrastructure & smart cities' },
    ],
  },
  {
    label: 'Invest',
    href: '/invest',
    icon: BarChart3,
    megaMenu: [
      { label: 'Investment Guide', href: '/invest', desc: 'Market intelligence' },
      { label: 'ROI Calculator', href: '/invest#calculator', desc: 'Estimate returns' },
      { label: 'Market Trends', href: '/markets', desc: 'Real-time data' },
    ],
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const navBg = isHomePage && !scrolled
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm';

  const textColor = isHomePage && !scrolled ? 'text-white' : 'text-gray-800';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', navBg)}
      >
        <div className="container-premium">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/logo.webp"
                  alt="4zee Properties"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <div className={cn('font-bold text-xl tracking-tight leading-none transition-colors', isHomePage && !scrolled ? 'text-white' : 'text-purple-700')}>
                  4zee
                </div>
                <div className={cn('text-xs font-medium leading-none transition-colors', isHomePage && !scrolled ? 'text-white/70' : 'text-gray-500')}>
                  Properties
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative"
                  onMouseEnter={() => item.megaMenu && setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                      textColor,
                      pathname.startsWith(item.href) && item.href !== '/'
                        ? 'bg-purple-600 text-white'
                        : isHomePage && !scrolled
                        ? 'hover:bg-white/10'
                        : 'hover:bg-purple-50 hover:text-purple-700'
                    )}
                  >
                    {item.label}
                    {item.megaMenu && <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', activeMenu === item.label && 'rotate-180')} />}
                  </Link>

                  <AnimatePresence>
                    {item.megaMenu && activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl shadow-purple-900/15 border border-gray-100 overflow-hidden p-2"
                      >
                        {item.megaMenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="flex flex-col px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors group/sub"
                          >
                            <span className="text-sm font-semibold text-gray-800 group-hover/sub:text-purple-700 transition-colors">{subItem.label}</span>
                            <span className="text-xs text-gray-500 mt-0.5">{subItem.desc}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/auth/login" className={cn('flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all', isHomePage && !scrolled ? 'border-white/30 text-white hover:bg-white/10' : 'border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-700')}>
                <User className="w-4 h-4" />
                Sign In
              </Link>
              <Link href="/list-property" className="px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-900/20">
                List Property
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn('lg:hidden p-2.5 rounded-xl transition-colors', isHomePage && !scrolled ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100')}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-2xl overflow-hidden"
          >
            <div className="container-premium py-6 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-purple-50 text-gray-800 font-semibold transition-colors"
                >
                  <item.icon className="w-5 h-5 text-purple-600" />
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 flex gap-3">
                <Link href="/auth/login" className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-center text-sm font-semibold text-gray-700 hover:border-purple-300">
                  Sign In
                </Link>
                <Link href="/list-property" className="flex-1 py-3 px-4 rounded-xl bg-purple-700 text-white text-center text-sm font-bold hover:bg-purple-600">
                  List Property
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
