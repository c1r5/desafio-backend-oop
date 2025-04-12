import { TransactionOptions, TransactionStrategy } from "@/shared/modules/transaction/transaction-strategy";

export default class TransferStrategyImpl implements TransactionStrategy {
    constructor(
        public options: TransactionOptions
    ) { }

  execute(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}