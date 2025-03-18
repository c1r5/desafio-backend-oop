import {z} from "zod";

export const jwtPayloadSchema = z.object({
    user_id: z.string(),
    user_type: z.string(),
    session_id: z.string(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>