import { z } from "zod";

// ============================================
// User Validation
// ============================================

// Password pattern for strong passwords
const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

export const userCredentialsSchema = z.object({
  email: z.string().email("Email must be valid"),
  password: z
    .string()
    .regex(
      passwordPattern,
      "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number",
    ),
});

export const userSchema = userCredentialsSchema.extend({
  firstName: z
    .string()
    .min(3, "First name must have at least 3 letters")
    .max(70, "First name must have at most 70 letters"),
  lastName: z
    .string()
    .min(3, "Last name must have at least 3 letters")
    .max(70, "Last name must have at most 70 letters"),
});

export const fullUserSchema = userSchema.extend({
  role: z.enum(["admin", "user"]),
});

export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must have at least 3 letters")
    .max(70, "First name must have at most 70 letters")
    .optional(),
  lastName: z
    .string()
    .min(3, "Last name must have at least 3 letters")
    .max(70, "Last name must have at most 70 letters")
    .optional(),
  phone: z.string().optional().or(z.literal("")),
  avatar: z
    .string()
    .url("Avatar must be a valid URL")
    .optional()
    .or(z.literal("")),
});

// Form schema for admin user management
export const userFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number",
    )
    .optional(),
  role: z.enum(["admin", "user"]),
  borrowLimit: z.number().int().min(1).max(10),
});

// Type exports
export type UserCredentialsInput = z.infer<typeof userCredentialsSchema>;
export type UserInput = z.infer<typeof userSchema>;
export type FullUserInput = z.infer<typeof fullUserSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type UserFormInput = z.infer<typeof userFormSchema>;
