import {TransferTransaction} from "@/modules/transaction/domain/models/transfer-transaction";
import { TransactionOptions } from "./transaction";

export default class TransferTransactionImpl implements TransferTransaction {
    transaction_options: TransactionOptions = {
        transactionId: "",
        originId: "",
        destinationId: "",
        value: 0n
    };

    constructor() {
        this.transaction_options.transactionId = crypto.randomUUID()
    }

    set sender(value: string) {
        this.transaction_options.originId = value
    }
    set receiver(value: string) {
        this.transaction_options.originId = value
    }
    set amount(value: string) {
        const converted_to_bigint = BigInt(value)

        if (converted_to_bigint <= 0n) {
            throw new Error("invalid_amount");
        }

        this.transaction_options.value = converted_to_bigint
    }
}