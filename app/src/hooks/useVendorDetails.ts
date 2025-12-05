import { useCallback, useEffect, useMemo, useState } from "react";
import { getVendorById } from "../api/vendors";
import { useFavorites } from "../contexts/FavoritesContext";
import { Vendor } from "../interfaces/vendor";

const useVendorDetails = (id: string) => {
  const {
    toggleFavorite: contextToggleFavorite,
    isFavorite,
    error: favoriteError,
  } = useFavorites();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadVendor = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getVendorById(id);
      setVendor(data);
    } catch (err) {
      setError("Could not load vendor.");
      console.error("Failed to load vendor", err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const refresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setError(null);

      const data = await getVendorById(id);
      setVendor(data);
    } catch (err) {
      setError("Could not load vendor.");
      console.error("Failed to refresh vendor", err);
    } finally {
      setIsRefreshing(false);
    }
  }, [id]);

  const toggleFavorite = useCallback(async () => {
    await contextToggleFavorite(id);
  }, [contextToggleFavorite, id]);

  // Sync vendor with context's favorite state
  const vendorWithFavorite = useMemo(() => {
    if (!vendor) return null;
    return { ...vendor, isFavorite: isFavorite(vendor.id) };
  }, [vendor, isFavorite]);

  useEffect(() => {
    loadVendor();
  }, [loadVendor]);

  return {
    vendor: vendorWithFavorite,
    isLoading,
    isRefreshing,
    error,
    favoriteError,
    reload: loadVendor,
    refresh,
    toggleFavorite,
  };
};

export default useVendorDetails;
