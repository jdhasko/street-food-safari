import FilterBottomSheet, {
  FilterBottomSheetRef,
} from "@/src/components/FilterBottomSheet";
import FilterPill from "@/src/components/FilterPill";
import ErrorDisplay from "@/src/components/UI/ErrorDisplay";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface VendorsListHeaderProps {
  query: string;
  onQueryChange: (text: string) => void;
  isSearchMode: boolean;
  searchTotal: number | null;
  error: string | null;
  // Filter props
  selectedCity: string | null;
  selectedCuisine: string | null;
  filterOptions: {
    cities: string[];
    cuisines: string[];
  };
  onCityFilterChange: (city: string | null) => void;
  onCuisineFilterChange: (cuisine: string | null) => void;
}

const VendorsListHeader: React.FC<VendorsListHeaderProps> = ({
  query,
  onQueryChange,
  isSearchMode,
  searchTotal,
  error,
  selectedCity,
  selectedCuisine,
  filterOptions,
  onCityFilterChange,
  onCuisineFilterChange,
}) => {
  const colors = useThemeColors();
  const cityFilterSheetRef = useRef<FilterBottomSheetRef>(null);
  const cuisineFilterSheetRef = useRef<FilterBottomSheetRef>(null);

  return (
    <View className="bg-white border-b border-gray-200 pb-3 pt-3 px-4">
      <View className="relative mb-2">
        <TextInput
          placeholder="Search vendors, cuisines, cities..."
          placeholderTextColor={colors.text.muted}
          value={query}
          onChangeText={onQueryChange}
          className="border bg-white border-gray-300 rounded-lg px-3 py-4 pr-10"
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => onQueryChange("")}
            className="absolute right-3 top-0 bottom-0 justify-center"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <ErrorDisplay message={error} />}
      <View className="px-1">
        <Text className="text-2xl font-semibold">
          {isSearchMode
            ? `Search results${searchTotal !== null ? ` (${searchTotal})` : ""}`
            : "All vendors"}
        </Text>
        {!isSearchMode && (
          <View className="flex-row flex-wrap mt-2">
            <FilterPill
              label="City"
              icon="location"
              selected={selectedCity}
              onPress={() => cityFilterSheetRef.current?.present()}
              onClear={() => onCityFilterChange(null)}
            />
            <FilterPill
              label="Cuisine"
              icon="restaurant"
              selected={selectedCuisine}
              onPress={() => cuisineFilterSheetRef.current?.present()}
              onClear={() => onCuisineFilterChange(null)}
            />
          </View>
        )}
      </View>

      {/* Filter Bottom Sheets */}
      <FilterBottomSheet
        ref={cityFilterSheetRef}
        title="Filter by City"
        options={filterOptions.cities}
        selected={selectedCity}
        onSelect={onCityFilterChange}
      />
      <FilterBottomSheet
        ref={cuisineFilterSheetRef}
        title="Filter by Cuisine"
        options={filterOptions.cuisines}
        selected={selectedCuisine}
        onSelect={onCuisineFilterChange}
      />
    </View>
  );
};

export default VendorsListHeader;
