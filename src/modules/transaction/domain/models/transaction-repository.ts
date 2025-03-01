import { Repository } from "typeorm";
import TransactionEntity from "../entities/transaction-entity";

export default abstract class TransactionRepository {
  abstract orm_repo: Repository<TransactionEntity>
}