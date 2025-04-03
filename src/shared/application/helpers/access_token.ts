import {JWT_PAYLOAD_SCHEMA} from "@/shared/api/schemas/jwt-payload-schema";

export function parse_payload(authorization: string | undefined) {
    if (!authorization) throw new Error('invalid_token')

    const token = authorization.split(' ')[1]
    const payload = Buffer.from(token.split('.')[1], 'base64').toString()
    return JWT_PAYLOAD_SCHEMA.parse(payload)
}