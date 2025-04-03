import {JWT_PAYLOAD_SCHEMA} from "@/shared/api/schemas/jwt-payload-schema";
import {z} from "zod";

export const LOGOUT_REQUEST_SCHEMA = JWT_PAYLOAD_SCHEMA

export const LOGOUT_RESPONSE_SCHEMA = z.object({
    message: z.string()
});

export type LogoutRequest = z.infer<typeof LOGOUT_REQUEST_SCHEMA>
export type LogoutResponse = z.infer<typeof LOGOUT_RESPONSE_SCHEMA>