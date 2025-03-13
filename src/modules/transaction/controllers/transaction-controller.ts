import {inject, injectable} from "inversify";
import AppController from "@/shared/domain/controllers/app-controller";
import {TYPES} from "@/shared/infra/di/di-types";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import TransactionUsecase from "@/modules/transaction/domain/usecases/transaction-usecase";

declare module 'fastify' {
    interface FastifyInstance {
        validate_transfer: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

@injectable()
export default class TransactionController implements AppController {

    constructor(
        @inject(TYPES.TransactionUseCases) private transaction_usecases: TransactionUsecase,
        @inject(TYPES.UserUseCases) private user_usecases: UserUseCases
    ) {
    }

    register_routes(app: FastifyInstance): void {
        app.decorate('validate_transfer', async (request: FastifyRequest, reply: FastifyReply) => {

        })


        app.post('/transfer', {
            preHandler: app.auth([
                app.authenticate,
                app.validate_transfer
            ])
        }, async (request, reply) => {
            reply.status(200)
        })
    }
}