import {z} from "zod";

export const SESSION_VALIDATION_RESPONSE_SCHEMA = z.object({
    message: z.string()
});

export type SessionValidationResponse = z.infer<typeof SESSION_VALIDATION_RESPONSE_SCHEMA>;