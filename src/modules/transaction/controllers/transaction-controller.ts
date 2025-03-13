import {inject, injectable} from "inversify";
import TransactionUseCases from "@/modules/transaction/domain/usecases/transaction-usecases";
import ControllerModel from "@/shared/domain/models/controller-model";
import {TYPES} from "@/shared/infra/di/di-types";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

declare module 'fastify' {
    interface FastifyInstance {
        validate_transfer: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

@injectable()
export default class TransactionController implements ControllerModel {

    constructor(@inject(TYPES.TransactionUseCases) transaction_usecases: TransactionUseCases) {
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