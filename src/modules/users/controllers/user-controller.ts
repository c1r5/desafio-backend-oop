import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import AppController from "@/shared/domain/controllers/app-controller";
import {FastifyInstance} from "fastify";


export class UserController implements AppController {
    private user_usecases: UserUseCases;

    constructor(
        @inject(TYPES.UserUseCases) user_usecases: UserUseCases
    ) {
        this.user_usecases = user_usecases;
    }

    register(app: FastifyInstance): void {
        throw new Error("Method not implemented.");
    }
}