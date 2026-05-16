'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, ChevronRight, User,
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[360px] bg-[#0d0b1a] flex flex-col lg:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-white/8">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 flex-shrink-0">
                    <Image src="/images/logo.webp" alt="4zee Properties" fill className="object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-white leading-none">4zee</div>
                    <div className="text-[10px] text-white/40 leading-none mt-0.5">Properties</div>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/6 text-white/60 hover:bg-white/12 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav items */}
              <div className="flex-1 px-4 py-5 space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    index={i}
                    pathname={pathname}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}
              </div>

              {/* Footer CTAs */}
              <div className="px-4 pb-8 pt-4 border-t border-white/8 space-y-3">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/6 hover:border-white/25 transition-all"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </Link>
                <Link
                  href="/list-property"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold transition-all shadow-lg shadow-purple-900/40"
                >
                  List Property
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileNavItem({
  item,
  index,
  pathname,
  onClose,
}: {
  item: (typeof NAV_ITEMS)[0];
  index: number;
  pathname: string;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isActive = pathname.startsWith(item.href) && item.href !== '/';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {item.megaMenu ? (
        <div>
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              'w-full flex items-center gap-3.5 px-4 py-4 rounded-2xl text-left transition-all',
              isActive ? 'bg-purple-600/20 text-purple-300' : 'text-white/80 hover:bg-white/6 hover:text-white'
            )}
          >
            <div className={cn('w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0', isActive ? 'bg-purple-600/30' : 'bg-white/8')}>
              <item.icon className={cn('w-4.5 h-4.5', isActive ? 'text-purple-400' : 'text-white/50')} />
            </div>
            <span className="flex-1 font-semibold text-base">{item.label}</span>
            <ChevronRight className={cn('w-4 h-4 text-white/30 transition-transform duration-200', open && 'rotate-90')} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="ml-[52px] mt-1 mb-2 space-y-0.5 border-l border-white/8 pl-4">
                  {item.megaMenu.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={onClose}
                      className="flex flex-col py-2.5 px-2 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">{sub.label}</span>
                      <span className="text-xs text-white/30 mt-0.5">{sub.desc}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          href={item.href}
          onClick={onClose}
          className={cn(
            'flex items-center gap-3.5 px-4 py-4 rounded-2xl transition-all',
            isActive ? 'bg-purple-600/20 text-purple-300' : 'text-white/80 hover:bg-white/6 hover:text-white'
          )}
        >
          <div className={cn('w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0', isActive ? 'bg-purple-600/30' : 'bg-white/8')}>
            <item.icon className={cn('w-4.5 h-4.5', isActive ? 'text-purple-400' : 'text-white/50')} />
          </div>
          <span className="font-semibold text-base">{item.label}</span>
        </Link>
      )}
    </motion.div>
  );
}
