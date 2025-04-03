import {z} from "zod";

export const USER_UPDATE_REQUEST_SCHEMA = z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
});

export type UserUpdateBody = z.infer<typeof USER_UPDATE_REQUEST_SCHEMA>

export const USER_UPDATE_RESPONSE_SCHEMA = z.object({
    message: z.string(),
    user_id: z.string().optional()
});

export type UserUpdateResponse = z.infer<typeof USER_UPDATE_RESPONSE_SCHEMA>