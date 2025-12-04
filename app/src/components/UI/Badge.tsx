import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View } from "react-native";

interface BadgeProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  backgroundColor?: string;
  size?: number;
  iconSize?: number;
}

const Badge = ({
  icon,
  iconColor,
  backgroundColor = "rgba(0, 0, 0, 0.05)",
  size = 24,
  iconSize = 14,
}: BadgeProps) => {
  return (
    <View
      className="items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor,
      }}
    >
      <Ionicons name={icon} size={iconSize} color={iconColor} />
    </View>
  );
};

export default Badge;
