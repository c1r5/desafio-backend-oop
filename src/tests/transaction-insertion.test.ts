import {DataSource} from "typeorm";
import TransactionRepository from "@/modules/transaction/domain/models/transaction-repository";
import TransactionEntity from "@/modules/transaction/domain/entities/transaction-entity";
import TransactionRepositoryImpl from "@/modules/transaction/infra/repositories/transaction-repository-impl";
import * as crypto from "node:crypto";

describe('Transaction Create', () => {
    let datasource: DataSource
    let transaction_repository: TransactionRepository

    beforeAll(async () => {
        datasource = new DataSource({
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [
                TransactionEntity
            ]
        });

        await datasource.initialize()

        transaction_repository = new TransactionRepositoryImpl(datasource)
    })

    afterAll(async () => {
        await datasource.destroy()
    })

    it('should save a new transaction in database', async () => {
        let fake_uuid = crypto.randomUUID()
        let fake_payer_uuid = crypto.randomUUID()
        let fake_recipient_uuid = crypto.randomUUID()

        let transaction = transaction_repository.orm_repo.create({
            transactionId: fake_uuid,
            amount: 100,
            type: "payment",
            payer: fake_payer_uuid,
            recipient: fake_recipient_uuid
        })

        let saved_transaction = await transaction_repository.orm_repo.save(transaction)

        expect(saved_transaction.transactionId).toBe(fake_uuid)
    })
})