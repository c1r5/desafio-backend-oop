import { Container } from "inversify";
import TransactionRepository from "modules/transaction/infra/repositories/transaction-repository";
import TransactionController from "modules/transaction/interfaces/controllers/transaction-controller";
import ControllerModel from "shared/domain/models/controller-model";


const TYPES = {
  TransactionRepository: Symbol.for('TransactionRepository'),
  TransactionController: Symbol.for('ControllerModel')
};

const container = new Container()

container.bind<TransactionRepository>(TYPES.TransactionRepository).to(TransactionRepository).inSingletonScope()
container.bind<ControllerModel>(TYPES.TransactionController).to(TransactionController)

export { container, TYPES }