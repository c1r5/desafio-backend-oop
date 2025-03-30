import {inject, injectable} from "inversify";
import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import {TYPES} from "@/shared/infra/di/di-types";
import {FastifyInstance} from "fastify";
import UserUseCases from "@/shared/application/usecases/user-usecases";
import TransactionUsecase from "@/shared/application/usecases/transaction-usecase";
import TransferTransactionImpl from "@/modules/transaction/domain/models/transfer-transaction-impl";
import {jwtPayloadSchema} from "@/shared/api/schemas/jwt-payload-schema";
import {TransferBody} from "@/modules/transaction/api/schemas/transfer-body-schema";

@injectable()
export default class TransactionController extends AppControllerV1 {

    constructor(
        @inject(TYPES.TransactionUseCases) private transaction_usecases: TransactionUsecase,
        @inject(TYPES.UserUseCases) private user_usecases: UserUseCases
    ) {
        super()
    }

    register(app: FastifyInstance): void {
        app.post<{
            Body: TransferBody
        }>('/transfer', {
            preHandler: app.auth([
                app.verify_jwt,
                app.verify_session,
                app.validate_user,
                app.verify_user_transfer_ability
            ])
        }, async (request, reply) => {
            const { user_id } = jwtPayloadSchema.parse(request.user)
            const { recipient_id, amount } = request.body;

            const new_transfer_transaction = new TransferTransactionImpl();

            new_transfer_transaction.sender = user_id;
            new_transfer_transaction.receiver = recipient_id;
            new_transfer_transaction.amount = amount;

            this.transaction_usecases.new_transaction(new_transfer_transaction)
        })
    }
}