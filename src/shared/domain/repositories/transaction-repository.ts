import {Repository} from "typeorm";
import TransactionEntity from "../../../modules/transaction/domain/entities/transaction-entity";

export default interface TransactionRepository {
    orm_repo: Repository<TransactionEntity>
}