import { z } from "zod";

export const taskSchema = z.object({
  name: z.string().min(6,{
    message: "The task'name must be at least 6 characters.",
  }),
  description: z.string().min(6, {
    message: "The task'description must be at least 6 characters.",
  }),
});