export type UserRole = 'admin' | 'employee' | 'customer';

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
}

export interface EmployeeAccount {
  id: string;
  name: string;
  username: string;
  password: string;
  phone: string;
  email?: string;
  role: 'employee';
  active: boolean;
  createdAt: string;
}

export interface CleaningService {
  id: string;
  name: string;
  tagline: string;
  category: 'residential' | 'commercial' | 'both';
  description: string;
  highlights: string[];
  image: string;
  startingPrice: string;
  baseMinPrice: number;
  baseMaxPrice: number;
  sizeOptions: { label: string; minPrice: number; maxPrice: number }[];
  typicalTime: string;
  recommendedFrequency: string;
  popular?: boolean;
  active?: boolean;
}

export interface UploadedPhoto {
  id: string;
  name: string;
  dataUrl: string;
  sizeKb: number;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  zipCode: string;
  selectedServices: string[];
  serviceSizes: Record<string, string>;
  propertyType: 'residential' | 'commercial';
  jobSize: string;
  urgency: 'asap' | 'this_week' | 'next_two_weeks' | 'just_pricing';
  notes: string;
  photos: UploadedPhoto[];
}

export type QuoteStatus = 'pending' | 'reviewing' | 'scheduled' | 'completed' | 'declined';

export interface QuoteRecord extends QuoteFormData {
  id: string;
  createdAt: string;
  status: QuoteStatus;
  estimatedMin: number;
  estimatedMax: number;
  assignedTo?: string;
  scheduledDate?: string;
  finalQuoteAmount?: number;
  internalNotes?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  neighborhood: string;
  city: string;
  rating: number;
  service: string;
  reviewText: string;
  date: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'methods' | 'pricing' | 'preparation' | 'equipment';
}
