// Book types

import type { ObjectId, FilterParams } from "./common";
import type { Hotel } from "./hotel";
import type { User } from "./user";

export interface RoomNumber {
  number: number;
  unavailableDates?: Date[];
}

export interface RoomPrice {
  original?: number;
  current: number;
}

export interface Room {
  _id: ObjectId;
  id: string;
  title: string;
  hotel: ObjectId | Hotel;
  price: RoomPrice;
  maxPeople: number;
  description: string;
  roomNumbers: RoomNumber[];
  amenities?: string[];
  images?: string[];
  isAvailable: boolean;
  cover?: string;
  keywords: string[];
  contributedBy?: ObjectId | User;
  createdAt: string;
  updatedAt: string;
}

export interface RoomFilterParams extends FilterParams {
  minPrice?: number;
  maxPrice?: number;
}

export interface RoomFormInput {
  title: string;
  hotelId?: string;
  price: {
    original?: number;
    current: number;
  };
  description: string;
  keywords?: string[];
}
