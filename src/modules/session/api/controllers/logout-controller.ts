import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import {FastifyInstance, preHandlerHookHandler, RouteShorthandOptions} from "fastify";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import {SessionUsecase} from "@/shared/application/usecases/session-usecase";
import {LOGOUT_REQUEST_SCHEMA, LogoutResponse} from "@/modules/session/api/schemas/logout-schema";

@injectable()
export default class LogoutController extends AppControllerV1 {
    auth_middleware(server: FastifyInstance): preHandlerHookHandler {
        throw new Error("Method not implemented.");
    }
    constructor(
        @inject(TYPES.SessionUseCase) private session_usecase: SessionUsecase
    ) {
        super();
    }

    register(app: FastifyInstance, options?: RouteShorthandOptions): void {
        app.get<{
            Reply: LogoutResponse
        }>('/logout', {
                preHandler: [
                    app.verify_jwt,
                    app.verify_session
                ]
            }, async (request, reply) => {
                try {
                    await this.session_usecase.logout(LOGOUT_REQUEST_SCHEMA.parse(request.user))
                    return reply.status(200).send({message: 'logged_out'})
                } catch (e) {
                    app.log.error(e)
                    return reply.status(500).send({message: 'internal_server_error'})
                }
            }
        )
    }
}