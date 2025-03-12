import AuthUsecase from "@/modules/auth/domain/usecases/auth-usecase";
import UserRepository from "@/modules/users/domain/repositories/user-repository";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import {JWT} from "@fastify/jwt";
import {HasActiveSessionAuthError, UserNotFoundAuthError} from "@/modules/auth/errors/auth-errors";
import AuthRepository from "@/modules/auth/domain/repositories/auth-repository";
import {AuthSessionEntity} from "@/modules/auth/domain/entities/auth-session-entity";

@injectable()
export default class AuthUsecaseImpl implements AuthUsecase {
    constructor(
        @inject(TYPES.UserRepository) private user_repository: UserRepository,
        @inject(TYPES.AuthRepository) private auth_repository: AuthRepository
    ) {
    }

    async has_session(user_id: string): Promise<AuthSessionEntity | null> {
        let session = await this.auth_repository.orm.findOneBy({userId: user_id})

        return (!session || !session.is_active) ? null : session
    }

    async authenticate_user(jwt: JWT, login: string, password: string): Promise<string> {
        let user_entity = await this.user_repository.orm.findOneBy([
            {email: login, password: password},
            {document: login, password: password},
        ])

        if (!user_entity) {
            throw new UserNotFoundAuthError('user_not_found');
        }

        let has_session = await this.has_session(user_entity.userId)

        if (has_session) {
            throw new HasActiveSessionAuthError()
        }

        let session = await this.auth_repository.new_session(user_entity.userId)

        return jwt.sign({
            user_id: user_entity.userId,
            user_type: user_entity.type,
            session_id: session.sid,
        })
    }
};