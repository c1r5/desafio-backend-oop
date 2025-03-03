import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { inject } from "inversify";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import ControllerModel from "@/shared/domain/models/controller-model";
import {TYPES} from "@/shared/infra/di/di-types";

export class UserController extends ControllerModel {
  options: RouteOptions[] = []

  constructor(@inject(TYPES.UserUseCases) user_usecases: UserUseCases) {
    super()
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
            password: {type: "string"},
            document: {type: "string"}
          }
        }
      }
    })
  }
  private create_user = async (request: FastifyRequest, reply: FastifyReply) => {

  }

}