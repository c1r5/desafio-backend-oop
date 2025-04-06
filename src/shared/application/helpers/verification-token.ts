import jwt from "jsonwebtoken";
import {get_env} from "@/shared/application/helpers/get-env";

export function generate_verification_token(user_id: string): string {
    return jwt.sign(
        { user_id },
        get_env("EMAIL_SERVICE_JWT_SECRET") as string,
        { expiresIn: "1h" }
    )
}

export function verify_verification_token(token: string): string {
    try {
        const decoded = jwt.verify(token, get_env("EMAIL_SERVICE_JWT_SECRET") as string);
        return (decoded as { user_id: string }).user_id;
    } catch (error) {
        throw new Error("Invalid token");
    }
}