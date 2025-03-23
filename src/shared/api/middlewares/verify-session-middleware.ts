import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import {jwtPayloadSchema} from "@/shared/api/schemas/jwt-payload-schema";
import {SessionUsecase} from "@/modules/authentication/application/usecases/session-usecase";

declare module 'fastify' {
    interface FastifyInstance {
        verify_user_session: (request: FastifyRequest, reply: FastifyReply) => void
    }
}

export default class VerifySessionMiddleware implements AppMiddleware {
    constructor(
        @inject(TYPES.SessionUseCase) private session_usecase: SessionUsecase
    ) {
    }

    register(app: FastifyInstance) {
        app.decorate('verify_user_session', async (
            request: FastifyRequest,
            reply: FastifyReply
        ) => {

            if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer')) {
                return reply.status(401).send({
                    message: 'invalid_token'
                })
            }

            const access_token = request.headers.authorization.split(' ')[1];

            const payload = app.jwt.decode(access_token);

            if (!payload) return reply.status(401).send({
                message: 'invalid_token'
            })

            const decoded = jwtPayloadSchema.parse(payload)

            const has_valid_session = await this.session_usecase.has_session(decoded.user_id)

            if (!has_valid_session) {
                return reply.status(401).send({
                    message: 'no_active_session'
                })
            }

            return
        })
    }
}