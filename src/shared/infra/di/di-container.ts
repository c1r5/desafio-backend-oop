import TransactionUseCases from "modules/transaction/domain/usecases/transaction-usecases";
import TransactionRepositoryImpl from "modules/transaction/infra/repositories/transaction-repository-impl";
import TransactionController from "modules/transaction/interfaces/controllers/transaction-controller";
import UserUseCases from "modules/users/domain/usecases/user-usecases";
import UserRepositoryImpl from "modules/users/infra/repositories/user-repository-impl";
import UserController from "modules/users/interfaces/controllers/user-controller";
import AppDataSource from "../datasources/app-data-source";

import { Container } from "inversify";
import { TYPES } from "./di-types";

const container = new Container()

container.bind<UserRepositoryImpl>(TYPES.UserRepository).to(UserRepositoryImpl).inSingletonScope()
container.bind<UserUseCases>(TYPES.UserUseCases).to(UserUseCases)
container.bind<UserController>(TYPES.UserController).to(UserController)

container.bind<TransactionRepositoryImpl>(TYPES.TransactionRepository).to(TransactionRepositoryImpl).inSingletonScope()
container.bind<TransactionUseCases>(TYPES.TransactionUseCases).to(TransactionUseCases)
container.bind<TransactionController>(TYPES.TransactionController).to(TransactionController)

container.bind<AppDataSource>(TYPES.AppDataSource).to(AppDataSource).inSingletonScope()

export { container }