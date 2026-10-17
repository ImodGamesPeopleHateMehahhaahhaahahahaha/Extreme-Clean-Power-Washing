import { UserAccount, QuoteRecord, CleaningService, EmployeeAccount } from '../types';
import { SERVICES } from '../data/servicesData';

const STORAGE_KEYS = {
  CURRENT_USER: 'extreme_clean_current_user',
  QUOTES: 'extreme_clean_quotes_v1',
  SERVICES: 'extreme_clean_services_v1',
  EMPLOYEES: 'extreme_clean_employees_v2'
};

export const INITIAL_QUOTES: QuoteRecord[] = [
  {
    id: 'quote-101',
    createdAt: '2026-10-16T14:30:00.000Z',
    fullName: 'David & Maria Sanchez',
    phone: '(210) 456-7890',
    email: 'david.sanchez@gmail.com',
    address: '14202 Stone Oak Pkwy',
    zipCode: '78258',
    selectedServices: ['Driveways & Walkways', 'Trash Cans & Bins'],
    serviceSizes: {
      'Driveways & Walkways': '2-Car Driveway (Standard)',
      'Trash Cans & Bins': '2 Cans (Standard Household Set)'
    },
    propertyType: 'residential',
    jobSize: 'Standard 2-Car Driveway + 2 Cans',
    urgency: 'this_week',
    notes: 'Dark live oak tree tannin stains and black mildew on driveway. Trash cans have strong Texas summer odor.',
    photos: [
      {
        id: 'p-1',
        name: 'driveway_stone_oak.jpg',
        dataUrl: '/src/assets/images/service_driveway_walkway_1792255999162.jpg',
        sizeKb: 340
      }
    ],
    status: 'scheduled',
    estimatedMin: 144,
    estimatedMax: 189,
    finalQuoteAmount: 165,
    assignedTo: 'Robert Thompson',
    scheduledDate: '2026-10-19 at 9:00 AM',
    internalNotes: 'Client confirmed water hookup on side of garage. Pre-treat with organic degreaser.'
  },
  {
    id: 'quote-102',
    createdAt: '2026-10-17T08:15:00.000Z',
    fullName: 'Sarah Jenkins',
    phone: '(210) 882-1923',
    email: 'sarah.j.helotes@yahoo.com',
    address: '9840 Bandera Rd',
    zipCode: '78023',
    selectedServices: ['Fences (Wood & Vinyl)'],
    serviceSizes: {
      'Fences (Wood & Vinyl)': 'Medium Backyard (50 – 100 linear ft)'
    },
    propertyType: 'residential',
    jobSize: 'Approx 80 linear ft cedar fence',
    urgency: 'next_two_weeks',
    notes: 'Weathered grey cedar privacy fence. We are planning to stain it next month.',
    photos: [
      {
        id: 'p-2',
        name: 'back_fence.jpg',
        dataUrl: '/src/assets/images/service_fence_cleaning_1792256000201.jpg',
        sizeKb: 410
      }
    ],
    status: 'reviewing',
    estimatedMin: 150,
    estimatedMax: 210,
    assignedTo: 'Robert Thompson',
    internalNotes: 'Satellite aerial reviewed. Easy gate access. Quoted standard wood restoration formula.'
  },
  {
    id: 'quote-103',
    createdAt: '2026-10-17T09:40:00.000Z',
    fullName: 'Carlos Ramirez',
    phone: '(210) 745-9011',
    email: 'carlostx@gmail.com',
    address: '24110 Timberwood Dr',
    zipCode: '78260',
    selectedServices: ['Outside House Walls / Siding', 'Porches & Decks'],
    serviceSizes: {
      'Outside House Walls / Siding': '2-Story Home (2,000 – 3,000 sq ft)',
      'Porches & Decks': 'Standard Patio or Deck (150 – 350 sq ft)'
    },
    propertyType: 'residential',
    jobSize: '2,600 sq ft home with back covered porch',
    urgency: 'asap',
    notes: 'HOA sent notice regarding green algae on north brick siding. Need emergency cleaning by Friday.',
    photos: [
      {
        id: 'p-3',
        name: 'north_wall_brick.jpg',
        dataUrl: '/src/assets/images/service_house_siding_1792256000115.jpg',
        sizeKb: 520
      }
    ],
    status: 'pending',
    estimatedMin: 364,
    estimatedMax: 508,
    assignedTo: 'Unassigned',
    internalNotes: 'HOA deadline urgency. Needs same-week soft wash slot.'
  },
  {
    id: 'quote-104',
    createdAt: '2026-10-15T11:00:00.000Z',
    fullName: 'Alamo Heights Bistro (Commercial)',
    phone: '(210) 555-0144',
    email: 'manager@alamobistro.com',
    address: '5920 Broadway St',
    zipCode: '78209',
    selectedServices: ['Driveways & Walkways', 'Trash Cans & Bins'],
    serviceSizes: {
      'Driveways & Walkways': 'Circular / Oversized Driveway + Sidewalks',
      'Trash Cans & Bins': 'Commercial Dumpster / 5+ Bins'
    },
    propertyType: 'commercial',
    jobSize: 'Restaurant front entry walkway & dumpster pad',
    urgency: 'this_week',
    notes: 'Commercial grease dumpster pad cleaning and exterior entrance sidewalk degreasing.',
    photos: [],
    status: 'completed',
    estimatedMin: 310,
    estimatedMax: 459,
    finalQuoteAmount: 385,
    assignedTo: 'Robert Thompson',
    scheduledDate: '2026-10-16 at 6:30 AM',
    internalNotes: 'Completed before store opening. Hot water degreaser applied. Customer signed off 5 stars.'
  }
];

