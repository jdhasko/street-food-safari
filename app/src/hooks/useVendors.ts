import React from "react";
import { useEffect, useState, useCallback } from "react";
import { Vendor } from "../interfaces/vendor";
import { getVendors } from "../api/vendors";

const PAGE_SIZE = 20;

const useVendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadVendors = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getVendors(1, PAGE_SIZE);
      setVendors(data);
    } catch (err) {
      console.error("Failed to load vendors", err);
      setError("Could not load vendors. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVendors();
  }, [loadVendors]);

  return { vendors, isLoading, error, reload: loadVendors };
};

export default useVendors;
