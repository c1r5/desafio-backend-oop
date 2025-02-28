import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { inject, injectable } from "inversify";
import TransactionEntity from "modules/transaction/domain/entities/transaction-entity";
import TransactionRepository from "modules/transaction/domain/repositories/transaction-repository";
import ControllerModel from "shared/domain/models/controller-model";

@injectable()
export default class TransactionController implements ControllerModel {
  options: RouteOptions = {
    method: "POST",
    url: "/transaction/:transaction_type",
    handler: this.create_transaction
  }

  constructor(@inject('TransactionRepository') transaction_repository: TransactionRepository<TransactionEntity>) { }

  private create_transaction(request: FastifyRequest, reply: FastifyReply) {
    reply.send('ok')
  }

}