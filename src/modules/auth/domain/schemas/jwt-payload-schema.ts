import {z} from "zod";

export const JwtPayloadSchema = z.object({
    user_id: z.string(),
    user_type: z.string(),
    session_id: z.string(),
});

export type JwtPayload = z.infer<typeof JwtPayloadSchema>