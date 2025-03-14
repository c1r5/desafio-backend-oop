import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/application/usecases/user-usecases";
import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import {FastifyInstance} from "fastify";
import {
    UserCreateBody,
    userCreateBodySchema,
    UserCreateResponse,
    userCreateResponseSchema
} from "@/modules/users/api/schemas/user-create-schemas";
import UserFactory from "@/modules/users/factories/user-factory";


export class UserController extends AppControllerV1 {
    constructor(
        @inject(TYPES.UserUseCases) private user_usecases: UserUseCases
    ) {
        super()
    }

    register(app: FastifyInstance): void {
        app.post<{
            Body: UserCreateBody,
            Reply: UserCreateResponse
        }>('/user/create', {
            schema: {
                body: userCreateBodySchema,
                response: {
                    201: userCreateResponseSchema
                }
            }
        }, async (request, reply) => {

            try {
                const user_factory = UserFactory.create_user(request.body)

                if (!user_factory) return reply.status(400).send({
                    message: 'user_create_failed'
                })

                const user_id = await this.user_usecases.create_user(user_factory)

                return reply.status(201).send({
                    user_id,
                    message: 'user_created'
                })

            } catch (e) {

                return reply.status(500).send({
                    message: 'internal_server_error'
                })
            }
        })
    }
}