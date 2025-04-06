import {JwtPayload} from "@/shared/api/schemas/jwt-payload-schema";
import {LogoutRequest} from "@/modules/session/api/schemas/logout-schema";
import { LoginRequest } from "@/modules/session/api/schemas/login-schema";


export type LoginResult = JwtPayload

export interface SessionUsecase {
    login(value: LoginRequest): Promise<LoginResult>

    logout(logout: LogoutRequest): Promise<void>

    has_session(user_id: string): Promise<boolean>
}