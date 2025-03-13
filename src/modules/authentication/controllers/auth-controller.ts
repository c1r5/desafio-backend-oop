import ControllerModel from "@/shared/domain/models/controller-model";
import {inject, injectable} from "inversify";
import AuthUsecase from "@/modules/authentication/domain/usecases/auth-usecase";
import {TYPES} from "@/shared/infra/di/di-types";
import {FastifyInstance} from "fastify";
import {
    LoginBody,
    LoginBodySchema,
    LoginResponse,
    LoginResponseSchema,
    LogoutResponse,
    LogoutResponseSchema
} from "@/modules/authentication/domain/schemas/login-schema";
import {
    HasActiveSessionAuthError,
    LogoutAuthError,
    UserNotFoundAuthError
} from "@/modules/authentication/errors/auth-errors";

@injectable()
export default class AuthController implements ControllerModel {
    constructor(
        @inject(TYPES.AuthUsecase) private auth_usecase: AuthUsecase,
    ) {
    }

    register_routes(app: FastifyInstance): void {
        app.get<{ Reply: LogoutResponse }>('/logout', {
            onRequest: [app.authenticate],
            schema: {
                response: {
                    200: LogoutResponseSchema
                }
            }
        }, async (request, reply) => {
            await request.jwtVerify()

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

        app.post<{ Body: LoginBody, Reply: LoginResponse }>('/login', {
            schema: {
                body: LoginBodySchema,
                response: {
                    200: LoginResponseSchema
                },
            }
        }, async (request, reply) => {
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