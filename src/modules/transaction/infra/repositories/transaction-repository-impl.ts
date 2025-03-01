import { injectable } from "inversify";
import TransactionEntity from "modules/transaction/domain/entities/transaction-entity";
import TransactionRepository from "modules/transaction/domain/models/transaction-repository";
import { DataSource, Repository } from "typeorm";

@injectable()
export default class TransactionRepositoryImpl implements TransactionRepository {
  repo: Repository<TransactionEntity>;

  constructor(datasource: DataSource) {
    this.repo = datasource.getRepository(TransactionEntity)
  }
}