import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import {FastifyError, FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {TYPES} from "@/shared/infra/di/di-types";
import {inject} from "inversify";
import jwt from "@fastify/jwt";
import {SessionUsecase} from "@/modules/authentication/application/usecases/session-usecase";
import {jwtPayloadSchema} from "@/shared/api/schemas/jwt-payload-schema";

declare module 'fastify' {
    interface FastifyInstance {
        verify_jwt: (request: FastifyRequest, reply: FastifyReply) => void;
    }
}

export default class VerifyJwtMiddleware implements AppMiddleware {
    constructor(
        @inject(TYPES.SessionUseCase) private session_usecase: SessionUsecase
    ) {
    }

    register(app: FastifyInstance): void {
        app.register(jwt, {
            secret: 'secret',
            sign: {
                expiresIn: '1h'
            }
        });
        app.decorate('verify_jwt', async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify()
            } catch (err) {
                if ((err as FastifyError).code == 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED') {
                    const {session_id} = jwtPayloadSchema.parse(request.user);
                    await this.session_usecase.logout(session_id)
                }
                reply.send(err)
            }
        })
    }
}