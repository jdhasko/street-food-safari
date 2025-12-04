import VendorCard from "@/src/components/VendorCard";
import useVendors from "@/src/hooks/useVendors";
import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function VendorsScreen() {
  const {
    vendors,
    isLoading,
    error,
    isRefreshing,
    loadMore,
    reload,
    refresh,
    isLoadingMore,
    loadMoreError,
  } = useVendors();

  if (isLoading && vendors.length === 0) {
    return (
      <View className="flex-1 items-center justify-center my-4">
        <ActivityIndicator />
        <Text>Loading vendors...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-error mb-2">{error}</Text>
        {/* for later: add a retry button to call reload() */}
        <TouchableOpacity onPress={() => reload()}>
          <Text>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={vendors}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 4 }}
      renderItem={({ item }) => <VendorCard vendor={item} />}
      refreshing={isRefreshing}
      onRefresh={refresh}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <Text className="pb-2 pt-4 px-1 text-2xl font-semibold">
          All vendors
        </Text>
      }
      ListFooterComponent={
        <>
          {loadMoreError && (
            <Text className="text-error mb-2">{loadMoreError}</Text>
          )}
          {isLoadingMore ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null}
        </>
      }
    />
  );
}
