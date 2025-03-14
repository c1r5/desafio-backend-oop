import {inject, injectable} from "inversify";
import AppController from "@/shared/domain/controllers/app-controller";
import {TYPES} from "@/shared/infra/di/di-types";
import {FastifyInstance} from "fastify";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import TransactionUsecase from "@/modules/transaction/domain/usecases/transaction-usecase";

@injectable()
export default class TransactionController implements AppController {

    constructor(
        @inject(TYPES.TransactionUseCases) private transaction_usecases: TransactionUsecase,
        @inject(TYPES.UserUseCases) private user_usecases: UserUseCases
    ) {
    }

    register(app: FastifyInstance): void {
        app.post('/transfer', {
            onRequest: [
                app.verify_jwt,
                app.validate_user_session,
                app.validate_user,
                app.verify_user_transfer_ability
            ]
        }, async (request, reply) => {
            reply.status(200)
        })
    }
}