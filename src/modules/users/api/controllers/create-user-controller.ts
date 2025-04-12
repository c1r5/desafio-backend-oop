import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import { TYPES } from "@/shared/infra/di/di-types";
import { FastifyInstance, RouteShorthandOptions, preHandlerHookHandler } from "fastify";
import { inject } from "inversify";
import { UserCreateRequest, UserCreateResponse } from "../schemas/user-create-schemas";
import { UserEmail } from "@/shared/domain/values/email";
import { UserPassword } from "@/shared/domain/values/password";
import { UserPhone } from "@/shared/domain/values/phone";
import { UserDocument } from "@/shared/domain/values/user-document";
import UserUseCases from "@/shared/modules/user/user-usecases";

export class CreateUserController extends AppControllerV1 {
  constructor(
    @inject(TYPES.UserUseCases) private create_user_usecase: UserUseCases,
  ) {
    super();
  }
  register(server: FastifyInstance, options?: RouteShorthandOptions): void {
    server.post<{
      Body: UserCreateRequest,
      Reply: UserCreateResponse
    }>('/user/create', {}, async (request, reply) => {
      try {
        await this.create_user_usecase.create_user({
          email: UserEmail.from(request.body.email),
          password: UserPassword.from(request.body.password),
          name: request.body.name,
          document: UserDocument.from(request.body.document),
          phone: UserPhone.from(request.body.phone),
        })
        reply.status(201).send({ message: 'created' })
      } catch (e) {
        reply.status(400).send({ message: 'error' })
      }
    })
  }
  
  auth_middleware(server: FastifyInstance): preHandlerHookHandler {
    throw new Error("Method not implemented.");
  }
}