import ErrorDisplay from "@/src/components/UI/ErrorDisplay";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface VendorsListHeaderProps {
  query: string;
  onQueryChange: (text: string) => void;
  isSearchMode: boolean;
  searchTotal: number | null;
  error: string | null;
}

const VendorsListHeader: React.FC<VendorsListHeaderProps> = ({
  query,
  onQueryChange,
  isSearchMode,
  searchTotal,
  error,
}) => {
  const colors = useThemeColors();

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
      <Text className="px-1 text-2xl font-semibold">
        {isSearchMode
          ? `Search results${searchTotal !== null ? ` (${searchTotal})` : ""}`
          : "All vendors"}
      </Text>
    </View>
  );
};

export default VendorsListHeader;
