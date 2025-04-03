import {inject, injectable} from "inversify";
import TransactionRepository from "@/shared/domain/repositories/transaction-repository";
import UserRepository from "@/shared/domain/repositories/user-repository";
import {TYPES} from "@/shared/infra/di/di-types";
import TransactionUsecase from "@/shared/application/usecases/transaction-usecase";
import UserEntity from "@/modules/users/domain/entities/user-entity";
import {Transaction} from "@/modules/transaction/domain/models/transaction";

@injectable()
export default class TransactionUsecaseImpl implements TransactionUsecase {

    constructor(
        @inject(TYPES.TransactionRepository) private transaction_repository: TransactionRepository,
        @inject(TYPES.UserRepository) private user_repository: UserRepository
    ) {
    }

    new_transaction(transaction: Transaction): void {
        const options = transaction.transaction_options;
        console.log(options)
    }

    // async new_transaction(transaction: Transaction): Promise<void> {

    //     //
    //     // const query_runner = this.user_repository.query_runner;
    //     //
    //     // await query_runner.connect()
    //     // await query_runner.startTransaction()
    //     //
    //     // const payer_entity = await query_runner.manager.findOne(UserEntity, {
    //     //     where: {user_id: payer_id},
    //     //     lock: { mode: "pessimistic_write" }
    //     // });
    //     //
    //     // const payee_entity = await query_runner.manager.findOne(UserEntity, {
    //     //     where: {user_id: payee_id},
    //     //     lock: { mode: "pessimistic_write" }
    //     // });
    //     //
    //     // if (!payer_entity || !payee_entity) {
    //     //     throw new Error('user_not_found');
    //     // }
    //     //
    //     // if (payer_entity.balance < amount) {
    //     //     throw new Error('insufficient_funds');
    //     // }
    //     //
    //     // payer_entity.balance = payer_entity.balance - amount;
    //     // payee_entity.balance = payee_entity.balance + amount;
    //     //
    //     // try {
    //     //     await query_runner.manager.save([payer_entity, payee_entity]);
    //     //     await query_runner.commitTransaction();
    //     // } catch (error) {
    //     //     await query_runner.rollbackTransaction();
    //     //     throw error;
    //     // } finally {
    //     //     await query_runner.release()
    //     // }
    // }
}
