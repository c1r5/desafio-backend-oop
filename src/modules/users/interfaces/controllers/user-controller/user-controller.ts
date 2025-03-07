import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import ControllerModel from "@/shared/domain/models/controller-model";
import {FastifyInstance} from "fastify";

interface LoginBody {
    document: string;
    password: string;
}

export class UserController implements ControllerModel {
    private user_usecases: UserUseCases;

    constructor(
        @inject(TYPES.UserUseCases) user_usecases: UserUseCases
    ) {
        this.user_usecases = user_usecases;
    }

    register_routes(app: FastifyInstance): void {
        app.register(server => {
            server.post<{ Body: LoginBody }>('/login', async (request, reply) => {
                server.log.info('[+] Route registered: /login')
                let token = await this.user_usecases.authenticate_user(
                    request.body,
                    app.jwt
                );

                reply.send({token: token})
            })
        }, {prefix: '/api/user'})
    }
}