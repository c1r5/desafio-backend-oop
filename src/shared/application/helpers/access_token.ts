import {JwtPayloadSchema} from "@/shared/api/schemas/jwt-payload-schema";

export function parse_payload(authorization: string | undefined) {
    if (!authorization) throw new Error('invalid_token')

    const token = authorization.split(' ')[1]
    const payload = Buffer.from(token.split('.')[1], 'base64').toString()
    return JwtPayloadSchema.parse(payload)
}