import { injectable } from "inversify";
import Transaction from "modules/transaction/domain/entities/transaction-entity";
import TransactionRepository from "modules/transaction/domain/repositories/transaction-repository";

@injectable()
export default class TransactionRepositoryImpl implements TransactionRepository<Transaction> {
  constructor() { }
}