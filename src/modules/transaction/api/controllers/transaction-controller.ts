import { inject, injectable } from "inversify";
import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import { TYPES } from "@/shared/infra/di/di-types";
import { FastifyInstance, FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";
import UserUseCases from "@/shared/modules/user/user-usecases";
import TransactionUsecase from "@/shared/modules/transaction/transaction-usecase";
import TransferTransactionImpl from "@/modules/transaction/domain/models/transfer-transaction-impl";
import { JWT_PAYLOAD_SCHEMA } from "@/shared/api/schemas/jwt-payload-schema";
import { TRANSFER_REQUEST_SCHEMA } from "@/modules/transaction/api/schemas/transfer-body-schema";

@injectable()
export default class TransactionController extends AppControllerV1 {

    constructor(
        @inject(TYPES.TransactionUseCases) private transaction_usecases: TransactionUsecase,
        @inject(TYPES.UserUseCases) private user_usecases: UserUseCases
    ) {
        super()
    }

    auth_middleware(server: FastifyInstance): preHandlerHookHandler {
        return server.auth([
            server.verify_jwt,
            server.verify_session,
            server.validate_user,
            server.verify_user_transfer_ability
        ])
    }

    register(app: FastifyInstance): void {
        app.post('/transfer', {
            preHandler: this.auth_middleware(app),
        }, this.transfer.bind(this));
    }

    async transfer(request: FastifyRequest, reply: FastifyReply) {
        const { user_id } = JWT_PAYLOAD_SCHEMA.parse(request.user)
        const { recipient_id, amount } = TRANSFER_REQUEST_SCHEMA.parse(request.body);

        const new_transfer_transaction = new TransferTransactionImpl();

        new_transfer_transaction.sender = user_id;
        new_transfer_transaction.receiver = recipient_id;
        new_transfer_transaction.amount = amount;

        this.transaction_usecases.new_transaction(new_transfer_transaction)

        reply.status(200).send('ok');
    }
}