import {inject, injectable} from "inversify";
import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import {TYPES} from "@/shared/infra/di/di-types";
import {FastifyInstance} from "fastify";
import UserUseCases from "@/modules/users/application/usecases/user-usecases";
import TransactionUsecase from "@/modules/transaction/application/usecases/transaction-usecase";

@injectable()
export default class TransactionController extends AppControllerV1 {

    constructor(
        @inject(TYPES.TransactionUseCases) private transaction_usecases: TransactionUsecase,
        @inject(TYPES.UserUseCases) private user_usecases: UserUseCases
    ) {
        super()
    }

    register(app: FastifyInstance): void {
        app.post('/transfer', {
            preHandler: app.auth([
                app.verify_jwt,
                app.verify_user_session,
                app.validate_user,
                app.verify_user_transfer_ability
            ])
        }, async (request, reply) => {
            reply.status(200)
        })
    }
}