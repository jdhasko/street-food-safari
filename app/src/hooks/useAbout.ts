import { useCallback, useEffect, useState } from "react";
import { getAbout } from "../api/about";
import { AboutResponse } from "../interfaces/about";

const useAbout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AboutResponse | null>(null);

  const loadAbout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getAbout();
      setData(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to call slow endpoint";
      setError(errorMessage);
      console.error("Failed to call slow endpoint", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setError(null);

      const response = await getAbout();
      setData(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to call slow endpoint";
      setError(errorMessage);
      console.error("Failed to refresh slow endpoint", err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAbout();
  }, [loadAbout]);

  return {
    isLoading,
    isRefreshing,
    error,
    data,
    callSlow: loadAbout,
    retry: loadAbout, // Alias for clarity
    refresh,
  };
};

export default useAbout;
