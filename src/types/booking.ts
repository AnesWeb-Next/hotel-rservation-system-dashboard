// Borrow types

import type { ObjectId, FilterParams } from "./common";
import type { User } from "./user";
import type { Room } from "./room";

export type BookingStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "active"
  | "returned"
  | "overdue"
  | "cancelled";

export interface Booking {
  _id: ObjectId;
  id: string;
  user: ObjectId | User;
  room: ObjectId | Room;
  checkInDate: Date;
  checkOutDate: Date;
  actualCheckOutDate?: Date;
  status: BookingStatus;
  guestsCount: number;
  guestNames?: string[];
  totalPrice: number;
  paidAmount?: number;
  phoneNumber: string;
  email?: string;
  specialRequests?: string;
  comments?: string;
  approvedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  rejectionReason?: string;
  checkedInAt?: Date;
  checkedOutAt?: Date;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFilterParams extends FilterParams {
  status?: BookingStatus;
  user?: string;
  book?: string;
}

export interface BookingFormInput {
  roomId: string;
  dueDate: string;
  comments?: string;
}

export interface ProcessBookingInput {
  action: "approve" | "reject";
  reason?: string;
}
