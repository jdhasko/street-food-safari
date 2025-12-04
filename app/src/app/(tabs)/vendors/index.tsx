import VendorCard from "@/src/components/VendorCard";
import useVendors from "@/src/hooks/useVendors";
import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VendorsScreen() {
  const { vendors, isLoading, error, reload } = useVendors();

  if (isLoading && vendors.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-error mb-2">{error}</Text>
        {/* for later: add a retry button to call reload() */}
      </View>
    );
  }

  return (
    <FlatList
      data={vendors}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 4 }}
      renderItem={({ item }) => <VendorCard vendor={item} />}
      ListHeaderComponent={
        <Text className="pb-2 pt-4 px-1 text-xl font-semibold">
          All vendors
        </Text>
      }
    />
  );
}
