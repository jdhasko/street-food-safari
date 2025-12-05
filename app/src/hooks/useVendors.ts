import { useCallback, useEffect, useState } from "react";
import { getVendors } from "../api/vendors";
import { useFavorites } from "../contexts/FavoritesContext";
import { Vendor } from "../interfaces/vendor";

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

  const loadVendors = useCallback(async () => {
    try {
      //reset states on initial load
      setIsLoading(true);
      setError(null);
      setLoadMoreError(null);
      setPage(1);
      setTotalPages(null);

      const response = await getVendors(1, PAGE_SIZE);
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
  }, [setFavoriteIds]); //in case PAGE_SIZE becomes dynamic in the future, we will have to pass it as a dependency.

  const loadMoreVendors = useCallback(async () => {
    if (isLoading || isLoadingMore || !hasMore) {
      return;
    }

    try {
      setLoadMoreError(null);
      setIsLoadingMore(true);

      const nextPage = page + 1;
      const response = await getVendors(nextPage, PAGE_SIZE);

      setVendors((prev) => {
        const updatedVendors = [...prev, ...response.data];

        // Sync all fav. vendors (including new ones) with Context
        setFavoriteIds(updatedVendors);
        return updatedVendors;
      });

      setPage(response.page);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("Failed to load more vendors", err);
      setLoadMoreError("Could not load more vendors.");
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoading, isLoadingMore, hasMore, page, setFavoriteIds]);

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
  };
};

export default useVendors;
