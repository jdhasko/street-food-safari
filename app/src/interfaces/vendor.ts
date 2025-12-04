export interface Vendor {
  id: string;
  name: string;
  cuisine: string;
  city: string;
  rating: number;
  priceLevel: string;
  thumbnail: string;
  description: string;
  location: Location;
  menu: MenuItem[];
  isFeatured: boolean;
  isFavorite: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  spicy: boolean;
  vegan: boolean;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface VendorsResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Vendor[];
}
