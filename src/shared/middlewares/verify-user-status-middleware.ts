import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {JwtPayloadSchema} from "@/shared/domain/schemas/jwt-payload-schema";
import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";


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

            if (!request.headers.authorization) return reply.status(401).send({
                message: 'invalid_token'
            })

            const access_token = request.headers.authorization.split(' ')[1].trim();

            const payload = app.jwt.decode(access_token);

            if (!payload) return reply.status(401).send({
                message: 'invalid_token'
            })

            const decoded = JwtPayloadSchema.parse(payload)

            const is_user_active = await this.user_usecase.is_active(decoded.user_id)

            if (!is_user_active) return reply.status(401).send({
                message: 'user_is_inactive'
            })

            return
        })
    }
}