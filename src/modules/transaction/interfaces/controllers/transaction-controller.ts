import {inject, injectable} from "inversify";
import TransactionUseCases from "@/modules/transaction/domain/usecases/transaction-usecases";
import ControllerModel from "@/shared/domain/models/controller-model";
import {TYPES} from "@/shared/infra/di/di-types";
import {FastifyInstance} from "fastify";

@injectable()
export default class TransactionController implements ControllerModel {

    constructor(@inject(TYPES.TransactionUseCases) transaction_usecases: TransactionUseCases) {
    }

    register_routes(app: FastifyInstance): void {
        throw new Error("Method not implemented.");
    }
}