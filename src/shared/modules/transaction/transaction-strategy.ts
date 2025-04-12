import { TransferStrategy } from "./transfer-strategy";

export interface TransactionOptions {
    transactionId?: string;
    status?: string;
    amount: bigint;
    type: string;
    recipient: string;
    sender: string;
}

export interface TransactionStrategy {
    options: TransactionOptions;
    execute(): Promise<void>;
}

export class TransactionStrategyFactory {
    static create(options: TransactionOptions): TransactionStrategy {
        options.transactionId = options.transactionId || crypto.randomUUID();
        options.status = "pending";

        switch (options.type) {
            case "transfer":
                return new TransferStrategy(options);
            // Add more strategies here
            default:
                throw new Error(`Unknown transaction type: ${options.type}`);
        }
    }
}