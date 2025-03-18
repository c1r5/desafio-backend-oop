import {z} from "zod";

export const userUpdateBodySchema = z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
});

export type UserUpdateBody = z.infer<typeof userUpdateBodySchema>

export const userUpdateResponseSchema = z.object({
    message: z.string(),
    user_id: z.string().optional()
});

export type UserUpdateResponse = z.infer<typeof userUpdateResponseSchema>