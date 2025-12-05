import VendorCard from "@/src/components/VendorCard";
import VendorsListHeader from "@/src/components/VendorsListHeader";
import { useSearchVendors } from "@/src/hooks/useSearchVendors";
import useVendors from "@/src/hooks/useVendors";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    selectedCity,
    selectedCuisine,
    setCityFilter,
    setCuisineFilter,
    filterOptions,
  } = useVendors();

  const {
    query,
    setQuery,
    results,
    isSearching,
    error: searchError,
    total: searchTotal,
    isSearchMode,
  } = useSearchVendors();

  const dataToShow = isSearchMode ? results : vendors;
  const listError = isSearchMode ? searchError : error;

  const handleCityFilterChange = (city: string | null) => {
    setCityFilter(city);
  };

  const handleCuisineFilterChange = (cuisine: string | null) => {
    setCuisineFilter(cuisine);
  };

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
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <View className="flex-1 bg-card">
        <VendorsListHeader
          query={query}
          onQueryChange={setQuery}
          isSearchMode={isSearchMode}
          searchTotal={searchTotal}
          error={listError}
          selectedCity={selectedCity}
          selectedCuisine={selectedCuisine}
          filterOptions={filterOptions}
          onCityFilterChange={handleCityFilterChange}
          onCuisineFilterChange={handleCuisineFilterChange}
        />
        <FlatList
          data={dataToShow}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          renderItem={({ item }) => <VendorCard vendor={item} />}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
          }
          onEndReached={isSearchMode ? undefined : loadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            isSearchMode && !isSearching && searchTotal === 0 ? (
              <View className="flex-1 items-center justify-center py-16 px-4">
                <Text className="text-text-secondary text-lg">
                  No matching vendors found
                </Text>
              </View>
            ) : !isSearchMode &&
              !isLoading &&
              vendors.length === 0 &&
              !error ? (
              <View className="flex-1 items-center justify-center py-16 px-4">
                <Text className="text-text-secondary text-lg">
                  No vendors available
                </Text>
              </View>
            ) : null
          }
          ListFooterComponent={
            !isSearchMode ? (
              <>
                {loadMoreError && (
                  <Text className="text-error mb-2">{loadMoreError}</Text>
                )}
                {isLoadingMore ? (
                  <ActivityIndicator style={{ marginVertical: 16 }} />
                ) : null}
              </>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
}
