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

import {
    UserUpdateBody,
    userUpdateBodySchema,
    UserUpdateResponse
} from "@/modules/users/api/schemas/user-update-schemas";
import {jwtPayloadSchema} from "@/shared/api/schemas/jwt-payload-schema";


export class UserController extends AppControllerV1 {
    constructor(
        @inject(TYPES.UserUseCases) private user_usecases: UserUseCases
    ) {
        super()
    }

    register(app: FastifyInstance): void {
        this.user_create_route(app)
        this.user_update_route(app)
    }

    private user_update_route(app: FastifyInstance) {
        app.post<{
            Body: UserUpdateBody,
            Reply: UserUpdateResponse
        }>('/user/update', {
            preHandler: app.auth([
                app.verify_jwt,
                app.verify_user_session
            ]),
            schema: {
                body: userUpdateBodySchema
            }
        }, async (request, reply) => {
            const {user_id} = jwtPayloadSchema.parse(request.user)
            const is_active = await this.user_usecases.is_active(user_id)

            if (!is_active && !Object.keys(request.body).some(s => ["email", "phone"].includes(s))) {
                return reply.status(401).send({
                    message: 'user_is_inactive'
                })
            }

            const updated_user = await this.user_usecases.update_user(user_id, request.body)

            if (!updated_user) return reply.status(500).send({
                message: 'not_updated'
            })

            reply.status(200).send({
                user_id: updated_user.user_id,
                message: 'updated'
            })
        })
    }

    private user_create_route(app: FastifyInstance) {
        app.post<{
            Body: UserCreateBody,
            Reply: UserCreateResponse
        }>('/user/create', {
            schema: {
                response: {
                    201: userCreateResponseSchema
                },
                body: userCreateBodySchema
            }
        }, async (request, reply) => {
            app.log.info(`[+] Routing ${app.prefix}/user/create`)
            const {body} = request;

            const CNPJ_REGEX = /^(\d{2}\.?(\d{3}\.?(\d{3})\/?0001-?\d{2}))/;
            const CPF_REGEX = /^(\d{3})\.?(\d{3})\.?(\d{3})-?(\d{2})$/;

            body.type = body.document?.match(CNPJ_REGEX) ? 'pj' : body.document?.match(CPF_REGEX) ? 'pf' : ''

            const new_userid = await this.user_usecases.create_user(request.body)

            reply.status(201)
                .send({
                    message: 'created',
                    user_id: new_userid
                })
        })
    }
}