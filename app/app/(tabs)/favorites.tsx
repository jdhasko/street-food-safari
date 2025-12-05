import VendorCard from "@/src/components/VendorCard";
import useFavoritesList from "@/src/hooks/useFavoritesList";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Favorites = () => {
  const colors = useThemeColors();
  const { favoriteVendors, isLoading, error, isRefreshing, refresh, reload } =
    useFavoritesList();

  if (isLoading && favoriteVendors.length === 0) {
    return (
      <View className="flex-1 items-center justify-center my-4">
        <ActivityIndicator />
        <Text>Loading favorites...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-error mb-2">{error}</Text>
        <TouchableOpacity onPress={() => reload()}>
          <Text className="text-accent font-semibold">Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <View className="flex-1 bg-card">
        <View className="bg-white border-b border-gray-200 pb-3 pt-3 px-4">
          <Text className="px-1 text-2xl font-semibold">Favorites</Text>
        </View>
        <FlatList
          data={favoriteVendors}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          renderItem={({ item }) => <VendorCard vendor={item} />}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
          }
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20 px-4">
              <Ionicons
                name="heart-outline"
                size={64}
                color={colors.text.muted}
              />
              <Text className="text-text-primary text-xl font-semibold mt-4">
                No favorites yet
              </Text>
              <Text className="text-text-secondary text-center mt-2">
                Start adding vendors to your favorites to see them here
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Favorites;
