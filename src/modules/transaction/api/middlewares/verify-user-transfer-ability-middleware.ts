import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/shared/application/usecases/user-usecases";
import {jwtPayloadSchema} from "@/shared/api/schemas/jwt-payload-schema";

declare module 'fastify' {
    interface FastifyInstance {
        verify_user_transfer_ability: (
            request: FastifyRequest,
            reply: FastifyReply
        ) => void
    }
}
export default class VerifyUserTransferAbilityMiddleware implements AppMiddleware {
    constructor(@inject(TYPES.UserUseCases) private user_usecases: UserUseCases) {
    }

    register(app: FastifyInstance): void {
        app.decorate('verify_user_transfer_ability', async (
            request: FastifyRequest,
            reply: FastifyReply
        ) => {

            const {user_type} = jwtPayloadSchema.parse(request.user);

            if (!user_type) {
                return reply.status(401).send({
                    message: 'invalid_token'
                })
            }

            if (user_type == 'pj') {
                return reply.status(403).send({
                    message: 'user_cannot_transfer'
                })
            }

            return
        })
    }

}