import { TransactionStrategy, TransactionOptions } from "./transaction-strategy";

export interface TransferOptions extends TransactionOptions {}

export class TransferStrategy implements TransactionStrategy {
    constructor(
        public options: TransferOptions
    ) {}
    
    execute(): Promise<void> {
        throw new Error("Method not implemented.");
    }
  
}