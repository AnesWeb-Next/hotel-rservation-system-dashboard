import { z } from "zod";

// MongoDB ID validation
export const mongoDbIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ID format");

// ============================================
// Pagination Validation
// ============================================
export const paginationSchema = z.object({
  page: z
    .string()
    .default("1")
    .transform(Number)
    .pipe(z.number().int().min(1, "Page must be a positive integer")),
  limit: z
    .string()
    .default("10")
    .transform(Number)
    .pipe(
      z
        .number()
        .int()
        .min(1, "Limit must be a positive integer")
        .max(100, "Limit cannot exceed 100")
    ),
});

export const sortSchema = z.object({
  sortBy: z.string().optional().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const searchSchema = z.object({
  search: z.string().optional(),
  category: mongoDbIdSchema.optional(),
});

export const filterSchema = sortSchema.and(paginationSchema).and(searchSchema);

// Type exports
export type MongoDbId = z.infer<typeof mongoDbIdSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type SortInput = z.infer<typeof sortSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type FilterInput = z.infer<typeof filterSchema>;
