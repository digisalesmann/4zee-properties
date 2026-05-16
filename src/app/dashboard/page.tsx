'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home, Heart, Bell, Settings, Building2, MessageSquare,
  TrendingUp, Calendar, ChevronRight, MapPin, Eye, BarChart3,
  LogOut, Plus, ArrowUpRight, BrainCircuit, CreditCard,
  BadgeCheck, Menu, X, Search, ChevronLeft, ExternalLink,
  ArrowUp, ArrowDown, Star, Clock, Edit2, Trash2, CheckCircle2,
  AlertCircle, XCircle, Send, Filter, Download, DollarSign,
  MoreHorizontal, Users, Activity,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FEATURED_PROPERTIES } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

/* ─── Nav ─── */
const NAV_ITEMS = [
  { icon: Home,          label: 'Overview',         value: 'overview' },
  { icon: Building2,     label: 'My Listings',      value: 'listings' },
  { icon: Heart,         label: 'Saved Properties', value: 'saved' },
  { icon: MessageSquare, label: 'Inquiries',         value: 'inquiries',    badge: 3 },
  { icon: Calendar,      label: 'Bookings',          value: 'bookings' },
  { icon: BarChart3,     label: 'Analytics',         value: 'analytics' },
  { icon: CreditCard,    label: 'Payments',          value: 'payments' },
  { icon: Bell,          label: 'Notifications',     value: 'notifications', badge: 2 },
  { icon: Settings,      label: 'Settings',          value: 'settings' },
];

/* ─── Data ─── */
const SAVED = FEATURED_PROPERTIES.slice(0, 4);

const MY_LISTINGS = FEATURED_PROPERTIES.slice(0, 5).map((p, i) => ({
  ...p,
  listingStatus: ['active', 'active', 'pending', 'active', 'sold'][i] as 'active' | 'pending' | 'sold',
  listingViews: [1420, 890, 340, 2100, 670][i],
  listingInquiries: [12, 5, 2, 18, 9][i],
  daysListed: [14, 7, 3, 28, 45][i],
}));

