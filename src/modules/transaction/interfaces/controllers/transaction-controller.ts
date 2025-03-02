import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { inject, injectable } from "inversify";
import TransactionUseCases from "modules/transaction/domain/usecases/transaction-usecases";
import ControllerModel from "shared/domain/models/controller-model";
import {TYPES} from "@/shared/infra/di/di-types";

@injectable()
export default class TransactionController implements ControllerModel {
  options: RouteOptions[] = []

  constructor(@inject(TYPES.TransactionUseCases) transaction_usecases: TransactionUseCases ) {
    this.options.push({
      method: "POST",
      url: "/transaction/:transaction_type",
      handler: this.create_transaction
    })
  }

  private create_transaction = async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send('ok')
  }

}