// Quotes Store
export const getStoredQuotes = (): QuoteRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUOTES);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed reading quotes from storage', e);
  }
  // Initialize with seed data
  localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(INITIAL_QUOTES));
  return INITIAL_QUOTES;
};

export const saveQuotes = (quotes: QuoteRecord[]) => {
  localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
};

export const addQuoteRecord = (quote: Omit<QuoteRecord, 'id' | 'createdAt' | 'status'>): QuoteRecord => {
  const currentQuotes = getStoredQuotes();
  const newRecord: QuoteRecord = {
    ...quote,
    id: `quote-${Date.now().toString().slice(-5)}`,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  const updated = [newRecord, ...currentQuotes];
  saveQuotes(updated);
  return newRecord;
};

export const updateQuoteStatus = (
  id: string,
  updates: Partial<QuoteRecord>
): QuoteRecord[] => {
  const currentQuotes = getStoredQuotes();
  const updated = currentQuotes.map((q) => (q.id === id ? { ...q, ...updates } : q));
  saveQuotes(updated);
  return updated;
};

export const deleteQuoteRecord = (id: string): QuoteRecord[] => {
  const currentQuotes = getStoredQuotes();
  const updated = currentQuotes.filter((q) => q.id !== id);
  saveQuotes(updated);
  return updated;
};

// ==========================================
// EMPLOYEES STORE (Starts with NO employees as requested)
// ==========================================
export const getStoredEmployees = (): EmployeeAccount[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed reading employees from storage', e);
  }
  // No existing employees by default
  return [];
};

export const saveEmployees = (employees: EmployeeAccount[]) => {
  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
};

export const addEmployee = (data: {
  name: string;
  username: string;
  password: string;
  phone: string;
  email?: string;
}): EmployeeAccount => {
  const employees = getStoredEmployees();
  const newEmployee: EmployeeAccount = {
    id: `emp-${Date.now().toString().slice(-6)}`,
    name: data.name.trim(),
    username: data.username.trim(),
    password: data.password.trim(),
    phone: data.phone.trim(),
    email: data.email?.trim() || `${data.username.trim().toLowerCase()}@extremeclean.com`,
    role: 'employee',
    active: true,
    createdAt: new Date().toISOString()
  };
  const updated = [newEmployee, ...employees];
  saveEmployees(updated);
  return newEmployee;
};

export const updateEmployee = (
  id: string,
  updates: Partial<EmployeeAccount>
): EmployeeAccount[] => {
  const employees = getStoredEmployees();
  const updated = employees.map((emp) => (emp.id === id ? { ...emp, ...updates } : emp));
  saveEmployees(updated);
  return updated;
};

export const deleteEmployee = (id: string): EmployeeAccount[] => {
  const employees = getStoredEmployees();
  const updated = employees.filter((emp) => emp.id !== id);
  saveEmployees(updated);
  return updated;
};

export const updateEmployeePassword = (id: string, newPassword: string): boolean => {
  const employees = getStoredEmployees();
  let found = false;
  const updated = employees.map((emp) => {
    if (emp.id === id) {
      found = true;
      return { ...emp, password: newPassword.trim() };
    }
    return emp;
  });
  if (found) {
    saveEmployees(updated);
  }
  return found;
};

export const verifyEmployeeLogin = (
  username: string,
  password: string
): EmployeeAccount | null => {
  const employees = getStoredEmployees();
  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  const found = employees.find(
    (emp) => emp.username.toLowerCase() === cleanUser && emp.password === cleanPass && emp.active
  );
  return found || null;
};

// Listings / Services store
export const getStoredServices = (): CleaningService[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed reading services', e);
  }
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(SERVICES));
  return SERVICES;
};

export const saveServices = (services: CleaningService[]) => {
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
};

// Current authenticated user session
export const getStoredUser = (): UserAccount | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed reading user', e);
  }
  return null;
};

export const setStoredUser = (user: UserAccount | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};
