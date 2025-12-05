import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getVendors } from "../api/vendors";
import { useFavorites } from "../contexts/FavoritesContext";
import { Vendor } from "../interfaces/vendor";
import { extractFilterOptions } from "../utils/vendorUtils";

const PAGE_SIZE = 20;

const useVendors = () => {
  const { setFavoriteIds } = useFavorites();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const hasMore = totalPages === null ? true : page < totalPages;
  const isLoadingMoreRef = useRef(false);

  // Filter state (single selection)
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  // Extract unique filter options from vendors
  const filterOptions = useMemo(() => {
    return extractFilterOptions(vendors);
  }, [vendors]);

  const loadVendors = useCallback(async () => {
    try {
      //reset states on initial load
      setIsLoading(true);
      setError(null);
      setLoadMoreError(null);
      setPage(1);
      setTotalPages(null);

      const response = await getVendors(
        1,
        PAGE_SIZE,
        selectedCity || undefined,
        selectedCuisine || undefined
      );
      setVendors(response.data);

      // Sync favorites with Context
      setFavoriteIds(response.data);

      setPage(response.page);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("Failed to load vendors", err);
      setError("Could not load vendors. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [setFavoriteIds, selectedCity, selectedCuisine]);

  const loadMoreVendors = useCallback(async () => {
    if (isLoading || isLoadingMore || !hasMore || isLoadingMoreRef.current) {
      return;
    }

    try {
      //As states updates are asynchronous, I used a ref to track the loading state in the guard condition.
      //Got an issue with quick updates when the user scrolls fast.
      isLoadingMoreRef.current = true;
      setLoadMoreError(null);
      setIsLoadingMore(true);

      const nextPage = page + 1;
      const response = await getVendors(
        nextPage,
        PAGE_SIZE,
        selectedCity || undefined,
        selectedCuisine || undefined
      );

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response: data is missing or not an array");
      }
      let updatedVendors: Vendor[] = [];
      setVendors((prev) => {
        updatedVendors = [...prev, ...response.data];
        return updatedVendors;
      });

      // Sync all fav. vendors (including new ones) with Context
      // Note: setVendors callback executes synchronously, so updatedVendors is set here
      setFavoriteIds(updatedVendors);

      setPage(response.page);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("Failed to load more vendors", err);
      setLoadMoreError("Could not load more vendors.");
    } finally {
      setIsLoadingMore(false);
      isLoadingMoreRef.current = false;
    }
  }, [
    isLoading,
    isLoadingMore,
    hasMore,
    page,
    setFavoriteIds,
    selectedCity,
    selectedCuisine,
  ]);

  const refreshVendors = useCallback(async () => {
    try {
      setIsRefreshing(true);

      setVendors([]);
      //The screen will flicker for a second, in production it would not be necessarry.
      //I left it here to demonstrate explicit list resetting.

      await loadVendors();
    } finally {
      setIsRefreshing(false);
    }
  }, [loadVendors]);

  // Set city filter
  const setCityFilter = useCallback((city: string | null) => {
    setSelectedCity(city);
  }, []);

  // Set cuisine filter
  const setCuisineFilter = useCallback((cuisine: string | null) => {
    setSelectedCuisine(cuisine);
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedCity(null);
    setSelectedCuisine(null);
  }, []);

  useEffect(() => {
    loadVendors();
  }, [loadVendors]);

  return {
    vendors,
    isLoading,
    error,
    reload: loadVendors,
    isLoadingMore,
    isRefreshing,
    hasMore,
    loadMore: loadMoreVendors,
    loadMoreError,
    refresh: refreshVendors,
    // Filter-related returns
    selectedCity,
    selectedCuisine,
    setCityFilter,
    setCuisineFilter,
    clearFilters,
    filterOptions,
  };
};

export default useVendors;
