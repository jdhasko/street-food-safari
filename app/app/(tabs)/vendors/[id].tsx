import HeaderFavoriteButton from "@/src/components/UI/HeaderFavoriteButton";
import MapPreviewer from "@/src/components/MapPreviewer";
import MenuItem from "@/src/components/MenuItem";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import useVendorDetails from "@/src/hooks/useVendorDetails";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VendorDetails = () => {
  const { id } = useLocalSearchParams();
  const colors = useThemeColors();
  const navigation = useNavigation();
  const { vendor, isLoading, isRefreshing, error, reload, refresh } =
    useVendorDetails(id as string);

  useLayoutEffect(() => {
    if (!vendor) return;

    navigation.setOptions({
      headerRight: () => (
        <HeaderFavoriteButton
          isFavorite={vendor.isFavorite}
          iconColor={colors.text.primary}
        />
      ),
      //To make the header more accessible on Android I had to add a background color to the header.
      //It's just a quick fix, I'd like to find a better solution in the future.
      headerStyle: Platform.OS === "android" && {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      },
    });
  }, [vendor, colors.text.primary, navigation]);

  if (isLoading && !vendor) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator />
        <Text className="mt-2">Loading vendor...</Text>
      </SafeAreaView>
    );
  }

  if (error || !vendor) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-4">
        <Text className="text-error mb-3 text-center">{error}</Text>
        <TouchableOpacity onPress={() => reload()}>
          <Text className="text-accent font-semibold">Try again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
      >
        <View className="relative">
          <Image
            source={{ uri: vendor.thumbnail }}
            className="h-56 w-full"
            resizeMode="cover"
          />
        </View>

        {/* Main content area*/}
        <View className="bg-white rounded-t-3xl -mt-4 pt-4 px-4 pb-8">
          <Text className="text-center text-2xl font-bold text-text-primary">
            {vendor.name}
          </Text>

          {/* rating · price · cuisine · city */}
          <View className="flex-row items-center justify-center mt-2 flex-wrap gap-x-1">
            <Ionicons name="star" size={14} color={colors.star} />
            <Text className="text-text-secondary text-lg">
              {vendor.rating.toFixed(1)} · {vendor.priceLevel} ·{" "}
              {vendor.cuisine} Cuisine · {vendor.city}
            </Text>
          </View>

          {/* Description box */}
          <View className="bg-gray-100 rounded-xl mt-6 p-3">
            <Text className="text-text-primary font-semibold text-lg mb-1">
              Description
            </Text>
            <Text className="text-text-secondary text-md leading-5">
              {vendor.description}
            </Text>
          </View>

          {/** Map component */}
          <View>
            <Text className="mt-6  text-text-primary text-2xl font-semibold">
              Location
            </Text>
            <Text className="mb-3 text-text-primary text-md">
              {vendor.city}
              {/** Ideally I'd display an address here */}
            </Text>
            <MapPreviewer lng={vendor.location.lng} lat={vendor.location.lat} />
          </View>

          {/* Menu*/}
          <Text className="mt-6 text-text-primary text-2xl font-semibold">
            Menu
          </Text>
          {vendor.menu.length > 0 ? (
            <View className="mt-3">
              {vendor.menu.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </View>
          ) : (
            <Text className="mt-3 text-text-secondary text-base">
              No menu items available.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VendorDetails;
