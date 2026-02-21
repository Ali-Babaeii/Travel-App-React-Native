import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CITIES, COLORS } from "../../constants/data";
import { City, FlightSearchParams, HotelSearchParams } from "../../types";
import { filterCities } from "../../utils/helpers";
import { CalendarModal } from "./CalendarModal";
import { CityAutocomplete } from "./CityAutocomplete";
import { DatePicker } from "./DatePicker";

type ActiveTab = "flights" | "hotels";
type FlightType = "one-way" | "round-trip";

export const SearchCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("flights");

  // Flight states
  const [flightType, setFlightType] = useState<FlightType>("one-way");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [departureDateRaw, setDepartureDateRaw] = useState<string>("");
  const [returnDateRaw, setReturnDateRaw] = useState<string>("");
  const [showFromSuggestions, setShowFromSuggestions] =
    useState<boolean>(false);
  const [showToSuggestions, setShowToSuggestions] = useState<boolean>(false);

  // Hotel states
  const [destination, setDestination] = useState<string>("");
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [checkInRaw, setCheckInRaw] = useState<string>("");
  const [checkOutRaw, setCheckOutRaw] = useState<string>("");
  const [showDestinationSuggestions, setShowDestinationSuggestions] =
    useState<boolean>(false);

  // Calendar states
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedDateField, setSelectedDateField] = useState<string>("");
  const [isRangePicker, setIsRangePicker] = useState<boolean>(false);

  const handleCitySelect = (city: City, field: string): void => {
    const cityText = `${city.name} (${city.code})`;
    switch (field) {
      case "from":
        setFrom(cityText);
        setShowFromSuggestions(false);
        break;
      case "to":
        setTo(cityText);
        setShowToSuggestions(false);
        break;
      case "destination":
        setDestination(`${city.name}, ${city.country}`);
        setShowDestinationSuggestions(false);
        break;
    }
  };

  const handleDateSelect = (formattedDate: string): void => {
    if (selectedDateField === "departure") setDepartureDate(formattedDate);
    setShowDatePicker(false);
  };

  const handleFlightDateRangeSelect = (
    startDate: string,
    endDate: string,
    startRaw: string,
    endRaw: string,
  ): void => {
    setDepartureDate(startDate);
    setReturnDate(endDate);
    setDepartureDateRaw(startRaw);
    setReturnDateRaw(endRaw);
    setShowDatePicker(false);
  };

  const handleHotelDateRangeSelect = (
    startDate: string,
    endDate: string,
    startRaw: string,
    endRaw: string,
  ): void => {
    setCheckIn(startDate);
    setCheckOut(endDate);
    setCheckInRaw(startRaw);
    setCheckOutRaw(endRaw);
    setShowDatePicker(false);
  };

  const openDatePicker = (field: string): void => {
    setSelectedDateField(field);
    setIsRangePicker(false);
    setShowDatePicker(true);
  };

  const openFlightDateRangePicker = (): void => {
    setSelectedDateField("flight-range");
    setIsRangePicker(true);
    setShowDatePicker(true);
  };

  const openHotelDateRangePicker = (): void => {
    setSelectedDateField("hotel-range");
    setIsRangePicker(true);
    setShowDatePicker(true);
  };

  const handleSearch = (): void => {
    if (activeTab === "flights") {
      const searchData: FlightSearchParams = {
        type: flightType,
        from,
        to,
        departureDate,
        returnDate: flightType === "round-trip" ? returnDate : null,
      };
      router.push({
        pathname: "/search-results",
        params: { searchType: "flights", data: JSON.stringify(searchData) },
      });
    } else {
      const searchData: HotelSearchParams = {
        destination,
        checkIn,
        checkOut,
      };
      router.push({
        pathname: "/search-results",
        params: { searchType: "hotels", data: JSON.stringify(searchData) },
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(["flights", "hotels"] as ActiveTab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab === "flights" ? "✈️ Flights" : "🏨 Hotels"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.searchForm}>
        {activeTab === "flights" ? (
          <>
            {/* One-way / Round-trip toggle */}
            <View style={styles.flightTypeContainer}>
              {(["one-way", "round-trip"] as FlightType[]).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.flightTypeButton,
                    flightType === type && styles.flightTypeActive,
                  ]}
                  onPress={() => setFlightType(type)}
                >
                  <Text
                    style={[
                      styles.flightTypeText,
                      flightType === type && styles.flightTypeTextActive,
                    ]}
                  >
                    {type === "one-way" ? "One-way" : "Round-trip"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <CityAutocomplete
              label="From"
              value={from}
              placeholder="Departure city"
              onChangeText={(text) => {
                setFrom(text);
                setShowFromSuggestions(text.length > 0);
              }}
              onFocus={() => setShowFromSuggestions(from.length > 0)}
              suggestions={filterCities(CITIES, from)}
              showSuggestions={showFromSuggestions}
              onSelectCity={(city) => handleCitySelect(city, "from")}
            />

            <CityAutocomplete
              label="To"
              value={to}
              placeholder="Destination city"
              onChangeText={(text) => {
                setTo(text);
                setShowToSuggestions(text.length > 0);
              }}
              onFocus={() => setShowToSuggestions(to.length > 0)}
              suggestions={filterCities(CITIES, to)}
              showSuggestions={showToSuggestions}
              onSelectCity={(city) => handleCitySelect(city, "to")}
            />

            {flightType === "one-way" ? (
              <DatePicker
                label="Departure Date"
                value={departureDate}
                placeholder="Select date"
                onPress={() => openDatePicker("departure")}
              />
            ) : (
              <TouchableOpacity
                style={styles.dateRangeButton}
                onPress={openFlightDateRangePicker}
              >
                <View style={styles.dateRangeContent}>
                  <View style={styles.dateRangeItem}>
                    <Text style={styles.dateRangeLabel}>Departure</Text>
                    <Text
                      style={
                        departureDate
                          ? styles.dateRangeValue
                          : styles.dateRangePlaceholder
                      }
                    >
                      {departureDate || "Select date"}
                    </Text>
                  </View>
                  <View style={styles.dateRangeDivider} />
                  <View style={styles.dateRangeItem}>
                    <Text style={styles.dateRangeLabel}>Return</Text>
                    <Text
                      style={
                        returnDate
                          ? styles.dateRangeValue
                          : styles.dateRangePlaceholder
                      }
                    >
                      {returnDate || "Select date"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <CityAutocomplete
              label="Destination"
              value={destination}
              placeholder="Where are you going?"
              onChangeText={(text) => {
                setDestination(text);
                setShowDestinationSuggestions(text.length > 0);
              }}
              onFocus={() =>
                setShowDestinationSuggestions(destination.length > 0)
              }
              suggestions={filterCities(CITIES, destination)}
              showSuggestions={showDestinationSuggestions}
              onSelectCity={(city) => handleCitySelect(city, "destination")}
            />

            <TouchableOpacity
              style={styles.dateRangeButton}
              onPress={openHotelDateRangePicker}
            >
              <View style={styles.dateRangeContent}>
                <View style={styles.dateRangeItem}>
                  <Text style={styles.dateRangeLabel}>Check-in</Text>
                  <Text
                    style={
                      checkIn
                        ? styles.dateRangeValue
                        : styles.dateRangePlaceholder
                    }
                  >
                    {checkIn || "Select date"}
                  </Text>
                </View>
                <View style={styles.dateRangeDivider} />
                <View style={styles.dateRangeItem}>
                  <Text style={styles.dateRangeLabel}>Check-out</Text>
                  <Text
                    style={
                      checkOut
                        ? styles.dateRangeValue
                        : styles.dateRangePlaceholder
                    }
                  >
                    {checkOut || "Select date"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>
          Search {activeTab === "flights" ? "Flights" : "Hotels"}
        </Text>
      </TouchableOpacity>

      <CalendarModal
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelectDate={handleDateSelect}
        onSelectRange={
          selectedDateField === "flight-range"
            ? handleFlightDateRangeSelect
            : handleHotelDateRangeSelect
        }
        selectedDateField={selectedDateField}
        isRangePicker={isRangePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textLight,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  searchForm: {
    marginBottom: 16,
  },
  flightTypeContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 10,
  },
  flightTypeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  flightTypeActive: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}10`,
  },
  flightTypeText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textLight,
  },
  flightTypeTextActive: {
    color: COLORS.primary,
  },
  dateRangeButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  dateRangeContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateRangeItem: {
    flex: 1,
    padding: 14,
  },
  dateRangeDivider: {
    width: 1,
    height: "70%",
    backgroundColor: COLORS.border,
  },
  dateRangeLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textLight,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  dateRangeValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },
  dateRangePlaceholder: {
    fontSize: 14,
    color: COLORS.textPlaceholder,
  },
  durationInfo: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 8,
    alignItems: "center",
  },
  durationText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "600",
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  searchButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
