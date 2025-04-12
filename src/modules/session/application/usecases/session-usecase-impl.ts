import { LoginResult, SessionUsecase } from "@/shared/modules/session/session-usecase";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "@/shared/infra/di/di-types";
import SessionRepository from "@/shared/modules/session/session-repository";
import UserRepository from "@/shared/modules/user/user-repository";
import { HasActiveSession, InvalidCredentials, UserNotFound } from "@/shared/application/errors/operation-error";
import { LogoutRequest } from "@/modules/session/api/schemas/logout-schema";
import { LoginRequest } from "../../api/schemas/login-schema";

@injectable()
export default class SessionUsecaseImpl implements SessionUsecase {
    constructor(
        @inject(DI_TYPES.SessionRepository) private session_repository: SessionRepository,
        @inject(DI_TYPES.UserRepository) private user_repository: UserRepository
    ) {
    }

    async logout(logout: LogoutRequest): Promise<void> {
        const session = await this.session_repository.find_session(logout.user_id)

        if (!session) throw new InvalidCredentials()

        await this.session_repository.revoke_session(session)
    }

    async has_session(user_id: string): Promise<boolean> {
        const session = await this.session_repository.find_session(user_id)

        if (!session) return false

        return session.is_active;
    }

    async login(value: LoginRequest): Promise<LoginResult> {
        const { document, email, password } = value

        const user_entity = await this.user_repository.orm.findOneBy([
            { document, password },
            { email, password }
        ])

        if (!user_entity) throw new UserNotFound()

        const has_active_session = await this.has_session(user_entity.user_id)

        if (has_active_session) throw new HasActiveSession()

        const session_entity = await this.session_repository.new_session(user_entity.user_id)

        return {
            user_id: user_entity.user_id,
            session_id: session_entity.session_id,
            user_type: user_entity.user_type
        }
    }
}