// User types — roles are lowercase to match backend

import type { ObjectId, FilterParams } from "./common";

export type UserRole = "admin" | "user";

export interface User {
  _id: ObjectId;
  id?: string;
  fullName: string;
  displayName?: string;
  email: string;
  password: string;
  DateOfBirth?: Date;
  gender?: string;
  phone?: number;
  nationality?: string;
  address?: string;
  avatar?: string;
  role: UserRole;
}

export interface UserWithBookingRooms extends User {
  BookingRooms?: import("./room").Room[];
}

export interface UserFilterParams extends FilterParams {
  role?: UserRole;
  isActive?: boolean;
}

export interface UserFormInput {
  fullName: string;
  displayName?: string;
  email: string;
  password?: string;
  phone?: string;
  role: UserRole;
  isActive?: boolean;
}
