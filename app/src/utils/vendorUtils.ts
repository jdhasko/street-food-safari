import { Vendor } from "../interfaces/vendor";

/**
 * Extracts unique cities and cuisines from a list of vendors
 * @param vendors - Array of vendor objects
 * @returns Object containing sorted arrays of unique cities and cuisines
 */
export function extractFilterOptions(vendors: Vendor[]): {
  cities: string[];
  cuisines: string[];
} {
  const cities = new Set<string>();
  const cuisines = new Set<string>();

  vendors.forEach((vendor) => {
    if (vendor.city) cities.add(vendor.city);
    if (vendor.cuisine) cuisines.add(vendor.cuisine);
  });

  return {
    cities: Array.from(cities).sort(),
    cuisines: Array.from(cuisines).sort(),
  };
}

