import {JWT} from "@fastify/jwt";
import {AuthSessionEntity} from "@/modules/auth/domain/entities/auth-session-entity";

export default interface AuthUsecase {
    authenticate_user(
        jwt: JWT,
        login: string,
        password: string
    ): Promise<string>

    has_session(user_id: string): Promise<AuthSessionEntity | null>
}