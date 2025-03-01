import { inject, injectable } from "inversify";
import TransactionRepository from "../models/transaction-repository";
import UserRepository from "modules/users/domain/repositories/user-repository";

@injectable()
export default class TransactionUseCases {
  private transaction_repository: TransactionRepository;
  private use_repository: UserRepository;
  constructor(
    @inject('TransactionRepository') transaction_repository: TransactionRepository,
    @inject('UseRepository') user_repository: UserRepository
  ) {
    this.use_repository = user_repository;
    this.transaction_repository = transaction_repository;
  }
}