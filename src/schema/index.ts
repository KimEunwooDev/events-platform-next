import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  date: z.string().date(),
  time_start: z.string().time({ message: "Start time is required" }),
  time_end: z.string().time(),
  address: z.string().min(2, { message: "Must be 5 or more characters long" }),
  summary: z.string().min(5, { message: "Must be 5 or more characters long" }),
  description: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" }),
  status: z.string(),
});
