import { City } from "../types";

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const generateCalendarDays = (numberOfDays: number = 60): Date[] => {
  const today = new Date();
  const days: Date[] = [];
  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  return days;
};

export const filterCities = (cities: City[], searchText: string): City[] => {
  if (!searchText || !cities) return [];
  return cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchText.toLowerCase()) ||
      city.country.toLowerCase().includes(searchText.toLowerCase()) ||
      city.code.toLowerCase().includes(searchText.toLowerCase()),
  );
};
