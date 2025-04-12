import { TransactionStrategy } from "./transaction-strategy";

export default interface TransactionUsecase {
    new_transaction(transaction: TransactionStrategy): void;
}