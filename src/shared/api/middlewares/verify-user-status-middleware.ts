import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {JWT_PAYLOAD_SCHEMA} from "@/shared/api/schemas/jwt-payload-schema";
import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/shared/modules/user/user-usecases";


declare module 'fastify' {
    interface FastifyInstance {
        validate_user: (request: FastifyRequest, reply: FastifyReply) => void
    }
}

export default class VerifyUserStatusMiddleware implements AppMiddleware {
    constructor(
        @inject(TYPES.UserUseCases) private user_usecase: UserUseCases
    ) {
    }

    register(app: FastifyInstance): void {
        app.decorate('validate_user', async (
            request: FastifyRequest,
            reply: FastifyReply) => {

            const {
                user
            } = request;

            const parsed = JWT_PAYLOAD_SCHEMA.parse(user)

            const is_user_active = await this.user_usecase.is_active(parsed.user_id)

            if (!is_user_active) return reply.status(401).send({
                message: 'user_is_inactive'
            })

            return
        })
    }
}