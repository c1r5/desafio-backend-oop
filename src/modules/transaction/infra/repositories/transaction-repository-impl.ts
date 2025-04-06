import { inject, injectable } from "inversify";
import TransactionEntity from "@/modules/transaction/domain/models/transaction-model";
import TransactionRepository from "@/shared/modules/transaction/transaction-repository";
import { DataSource, Repository } from "typeorm";
import { TYPES } from "@/shared/infra/di/di-types";

@injectable()
export default class TransactionRepositoryImpl implements TransactionRepository {
    orm_repo: Repository<TransactionEntity>;

    constructor(@inject(TYPES.DataSource) private datasource: DataSource) {
        this.orm_repo = datasource.getRepository(TransactionEntity)
    }


}