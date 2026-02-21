import { City, Destination, Hotel, Colors } from '../types';

export const CITIES: City[] = [
  { id: 1, name: 'New York', country: 'USA', code: 'JFK' },
  { id: 2, name: 'London', country: 'UK', code: 'LHR' },
  { id: 3, name: 'Paris', country: 'France', code: 'CDG' },
  { id: 4, name: 'Tokyo', country: 'Japan', code: 'NRT' },
  { id: 5, name: 'Dubai', country: 'UAE', code: 'DXB' },
  { id: 6, name: 'Singapore', country: 'Singapore', code: 'SIN' },
  { id: 7, name: 'Los Angeles', country: 'USA', code: 'LAX' },
  { id: 8, name: 'Sydney', country: 'Australia', code: 'SYD' },
  { id: 9, name: 'Barcelona', country: 'Spain', code: 'BCN' },
  { id: 10, name: 'Rome', country: 'Italy', code: 'FCO' },
  { id: 11, name: 'Amsterdam', country: 'Netherlands', code: 'AMS' },
  { id: 12, name: 'Bangkok', country: 'Thailand', code: 'BKK' },
  { id: 13, name: 'Istanbul', country: 'Turkey', code: 'IST' },
  { id: 14, name: 'Hong Kong', country: 'Hong Kong', code: 'HKG' },
  { id: 15, name: 'Miami', country: 'USA', code: 'MIA' },
  { id: 16, name: 'Toronto', country: 'Canada', code: 'YYZ' },
  { id: 17, name: 'Mumbai', country: 'India', code: 'BOM' },
  { id: 18, name: 'Seoul', country: 'South Korea', code: 'ICN' },
  { id: 19, name: 'Berlin', country: 'Germany', code: 'BER' },
  { id: 20, name: 'Bali', country: 'Indonesia', code: 'DPS' },
];

export const HERO_IMAGE: string =
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800';

export const DESTINATIONS: Destination[] = [
  { id: 1, name: 'Paris', country: 'France', price: 899, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
  { id: 2, name: 'Tokyo', country: 'Japan', price: 1299, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' },
  { id: 3, name: 'Bali', country: 'Indonesia', price: 749, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400' },
  { id: 4, name: 'Dubai', country: 'UAE', price: 999, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' },
];

export const HOTELS: Hotel[] = [
  { id: 1, name: 'Luxury Beach Resort', location: 'Maldives', price: 450, rating: 4.9, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400' },
  { id: 2, name: 'Mountain View Lodge', location: 'Switzerland', price: 320, rating: 4.7, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
  { id: 3, name: 'Urban Boutique Hotel', location: 'New York', price: 280, rating: 4.8, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400' },
];

export const COLORS: Colors = {
  primary: '#1a73e8',
  secondary: '#f8f9fa',
  text: '#1a1a1a',
  textLight: '#666',
  textPlaceholder: '#999',
  white: '#fff',
  background: '#f8f9fa',
  border: '#e8eaed',
  overlay: 'rgba(0, 0, 0, 0.3)',
  shadowColor: '#000',
};
