import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import {FastifyError, FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import AuthUsecase from "@/modules/authentication/application/usecases/auth-usecase";
import {TYPES} from "@/shared/infra/di/di-types";
import {inject} from "inversify";
import jwt from "@fastify/jwt";

declare module 'fastify' {
    interface FastifyInstance {
        verify_jwt: (request: FastifyRequest, reply: FastifyReply) => void;
    }
}

export default class VerifyJwtMiddleware implements AppMiddleware {
    constructor(
        @inject(TYPES.AuthUsecase) private auth_usecase: AuthUsecase
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
                    await this.auth_usecase.logout(app.jwt, request.headers.authorization)
                }
                reply.send(err)
            }
        })
    }
}