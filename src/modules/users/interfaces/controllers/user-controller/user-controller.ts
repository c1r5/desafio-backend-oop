import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import ControllerModel from "@/shared/domain/models/controller-model";
import {FastifyInstance} from "fastify";


export class UserController implements ControllerModel {
    private user_usecases: UserUseCases;

    constructor(
        @inject(TYPES.UserUseCases) user_usecases: UserUseCases
    ) {
        this.user_usecases = user_usecases;
    }

    register_routes(app: FastifyInstance): void {
        throw new Error("Method not implemented.");
    }
}