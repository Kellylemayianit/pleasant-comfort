/* ============================================================
   services/mockData.js
   Seed data for the prototype. Delete this file once a real
   backend (D1 or otherwise) is wired up — dataLoader.js is the
   only surface other code should import from, so swapping the
   data source later never touches pages/ or components/.
   ============================================================ */

export const PROPERTY = {
  name: 'Pleasant Comfort Guest House',
  location: 'Kimana, Kajiado County, Kenya',
  tagline: 'A quiet, home-run guest house on the road into Amboseli.',
  about: [
    "Pleasant Comfort sits in Kimana town, a short stretch off the road that leads down to Amboseli National Park. It's a small, family-run guest house — not a lodge, not a chain — with rooms kept simple and clean and a gated compound for your car overnight.",
    "We're often the stopover for travellers breaking up the drive to Amboseli, and for visiting family passing through Kimana. Reception is staffed around the clock, so a late arrival is never a problem — just let us know on WhatsApp."
  ],
  distances: [
    { label: 'Amboseli National Park', value: '≈ 45 km' },
    { label: 'Amboseli Airport', value: '≈ 47 km' },
    { label: 'Kimana town centre', value: '2 min walk' }
  ],
  contact: {
    phoneDisplay: '+254 725 153 212',
    phoneIntl: '254725153212',
    email: 'verombuthia2002@gmail.com',
    mapsUrl: 'https://maps.app.goo.gl/AjZtxRWPWX1T9MDk8',
    hours: 'Front desk staffed 24 hours'
  },
  policies: [
    'Check-in from 2:00 PM · Check-out by 12:00 PM',
    'Primary guest must be 18 or older',
    'No smoking in rooms or shared areas',
    'Cashless payment accepted'
  ]
};

export const FEATURES = [
  { icon: 'wifi', label: 'Free WiFi' },
  { icon: 'parking', label: 'Secure gated parking' },
  { icon: 'shield', label: '24-hour front desk' },
  { icon: 'globe', label: 'English & Kiswahili' }
];

export const ROOMS = [
  {
    id: 'standard-single',
    name: 'Standard Single Room',
    type: 'Single occupancy',
    price: 2500,
    size: '≈ 21 m²',
    description: 'A tidy single room with a private en-suite bathroom — the straightforward pick for one traveller passing through.',
    amenities: ['Free WiFi', 'Private bathroom', 'Free toiletries', 'TV'],
    icon: 'bed'
  },
  {
    id: 'standard-double',
    name: 'Standard Double Room',
    type: 'Couples / 2 guests',
    price: 3500,
    size: '≈ 24 m²',
    description: 'One double bed, a private bathroom, and a little more room to unpack — good for couples or two guests travelling together.',
    amenities: ['Free WiFi', 'Private bathroom', 'Free toiletries', 'TV'],
    icon: 'bedDouble'
  },
  {
    id: 'family-twin',
    name: 'Family / Twin Room',
    type: 'Up to 4 guests',
    price: 5000,
    size: '≈ 28 m²',
    description: 'Twin beds and extra floor space for families or small groups splitting a stopover on the way to or from the park.',
    amenities: ['Free WiFi', 'Private bathroom', 'Free toiletries', 'TV', 'Extra bedding on request'],
    icon: 'home'
  }
];

export const ADD_ONS = [
  'Airport / matatu-stage pick-up and drop-off (extra charge, arrange in advance)',
  'Laundry and ironing (extra charge)',
  'Hair & beauty salon on site'
];

export const EVENT_ENQUIRIES = [
  {
    id: 'conference',
    title: 'Meeting space enquiry',
    icon: 'megaphone',
    description: 'Planning a small meeting or training session passing through Kimana? Ask us about space, seating, and tea-break arrangements.',
    features: ['Seating arranged to fit your group', 'Tea & light refreshments', 'WiFi available']
  },
  {
    id: 'event',
    title: 'Group / celebration enquiry',
    icon: 'sparkles',
    description: "Travelling as a group, or marking an occasion on the way to Amboseli? Tell us your numbers and dates and we'll see what we can put together.",
    features: ['Group room blocks', 'Flexible check-in for late arrivals', 'Local recommendations for catering']
  }
];
