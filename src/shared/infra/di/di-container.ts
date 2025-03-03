import TransactionUseCases from "@/modules/transaction/domain/usecases/transaction-usecases";
import TransactionRepositoryImpl from "@/modules/transaction/infra/repositories/transaction-repository-impl";
import TransactionController from "@/modules/transaction/interfaces/controllers/transaction-controller";
import UserUseCasesImpl from "@/modules/users/infra/usecases/user-use-cases-impl";
import UserRepositoryImpl from "@/modules/users/infra/repositories/user-repository-impl";
import {UserController} from "@/modules/users/interfaces/controllers/user-controller";

import {Container} from "inversify";
import {TYPES} from "./di-types";
import {DataSource} from "typeorm";

import UserRepositoryMock from "@/modules/users/infra/repositories/user-repository-mock";
import {MockDatasource} from "@/shared/infra/datasources/mock-datasource";
import {AppDataSource} from "@/shared/infra/datasources/app-data-source";

const container = new Container()

container.bind<UserRepositoryMock>(TYPES.UserRepositoryMock).to(UserRepositoryMock).inSingletonScope()
container.bind<UserRepositoryImpl>(TYPES.UserRepositoryImpl).to(UserRepositoryImpl).inSingletonScope()
container.bind<UserUseCasesImpl>(TYPES.UserUseCases).to(UserUseCasesImpl)
container.bind<UserController>(TYPES.UserController).to(UserController)

container.bind<TransactionRepositoryImpl>(TYPES.TransactionRepository).to(TransactionRepositoryImpl).inSingletonScope()
container.bind<TransactionUseCases>(TYPES.TransactionUseCases).to(TransactionUseCases)
container.bind<TransactionController>(TYPES.TransactionController).to(TransactionController)

container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource)
container.bind<DataSource>(TYPES.MockDataSource).toConstantValue(MockDatasource)

export {container}