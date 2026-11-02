import { z } from "zod";

// ============================================
// Rating Validation
// ============================================

export const ratingSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});

// Type exports
export type RatingInput = z.infer<typeof ratingSchema>;
