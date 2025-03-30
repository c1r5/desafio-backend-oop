import {Transaction} from "@/modules/transaction/domain/models/transaction";

export interface TransferTransaction extends Transaction {
    set sender(value: string)
    set receiver(value: string)
    set amount(value: string)
}