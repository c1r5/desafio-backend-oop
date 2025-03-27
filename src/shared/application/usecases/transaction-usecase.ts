export default interface TransactionUsecase {
    transfer(amount: bigint, payer_id: string, payee_id: string): Promise<void>;
}