import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { inject } from "inversify";
import UserUseCases from "modules/users/domain/usecases/user-usecases";
import ControllerModel from "shared/domain/models/controller-model";

export default class UserController extends ControllerModel {
  options: RouteOptions[] = []

  constructor(@inject('UserRepository') usecase: UserUseCases) {
    super()
    this.options.push({
      method: "POST",
      url: "/user/create",
      handler: this.create_user
    })
  }
  private create_user = async (request: FastifyRequest, reply: FastifyReply) => {
    
  }

}