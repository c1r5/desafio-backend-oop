import {jwtPayloadSchema} from "@/shared/api/schemas/jwt-payload-schema";
import {z} from "zod";

export const LogoutRequestSchema = jwtPayloadSchema

export const LogoutResponseSchema = z.object({
    message: z.string()
});

export type LogoutRequest = z.infer<typeof LogoutRequestSchema>
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>