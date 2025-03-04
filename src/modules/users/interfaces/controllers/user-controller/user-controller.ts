import {FastifyReply, FastifyRequest, RouteOptions} from "fastify";
import {inject} from "inversify";
import ControllerModel from "@/shared/domain/models/controller-model";
import {TYPES} from "@/shared/infra/di/di-types";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import UserEntity from "@/modules/users/domain/entities/user-entity";

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
        try {
            let user_id = await this.user_usecases.create_user(request.body as Partial<UserEntity>);
            reply.status(201).send({
                message: 'created',
                user_id: user_id
            })
        } catch (e) {
            if (e instanceof Error) {
                reply.status(400).send({
                    message: e.message
                })
            } else {
                reply.status(500).send({
                    message: 'Internal Server Error'
                })
            }
        }

    }

}