import {inject, injectable} from "inversify";
import TransactionEntity from "@/modules/transaction/domain/entities/transaction-entity";
import TransactionRepository from "@/modules/transaction/domain/repositories/transaction-repository";
import {DataSource, Repository} from "typeorm";
import {TYPES} from "@/shared/infra/di/di-types";

@injectable()
export default class TransactionRepositoryImpl implements TransactionRepository {
    orm_repo: Repository<TransactionEntity>;

    constructor(@inject(TYPES.DataSource) datasource: DataSource) {
        this.orm_repo = datasource.getRepository(TransactionEntity)
    }
}