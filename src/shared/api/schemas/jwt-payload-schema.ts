import {z} from "zod";

export const JWT_PAYLOAD_SCHEMA = z.object({
    user_id: z.string(),
    user_type: z.string(),
    session_id: z.string(),
});

export type JwtPayload = z.infer<typeof JWT_PAYLOAD_SCHEMA>