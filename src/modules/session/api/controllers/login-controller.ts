import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "@/shared/infra/di/di-types";
import { FastifyInstance, preHandlerHookHandler, RouteShorthandOptions } from "fastify";
import { LoginRequest, LOGIN_REQUEST_SCHEMA } from "@/modules/session/api/schemas/login-schema";
import { SessionUsecase } from "@/shared/modules/session/session-usecase";
import { OperationError } from "@/shared/application/errors/operation-error";

@injectable()
export default class LoginController extends AppControllerV1 {
    auth_middleware(server: FastifyInstance): preHandlerHookHandler {
        throw new Error("Method not implemented.");
    }

    constructor(
        @inject(DI_TYPES.SessionUseCase) private login_usecase: SessionUsecase
    ) {
        super()
    }

    register(server: FastifyInstance, options?: RouteShorthandOptions): void {
        server.post<{ Body: LoginRequest }>('/login', {
            schema: {
                body: LOGIN_REQUEST_SCHEMA
            }
        }, async (request, reply) => {

            try {
                const payload = await this.login_usecase.login(request.body)
                const token = server.jwt.sign(payload)
                return reply.status(200).send({
                    message: 'success',
                    access_token: token
                })
            } catch (e) {
                if (e instanceof OperationError) {
                    return reply.status(e.code).send({
                        message: e.message
                    })
                }

                server.log.error(e)

                return reply.status(500).send({ message: 'internal_server_error' })
            }
        })
    }
}