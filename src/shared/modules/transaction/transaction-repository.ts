import TransactionModel from "@/modules/transaction/domain/models/transaction-model";

export default interface TransactionRepository {
    get_transaction_by_id(transaction_id: string): Promise<TransactionModel>;
}