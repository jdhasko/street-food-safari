import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

interface FilterPillProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: string | null;
  onPress: () => void;
  onClear: () => void;
}

const FilterPill: React.FC<FilterPillProps> = ({
  label,
  icon,
  selected,
  onPress,
  onClear,
}) => {
  const colors = useThemeColors();
  const isActive = selected !== null;

  const handlePress = () => {
    // Only open sheet if nothing is selected
    if (!isActive) {
      onPress();
    }
  };

  const handleClear = (e: any) => {
    e.stopPropagation();
    onClear();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center px-3 py-2 rounded-full border mr-2"
      style={{
        backgroundColor: isActive ? colors.accent : colors.background,
        borderColor: isActive ? colors.accent : colors.border,
      }}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon}
        size={16}
        color={isActive ? "#FFFFFF" : colors.text.secondary}
      />
      <Text
        className="ml-2 text-sm font-medium"
        style={{ color: isActive ? "#FFFFFF" : colors.text.secondary }}
      >
        {selected || label}
      </Text>
      {isActive && (
        <TouchableOpacity
          onPress={handleClear}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          className="ml-2"
        >
          <Ionicons name="close" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default FilterPill;
