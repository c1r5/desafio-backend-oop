import {z} from "zod";

export const SessionValidationResponseSchema = z.object({
    message: z.string()
});

export type SessionValidationResponse = z.infer<typeof SessionValidationResponseSchema>;