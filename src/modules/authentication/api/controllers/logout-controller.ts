import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import {FastifyInstance, RouteShorthandOptions} from "fastify";
import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import {SessionUsecase} from "@/modules/authentication/application/usecases/session-usecase";
import {LogoutRequestSchema, LogoutResponseSchema} from "@/modules/authentication/api/schemas/logout-schema";

export default class LogoutController extends AppControllerV1 {
    constructor(
        @inject(TYPES.SessionUseCase) private session_usecase: SessionUsecase
    ) {
        super();
    }

    register(server: FastifyInstance, options?: RouteShorthandOptions): void {
        server.get<{
            Body: LogoutRequestSchema,
            Reply: LogoutResponseSchema
        }>(
            '/logout',
            {
                preHandler: server.auth([
                    server.verify_jwt,
                    server.verify_user_session
                ])
            },
            async (
                request,
                reply
            ) => {
                await this.session_usecase.logout(request.body.session_id)
            }
        )
    }
}