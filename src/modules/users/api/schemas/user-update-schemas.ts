import { z } from "zod";

export const USER_UPDATE_REQUEST_SCHEMA = z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    password: z.string().optional(),
}).refine(data => data.email || data.phone || data.password, {
    message: 'É necessário fornecer um campo para atualização',
});

export type UserUpdateRequest = z.infer<typeof USER_UPDATE_REQUEST_SCHEMA>

export const USER_UPDATE_RESPONSE_SCHEMA = z.object({
    message: z.string(),
    user_id: z.string().optional()
});

export type UserUpdateResponse = z.infer<typeof USER_UPDATE_RESPONSE_SCHEMA>