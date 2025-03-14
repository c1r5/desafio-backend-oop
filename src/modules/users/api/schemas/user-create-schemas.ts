import {z} from "zod";

export const userCreateResponseSchema = z.object({
    user_id: z.string().optional(),
    message: z.string()
});

export type UserCreateResponse = z.infer<typeof userCreateResponseSchema>

export const userCreateBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    document: z.string(),
    type: z.string(),
    phone: z.string(),
    password: z.string()
});

export type UserCreateBody = z.infer<typeof userCreateBodySchema>