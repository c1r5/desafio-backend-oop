import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import {FastifyInstance, RouteShorthandOptions} from "fastify";
import {LoginRequest, LoginResponse} from "@/modules/authentication/api/schemas/login-schema";
import {LoginUsecase} from "@/modules/authentication/application/usecases/login-usecase";
import FormValidation from "@/shared/domain/models/form-validation";
import CpfDocument from "@/shared/domain/models/cpf-document";
import CnpjDocument from "@/shared/domain/models/cnpj-document";
import Email from "@/shared/domain/models/email";
import {CPF_REGEX} from "@/shared/application/helpers";
import Password from "@/shared/domain/models/password";
import {LoginError} from "@/modules/authentication/api/errors/login-errors";

@injectable()
export default class SessionController extends AppControllerV1 {

    constructor(
        @inject(TYPES.LoginUsecase) private login_usecase: LoginUsecase
    ) {
        super()
    }

    register(server: FastifyInstance, options?: RouteShorthandOptions): void {
        server.post<{ Body: LoginRequest, Reply: LoginResponse }>('/login', {}, async (request, reply) => {
            const {
                document,
                email,
                password
            } = request.body;

            let login: FormValidation

            if (document) {
                login = document.match(CPF_REGEX) ? new CpfDocument(document) : new CnpjDocument(document)
            } else if (email) {
                login = new Email(email)
            } else {
                return reply.status(400).send({message: 'invalid_credentials'})
            }

            if (!login.is_valid()) {
                return reply.status(400).send({message: 'invalid_credentials'})
            }

            try {
                const pwd = new Password(password)
                const data = await this.login_usecase.login(login, pwd)
                const token = server.jwt.sign(data)
                return reply.status(200).send({
                    message: 'success',
                    access_token: token
                })
            } catch (e) {
                if (e instanceof LoginError) {
                    return reply.status(e.code).send({message: e.message})
                }

                server.log.error(e)

                return reply.status(500).send({message: 'internal_server_error'})
            }
        })
    }
}