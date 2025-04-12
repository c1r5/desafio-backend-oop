import { inject, injectable } from "inversify";
import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import { TYPES } from "@/shared/infra/di/di-types";
import { FastifyInstance, FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";
import TransactionUsecase from "@/shared/modules/transaction/transaction-usecase";
import { JWT_PAYLOAD_SCHEMA } from "@/shared/api/schemas/jwt-payload-schema";
import { TRANSFER_REQUEST_SCHEMA } from "@/modules/transaction/api/schemas/transfer-body-schema";
import { TransactionStrategyFactory } from "@/shared/modules/transaction/transaction-strategy";

@injectable()
export default class TransactionController extends AppControllerV1 {

    constructor(
        @inject(TYPES.TransactionUseCases) private transaction_usecases: TransactionUsecase
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

        const new_transfer_transaction = TransactionStrategyFactory.create({
            type: 'transfer',
            sender: user_id,
            receiver: recipient_id,
            amount: BigInt(amount),
        })

        this.transaction_usecases.new_transaction(new_transfer_transaction)

        reply.status(201).send(new_transfer_transaction.options);
    }
}