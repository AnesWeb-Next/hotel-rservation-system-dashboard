import { z } from "zod";
import { mongoDbIdSchema } from "./common";

// ============================================
// Book Validation
// ============================================

export const roomSchema = z
  .object({
    title: z.string().min(1, "Room title is required"),

    hotel: mongoDbIdSchema,

    price: z.object({
      base: z.number().min(0, "Base price must be positive"),
      discount: z.number().min(0, "Discount must be positive").optional(),
    }),

    maxPeople: z.number().int().min(1, "Max people must be at least 1"),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),

    roomNumbers: z
      .array(
        z.object({
          number: z.number().int().min(1, "Room number must be positive"),

          unavailableDates: z.array(z.coerce.date()).optional(),
        }),
      )
      .min(1, "At least one room number is required"),

    amenities: z.array(z.string()).optional(),

    images: z.array(z.url("Image must be a valid URL")).optional(),

    isAvailable: z.boolean().optional(),

    createdBy: mongoDbIdSchema.optional(),
  })
  .refine(
    (data) => {
      // discount <= base
      if (data.price.discount !== undefined) {
        return data.price.discount <= data.price.base;
      }
      return true;
    },
    {
      message: "Discount cannot be greater than base price",
      path: ["price", "discount"],
    },
  );

// Form schema for admin book management
export const roomFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(2000),
  cover: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  keywords: z.string(), // comma separated
  priceOriginal: z.number().min(0).optional(),
  priceCurrent: z.number().min(0),
  rentalPrice: z.number().min(0),
  lateFeePerDay: z.number().min(0),
});

// Type exports
export type BookInput = z.infer<typeof roomSchema>;
export type BookFormInput = z.infer<typeof roomFormSchema>;
