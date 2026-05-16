import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

/* ── Real brand SVG icons ── */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631zM17.083 19.77h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { Icon: XIcon, href: 'https://twitter.com/4zeeproperties', label: 'X / Twitter' },
  { Icon: LinkedInIcon, href: 'https://linkedin.com/company/4zee-properties', label: 'LinkedIn' },
  { Icon: InstagramIcon, href: 'https://instagram.com/4zeeproperties', label: 'Instagram' },
  { Icon: YouTubeIcon, href: 'https://youtube.com/@4zeeproperties', label: 'YouTube' },
  { Icon: FacebookIcon, href: 'https://facebook.com/4zeeproperties', label: 'Facebook' },
];

const FOOTER_LINKS = {
  Properties: [
    { label: 'Buy Property', href: '/properties?status=for-sale' },
    { label: 'Rent Property', href: '/properties?status=for-rent' },
    { label: 'Off-Plan Projects', href: '/properties?status=off-plan' },
    { label: 'Luxury Homes', href: '/properties?type=villa' },
    { label: 'Commercial Space', href: '/properties?type=commercial' },
    { label: 'Land & Plots', href: '/properties?type=land' },
  ],
  Services: [
    { label: 'Find an Agent', href: '/agents' },
    { label: 'List Your Property', href: '/list-property' },
    { label: 'Construction & Build', href: '/construction' },
    { label: 'Investment Insights', href: '/invest' },
    { label: 'African Markets', href: '/markets' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  Markets: [
    { label: 'Nigeria', href: '/markets/nigeria' },
    { label: 'South Africa', href: '/markets/south-africa' },
    { label: 'Kenya', href: '/markets/kenya' },
    { label: 'Ghana', href: '/markets/ghana' },
    { label: 'Egypt', href: '/markets/egypt' },
    { label: 'All Markets', href: '/markets' },
  ],
  Company: [
    { label: 'About 4zee', href: '/about' },
    { label: 'List Your Property', href: '/list-property' },
    { label: 'Find an Agent', href: '/agents' },
    { label: 'Contact Us', href: 'mailto:hello@4zee.properties' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Investment', href: '/invest' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0d0b1a] text-white">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-600/60 to-transparent" />

      {/* Newsletter */}
      <div className="border-b border-white/6 py-16 md:py-20">
        <div className="container-premium">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                Africa&apos;s Property Market,{' '}
                <span className="gradient-text">In Your Inbox.</span>
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Weekly insights, exclusive listings, and market intelligence from across Africa.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 lg:w-72 px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-white/35 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                style={{ colorScheme: 'dark' }}
              />
              <button className="w-full sm:w-auto px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="py-14 md:py-16">
      <div className="container-premium">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image src="/images/logo.webp" alt="4zee Properties" fill className="object-contain" />
              </div>
              <div>
                <div className="font-bold text-lg text-white leading-tight">4zee Properties</div>
                <div className="text-xs text-white/40">Africa&apos;s Premier PropTech</div>
              </div>
            </Link>

            <p className="text-white/45 text-sm leading-relaxed mb-6">
              Africa&apos;s most trusted real estate platform connecting buyers, sellers, investors, and developers across 28 countries.
            </p>

            <div className="space-y-2.5 mb-7">
              <a href="mailto:hello@4zee.properties" className="flex items-center gap-2.5 text-white/45 hover:text-purple-400 transition-colors text-sm group">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                hello@4zee.properties
              </a>
              <a href="tel:+2348001234567" className="flex items-center gap-2.5 text-white/45 hover:text-purple-400 transition-colors text-sm group">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                +234 800 4ZEE PROP
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-white/6 hover:bg-purple-600 flex items-center justify-center transition-all hover:scale-105 border border-white/6 hover:border-purple-500"
                >
                  <social.Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-bold text-white/70 mb-4 uppercase tracking-widest">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Offices */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white/70 mb-4 uppercase tracking-widest">Key Offices</h4>
            <div className="space-y-3">
              {[
                { city: 'Lagos', country: 'Nigeria' },
                { city: 'Abuja', country: 'Nigeria' },
                { city: 'Nairobi', country: 'Kenya' },
                { city: 'Accra', country: 'Ghana' },
                { city: 'Johannesburg', country: 'South Africa' },
              ].map((office) => (
                <div key={office.city} className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span className="text-sm text-white/40">{office.city}, {office.country}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6 py-5">
        <div className="container-premium flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <div>© {new Date().getFullYear()} 4zee Properties Ltd. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <span className="cursor-default">Privacy</span>
            <span className="cursor-default">Terms</span>
            <span className="cursor-default">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
