import {inject, injectable} from "inversify";
import TransactionEntity from "modules/transaction/domain/entities/transaction-entity";
import TransactionRepository from "modules/transaction/domain/models/transaction-repository";
import { Repository } from "typeorm";
import AppDataSource from "../../../../shared/infra/datasources/app-data-source";
import {TYPES} from "@shared/infra/di/di-types";

@injectable()
export default class TransactionRepositoryImpl implements TransactionRepository {
  orm_repo: Repository<TransactionEntity>;

  constructor(@inject(TYPES.AppDataSource) app_data_source: AppDataSource) {
    this.orm_repo = app_data_source.datasource.getRepository(TransactionEntity)
  }
}