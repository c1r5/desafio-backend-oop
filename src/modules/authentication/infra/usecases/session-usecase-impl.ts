import {LoginResult, SessionUsecase} from "@/modules/authentication/application/usecases/session-usecase";
import FormValidation from "@/shared/domain/models/form-validation";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import SessionRepository from "@/modules/authentication/domain/repositories/session-repository";
import UserRepository from "@/modules/users/domain/repositories/user-repository";
import {InvalidCredentials} from "@/modules/authentication/api/errors/login-errors";

@injectable()
export default class SessionUsecaseImpl implements SessionUsecase {
    constructor(
        @inject(TYPES.SessionRepository) private session_repository: SessionRepository,
        @inject(TYPES.UserRepository) private user_repository: UserRepository
    ) {
    }

    logout(session_id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async has_session(user_id: string): Promise<boolean> {
        return !!(await this.session_repository.find_session(user_id))
    }

    async login(login: FormValidation, password: FormValidation): Promise<LoginResult> {
        const user_entity = await this.user_repository.orm.findOneBy([
            {document: login.value, password: password.value},
        ])

        if (!user_entity) throw new InvalidCredentials()

        const session_entity = await this.session_repository.new_session(user_entity.user_id)

        return {
            user_id: user_entity.user_id,
            session_id: session_entity.session_id,
            email: user_entity.email,
            type: user_entity.type
        }
    }
}