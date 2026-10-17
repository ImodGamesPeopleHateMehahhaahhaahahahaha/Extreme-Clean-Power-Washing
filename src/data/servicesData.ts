import { CleaningService, Testimonial, FaqItem } from '../types';

export const BUSINESS_INFO = {
  name: 'Extreme Clean Power Washing',
  owner: 'Robert Thompson',
  age: 16,
  title: '16-Year-Old Student Operator',
  phone: '(210) 326-6306',
  rawPhone: '2103266306',
  email: 'thehelper171@gmail.com',
  serviceArea: 'San Antonio, Texas & surrounding neighborhoods',
  hours: 'After School & Weekends: 7:00 AM – 7:00 PM',
  sundayHours: 'Sunday: Flexible Hours',
  licenseStatus: 'Not an official business • Not insured whatsoever (16-year-old student)',
  isOfficialBusiness: false,
  isInsured: false,
  youthDisclaimer:
    'Extreme Clean is an informal neighborhood service operated by Robert Thompson, a 16-year-old student earning extra money. This is NOT an official registered company or LLC, and Robert is NOT insured whatsoever. Every job is done with extreme care and respect for your property, but please be aware of this upfront before booking.',
  googleRating: 4.9,
  googleReviewCount: 78,
  googleReviewUrl: 'https://maps.google.com/?q=Extreme+Clean+Power+Washing+San+Antonio+TX',
  coverageLocations: [
    'San Antonio',
    'Alamo Heights',
    'Stone Oak',
    'Helotes',
    'Boerne',
    'Schertz',
    'Cibolo',
    'New Braunfels',
    'Timberwood Park',
    'Bulverde',
    'Leon Valley',
    'Converse',
    'Live Oak',
    'Selma',
    'Universal City',
    'Castroville',
    'Shavano Park',
    'Dominion'
  ],
  sanAntonioZipMap: {
    '78258': 'Stone Oak / Sonterra',
    '78209': 'Alamo Heights / Terrell Hills',
    '78249': 'UTSA / Northwest San Antonio',
    '78255': 'Dominion / Crownridge',
    '78256': 'La Cantera / Rim Area',
    '78257': 'Dominion / Forest Crest',
    '78259': 'Timberwood Park / Encino Park',
    '78260': 'Canyon Springs / 281 North',
    '78261': 'TPC Parkway / JW Marriott Area',
    '78254': 'Helotes / Northwest Loop 1604',
    '78253': 'Alamo Ranch / Westover Hills',
    '78251': 'Westover Hills / Potranco',
    '78250': 'Braun Station / Culebra',
    '78248': 'Inwood / Deerfield',
    '78232': 'Hill Country Village / Hollywood Park',
    '78247': 'Northern Hills / Thousand Oaks',
    '78216': 'North Central / San Pedro',
    '78217': 'Oak Grove / MacArthur',
    '78213': 'Castle Hills / Blanco',
    '78230': 'Vance Jackson / Colonies',
    '78240': 'Medical Center / Babcock',
    '78229': 'South Texas Medical Center',
    '78201': 'Monticello Park / Jefferson',
    '78212': 'Monte Vista / Olmos Park',
    '78218': 'Northwood / Eisenhauer',
    '78233': 'Live Oak / Nacogdoches',
    '78239': 'Windcrest / Walzem',
    '78244': 'Woodlake / Kirby',
    '78245': 'Westchase / Marbach',
    '78006': 'Boerne / Kendall County',
    '78015': 'Fair Oaks Ranch / I-10 West',
    '78154': 'Schertz / FM 3009',
    '78108': 'Cibolo / Steele Area',
    '78130': 'New Braunfels / Gruene',
    '78132': 'Canyon Lake / North New Braunfels',
    '78023': 'Helotes / Bandera Road',
    '78231': 'Shavano Park / Bitters',
    '78210': 'Highland Park / Brooks City Base',
    '78228': 'St. Mary\'s University Area'
  } as Record<string, string>
};

