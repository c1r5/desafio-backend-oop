import { inject, injectable } from "inversify";
import TransactionModel from "@/modules/transaction/domain/models/transaction-model";
import TransactionRepository from "@/shared/modules/transaction/transaction-repository";
import { DataSource, Repository } from "typeorm";
import { DI_TYPES } from "@/shared/infra/di/di-types";

@injectable()
export default class TransactionRepositoryImpl implements TransactionRepository {
    orm_repo: Repository<TransactionModel>;

    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        this.orm_repo = datasource.getRepository(TransactionModel)
    }
    async get_transaction_by_id(transactionId: string): Promise<TransactionModel> {
        const result = await this.orm_repo.findOneBy({transactionId})

        if (!result) {
            throw new Error('transaction_not_found')
        }

        return result;
    }
}