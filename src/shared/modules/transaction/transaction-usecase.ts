import {Transaction} from "@/modules/transaction/domain/models/transaction";

export default interface TransactionUsecase {
    new_transaction(transaction: Transaction): void;
}