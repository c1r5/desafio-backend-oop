import {container} from "@/shared/infra/di/di-container";
import {TYPES} from "@/shared/infra/di/di-types";
import {DataSource} from "typeorm";
import TransactionUsecase from "@/shared/application/usecases/transaction-usecase";

describe('transfer test suite', () => {
    let datasource: DataSource;
    let transaction_usecases: TransactionUsecase

    beforeAll(async () => {
        const _datasource = container.get<DataSource>(TYPES.DataSource);
        datasource = await _datasource.initialize();

        transaction_usecases = container.get(TYPES.TransactionUseCases)
    })

    afterAll(async () => {
        await datasource.destroy()
    })

    it('should PF user transfer to PJ user', async () => {
        await transaction_usecases.new_transaction(
            100n,
            "248f8f1c-ef90-44e8-b487-012796b76e9e",
            "c65a1bad-5c92-49e8-b454-3c45746e69d1"
        )
    })
})