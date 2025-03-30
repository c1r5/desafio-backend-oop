export type TransactionOptions = {
    transactionId: string
    originId: string
    destinationId: string
    value: bigint
}
export interface Transaction {
    transaction_options: TransactionOptions;
}