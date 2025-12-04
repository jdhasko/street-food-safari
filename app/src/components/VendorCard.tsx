import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import { Vendor } from "../interfaces/vendor";

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      className="mb-3"
      onPress={() => router.push(`../vendors/${vendor.id}`)}
    >
      <View className="bg-white rounded-xl shadow-sm">
        <View className="relative">
          <Image
            source={{ uri: vendor.thumbnail }}
            className="h-40 w-full rounded-t-xl"
            resizeMode="cover"
          />
        </View>

        <View className="p-3">
          <Text className="text-text-primary text-lg font-semibold">
            {vendor.name}
          </Text>
          <Text className="text-text-secondary">
            {vendor.city} · {vendor.cuisine}
          </Text>

          <View className="flex-row items-center mt-1">
            <Ionicons name="star" size={14} color={colors.star} />
            <Text className="text-text-muted ml-1">
              {vendor.rating.toFixed(1)} · {vendor.priceLevel}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VendorCard;
