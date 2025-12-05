import { useEffect, useRef, useState } from "react";
import { searchVendors } from "../api/vendors";
import { useFavorites } from "../contexts/FavoritesContext";
import { Vendor } from "../interfaces/vendor";
import useDebounce from "./useDebounce";

export function useSearchVendors() {
  const { setFavoriteIds } = useFavorites();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 350);

  const [results, setResults] = useState<Vendor[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const q = debouncedQuery.trim();
    if (!q) {
      setResults([]);
      setError(null);
      setIsSearching(false);
      setTotal(null);
      return;
    }

    //abort any previous search
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    //new abort controller for the current search
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const search = async () => {
      setIsSearching(true);
      setError(null);
      setTotal(null);

      try {
        const response = await searchVendors(q, abortController.signal);
        // Only update if this request wasn't aborted
        if (!abortController.signal.aborted) {
          setResults(response.data);
          setTotal(response.total);

          // Sync favorites with Context
          setFavoriteIds(response.data);
        }
      } catch (err: unknown) {
        // Don't set error if request was aborted
        if (abortController.signal.aborted) {
          return;
        }
        const errorMessage =
          err instanceof Error ? err.message : "Search failed";
        setError(errorMessage);
        setResults([]);
      } finally {
        // Only update loading state if this request wasn't aborted
        if (!abortController.signal.aborted) {
          setIsSearching(false);
        }
      }
    };

    search();

    return () => {
      abortController.abort();
    };
  }, [debouncedQuery, setFavoriteIds]);

  return {
    query,
    setQuery,
    debouncedQuery,
    results,
    isSearching,
    error,
    total,
    isSearchMode: debouncedQuery.trim().length > 0,
  };
}
