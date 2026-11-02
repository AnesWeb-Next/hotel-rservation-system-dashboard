import { z } from "zod";
import { mongoDbIdSchema } from "./common";

export const hotelSchema = z.object({
  name: z.string().min(1, "Hotel name is required").max(255),
  description: z.string().max(2000).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  phone: z.string().max(50).optional(),
  email: z.string().email("Invalid email address").optional(),
  website: z.string().url("Invalid URL").optional(),
  stars: z
    .number()
    .int()
    .min(1, "Stars must be between 1 and 5")
    .max(5)
    .optional(),
  rating: z.number().min(0).max(5).optional(),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string().url("Invalid image URL")).optional(),
  cover: z.string().url("Invalid cover URL").optional(),
  keywords: z.array(z.string()).optional(),
  owner: mongoDbIdSchema.optional(),
});

export const hotelFormSchema = z.object({
  name: z.string().min(1, "Hotel name is required").max(255),
  description: z.string().max(2000).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  phone: z.string().max(50).optional(),
  email: z.string().email("Invalid email address").optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  stars: z
    .number()
    .int()
    .min(1, "Stars must be between 1 and 5")
    .max(5)
    .optional(),
  amenities: z.string().optional(),
  images: z.string().optional(),
  cover: z.string().url("Invalid cover URL").optional().or(z.literal("")),
  keywords: z.string().optional(),
});

export type HotelInput = z.infer<typeof hotelSchema>;
export type HotelFormInput = z.infer<typeof hotelFormSchema>;
