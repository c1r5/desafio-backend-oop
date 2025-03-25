import {LoginResult, SessionUsecase} from "@/shared/application/usecases/session-usecase";
import FieldValidation from "@/shared/domain/models/field-validation";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import SessionRepository from "@/shared/domain/repositories/session-repository";
import UserRepository from "@/shared/domain/repositories/user-repository";
import {InvalidCredentials, UserNotFound} from "@/modules/authentication/api/errors/login-errors";
import {LogoutRequest} from "@/modules/authentication/api/schemas/logout-schema";

@injectable()
export default class SessionUsecaseImpl implements SessionUsecase {
    constructor(
        @inject(TYPES.SessionRepository) private session_repository: SessionRepository,
        @inject(TYPES.UserRepository) private user_repository: UserRepository
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

    async login(login: FieldValidation, password: FieldValidation): Promise<LoginResult> {
        if (!login.is_valid()) throw new InvalidCredentials(login.type)

        if (!password.is_valid()) throw new InvalidCredentials(password.type)

        const user_entity = await this.user_repository.orm.findOneBy([
            {document: login.value, password: password.value},
            {email: login.value, password: password.value}
        ])

        if (!user_entity) throw new UserNotFound()

        const session_entity = await this.session_repository.new_session(user_entity.user_id)

        return {
            user_id: user_entity.user_id,
            session_id: session_entity.session_id,
            user_type: user_entity.type
        }
    }
}