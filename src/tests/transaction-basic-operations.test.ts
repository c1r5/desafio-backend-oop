import {DataSource} from "typeorm";
import TransactionRepository from "@/modules/transaction/domain/models/transaction-repository";
import TransactionEntity from "@/modules/transaction/domain/entities/transaction-entity";
import TransactionRepositoryImpl from "@/modules/transaction/infra/repositories/transaction-repository-impl";
import { randomUUID } from "crypto";

describe('Transaction database operations', () => {
    let datasource: DataSource
    let transaction_repository: TransactionRepository
    let transaction_id: string

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

    it('should create a transaction', async () => {
        let fake_uuid = randomUUID()
        let fake_payer_uuid = randomUUID()
        let fake_recipient_uuid = randomUUID()

        let transaction = transaction_repository.orm_repo.create({
            transactionId: fake_uuid,
            amount: 100,
            type: "payment",
            payer: fake_payer_uuid,
            recipient: fake_recipient_uuid
        })

        let saved_transaction = await transaction_repository.orm_repo.save(transaction)

        transaction_id = saved_transaction.transactionId

        expect(saved_transaction.transactionId).toBe(fake_uuid)
    })

    it('should find and update a transaction', async () => {
        let transaction = await transaction_repository.orm_repo.findOneBy({transactionId: transaction_id})

        if(!transaction) {
            throw new Error("Transaction not found")
        }

        transaction.status = "completed"

        let saved_transaction = await transaction_repository.orm_repo.update(transaction.transactionId, transaction)

        expect(saved_transaction.affected).toBe(1)
    })

    it('should delete a transaction', async () => {
        let delete_transaction = await transaction_repository.orm_repo.delete(transaction_id)

        expect(delete_transaction.affected).toBe(1)
    })
})