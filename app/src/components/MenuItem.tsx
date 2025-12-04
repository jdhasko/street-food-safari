import React from "react";
import { Text, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import { MenuItem as MenuItemType } from "../interfaces/vendor";
import Badge from "./UI/Badge";

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem = ({ item }: MenuItemProps) => {
  const colors = useThemeColors();

  return (
    <View className="flex-row items-center justify-between py-3 border-t border-gray-200">
      <View className="flex-1 flex-row items-center gap-2">
        <Text className="text-text-primary text-base flex-1">{item.name}</Text>
        {item.spicy && (
          <Badge
            icon="flame"
            iconColor={colors.spicyIcon}
            backgroundColor={colors.spicyBackground}
          />
        )}
        {item.vegan && (
          <Badge
            icon="leaf"
            iconColor={colors.vegetarianIcon}
            backgroundColor={colors.vegetarianBackground}
          />
        )}
      </View>
      <Text className="text-text-primary font-semibold text-base ml-4 w-14 text-right">
        ${item?.price?.toFixed(2)}
      </Text>
    </View>
  );
};

export default MenuItem;
