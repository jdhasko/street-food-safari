import type { Vendor, VendorsResponse } from "../interfaces/vendor";

// In a real project, I would place it in an environment variable.
// For this assignment, I kept it inline for simplicity.
import { API_BASE_URL } from "../constants/url";

export async function getVendors(
  page: number = 1,
  limit: number = 20,
  city?: string,
  cuisine?: string
): Promise<VendorsResponse> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  // Add city filter if provided
  if (city) {
    params.append("city", city);
  }

  // Add cuisine filter if provided
  if (cuisine) {
    params.append("cuisine", cuisine);
  }

  const url = `${API_BASE_URL}/vendors?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch vendors: ${res.status}`);
  }

  const jsonData: VendorsResponse = await res.json();

  return jsonData;
}

export async function getVendorById(id: string) {
  const url = `${API_BASE_URL}/vendors/${encodeURIComponent(id)}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch vendors: ${res.status}`);
  }

  const data: Vendor = (await res.json()) as Vendor;
  return data;
}

export async function toggleVendorFavorite(id: string): Promise<Vendor> {
  const url = `${API_BASE_URL}/vendors/${encodeURIComponent(id)}/favorite`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to toggle favorite: ${res.status}`);
  }

  const data: Vendor = await res.json();
  return data;
}

export async function searchVendors(
  query: string,
  signal?: AbortSignal
): Promise<VendorsResponse> {
  const url = `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`Failed to search vendors: ${res.status}`);
  }

  const data: VendorsResponse = await res.json();
  return data;
}