const ALL_INQUIRIES = [
  { id: 1, property: 'The Pinnacle Penthouse', propImg: FEATURED_PROPERTIES[0].images[0], from: 'John Obi', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80', time: '2h ago', status: 'new', message: 'I am interested in scheduling a viewing for this weekend. Is Saturday afternoon available? I would also love to get more details about the building amenities and HOA fees.' },
  { id: 2, property: 'Nairobi Sky Residence', propImg: FEATURED_PROPERTIES[1].images[0], from: 'Amara Diallo', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80', time: '5h ago', status: 'replied', message: 'What is the minimum lease term for a rental? I am relocating to Nairobi in January and need a 6-month option.' },
  { id: 3, property: 'Sandton Crown Estate', propImg: FEATURED_PROPERTIES[2].images[0], from: 'Thabo Nkosi', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80', time: '1d ago', status: 'closed', message: 'We would like to make an offer. Is the seller open to negotiations on the listed price?' },
  { id: 4, property: 'The Pinnacle Penthouse', propImg: FEATURED_PROPERTIES[0].images[0], from: 'Fatima Al-Hassan', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80', time: '2d ago', status: 'new', message: 'Does this property come with a designated parking space? Also, is the property pet-friendly?' },
  { id: 5, property: 'Accra Business Hub', propImg: FEATURED_PROPERTIES[3]?.images[0] || FEATURED_PROPERTIES[0].images[0], from: 'Kwame Mensah', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', time: '3d ago', status: 'replied', message: 'I am looking for office space for a team of 20. Can you provide details on the floor plan and monthly rent?' },
  { id: 6, property: 'Nairobi Sky Residence', propImg: FEATURED_PROPERTIES[1].images[0], from: 'Grace Wanjiku', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80', time: '5d ago', status: 'closed', message: 'What utilities are included in the service charge? Looking for a long-term rental.' },
];

const BOOKINGS = [
  { id: 1, property: 'The Pinnacle Penthouse', propImg: FEATURED_PROPERTIES[0].images[0], client: 'John Obi', clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80', date: 'Sat, Dec 20', time: '2:00 PM', type: 'Physical Viewing', status: 'confirmed' },
  { id: 2, property: 'Nairobi Sky Residence', propImg: FEATURED_PROPERTIES[1].images[0], client: 'Amara Diallo', clientAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80', date: 'Mon, Dec 22', time: '10:30 AM', type: 'Virtual Tour', status: 'pending' },
  { id: 3, property: 'Sandton Crown Estate', propImg: FEATURED_PROPERTIES[2].images[0], client: 'Thabo Nkosi', clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80', date: 'Wed, Dec 24', time: '4:00 PM', type: 'Physical Viewing', status: 'confirmed' },
  { id: 4, property: 'The Pinnacle Penthouse', propImg: FEATURED_PROPERTIES[0].images[0], client: 'Fatima Al-Hassan', clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80', date: 'Thu, Dec 25', time: '11:00 AM', type: 'Virtual Tour', status: 'cancelled' },
  { id: 5, property: 'Accra Business Hub', propImg: FEATURED_PROPERTIES[3]?.images[0] || FEATURED_PROPERTIES[0].images[0], client: 'Kwame Mensah', clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', date: 'Fri, Dec 26', time: '3:30 PM', type: 'Physical Viewing', status: 'pending' },
];

const ANALYTICS_MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const VIEWS_DATA  = [3200, 4800, 3900, 6100, 5400, 8200];
const INQ_DATA    = [18, 27, 22, 35, 29, 41];
const ANALYTICS_STATS = [
  { label: 'Total Views',      value: '31,600', delta: '+34%', up: true,  icon: Eye,           color: 'text-blue-600',    bg: 'bg-blue-50' },
  { label: 'Total Inquiries',  value: '172',    delta: '+18%', up: true,  icon: MessageSquare, color: 'text-purple-600',  bg: 'bg-purple-50' },
  { label: 'Conversion Rate',  value: '0.54%',  delta: '+0.1', up: true,  icon: TrendingUp,    color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Avg. Response',    value: '1.4h',   delta: '-22%', up: true,  icon: Clock,         color: 'text-amber-600',   bg: 'bg-amber-50' },
];
const TOP_LISTINGS = [
  { title: 'The Pinnacle Penthouse', views: 8200, inquiries: 41, rate: '0.50%', trend: '+12%' },
  { title: 'Nairobi Sky Residence',  views: 6100, inquiries: 35, rate: '0.57%', trend: '+8%' },
  { title: 'Sandton Crown Estate',   views: 5400, inquiries: 29, rate: '0.54%', trend: '+21%' },
  { title: 'Cairo Marina Tower',     views: 4800, inquiries: 27, rate: '0.56%', trend: '-3%' },
];

const PAYMENTS = [
  { id: 'TXN-001', description: 'Premium Listing Fee — The Pinnacle Penthouse', amount: 150, currency: 'USD', date: 'Dec 15, 2024', status: 'paid',    type: 'listing' },
  { id: 'TXN-002', description: 'Premium Listing Fee — Nairobi Sky Residence',  amount: 150, currency: 'USD', date: 'Dec 10, 2024', status: 'paid',    type: 'listing' },
  { id: 'TXN-003', description: 'Featured Placement — Sandton Crown Estate',    amount: 80,  currency: 'USD', date: 'Dec 5, 2024',  status: 'paid',    type: 'boost' },
  { id: 'TXN-004', description: 'Premium Listing Fee — Cairo Marina Tower',     amount: 150, currency: 'USD', date: 'Nov 28, 2024', status: 'pending', type: 'listing' },
  { id: 'TXN-005', description: 'Analytics Pro — Monthly Subscription',         amount: 29,  currency: 'USD', date: 'Nov 20, 2024', status: 'paid',    type: 'subscription' },
  { id: 'TXN-006', description: 'Featured Placement — The Pinnacle Penthouse',  amount: 80,  currency: 'USD', date: 'Nov 12, 2024', status: 'failed',  type: 'boost' },
  { id: 'TXN-007', description: 'Premium Listing Fee — Accra Business Hub',     amount: 150, currency: 'USD', date: 'Nov 5, 2024',  status: 'paid',    type: 'listing' },
];

const ALL_NOTIFICATIONS = [
  { id: 1, type: 'inquiry',  icon: MessageSquare, color: 'bg-purple-50 text-purple-600', title: 'New inquiry received', text: 'John Obi is interested in The Pinnacle Penthouse', time: '2h ago', read: false },
  { id: 2, type: 'match',    icon: Star,          color: 'bg-amber-50 text-amber-600',   title: 'AI property match', text: 'We found 3 new properties matching your search criteria', time: '5h ago', read: false },
  { id: 3, type: 'price',    icon: TrendingUp,    color: 'bg-emerald-50 text-emerald-600', title: 'Price drop alert', text: 'Nairobi Sky Residence price dropped by 5%', time: '1d ago', read: true },
  { id: 4, type: 'booking',  icon: Calendar,      color: 'bg-blue-50 text-blue-600',     title: 'Viewing confirmed', text: 'Your viewing is confirmed for Dec 20 at 2:00 PM', time: '1d ago', read: true },
  { id: 5, type: 'inquiry',  icon: MessageSquare, color: 'bg-purple-50 text-purple-600', title: 'Reply received', text: 'Amara Diallo replied to your inquiry about lease terms', time: '2d ago', read: true },
  { id: 6, type: 'system',   icon: CheckCircle2,  color: 'bg-gray-50 text-gray-600',     title: 'Listing approved', text: 'Sandton Crown Estate listing has been verified and published', time: '3d ago', read: true },
  { id: 7, type: 'price',    icon: TrendingUp,    color: 'bg-emerald-50 text-emerald-600', title: 'Market insight', text: 'Lagos luxury market grew 18% this quarter', time: '4d ago', read: true },
  { id: 8, type: 'booking',  icon: Calendar,      color: 'bg-blue-50 text-blue-600',     title: 'Booking cancelled', text: 'Fatima Al-Hassan cancelled the Dec 25 virtual tour', time: '5d ago', read: true },
];

const ACTIVITY = [
  { id: 1, icon: Bell,         color: 'bg-purple-50 text-purple-600', text: 'New inquiry on The Pinnacle Penthouse', time: '2h ago', unread: true },
  { id: 2, icon: Star,         color: 'bg-amber-50 text-amber-600',   text: 'AI found 3 new matches for your criteria', time: '5h ago', unread: true },
  { id: 3, icon: TrendingUp,   color: 'bg-emerald-50 text-emerald-600', text: 'Nairobi Sky Residence price dropped 5%', time: '1d ago', unread: false },
  { id: 4, icon: Calendar,     color: 'bg-blue-50 text-blue-600',     text: 'Viewing confirmed for Dec 20, 2024', time: '2d ago', unread: false },
  { id: 5, icon: MessageSquare,color: 'bg-rose-50 text-rose-600',     text: 'Amara Diallo replied to your inquiry', time: '3d ago', unread: false },
];

const STATS = [
  { label: 'Saved Properties', value: '23',   delta: '+4',   up: true,  icon: Heart,         color: 'text-rose-500',    bg: 'bg-rose-50',    sub: 'this week' },
  { label: 'Active Inquiries', value: '8',    delta: '3',    up: false, icon: MessageSquare, color: 'text-blue-600',    bg: 'bg-blue-50',    sub: 'need reply' },
  { label: 'Viewings Booked',  value: '3',    delta: '+1',   up: true,  icon: Calendar,      color: 'text-emerald-600', bg: 'bg-emerald-50', sub: 'this month' },
  { label: 'Portfolio Value',  value: '$2.8M',delta: '+12%', up: true,  icon: TrendingUp,    color: 'text-purple-600',  bg: 'bg-purple-50',  sub: 'YTD growth' },
];

/* ─── Style maps ─── */
const INQ_STATUS: Record<string, string> = {
  new:     'bg-red-50 text-red-600',
  replied: 'bg-blue-50 text-blue-600',
  closed:  'bg-gray-100 text-gray-500',
};
const BOOKING_STATUS: Record<string, { badge: string; icon: typeof CheckCircle2 }> = {
  confirmed: { badge: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  pending:   { badge: 'bg-amber-50 text-amber-700',    icon: Clock },
  cancelled: { badge: 'bg-red-50 text-red-600',        icon: XCircle },
};
const LISTING_STATUS: Record<string, string> = {
  active:  'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  sold:    'bg-gray-100 text-gray-600',
};
const PAY_STATUS: Record<string, { badge: string; dot: string }> = {
  paid:    { badge: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  pending: { badge: 'bg-amber-50 text-amber-700',    dot: 'bg-amber-500' },
  failed:  { badge: 'bg-red-50 text-red-600',        dot: 'bg-red-500' },
};
const PAY_TYPE_COLOR: Record<string, string> = {
  listing:      'bg-purple-50 text-purple-600',
  boost:        'bg-blue-50 text-blue-600',
  subscription: 'bg-gray-100 text-gray-600',
};

/* ─── Mini bar chart ─── */
function BarChart({ data, color = 'bg-purple-500' }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end">
          <div
            className={`${color} rounded-t-sm opacity-80 hover:opacity-100 transition-opacity`}
            style={{ height: `${(v / max) * 100}%`, minHeight: 4 }}
          />
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const [activeTab, setActiveTab]       = useState('overview');
  const [collapsed, setCollapsed]       = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [inqFilter, setInqFilter]       = useState('all');
  const [listFilter, setListFilter]     = useState('all');
  const [bookFilter, setBookFilter]     = useState('all');
  const [notifFilter, setNotifFilter]   = useState('all');
  const [expandedInq, setExpandedInq]   = useState<number | null>(null);
  const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS);

  const filteredInq = inqFilter === 'all' ? ALL_INQUIRIES : ALL_INQUIRIES.filter(i => i.status === inqFilter);
  const filteredList = listFilter === 'all' ? MY_LISTINGS : MY_LISTINGS.filter(l => l.listingStatus === listFilter);
  const filteredBook = bookFilter === 'all' ? BOOKINGS : BOOKINGS.filter(b => b.status === bookFilter);
  const filteredNotif = notifFilter === 'all' ? notifications : notifications.filter(n => n.type === notifFilter);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {mobileOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* ══ Sidebar ══ */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-[#100d23] transition-all duration-300
        ${mobileOpen ? 'w-[240px] translate-x-0' : 'w-[240px] -translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex-shrink-0
        ${collapsed ? 'lg:w-[68px]' : 'lg:w-[240px]'}`}
      >
        <Link href="/" className={`flex items-center h-16 px-4 border-b border-white/6 flex-shrink-0 hover:bg-white/5 transition-colors ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image src="/images/logo.webp" alt="4zee" fill className="object-contain" />
          </div>
          {!collapsed && <div className="min-w-0"><div className="font-bold text-white leading-none text-base">4zee</div><div className="text-[10px] text-white/35 leading-none">Properties</div></div>}
          <button onClick={(e) => { e.preventDefault(); setCollapsed(!collapsed); }}
            className={`hidden lg:flex p-1 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors ${collapsed ? 'mx-auto' : 'ml-auto'}`}>
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden ml-auto p-1.5 rounded-lg text-white/40 hover:text-white/70"><X className="w-4 h-4" /></button>
        </Link>

        {!collapsed && (
          <div className="px-4 py-3.5 border-b border-white/6 flex-shrink-0">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" alt="User" fill className="object-cover" unoptimized />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-white truncate leading-tight">Chidi Okafor</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <BadgeCheck className="w-3 h-3 text-purple-400 flex-shrink-0" />
                  <span className="text-[10px] text-purple-400 font-semibold">Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          {NAV_ITEMS.map(item => {
            const active = activeTab === item.value;
            return (
              <button key={item.value} onClick={() => { setActiveTab(item.value); setMobileOpen(false); }}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${collapsed ? 'justify-center' : ''}
                  ${active ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30' : 'text-white/45 hover:bg-white/5 hover:text-white/80'}`}
              >
                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                {!collapsed && <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{item.badge}</span>}
                </>}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-3 border-t border-white/6 flex-shrink-0 space-y-0.5">
          <Link href="/" className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:bg-white/5 hover:text-white/70 text-sm font-semibold transition-colors ${collapsed ? 'justify-center' : ''}`} title={collapsed ? 'View Website' : undefined}>
            <ExternalLink className="w-[18px] h-[18px] flex-shrink-0" />
            {!collapsed && <span>View Website</span>}
          </Link>
          <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 text-sm font-semibold transition-colors ${collapsed ? 'justify-center' : ''}`}>
            <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ══ Main column ══ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="h-16 flex items-center gap-4 px-4 lg:px-6 bg-white border-b border-gray-100 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"><Menu className="w-5 h-5" /></button>
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-gray-400">Dashboard</span>
            <span className="text-gray-200">/</span>
            <span className="text-gray-800 font-semibold capitalize">{activeTab.replace('-', ' ')}</span>
          </div>
          <div className="flex-1 max-w-sm hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input type="text" placeholder="Search properties, inquiries…" className="w-full pl-8 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-300 transition-colors" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setActiveTab('notifications')} className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />}
            </button>
            <Link href="/list-property" className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Property
            </Link>
            <div className="relative w-8 h-8 rounded-lg overflow-hidden ring-2 ring-purple-100 flex-shrink-0">
              <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" alt="User" fill className="object-cover" unoptimized />
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-7 mx-auto max-w-[1400px]">

            {/* ════ OVERVIEW ════ */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Good morning, Chidi</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Friday, May 16 &middot; Here&apos;s your property activity</p>
                  </div>
                  <Link href="/properties" className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:border-purple-300 hover:text-purple-700 transition-all">
                    Browse Properties <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.45 }} className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                  {STATS.map(s => (
                    <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-purple-100 hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                          <s.icon className={`w-[18px] h-[18px] ${s.color}`} />
                        </div>
                        <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${s.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                          {s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}{s.delta}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 leading-none mb-1">{s.value}</div>
                      <div className="text-xs text-gray-500">{s.label}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{s.sub}</div>
                    </div>
                  ))}
                </motion.div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-gray-900">Saved Properties</h2>
                      <button onClick={() => setActiveTab('saved')} className="text-sm text-purple-600 font-semibold flex items-center gap-1">View all <ChevronRight className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SAVED.map((p, i) => (
                        <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
                          <Link href={`/properties/${p.id}`} className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-purple-200 hover:shadow-md transition-all">
                            <div className="relative h-36 overflow-hidden">
                              <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                              <div className="absolute bottom-2.5 left-3 text-white font-bold text-base">{formatCurrency(p.price, p.currency)}</div>
                              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-[10px]">
                                <Eye className="w-3 h-3" />{p.views.toLocaleString()}
                              </div>
                            </div>
                            <div className="p-3.5">
                              <div className="font-semibold text-gray-800 text-sm truncate group-hover:text-purple-700 transition-colors">{p.title}</div>
                              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                <MapPin className="w-3 h-3 text-purple-400 flex-shrink-0" />{p.location.city}, {p.location.country}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                      <h2 className="font-bold text-gray-900">Activity</h2>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">{ACTIVITY.filter(a => a.unread).length} new</span>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {ACTIVITY.map(a => (
                        <div key={a.id} className={`flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors ${a.unread ? 'bg-purple-50/30' : ''}`}>
                          <div className={`w-7 h-7 rounded-lg ${a.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <a.icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className={`text-xs leading-snug ${a.unread ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>{a.text}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{a.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-5 py-3 border-t border-gray-50">
                      <button onClick={() => setActiveTab('notifications')} className="text-xs text-purple-600 font-semibold">View all activity</button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900">Recent Inquiries</h2>
                    <button onClick={() => setActiveTab('inquiries')} className="text-sm text-purple-600 font-semibold flex items-center gap-1">View all <ChevronRight className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {ALL_INQUIRIES.slice(0, 3).map(inq => (
                      <div key={inq.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="relative w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={inq.avatar} alt={inq.from} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900 text-sm">{inq.from}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${INQ_STATUS[inq.status]}`}>{inq.status}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5 truncate">{inq.property} &mdash; {inq.message}</div>
                        </div>
                        <div className="text-xs text-gray-400 flex-shrink-0">{inq.time}</div>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors flex-shrink-0">Reply</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-purple-700 to-purple-900 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative flex items-center justify-between gap-6 px-6 py-5">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5"><BrainCircuit className="w-4 h-4 text-amber-400" /><span className="font-bold text-amber-400 text-xs uppercase tracking-wider">AI-Powered</span></div>
                      <h3 className="font-display text-xl font-bold mb-1">3 New Properties Match Your Profile</h3>
                      <p className="text-white/60 text-sm">Lagos and Accra listings based on your search history.</p>
                    </div>
                    <Link href="/properties" className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-purple-900 font-bold text-sm hover:bg-purple-50 transition-colors">
                      View Matches <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* ════ MY LISTINGS ════ */}
            {activeTab === 'listings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">My Listings</h1>
                    <p className="text-gray-500 text-sm mt-0.5">{MY_LISTINGS.length} properties &middot; {MY_LISTINGS.filter(l => l.listingStatus === 'active').length} active</p>
                  </div>
                  <Link href="/list-property" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500 transition-colors">
                    <Plus className="w-3.5 h-3.5" /> New Listing
                  </Link>
                </div>

                {/* Filter */}
                <div className="flex gap-2 flex-wrap">
                  {['all', 'active', 'pending', 'sold'].map(f => (
                    <button key={f} onClick={() => setListFilter(f)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${listFilter === f ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-300'}`}>
                      {f === 'all' ? 'All' : f}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {filteredList.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-purple-100 hover:shadow-md transition-all">
                      <div className="flex gap-4 p-4">
                        <div className="relative w-28 h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{p.title}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 capitalize ${LISTING_STATUS[p.listingStatus]}`}>{p.listingStatus}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                            <MapPin className="w-3 h-3 text-purple-400" />{p.location.city}, {p.location.country}
                          </div>
                          <div className="font-bold text-purple-700 text-sm mb-3">{formatCurrency(p.price, p.currency)}</div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{p.listingViews.toLocaleString()} views</span>
                            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{p.listingInquiries} inquiries</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.daysListed}d listed</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-4 pb-4">
                        <Link href={`/properties/${p.id}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:border-purple-300 hover:text-purple-700 transition-all">
                          <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:border-purple-300 hover:text-purple-700 transition-all">
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ════ SAVED ════ */}
            {activeTab === 'saved' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Saved Properties</h1>
                    <p className="text-gray-500 text-sm mt-0.5">{SAVED.length} saved</p>
                  </div>
                  <Link href="/properties" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500 transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Browse More
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {SAVED.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                      <Link href={`/properties/${p.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all">
                        <div className="relative h-48 overflow-hidden">
                          <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-3 left-4 text-white font-bold text-lg">{formatCurrency(p.price, p.currency)}</div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1 group-hover:text-purple-700 transition-colors">{p.title}</h3>
                          <div className="flex items-center gap-1 text-xs text-gray-500"><MapPin className="w-3 h-3 text-purple-400" />{p.location.city}, {p.location.country}</div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ════ INQUIRIES ════ */}
            {activeTab === 'inquiries' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Inquiries</h1>
                    <p className="text-gray-500 text-sm mt-0.5">{ALL_INQUIRIES.length} total &middot; {ALL_INQUIRIES.filter(i => i.status === 'new').length} unread</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:block">Filter</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {['all', 'new', 'replied', 'closed'].map(f => (
                    <button key={f} onClick={() => setInqFilter(f)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${inqFilter === f ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-300'}`}>
                      {f === 'all' ? `All (${ALL_INQUIRIES.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${ALL_INQUIRIES.filter(i => i.status === f).length})`}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {filteredInq.map((inq, i) => (
                    <motion.div key={inq.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className={`bg-white rounded-2xl border transition-all ${inq.status === 'new' ? 'border-purple-100' : 'border-gray-100'} ${expandedInq === inq.id ? 'shadow-md' : 'hover:shadow-sm'}`}>
                      <div className="flex items-start gap-4 p-5 cursor-pointer" onClick={() => setExpandedInq(expandedInq === inq.id ? null : inq.id)}>
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={inq.avatar} alt={inq.from} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="font-bold text-gray-900 text-sm">{inq.from}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${INQ_STATUS[inq.status]}`}>{inq.status}</span>
                            {inq.status === 'new' && <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />}
                          </div>
                          <div className="text-xs text-purple-600 font-medium mb-1">{inq.property}</div>
                          <p className={`text-xs text-gray-500 ${expandedInq === inq.id ? '' : 'line-clamp-1'}`}>{inq.message}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-xs text-gray-400">{inq.time}</span>
                          <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform ${expandedInq === inq.id ? 'rotate-90' : ''}`} />
                        </div>
                      </div>

                      {expandedInq === inq.id && (
                        <div className="px-5 pb-5 pt-0 border-t border-gray-50">
                          <div className="bg-gray-50 rounded-xl p-4 mb-4 mt-3">
                            <p className="text-sm text-gray-700 leading-relaxed">{inq.message}</p>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-1 relative">
                              <input type="text" placeholder="Type your reply…" className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-300 transition-colors" />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500 transition-colors">
                              <Send className="w-3.5 h-3.5" /> Send
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ════ BOOKINGS ════ */}
            {activeTab === 'bookings' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Bookings</h1>
                    <p className="text-gray-500 text-sm mt-0.5">{BOOKINGS.filter(b => b.status === 'confirmed').length} confirmed &middot; {BOOKINGS.filter(b => b.status === 'pending').length} pending</p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {['all', 'confirmed', 'pending', 'cancelled'].map(f => (
                    <button key={f} onClick={() => setBookFilter(f)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${bookFilter === f ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-300'}`}>
                      {f === 'all' ? 'All' : f}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {filteredBook.map((b, i) => {
                    const s = BOOKING_STATUS[b.status];
                    return (
                      <motion.div key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                        className="bg-white rounded-2xl border border-gray-100 hover:border-purple-100 hover:shadow-sm transition-all">
                        <div className="flex items-center gap-4 p-5">
                          <div className="relative w-16 h-14 rounded-xl overflow-hidden flex-shrink-0">
                            <Image src={b.propImg} alt={b.property} fill className="object-cover" unoptimized />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{b.property}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 capitalize ${s.badge}`}>{b.status}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-purple-400" />{b.date} &middot; {b.time}</span>
                              <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-blue-400" />{b.type}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="flex items-center gap-2">
                              <div className="relative w-7 h-7 rounded-lg overflow-hidden">
                                <Image src={b.clientAvatar} alt={b.client} fill className="object-cover" unoptimized />
                              </div>
                              <span className="text-xs font-medium text-gray-700 hidden sm:block">{b.client}</span>
                            </div>
                            {b.status === 'pending' && (
                              <div className="flex gap-2">
                                <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">Confirm</button>
                                <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Decline</button>
                              </div>
                            )}
                            {b.status === 'confirmed' && (
                              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" /> Message
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ════ ANALYTICS ════ */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Last 6 months &middot; Dec 2024</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:border-purple-300 transition-all">
                    <Download className="w-3.5 h-3.5" /> Export
                  </button>
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                  {ANALYTICS_STATS.map(s => (
                    <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}><s.icon className={`w-[18px] h-[18px] ${s.color}`} /></div>
                        <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${s.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                          {s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}{s.delta}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 leading-none mb-1">{s.value}</div>
                      <div className="text-xs text-gray-500">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Views chart */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-bold text-gray-900">Property Views</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Monthly view count across all listings</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-0.5">
                        <ArrowUp className="w-3 h-3" /> 34%
                      </span>
                    </div>
                    <BarChart data={VIEWS_DATA} color="bg-purple-500" />
                    <div className="flex justify-between mt-2">
                      {ANALYTICS_MONTHS.map(m => <span key={m} className="text-[10px] text-gray-400 flex-1 text-center">{m}</span>)}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                      <span>Peak: <span className="font-bold text-gray-900">8,200</span> in Dec</span>
                      <span>Avg: <span className="font-bold text-gray-900">5,267</span>/month</span>
                    </div>
                  </div>

                  {/* Inquiries chart */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-bold text-gray-900">Inquiries</h3>
                        <p className="text-xs text-gray-400 mt-0.5">New inquiries received per month</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-0.5">
                        <ArrowUp className="w-3 h-3" /> 18%
                      </span>
                    </div>
                    <BarChart data={INQ_DATA} color="bg-blue-500" />
                    <div className="flex justify-between mt-2">
                      {ANALYTICS_MONTHS.map(m => <span key={m} className="text-[10px] text-gray-400 flex-1 text-center">{m}</span>)}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                      <span>Peak: <span className="font-bold text-gray-900">41</span> in Dec</span>
                      <span>Avg: <span className="font-bold text-gray-900">29</span>/month</span>
                    </div>
                  </div>
                </div>

                {/* Top listings table */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Top Performing Listings</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-50">
                          <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Property</th>
                          <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Views</th>
                          <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Inquiries</th>
                          <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Conv. Rate</th>
                          <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Trend</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {TOP_LISTINGS.map((l, i) => (
                          <tr key={l.title} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-gray-300 w-4">0{i + 1}</span>
                                <span className="text-sm font-semibold text-gray-800">{l.title}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right text-sm text-gray-700">{l.views.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right text-sm text-gray-700">{l.inquiries}</td>
                            <td className="px-6 py-4 text-right text-sm text-gray-700">{l.rate}</td>
                            <td className="px-6 py-4 text-right">
                              <span className={`text-xs font-bold ${l.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{l.trend}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Audience split */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Buyers', pct: 52, color: 'bg-purple-500', icon: Users },
                    { label: 'Investors', pct: 31, color: 'bg-blue-500', icon: TrendingUp },
                    { label: 'Renters', pct: 17, color: 'bg-emerald-500', icon: Home },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg ${s.color} bg-opacity-10 flex items-center justify-center`}>
                            <s.icon className={`w-4 h-4 text-gray-700`} />
                          </div>
                          <span className="text-sm font-semibold text-gray-800">{s.label}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{s.pct}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className={`${s.color} h-2 rounded-full transition-all`} style={{ width: `${s.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ════ PAYMENTS ════ */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Payments</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Billing history &middot; 2024</p>
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:border-purple-300 transition-all">
                    <Download className="w-3.5 h-3.5" /> Export CSV
                  </button>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Spent', value: '$789', sub: 'This year', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Active Listings', value: '3', sub: 'Premium slots', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Next Renewal', value: 'Jan 5', sub: 'Analytics Pro', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                        <s.icon className={`w-5 h-5 ${s.color}`} />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">{s.value}</div>
                        <div className="text-xs text-gray-500">{s.label}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{s.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Transaction table */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Transaction History</h3>
                    <Activity className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-50">
                          <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Transaction</th>
                          <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Type</th>
                          <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                          <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                          <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {PAYMENTS.map((p, i) => {
                          const ps = PAY_STATUS[p.status];
                          return (
                            <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="text-sm font-semibold text-gray-800 line-clamp-1">{p.description}</div>
                                <div className="text-xs text-gray-400 mt-0.5">{p.id}</div>
                              </td>
                              <td className="px-6 py-4 hidden sm:table-cell">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${PAY_TYPE_COLOR[p.type]}`}>{p.type}</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{p.date}</td>
                              <td className="px-6 py-4 text-right font-bold text-gray-900 text-sm">${p.amount}</td>
                              <td className="px-6 py-4 text-right">
                                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold ${ps.badge}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${ps.dot}`} />
                                  {p.status}
                                </span>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment methods */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Payment Method</h3>
                    <button className="text-sm text-purple-600 font-semibold">+ Add card</button>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-purple-200 bg-purple-50/40">
                    <div className="w-10 h-7 bg-gradient-to-br from-blue-600 to-blue-800 rounded-md flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-900">•••• •••• •••• 4242</div>
                      <div className="text-xs text-gray-500">Visa &middot; Expires 09/26</div>
                    </div>
                    <span className="text-xs text-purple-600 font-semibold bg-purple-100 px-2 py-0.5 rounded-full">Default</span>
                  </div>
                </div>
              </div>
            )}

            {/* ════ NOTIFICATIONS ════ */}
            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-gray-900">Notifications</h1>
                    <p className="text-gray-500 text-sm mt-0.5">{unreadCount} unread &middot; {notifications.length} total</p>
                  </div>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-sm text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {['all', 'inquiry', 'match', 'price', 'booking', 'system'].map(f => (
                    <button key={f} onClick={() => setNotifFilter(f)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${notifFilter === f ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-300'}`}>
                      {f === 'all' ? 'All' : f}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {filteredNotif.map((n, i) => (
                    <motion.div key={n.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className={`flex items-start gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm cursor-pointer
                        ${!n.read ? 'bg-white border-purple-100' : 'bg-white border-gray-100 opacity-70 hover:opacity-100'}`}
                      onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                    >
                      <div className={`w-9 h-9 rounded-xl ${n.color} flex items-center justify-center flex-shrink-0`}>
                        <n.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm ${!n.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{n.title}</p>
                          {!n.read && <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-1" />}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{n.text}</p>
                        <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{n.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ════ SETTINGS ════ */}
            {activeTab === 'settings' && (
              <div className="max-w-2xl mx-auto space-y-5">
                <h1 className="font-display text-2xl font-bold text-gray-900">Account Settings</h1>

                <div className="bg-white rounded-2xl border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900 mb-4">Profile Information</h2>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-purple-100">
                        <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" alt="Profile" fill className="object-cover" unoptimized />
                      </div>
                      <div>
                        <button className="px-4 py-2 rounded-xl border border-purple-200 text-purple-700 text-sm font-semibold hover:bg-purple-50 transition-colors">Change Photo</button>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG or WebP &middot; Max 2MB</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['First Name', 'Last Name', 'Email', 'Phone'].map(f => (
                        <div key={f}>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{f}</label>
                          <input type="text" placeholder={f} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:border-purple-400 transition-colors text-sm" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50/50 flex justify-end rounded-b-2xl">
                    <button className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-colors text-sm">Save Changes</button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h2 className="font-bold text-gray-900 mb-1">Notification Preferences</h2>
                  <p className="text-xs text-gray-400 mb-5">Choose what updates you want to receive.</p>
                  {['New property matches', 'Price alerts', 'Inquiry responses', 'Market insights', 'Newsletter'].map(item => (
                    <div key={item} className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-700">{item}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-200 peer-checked:bg-purple-600 rounded-full transition-colors" />
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
                      </label>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h2 className="font-bold text-gray-900 mb-1">Danger Zone</h2>
                  <p className="text-xs text-gray-400 mb-5">Irreversible actions — proceed with care.</p>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-red-100 bg-red-50/50">
                    <div>
                      <div className="text-sm font-semibold text-red-700">Delete Account</div>
                      <div className="text-xs text-red-500/70 mt-0.5">Permanently delete your account and all data</div>
                    </div>
                    <button className="px-4 py-2 rounded-xl border border-red-300 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors">Delete</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
