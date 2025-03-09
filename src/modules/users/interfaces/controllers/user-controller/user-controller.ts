import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import ControllerModel from "@/shared/domain/models/controller-model";
import {FastifyInstance} from "fastify";
import {z} from "zod";
import {validate_document} from "@/helpers/document";

const LoginSchema = z.object({
    document: z.string()
        .refine(validate_document, {
            message: 'É necessário fornecer um documento válido.',
            path: ['document'],
        }).optional(),
    email: z.string().email().optional(),
    password: z.string(),
}).refine(data => data.document || data.email, {
    message: 'É necessário fornecer um e-mail ou um documento.',
    path: ['document', 'email']
});

type LoginBody = z.infer<typeof LoginSchema>

export class UserController implements ControllerModel {
    private user_usecases: UserUseCases;

    constructor(
        @inject(TYPES.UserUseCases) user_usecases: UserUseCases
    ) {
        this.user_usecases = user_usecases;
    }

    register_routes(app: FastifyInstance): void {
        app.register(server => {
            server.post<{ Body: LoginBody }>('/login', {
                schema: {
                    body: LoginSchema
                }
            }, async (request, reply) => {
                server.log.info('[+] Route registered: /login')
                let login_schema = LoginSchema.parse(request.body);

                let token = await this.user_usecases.authenticate_user(
                    login_schema,
                    app.jwt
                );

                if (!token) {
                    return reply
                        .status(401)
                        .send({message: 'credenciais inválidas'})
                }

                reply.send({token: token})
            })
        }, {prefix: '/api/user'})
    }
}