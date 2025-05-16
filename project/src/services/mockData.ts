export interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'house' | 'villa' | 'commercial';
  district: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  features: string[];
  description: string;
  imageUrl: string;
}

export interface District {
  id: string;
  name: string;
  averagePrice: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

export interface PriceTrend {
  date: string;
  price: number;
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment in Botanica',
    type: 'apartment',
    district: 'Botanica',
    price: 65000,
    area: 75,
    bedrooms: 2,
    bathrooms: 1,
    yearBuilt: 2020,
    features: ['Parking', 'Elevator', 'Security'],
    description: 'Beautiful modern apartment with great views',
    imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
  },
  {
    id: '2',
    title: 'Luxury Villa in Telecentru',
    type: 'villa',
    district: 'Telecentru',
    price: 250000,
    area: 200,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2022,
    features: ['Pool', 'Garden', 'Garage', 'Security System'],
    description: 'Exclusive villa with premium finishes',
    imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
  },
  // Add more mock properties...
];

export const mockDistricts: District[] = [
  {
    id: '1',
    name: 'Botanica',
    averagePrice: 1000,
    trend: 'up',
    description: 'Popular residential area with good infrastructure'
  },
  {
    id: '2',
    name: 'Centru',
    averagePrice: 1500,
    trend: 'up',
    description: 'Central district with historical architecture'
  },
  // Add more districts...
];

export const mockPriceTrends: PriceTrend[] = [
  { date: '2024-01', price: 950 },
  { date: '2024-02', price: 975 },
  { date: '2024-03', price: 1000 },
  { date: '2024-04', price: 1025 },
  { date: '2024-05', price: 1050 },
];

export const mockPredictions = {
  current: 1050,
  sixMonths: 1150,
  twelveMonths: 1250,
  confidence: 0.85
};