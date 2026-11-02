import type { ObjectId, FilterParams } from "./common";
import type { User } from "./user";

export interface HotelLocation {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  geo?: {
    lat: number;
    lng: number;
  };
}

export interface Hotel {
  _id: ObjectId;
  id: string;
  name: string;
  description?: string;
  location?: HotelLocation;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  stars?: number;
  rating?: number;
  amenities?: string[];
  images?: string[];
  cover?: string;
  keywords?: string[];
  owner?: ObjectId | User;
  createdAt: string;
  updatedAt: string;
}

export interface HotelFilterParams extends FilterParams {
  city?: string;
  country?: string;
  minStars?: number;
  maxStars?: number;
  minRating?: number;
  maxRating?: number;
}

export interface HotelFormInput {
  name: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  stars?: number;
  amenities?: string[];
  images?: string[];
  cover?: string;
  phone?: string;
  email?: string;
  website?: string;
  keywords?: string[];
}
