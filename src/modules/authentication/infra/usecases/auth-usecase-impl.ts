import AuthUsecase from "@/modules/authentication/domain/usecases/auth-usecase";
import UserRepository from "@/modules/users/domain/repositories/user-repository";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import {JWT} from "@fastify/jwt";
import {
    HasActiveSessionAuthError,
    LogoutAuthError,
    UserNotFoundAuthError
} from "@/modules/authentication/errors/auth-errors";
import AuthRepository from "@/modules/authentication/domain/repositories/auth-repository";
import {AuthSessionEntity} from "@/modules/authentication/domain/entities/auth-session-entity";
import {JwtPayloadSchema} from "@/shared/domain/schemas/jwt-payload-schema";

@injectable()
export default class AuthUsecaseImpl implements AuthUsecase {
    constructor(
        @inject(TYPES.UserRepository) private user_repository: UserRepository,
        @inject(TYPES.AuthRepository) private auth_repository: AuthRepository
    ) {
    }

    async logout(jwt: JWT, authorization: string | undefined): Promise<void> {
        if (!authorization) throw new LogoutAuthError('invalid_token');

        const auth_token = authorization.split(' ')[1];

        const decoded_payload = jwt.decode(auth_token);

        if (!decoded_payload) throw new LogoutAuthError('invalid_token')

        const payload = JwtPayloadSchema.parse(decoded_payload);

        const has_session_active = await this.has_session(payload.user_id);

        if (!has_session_active) throw new LogoutAuthError('no_session_active')

        await this.auth_repository.revoke_session(has_session_active)

        return
    }

    async has_session(user_id: string): Promise<AuthSessionEntity | null> {
        let session = await this.auth_repository.find_session(user_id)

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

        let has_session = await this.has_session(user_entity.user_id)

        if (has_session) {
            throw new HasActiveSessionAuthError()
        }

        let session = await this.auth_repository.new_session(user_entity.user_id)

        return jwt.sign({
            user_id: user_entity.user_id,
            user_type: user_entity.type,
            session_id: session.sid,
        })
    }
};