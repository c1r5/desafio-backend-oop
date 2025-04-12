import { inject, injectable } from "inversify";
import TransactionRepository from "@/shared/modules/transaction/transaction-repository";
import UserRepository from "@/shared/modules/user/user-repository";
import { DI_TYPES } from "@/shared/infra/di/di-types";
import TransactionUsecase from "@/shared/modules/transaction/transaction-usecase";
import { TransactionStrategy } from "@/shared/modules/transaction/transaction-strategy";
import MailerClient from "@/shared/application/services/mailer-client";

@injectable()
export default class TransactionUsecaseImpl implements TransactionUsecase {

    constructor(
        @inject(DI_TYPES.TransactionRepository) private transaction_repository: TransactionRepository,
        @inject(DI_TYPES.UserRepository) private user_repository: UserRepository,
        @inject(DI_TYPES.MailerClient) private mailer: MailerClient
    ) { }

    async request_email_notification(transaction_id: string): Promise<void> {
        // const transaction = await this.transaction_repository.get_transaction_by_id(transaction_id);

        console.log(`[+] TransactionUsecaseImpl::request_email_notification ${transaction_id} transaction requested email notification`);
    }

    async new_transaction(transaction: TransactionStrategy): Promise<void> {
        console.log(`[+] TransactionUsecaseImpl::new_transaction ${transaction.options} transaction created`);
        await this.request_email_notification('1');
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
