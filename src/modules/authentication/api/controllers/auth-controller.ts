import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import {inject, injectable} from "inversify";
import AuthUsecase from "@/modules/authentication/application/usecases/auth-usecase";
import {TYPES} from "@/shared/infra/di/di-types";
import {FastifyInstance} from "fastify";
import {
    LoginBody,
    LoginBodySchema,
    LoginResponse,
    LoginResponseSchema,
    LogoutResponse,
    LogoutResponseSchema
} from "@/modules/authentication/api/schemas/login-schema";
import {
    HasActiveSessionAuthError,
    LogoutAuthError,
    UserNotFoundAuthError
} from "@/modules/authentication/api/errors/auth-errors";

@injectable()
export default class AuthController extends AppControllerV1 {
    constructor(
        @inject(TYPES.AuthUsecase) private auth_usecase: AuthUsecase,
    ) {
        super()
    }

    register(app: FastifyInstance): void {
        app.get<{ Reply: LogoutResponse }>('/logout',
            {
                onRequest: [
                    app.verify_jwt,
                    app.validate_user_session,
                    app.validate_user
                ],
                schema: {
                    response: {
                        200: LogoutResponseSchema
                    }
                }
            },
            async (request, reply) => {
                try {
                    await this.auth_usecase.logout(
                        app.jwt,
                        request.headers.authorization
                    )

                    return reply.status(200).send({message: 'logged_out'})
                } catch (e) {
                    if (e instanceof LogoutAuthError) {
                        return reply.status(400).send({message: e.message})
                    }

                    return reply.status(500).send({message: 'internal_server_error'})
                }
            });

        app.post<{ Body: LoginBody, Reply: LoginResponse }>('/login',
            {
                schema: {
                    body: LoginBodySchema,
                    response: {
                        200: LoginResponseSchema
                    },
                }
            },
            async (request, reply) => {
                const login = request.body.document || request.body.email

                if (!login) return reply.status(400).send({message: 'invalid_credentials'})

                try {
                    let token = await this.auth_usecase.authenticate_user(app.jwt, login, request.body.password)
                    return reply.status(200).send({
                        message: 'success',
                        access_token: token
                    })
                } catch (e) {

                    if (e instanceof UserNotFoundAuthError) {
                        return reply.status(400).send({message: 'invalid_credentials'})
                    }

                    if (e instanceof HasActiveSessionAuthError) {
                        return reply.status(403).send({message: 'has_active_session'})
                    }

                    return reply.status(500).send({message: 'internal_server_error'})
                }
            })
    }
}