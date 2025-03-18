import {z} from "zod";

export const userUpdateBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
});

export type UserUpdateBody = z.infer<typeof userUpdateBodySchema>

export const userUpdateResponseSchema = z.object({
    message: z.string()
});

export type UserUpdateResponse = z.infer<typeof userUpdateResponseSchema>