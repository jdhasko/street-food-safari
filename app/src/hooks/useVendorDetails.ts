import { useCallback, useEffect, useState } from "react";
import { getVendorById } from "../api/vendors";
import { Vendor } from "../interfaces/vendor";
import useToggleFavorite from "./useToggleFavorite";

const useVendorDetails = (id: string) => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { toggle, favoriteError } = useToggleFavorite();

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
    if (!vendor) return;

    // Capture original vendor before optimistic update
    const originalVendor = vendor;
    const previousState = vendor.isFavorite;

    // Optimistic update: immediately update UI
    setVendor({ ...vendor, isFavorite: !previousState });

    // Call mutation hook
    const updatedVendor = await toggle(vendor.id);

    if (updatedVendor) {
      // Success: merge server response with existing vendor to preserve all properties
      setVendor({ ...originalVendor, ...updatedVendor });
    } else {
      // Error: rollback to original state
      setVendor(originalVendor);
    }
  }, [vendor, toggle]);

  useEffect(() => {
    loadVendor();
  }, [loadVendor]);

  return {
    vendor,
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
