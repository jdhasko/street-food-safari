import { useState, useEffect, useCallback } from "react";
import { Vendor } from "../interfaces/vendor";
import { getVendorById } from "../api/vendors";

const useVendorDetails = (id: string) => {
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
    } catch (e) {
      setError("Could not load vendor.");
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
    } catch (e) {
      setError("Could not load vendor.");
    } finally {
      setIsRefreshing(false);
    }
  }, [id]);

  useEffect(() => {
    loadVendor();
  }, [loadVendor]);

  return {
    vendor,
    isLoading,
    isRefreshing,
    error,
    reload: loadVendor,
    refresh,
  };
};

export default useVendorDetails;
