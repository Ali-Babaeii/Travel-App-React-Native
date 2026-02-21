// City type
export interface City {
  id: number;
  name: string;
  country: string;
  code: string;
}

// Destination type
export interface Destination {
  id: number;
  name: string;
  country: string;
  price: number;
  image: string;
}

// Hotel type
export interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

// Flight search params
export interface FlightSearchParams {
  type: "one-way" | "round-trip";
  from: string;
  to: string;
  departureDate: string;
  returnDate: string | null;
}

// Hotel search params
export interface HotelSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
}

// Search result - Flight
export interface FlightResult {
  id: number;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  price: number;
  class: string;
}

// Search result - Hotel
export interface HotelResult {
  id: number;
  name: string;
  rating: string;
  reviews: number;
  amenities: string;
  distance: string;
  price: number;
  perNight: boolean;
}

// Colors type
export interface Colors {
  primary: string;
  secondary: string;
  text: string;
  textLight: string;
  textPlaceholder: string;
  white: string;
  background: string;
  border: string;
  overlay: string;
  shadowColor: string;
}

// Component Props
export interface CityAutocompleteProps {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  suggestions: City[];
  showSuggestions: boolean;
  onSelectCity: (city: City) => void;
}

export interface DatePickerProps {
  label: string;
  value: string;
  placeholder: string;
  onPress: () => void;
}

export interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (formattedDate: string) => void;
  onSelectRange: (
    startDate: string,
    endDate: string,
    startRaw: string,
    endRaw: string,
  ) => void;
  selectedDateField: string;
  isRangePicker?: boolean;
  startDate?: string | null;
  endDate?: string | null;
}

export interface DestinationCardProps {
  destination: Destination;
  onPress: () => void;
  isGrid?: boolean;
}

export interface HotelCardProps {
  hotel: Hotel;
  onPress: () => void;
}
