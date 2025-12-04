import type { Vendor, VendorsResponse } from "../interfaces/vendor";

// In a real project, I would place it in an environment variable.
// For this assignment, I kept it inline for simplicity.
const API_BASE_URL = "http://192.168.1.141:3333";

export async function getVendors(
  page: number = 1,
  limit: number = 20
): Promise<VendorsResponse> {
  const url = `${API_BASE_URL}/vendors?page=${page}&limit=${limit}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch vendors: ${res.status}`);
  }

  const jsonData: VendorsResponse = await res.json();

  return jsonData;
}

export async function getVendorById(id: string) {
  const url = `${API_BASE_URL}/vendors/${id}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch vendors: ${res.status}`);
  }

  const data: Vendor = (await res.json()) as Vendor;
  return data;
}

export async function toggleVendorFavorite(id: string): Promise<Vendor> {
  const url = `${API_BASE_URL}/vendors/${id}/favorite`;
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
