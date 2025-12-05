import VendorCard from "@/src/components/VendorCard";
import useVendors from "@/src/hooks/useVendors";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function VendorsScreen() {
  const insets = useSafeAreaInsets();
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
        <TouchableOpacity onPress={() => reload()}>
          <Text>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <FlatList
        data={vendors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
        renderItem={({ item }) => <VendorCard vendor={item} />}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
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
    </SafeAreaView>
  );
}
