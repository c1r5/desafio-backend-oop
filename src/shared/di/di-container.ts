import { Container } from "inversify";
import Transaction from "modules/transaction/domain/entities/transaction-entity";
import TransactionRepository from "modules/transaction/domain/repositories/transaction-repository";
import TransactionRepositoryImpl from "modules/transaction/infra/repositories/transaction-repository-impl";
import TransactionController from "modules/transaction/interfaces/controllers/transaction-controller";
import ControllerModel from "shared/domain/models/controller-model";


const TYPES = {
  TransactionRepository: Symbol.for('TransactionRepository'),
  TransactionController: Symbol.for('ControllerModel')
};

const container = new Container()

container.bind<TransactionRepository<Transaction>>(TYPES.TransactionRepository).to(TransactionRepositoryImpl).inSingletonScope()
container.bind<ControllerModel>(TYPES.TransactionController).to(TransactionController)

export { container, TYPES }