
import z from "zod";

export const userSchema = z.object({
    name: z.string().min(3, { message: "ID must be at least 3 characters" }),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
});


export const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
});