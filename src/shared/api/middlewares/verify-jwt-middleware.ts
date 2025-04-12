import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { DI_TYPES } from "@/shared/infra/di/di-types";
import { inject } from "inversify";
import { SessionUsecase } from "@/shared/modules/session/session-usecase";
import { JWT_PAYLOAD_SCHEMA } from "@/shared/api/schemas/jwt-payload-schema";

declare module 'fastify' {
    interface FastifyInstance {
        verify_jwt: (request: FastifyRequest, reply: FastifyReply) => void;
    }
}

export default class VerifyJwtMiddleware implements AppMiddleware {
    constructor(
        @inject(DI_TYPES.SessionUseCase) private session_usecase: SessionUsecase
    ) {
    }

    register(app: FastifyInstance): void {
        app.decorate('verify_jwt', async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify()
            } catch (err) {
                if ((err as FastifyError).code == 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED') {
                    await this.session_usecase.logout(JWT_PAYLOAD_SCHEMA.parse(request.user))
                }
                reply.send(err)
            }
        })
    }
}