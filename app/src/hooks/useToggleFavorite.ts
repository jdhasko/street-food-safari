import { useCallback, useState } from "react";
import { toggleVendorFavorite } from "../api/vendors";
import { Vendor } from "../interfaces/vendor";

const useToggleFavorite = () => {
  const [isToggling, setIsToggling] = useState<boolean>(false);
  const [favoriteError, setFavoriteError] = useState<string | null>(null);

  const toggle = useCallback(
    async (vendorId: string): Promise<Vendor | null> => {
      try {
        setIsToggling(true);
        setFavoriteError(null);

        const updatedVendor = await toggleVendorFavorite(vendorId);
        return updatedVendor;
      } catch {
        setFavoriteError("Could not update favorite. Please try again.");
        return null;
      } finally {
        setIsToggling(false);
      }
    },
    []
  );

  const resetError = useCallback(() => {
    setFavoriteError(null);
  }, []);

  return {
    toggle,
    isToggling,
    favoriteError,
    resetError,
  };
};

export default useToggleFavorite;
