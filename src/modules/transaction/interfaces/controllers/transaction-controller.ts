import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { inject, injectable } from "inversify";
import TransactionRepository from "modules/transaction/infra/repositories/transaction-repository";
import ControllerModel from "shared/domain/models/controller-model";

@injectable()
export default class TransactionController implements ControllerModel {
  options: RouteOptions[] = []

  constructor(@inject('TransactionRepository') transaction_repository: TransactionRepository) { 
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