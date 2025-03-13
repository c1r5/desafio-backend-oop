import {Repository} from "typeorm";
import TransactionEntity from "../entities/transaction-entity";

export default interface TransactionRepository {
    orm_repo: Repository<TransactionEntity>
}