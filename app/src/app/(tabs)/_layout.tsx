import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { useThemeColors } from "../../hooks/useThemeColors";

const tabIcons = {
  vendors: {
    active: "fast-food",
    inactive: "fast-food-outline",
  },
  favorites: {
    active: "heart",
    inactive: "heart-outline",
  },
  about: {
    active: "person",
    inactive: "person-outline",
  },
} as const;

const TabsLayout = () => {
  const themeColors = useThemeColors();
  const iconSize = 24;

  return (
    <Tabs
      initialRouteName="vendors"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: themeColors.accent,
        tabBarInactiveTintColor: themeColors.text.muted,

        tabBarIcon: ({ focused, color }) => {
          const icon = tabIcons[route.name as keyof typeof tabIcons];
          if (!icon) {
            return null;
          }
          const iconName = focused ? icon.active : icon.inactive;

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="vendors" options={{ title: "Vendors" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
      <Tabs.Screen name="about" options={{ title: "About" }} />
    </Tabs>
  );
};

export default TabsLayout;
