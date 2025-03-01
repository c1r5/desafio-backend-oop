import { Container } from "inversify";
import TransactionRepository from "modules/transaction/infra/repositories/transaction-repository";
import TransactionController from "modules/transaction/interfaces/controllers/transaction-controller";
import UserRepository from "modules/users/infra/repositories/user-repository";
import UserController from "modules/users/interfaces/controllers/user-controller";
import ControllerModel from "shared/domain/models/controller-model";


const TYPES = {
  UserRepository: Symbol.for('UserRepository'),
  UserController: Symbol.for('UserController'),
  TransactionRepository: Symbol.for('TransactionRepository'),
  TransactionController: Symbol.for('TransactionController')
};

const container = new Container()


container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope()
container.bind<UserController>(TYPES.UserController).to(UserController)

container.bind<TransactionRepository>(TYPES.TransactionRepository).to(TransactionRepository).inSingletonScope()
container.bind<TransactionController>(TYPES.TransactionController).to(TransactionController)

export { container, TYPES }