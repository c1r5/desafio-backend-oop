import { TransactionStrategy } from "./transaction-strategy";

export default interface TransactionUsecase {
    new_transaction(transaction: TransactionStrategy): Promise<void>;
    request_email_notification(transaction_id: string): Promise<void>;
}