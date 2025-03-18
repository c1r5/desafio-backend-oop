import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import AuthUsecase from "@/modules/authentication/application/usecases/auth-usecase";
import {jwtPayloadSchema} from "@/shared/api/schemas/jwt-payload-schema";

declare module 'fastify' {
    interface FastifyInstance {
        validate_user_session: (request: FastifyRequest, reply: FastifyReply) => void
    }
}

export default class VerifySessionMiddleware implements AppMiddleware {
    constructor(
        @inject(TYPES.AuthUsecase) private auth_usecase: AuthUsecase
    ) {
    }

    register(app: FastifyInstance) {
        app.decorate('validate_user_session', async (
            request: FastifyRequest,
            reply: FastifyReply) => {

            if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer')) return reply.status(401).send({
                message: 'invalid_token'
            })

            const access_token = request.headers.authorization.split(' ')[1];

            const payload = app.jwt.decode(access_token);

            if (!payload) return reply.status(401).send({
                message: 'invalid_token'
            })

            const decoded = jwtPayloadSchema.parse(payload)

            const has_valid_session = await this.auth_usecase.has_session(decoded.user_id)

            if (!has_valid_session || !has_valid_session.is_active) {
                return reply.status(401).send({
                    message: 'no_active_session'
                })
            }

            return
        })
    }
}