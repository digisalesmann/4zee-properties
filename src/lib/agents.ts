import type { Agent } from '@/types';
import { FEATURED_PROPERTIES } from './data';

const BASE_AGENTS = FEATURED_PROPERTIES
  .map(p => p.agent)
  .filter((a, i, arr) => arr.findIndex(x => x.id === a.id) === i);

const EXTRA_AGENTS: Agent[] = [
  {
    id: 'agent-006', name: 'Fatima Al-Rashid', title: 'North Africa Investment Specialist', agency: '4zee Morocco',
    avatar: 'https://images.unsplash.com/photo-1592621385612-4d7129426394?w=200&q=80',
    phone: '+212 6 1234 5678', email: 'fatima@4zee.com', whatsapp: '+2126123456789',
    rating: 4.9, reviews: 112, listings: 41, sold: 78, experience: 11,
    countries: ['Morocco', 'Tunisia', 'Algeria'], verified: true, languages: ['Arabic', 'French', 'English'],
    bio: 'Specialist in Moroccan luxury riad conversions and coastal properties.',
  },
  {
    id: 'agent-007', name: 'Emmanuel Nkrumah', title: 'West Africa Development Expert', agency: '4zee Ivory Coast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    phone: '+225 07 123 456', email: 'emmanuel@4zee.com', whatsapp: '+2250712345678',
    rating: 4.7, reviews: 63, listings: 19, sold: 41, experience: 6,
    countries: ['Ivory Coast', 'Senegal', 'Burkina Faso'], verified: true, languages: ['French', 'English', 'Twi'],
    bio: 'Connecting West African diaspora with prime investment properties.',
  },
  {
    id: 'agent-008', name: 'Priya Naidoo', title: 'Coastal & Resort Property Expert', agency: '4zee Cape Town',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
    phone: '+27 21 456 7890', email: 'priya@4zee.com', whatsapp: '+27214567890',
    rating: 4.8, reviews: 139, listings: 37, sold: 92, experience: 14,
    countries: ['South Africa', 'Mauritius', 'Seychelles'], verified: true, languages: ['English', 'Zulu', 'Afrikaans'],
    bio: 'Cape Town luxury specialist with expertise in coastal and wine estate properties.',
  },
];

export const ALL_AGENTS: Agent[] = [...BASE_AGENTS, ...EXTRA_AGENTS];
