import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/shared/application/usecases/user-usecases";
import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import {FastifyInstance, preHandlerHookHandler} from "fastify";
import {
    UserCreateBody,
    USER_CREATE_REQUEST_SCHEMA,
    UserCreateResponse,
    USER_CREATE_RESPONSE_SCHEMA
} from "@/modules/users/api/schemas/user-create-schemas";

import {
    UserUpdateBody,
    USER_UPDATE_REQUEST_SCHEMA,
    UserUpdateResponse
} from "@/modules/users/api/schemas/user-update-schemas";
import {JWT_PAYLOAD_SCHEMA} from "@/shared/api/schemas/jwt-payload-schema";
import {CannotCreateUser, UserAlreadyExist} from "@/modules/users/application/errors/create-errors";


export class UserController extends AppControllerV1 {
    auth_middleware(server: FastifyInstance): preHandlerHookHandler {
        throw new Error("Method not implemented.");
    }
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
                app.verify_session
            ]),
            schema: {
                body: USER_UPDATE_REQUEST_SCHEMA
            }
        }, async (request, reply) => {
            const {user_id} = JWT_PAYLOAD_SCHEMA.parse(request.user)
            try {
                const is_active = await this.user_usecases.is_active(user_id)

                if (!is_active && !Object.keys(request.body).some(s => ["email", "phone"].includes(s))) {
                    return reply.status(401).send({
                        message: 'user_is_inactive'
                    })
                }

                await this.user_usecases.update_user(user_id, request.body)

                reply.status(200).send({message: 'updated'})
            } catch (e) {
                reply.status(400).send({message: 'error'})
            }
        })
    }

    private user_create_route(app: FastifyInstance) {
        app.post<{
            Body: UserCreateBody,
            Reply: UserCreateResponse
        }>('/user/create', {
            schema: {
                response: {
                    201: USER_CREATE_RESPONSE_SCHEMA
                },
                body: USER_CREATE_REQUEST_SCHEMA
            }
        }, async (request, reply) => {
            app.log.info(`[+] Routing ${app.prefix}/user/create`)

            try {
                await this.user_usecases.create_user(request.body)
                reply.status(201).send({message: 'created'})
            } catch (e) {
                if (e instanceof UserAlreadyExist || e instanceof CannotCreateUser) {
                    app.log.error(e)
                    return reply.status(400).send({message: e.message})
                }

                return reply.status(500).send({message: 'internal_server_error'})
            }
        })
    }
}