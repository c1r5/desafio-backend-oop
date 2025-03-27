import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import {FastifyInstance, RouteShorthandOptions} from "fastify";
import {LoginRequest, LoginRequestSchema} from "@/modules/session/api/schemas/login-schema";
import {SessionUsecase} from "@/shared/application/usecases/session-usecase";
import FieldValidationInterface from "@/shared/domain/models/field/field-validation-interface";
import CpfDocument from "@/shared/domain/models/field/cpf-document";
import CnpjDocument from "@/shared/domain/models/field/cnpj-document";
import Email from "@/shared/domain/models/field/email";
import {CPF_REGEX} from "@/shared/application/helpers";
import Password from "@/shared/domain/models/field/password";
import {LoginError} from "@/modules/session/application/errors/login-errors";

@injectable()
export default class LoginController extends AppControllerV1 {

    constructor(
        @inject(TYPES.SessionUseCase) private login_usecase: SessionUsecase
    ) {
        super()
    }

    register(server: FastifyInstance, options?: RouteShorthandOptions): void {
        server.post<{ Body: LoginRequest }>('/login', {
            schema: {
                body: LoginRequestSchema
            }
        }, async (request, reply) => {
            const {
                document,
                email,
                password
            } = request.body;

            let login: FieldValidationInterface | undefined

            if (document && !email) {
                login = document.match(CPF_REGEX) ? new CpfDocument(document) : new CnpjDocument(document)
            } else if (email && !document) {
                login = new Email(email)
            }

            if (!login) {
                return reply.status(400).send({message: 'invalid_credentials'})
            }

            try {
                const pwd = new Password(password)
                const payload = await this.login_usecase.login(login, pwd)
                const token = server.jwt.sign(payload)
                return reply.status(200).send({
                    message: 'success',
                    access_token: token
                })
            } catch (e) {
                if (e instanceof LoginError) {
                    return reply.status(e.code).send({
                        message: e.message
                    })
                }

                server.log.error(e)

                return reply.status(500).send({message: 'internal_server_error'})
            }
        })
    }
}