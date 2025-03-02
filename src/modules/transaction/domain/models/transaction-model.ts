export type TransactionStatus = "pending" | "completed" | "failed";
export type TransactionType = "payment" | "refund" | "transfer" | "adjustment";

export type TransactionModel = {
    transactionId: string,
    status?: TransactionStatus;
    amount: BigInt
    type: TransactionType;
    payer: string,
    recipient: string
}

