import { useMemo } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { Vendor } from "../interfaces/vendor";
import useVendors from "./useVendors";

interface UseFavoritesListReturn {
  favoriteVendors: Vendor[];
  isLoading: boolean;
  error: string | null;
  isRefreshing: boolean;
  refresh: () => Promise<void>;
  reload: () => Promise<void>;
}

const useFavoritesList = (): UseFavoritesListReturn => {
  const { vendors, isLoading, error, isRefreshing, refresh, reload } =
    useVendors();
  const { isFavorite } = useFavorites();

  // Filter vendors array to only include favorites (memoized for performance)
  const favoriteVendors = useMemo(
    () => vendors.filter((vendor) => isFavorite(vendor.id)),
    [vendors, isFavorite]
  );

  return {
    favoriteVendors,
    isLoading,
    error,
    isRefreshing,
    refresh,
    reload,
  };
};

export default useFavoritesList;
