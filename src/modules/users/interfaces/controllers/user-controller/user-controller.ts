import {FastifyReply, FastifyRequest, RouteOptions} from "fastify";
import {inject} from "inversify";
import ControllerModel from "@/shared/domain/models/controller-model";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";

export class UserController implements ControllerModel {
    options: RouteOptions[] = []
    private user_usecases: UserUseCases;

    constructor(@inject(TYPES.UserUseCases) user_usecases: UserUseCases) {
        this.user_usecases = user_usecases;
        this.options.push({
            method: "POST",
            url: "/user/create",
            handler: this.create_user,
        })
    }

    private create_user = async (request: FastifyRequest, reply: FastifyReply) => {
        reply.status(201).send({message: 'created'})
    }

}