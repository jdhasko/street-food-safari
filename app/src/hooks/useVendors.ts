import { useCallback, useEffect, useState } from "react";
import { getVendors } from "../api/vendors";
import { Vendor, VendorsResponse } from "../interfaces/vendor";

const PAGE_SIZE = 20;

const useVendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
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

      setPage(response.page);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("Failed to load vendors", err);
      setError("Could not load vendors. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []); //in case PAGE_SIZE becomes dynamic in the future, we will have to pass it as a dependency.

  const loadMoreVendors = useCallback(async () => {
    if (isLoading || isLoadingMore || !hasMore) {
      return;
    }

    try {
      setLoadMoreError(null);
      setIsLoadingMore(true);

      const nextPage = page + 1;
      const response = await getVendors(nextPage, PAGE_SIZE);

      setVendors((prev) => [...prev, ...response.data]);
      setPage(response.page);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("Failed to load more vendors", err);
      setLoadMoreError("Could not load more vendors.");
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoading, isLoadingMore, hasMore, page]);

  useEffect(() => {
    loadVendors();
  }, [loadVendors]);

  return {
    vendors,
    isLoading,
    error,
    reload: loadVendors,
    isLoadingMore,
    hasMore,
    loadMore: loadMoreVendors,
    loadMoreError,
  };
};

export default useVendors;
