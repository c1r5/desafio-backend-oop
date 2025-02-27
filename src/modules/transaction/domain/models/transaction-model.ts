type PayerId = string;
type RecipientId = string;

export default interface TransactionModel {
  transactionId: string,
  status: "pending" | "completed" | "failed";
  amount: BigInt
  type: "payment" | "refund" | "transfer" | "adjustment";
  payer: PayerId,
  recipient: RecipientId
}