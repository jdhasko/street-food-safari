import React, { createContext, useCallback, useContext, useState } from "react";
import { toggleVendorFavorite } from "../api/vendors";
import { Vendor } from "../interfaces/vendor";

interface FavoritesContextType {
  favoriteIds: Set<string>;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => Promise<void>;
  setFavoriteIds: (vendors: Vendor[]) => void;
  isToggling: boolean;
  error: string | null;
  clearError: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFavorite = useCallback(
    (id: string) => {
      return favoriteIds.has(id);
    },
    [favoriteIds]
  );

  const toggleFavorite = useCallback(async (id: string) => {
    let wasFavorite: boolean = false;
    setFavoriteIds((prev) => {
      wasFavorite = prev.has(id);
      const newState = new Set(prev);
      if (wasFavorite) {
        newState.delete(id);
      } else {
        newState.add(id);
      }
      return newState;
    });

    setIsToggling(true);
    setError(null);

    try {
      await toggleVendorFavorite(id);
      // Success - optimistic update
    } catch {
      // Rollback on error - restore previous state
      const shouldBeFavorite = wasFavorite;

      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (shouldBeFavorite) {
          next.add(id);
        } else {
          next.delete(id);
        }
        return next;
      });

      setError("Could not update favorite. Please try again.");
    } finally {
      setIsToggling(false);
    }
  }, []);

  const setFavoriteIdsFromVendors = useCallback((vendors: Vendor[]) => {
    const ids = new Set(vendors.filter((v) => v.isFavorite).map((v) => v.id));
    setFavoriteIds(ids);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isFavorite,
        toggleFavorite,
        setFavoriteIds: setFavoriteIdsFromVendors,
        isToggling,
        error,
        clearError,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
