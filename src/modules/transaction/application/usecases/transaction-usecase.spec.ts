import { container } from "@/shared/infra/di/di-container";
import { DI_TYPES } from "@/shared/infra/di/di-types";
import { TransactionStrategyFactory } from "@/shared/modules/transaction/transaction-strategy";
import TransactionUsecase from "@/shared/modules/transaction/transaction-usecase";

describe('transaction usecase', () => {
    let transaction_usecase: TransactionUsecase;
    beforeAll(() => {
        transaction_usecase = container.get(DI_TYPES.TransactionUseCases);
    });

    it('should create a transaction', async () => {
        const transaction = TransactionStrategyFactory.create({
          amount: 1000n,
          type: "transfer",
          recipient: "5fb93bc4-29de-4b87-b01a-7268e0047ff5",
          sender: "5fb93bc4-29de-4b87-b01a-7268e0047ff5",
        });

        await transaction_usecase.new_transaction(transaction);

        expect(transaction).toBeDefined();
    });
});