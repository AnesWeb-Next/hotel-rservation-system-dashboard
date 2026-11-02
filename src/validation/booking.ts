import { z } from "zod";

// ============================================
// Booking Validation
// ============================================

export const bookingStatusSchema = z.enum([
  "pending",
  "confirmed",
  "checked_in",
  "checked_out",
  "cancelled",
  "no_show",
]);

export const bookingSchema = z.object({
  roomId: z.string().min(1, "Room ID is required"),
  dueDate: z.string().min(1, "Due date is required"),
  comments: z.string().optional(),
});

export const returnBookingSchema = z.object({
  // No body parameters needed
});

export const processBookingSchema = z.object({
  action: z.enum(["approve", "reject"], {
    message: "Action must be approve or reject",
  }),
  reason: z.string().optional(),
});

// Form schema for admin borrowing management
export const processBookingFormSchema = z.object({
  status: z.enum([
    "pending",
    "confirmed",
    "checked_in",
    "checked_out",
    "cancelled",
    "no_show",
  ]),
  comments: z.string().max(500).optional(),
});

// Type exports
export type BookingStatus = z.infer<typeof bookingStatusSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type ProcessBookingInput = z.infer<typeof processBookingSchema>;
export type ProcessBooingFormInput = z.infer<typeof processBookingFormSchema>;
