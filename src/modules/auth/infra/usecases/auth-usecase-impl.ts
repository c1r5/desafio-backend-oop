import AuthUsecase from "@/modules/auth/domain/usecases/auth-usecase";
import UserRepository from "@/modules/users/domain/repositories/user-repository";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import {JWT} from "@fastify/jwt";
import {AuthErrorNotFound} from "@/modules/auth/errors/auth-errors";
import AuthRepository from "@/modules/auth/domain/repositories/auth-repository";

@injectable()
export default class AuthUsecaseImpl implements AuthUsecase {
    constructor(
        @inject(TYPES.UserRepository) private user_repository: UserRepository,
        @inject(TYPES.AuthRepository) private auth_repository: AuthRepository
    ) {
    }

    async authenticate_user(jwt: JWT, login: string, password: string): Promise<string> {
        let user_entity = await this.user_repository.orm.findOneBy([
            {email: login, password: password},
            {document: login, password: password},
        ])

        if (!user_entity) {
            throw new AuthErrorNotFound('user_not_found');
        }

        let session = await this.auth_repository.new_session(user_entity.userId)

        return jwt.sign({
            user_id: user_entity.userId,
            user_type: user_entity.type,
            session_id: session.sid,
        })
    }
};