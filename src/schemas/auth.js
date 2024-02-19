import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(6,{
    message: "The username must be at least 6 characters.",
  }),
  password: z.string().min(6, {
    message: "The password must be at least 6 characters.",
  }),
});

export const registerSchema = z
  .object({
    username: z
      .string({
        required_error: "Username required",
      })
      .min(6, {
        message: "The username must be at least 6 characters.",
      }),
    password: z.string().min(6, {
      message: "The password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "The password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });