import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { inject, injectable } from "inversify";
import Transaction from "modules/transaction/domain/entities/transaction-entity";
import TransactionRepository from "modules/transaction/domain/repositories/transaction-repository";
import ControllerModel from "shared/domain/models/controller-model";

@injectable()
export default class TransactionController implements ControllerModel {
  options: RouteOptions[] = []

  constructor(@inject('TransactionRepository') transaction_repository: TransactionRepository<Transaction>) { 
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