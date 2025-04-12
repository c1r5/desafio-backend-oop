import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { inject } from "inversify";
import { DI_TYPES } from "@/shared/infra/di/di-types";
import { SessionUsecase } from "@/shared/modules/session/session-usecase";
import { JWT_PAYLOAD_SCHEMA } from "@/shared/api/schemas/jwt-payload-schema";

declare module 'fastify' {
    interface FastifyInstance {
        verify_session: (request: FastifyRequest, reply: FastifyReply) => void
    }
}

export default class VerifySessionMiddleware implements AppMiddleware {
    constructor(
        @inject(DI_TYPES.SessionUseCase) private session_usecase: SessionUsecase
    ) {
    }

    register(app: FastifyInstance) {
        app.decorate('verify_session', async (
            request: FastifyRequest,
            reply: FastifyReply
        ) => {
            const { user_id } = JWT_PAYLOAD_SCHEMA.parse(request.user)
            //
            const is_valid_session = await this.session_usecase.has_session(user_id)

            if (!is_valid_session) return reply.status(401).send({
                message: 'invalid_session'
            })

            return
        })
    }
}