export const SERVICES: CleaningService[] = [
  {
    id: 'trash-cans-bins',
    name: 'Trash Cans & Bins',
    tagline: 'Deep Sanitization & Texas Heat Odor Removal',
    category: 'residential',
    description:
      'Eliminate foul odors, stubborn grime, Texas heat bacteria, and maggots with high-pressure hot washing and eco-friendly deodorizing scrub.',
    highlights: [
      'High-pressure hot sanitizing spray',
      'Removes built-up gunk, grime & odors',
      'Fresh citrus deodorizer finish',
      'One-time clean or regular monthly visit'
    ],
    image: '/src/assets/images/service_trash_bins_1792256000221.jpg',
    startingPrice: 'From $25',
    baseMinPrice: 20,
    baseMaxPrice: 40,
    sizeOptions: [
      { label: '1 Can (Trash or Recycle)', minPrice: 20, maxPrice: 25 },
      { label: '2 Cans (Standard Household Set)', minPrice: 30, maxPrice: 40 },
      { label: '3–4 Cans (Family / Yard Waste)', minPrice: 50, maxPrice: 65 },
      { label: '5+ Cans (Large Property / Multiple)', minPrice: 75, maxPrice: 110 }
    ],
    typicalTime: '20–30 mins',
    recommendedFrequency: 'Monthly or Bi-Monthly',
    popular: true
  },
  {
    id: 'driveways-walkways',
    name: 'Driveways & Walkways',
    tagline: 'Even Rotary Surface Cleaning Without Striping',
    category: 'residential',
    description:
      'Restore the brightness of your concrete, pavers, and front walkways. Rotary scrubbers remove tire marks, black mold, mildew, and Texas red dirt.',
    highlights: [
      'Circular rotary surface cleaner (no ugly wand zebra striping)',
      'Pre-treatment stain lifter for stubborn oil spots',
      'Curb, sidewalk & expansion joint clearing',
      'Thorough post-wash clean water rinse'
    ],
    image: '/src/assets/images/service_driveway_walkway_1792255999162.jpg',
    startingPrice: 'From $79',
    baseMinPrice: 65,
    baseMaxPrice: 130,
    sizeOptions: [
      { label: '1-Car Driveway / Short Pad', minPrice: 65, maxPrice: 95 },
      { label: '2-Car Driveway (Standard)', minPrice: 95, maxPrice: 140 },
      { label: '3-Car Driveway (Large)', minPrice: 130, maxPrice: 195 },
      { label: 'Long Driveway + Front Sidewalks', minPrice: 180, maxPrice: 260 }
    ],
    typicalTime: '1–2 hours',
    recommendedFrequency: 'Every 6–12 Months',
    popular: true
  },
  {
    id: 'fences-wood-vinyl',
    name: 'Fences (Wood & Vinyl)',
    tagline: 'Gentle Wood Restoration & Algae Removal',
    category: 'residential',
    description:
      'Strip away weathered grey wood oxidation and green algae without gouging the grain. Brings back warm cedar tones or crisp vinyl brightness.',
    highlights: [
      'Controlled pressure to avoid splintering cedar or pine',
      'Safely strips away years of weather damage & mold',
      'Prepares wood surface for staining or sealant',
      'Safe on nearby grass, plants, and gardens'
    ],
    image: '/src/assets/images/service_fence_cleaning_1792256000201.jpg',
    startingPrice: 'From $99',
    baseMinPrice: 85,
    baseMaxPrice: 160,
    sizeOptions: [
      { label: 'Small Section / Gate Area (<50 linear ft)', minPrice: 85, maxPrice: 120 },
      { label: 'Medium Backyard (50 – 100 linear ft)', minPrice: 120, maxPrice: 180 },
      { label: 'Large Backyard (100 – 200 linear ft)', minPrice: 180, maxPrice: 280 },
      { label: 'Full Perimeter Property Fence (200+ ft)', minPrice: 280, maxPrice: 420 }
    ],
    typicalTime: '2–3 hours',
    recommendedFrequency: 'Every 1–2 Years',
    popular: false
  },
  {
    id: 'house-walls-siding',
    name: 'Outside House Walls / Siding',
    tagline: 'Low-Pressure Gentle Wash for Brick, Stucco & Siding',
    category: 'residential',
    description:
      'Gently wash away green algae, bug webs, and dirt buildup using safe low pressure so siding, stucco, paint, and window seals stay completely undamaged.',
    highlights: [
      'Low-pressure gentle spray (will not damage paint or siding)',
      'Removes green mildew, dirt, cobwebs & wasp nests',
      'Protective fresh water soak for flowers and landscaping',
      'Affordable neighborhood student rates'
    ],
    image: '/src/assets/images/service_house_siding_1792256000115.jpg',
    startingPrice: 'From $149',
    baseMinPrice: 120,
    baseMaxPrice: 220,
    sizeOptions: [
      { label: 'Single-Story House (<1,800 sq ft)', minPrice: 120, maxPrice: 180 },
      { label: '1.5 – 2 Story Home (1,800 – 2,500 sq ft)', minPrice: 170, maxPrice: 240 },
      { label: '2-Story Large Home (2,500 – 3,500 sq ft)', minPrice: 230, maxPrice: 320 },
      { label: 'Single Wall / North Side Only Wash', minPrice: 75, maxPrice: 110 }
    ],
    typicalTime: '2–3 hours',
    recommendedFrequency: 'Once Every 12–18 Months',
    popular: true
  },
  {
    id: 'porches-decks',
    name: 'Porches & Decks',
    tagline: 'Outdoor Living Spaces & Patio Stone Cleaning',
    category: 'residential',
    description:
      'Revitalize front entry porches, covered back patios, flagstone, pavers, and wooden decks for family BBQs and weekend outdoor relaxing.',
    highlights: [
      'Cleans limestone, stamped concrete, pavers, and timber',
      'Removes slippery moss, barbecue grease & mud dauber nests',
      'Gentle patio furniture moving assistance',
      'Curb appeal boost for family gatherings'
    ],
    image: '/src/assets/images/service_porch_deck_1792256024976.jpg',
    startingPrice: 'From $69',
    baseMinPrice: 55,
    baseMaxPrice: 110,
    sizeOptions: [
      { label: 'Front Porch / Entryway Step Area', minPrice: 55, maxPrice: 75 },
      { label: 'Standard Patio or Deck (150 – 350 sq ft)', minPrice: 85, maxPrice: 130 },
      { label: 'Large Covered Patio (350 – 600 sq ft)', minPrice: 130, maxPrice: 195 },
      { label: 'Wraparound Deck or Large Stone Terrace', minPrice: 190, maxPrice: 290 }
    ],
    typicalTime: '1–2 hours',
    recommendedFrequency: 'Twice a Year (Spring & Fall)',
    popular: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'David & Maria Sanchez',
    neighborhood: 'Stone Oak',
    city: 'San Antonio, TX',
    rating: 5,
    service: 'Driveway & Trash Bins',
    reviewText:
      'Robert is a polite, hardworking 16-year-old who did an incredible job on our driveway and trash cans! He was totally honest that he is a student working to make extra money and not an insured business. His work was meticulous, he cleaned up everything, and our driveway looks brand new. We will definitely hire him again!',
    date: '1 week ago',
    verified: true
  },
  {
    id: 't-2',
    clientName: 'Mark Henderson',
    neighborhood: 'Alamo Heights',
    city: 'San Antonio, TX',
    rating: 5,
    service: 'Trash Can Sanitizing',
    reviewText:
      'With the Texas summer heat our trash bins smelled unbearable. Robert came out on a Saturday morning, sanitized them inside and out, and left them smelling like citrus. Love supporting a young guy with great work ethic. Highly recommend Robert!',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 't-3',
    clientName: 'Sarah Jenkins',
    neighborhood: 'Helotes',
    city: 'San Antonio, TX',
    rating: 5,
    service: 'Cedar Wood Fence Cleaning',
    reviewText:
      'Our back fence had turned weathered grey over several years. Robert spent hours carefully washing it and restored the natural wood color. He is very respectful, punctual, and upfront about his student setup. Great prices and great attitude.',
    date: '3 weeks ago',
    verified: true
  },
  {
    id: 't-4',
    clientName: 'Carlos Ramirez',
    neighborhood: 'Timberwood Park',
    city: 'San Antonio, TX',
    rating: 5,
    service: 'Patio & Driveway Cleaning',
    reviewText:
      'Really impressed with Robert. He is 16 and works harder than many adult contractors I have hired. Upfront pricing, no hidden fees, and he treats your yard with real care. Glad to support a local young entrepreneur.',
    date: '1 month ago',
    verified: true
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-0',
    category: 'methods',
    question: 'Are you an official business or insured?',
    answer:
      'No. To be 100% upfront and honest: I am a 16-year-old high school student in San Antonio doing pressure washing to make some extra money. Extreme Clean is NOT an official company or LLC, and I am NOT insured whatsoever. I treat every homeowner\'s property with extreme care, respect, and caution as if it were my own family\'s house, but please keep this uninsured status in mind when hiring me!'
  },
  {
    id: 'faq-1',
    category: 'preparation',
    question: 'How old are you and why did you start this?',
    answer:
      'I am 16 years old and attend high school right here in San Antonio. I wanted to work hard, earn my own money, save up, and provide affordable, reliable cleaning for neighbors who need their driveways, trash bins, or fences washed without paying crazy corporate contractor prices.'
  },
  {
    id: 'faq-2',
    category: 'preparation',
    question: 'Do I need to be home when you wash?',
    answer:
      'No, you do not need to be home as long as I have access to an outdoor water spigot, gates are unlocked, and exterior windows are closed. I will do the work, text you before-and-after photos of the finished job, and you can send payment electronically once you confirm you are satisfied!'
  },
  {
    id: 'faq-3',
    category: 'methods',
    question: 'Will high pressure damage my wood fence or house siding?',
    answer:
      'No! I know the difference between hard concrete and delicate surfaces. High pressure is only used on concrete and stone. For wood fences and house siding, I dial down the pressure and use gentle cleaning methods so wood fibers do not get gouged, paint does not peel, and window seals stay safe.'
  },
  {
    id: 'faq-4',
    category: 'pricing',
    question: 'What payment methods do you accept?',
    answer:
      'I accept Cash, Venmo, Zelle, or a personal check. Payment is only expected after I finish the job and you are 100% happy with how clean everything looks.'
  },
  {
    id: 'faq-5',
    category: 'methods',
    question: 'What is the difference between pressure washing and soft washing?',
    answer:
      'Pressure washing uses strong water pressure for durable surfaces like concrete driveways and stone pavers. Gentle soft washing uses low pressure with safe soap cleaners to wash away dirt and algae from delicate surfaces like vinyl siding, stucco, and wood without causing surface erosion.'
  },
  {
    id: 'faq-6',
    category: 'equipment',
    question: 'Will your cleaning harm my lawn, plants, or pets?',
    answer:
      'No. I take special care to spray down and rinse all surrounding grass, shrubs, and flowerbeds with fresh clean water before and after washing so your yard and pets stay completely safe.'
  },
  {
    id: 'faq-7',
    category: 'pricing',
    question: 'How do your free estimates work?',
    answer:
      'Just snap a photo of your dirty driveway, trash cans, or fence and text it to me at (210) 326-6306 or use the quote form on this page. Because I have low overhead, I can give you a quick, honest, flat-rate price within a few hours.'
  },
  {
    id: 'faq-8',
    category: 'methods',
    question: 'Why should I clean my curbside trash cans?',
    answer:
      'Texas heat makes trash and recycling cans smell awful and attract flies and maggots. A hot, high-pressure sanitizing wash cleans out the sticky grime, kills odor-causing bacteria, and leaves them fresh with a clean citrus scent.'
  }
];
