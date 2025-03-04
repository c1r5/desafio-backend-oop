import {FastifyReply, FastifyRequest, RouteOptions} from "fastify";
import {inject} from "inversify";
import UserUseCasesImpl from "@/modules/users/infra/usecases/user-use-cases-impl";
import ControllerModel from "@/shared/domain/models/controller-model";
import {TYPES} from "@/shared/infra/di/di-types";

export class UserController extends ControllerModel {
    options: RouteOptions[] = []
    private user_usecases: UserUseCasesImpl;

    constructor(@inject(TYPES.UserUseCases) user_usecases: UserUseCasesImpl) {
        super()
        this.user_usecases = user_usecases;
        this.options.push({
            method: "POST",
            url: "/user/create",
            handler: this.create_user,
            schema: {
                body: {
                    type: "object",
                    properties: {
                        name: {type: "string"},
                        email: {type: "string"},
                        document: {type: "string"},
                        password: {type: "string"}
                    }
                }
            }
        })
    }

    private create_user = async (request: FastifyRequest, reply: FastifyReply) => {

    }

}