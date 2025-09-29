// src/lib/validation/authSchemas.ts
import { z } from "zod";

export const loginSchema = z.object({
  Fname: z.string().min(1, "Full Name is required").trim(),
  Lname: z.string().min(1, "Last Name is required").trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .trim()
    .email("Please enter a valid email address")
    .transform((s) => s.toLowerCase()),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password too long")
    .refine((val) => /\d/.test(val), "Password must contain a number")
    .refine(
      (val) => /[A-Z]/.test(val),
      "Password must contain an uppercase letter"
    )
    .refine(
      (val) => /[a-z]/.test(val),
      "Password must contain a lowercase letter"
    ),
  // optional: allow special char rule
  // .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Password must contain a special character")
});
