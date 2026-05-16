export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'villa' | 'commercial' | 'land' | 'penthouse' | 'estate' | 'office';
  status: 'for-sale' | 'for-rent' | 'for-lease' | 'sold' | 'off-plan';
  price: number;
  currency: string;
  bedrooms?: number;
  bathrooms?: number;
  size: number;
  sizeUnit: 'sqm' | 'sqft' | 'acres' | 'hectares';
  location: {
    address: string;
    city: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  images: string[];
  amenities: string[];
  agent: Agent;
  featured: boolean;
  luxury: boolean;
  yearBuilt?: number;
  floors?: number;
  parking?: number;
  tags: string[];
  views: number;
  savedCount: number;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  agency: string;
  avatar: string;
  phone: string;
  email: string;
  whatsapp: string;
  rating: number;
  reviews: number;
  listings: number;
  sold: number;
  experience: number;
  countries: string[];
  verified: boolean;
  languages: string[];
  bio: string;
}

export interface SearchFilters {
  location: string;
  type: string;
  status: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  minSize: number;
  maxSize: number;
}

export interface AfricanCountry {
  name: string;
  code: string;
  flag: string;
  properties: number;
  agents: number;
  avgPrice: string;
  currency: string;
  growth: string;
  featured: boolean;
  coordinates: { lat: number; lng: number };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  country: string;
  propertyType: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
}

export interface Partner {
  name: string;
  logo: string;
  type: string;
}

export interface InfrastructureProject {
  id: string;
  title: string;
  location: string;
  country: string;
  type: string;
  value: string;
  status: string;
  completion: string;
  image: string;
  description: string;
}
