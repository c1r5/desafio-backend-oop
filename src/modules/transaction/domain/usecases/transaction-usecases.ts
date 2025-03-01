import { inject, injectable } from "inversify";
import TransactionRepository from "../models/transaction-repository";
import UserRepository from "modules/users/domain/repositories/user-repository";

@injectable()
export default class TransactionUseCases {
  constructor(
    @inject('TransactionRepository') private transactionRepository: TransactionRepository,
    @inject('UseRepository') private useRepository: UserRepository
  ) {}
}