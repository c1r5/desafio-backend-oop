import TransactionUseCases from "@/modules/transaction/domain/usecases/transaction-usecases";
import TransactionRepositoryImpl from "@/modules/transaction/infra/repositories/transaction-repository-impl";
import TransactionController from "@/modules/transaction/interfaces/controllers/transaction-controller";
import UserUseCasesImpl from "@/modules/users/infra/usecases/user-use-cases-impl";
import {UserController} from "@/modules/users/interfaces/controllers/user-controller";

import {Container} from "inversify";
import {TYPES} from "./di-types";
import {DataSource} from "typeorm";


import {AppDataSource} from "@/shared/infra/datasources/app-data-source";
import UserRepository from "@/modules/users/domain/repositories/user-repository";
import UserRepositoryImpl from "@/modules/users/infra/repositories/user-repository-impl";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import ControllerModel from "@/shared/domain/models/controller-model";
import TransactionRepository from "@/modules/transaction/domain/models/transaction-repository";

const container = new Container()

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl).inSingletonScope()

container.bind<UserUseCases>(TYPES.UserUseCases).to(UserUseCasesImpl)
container.bind<ControllerModel>(TYPES.UserController).to(UserController)

container.bind<TransactionRepository>(TYPES.TransactionRepository).to(TransactionRepositoryImpl).inSingletonScope()
container.bind<TransactionUseCases>(TYPES.TransactionUseCases).to(TransactionUseCases)
container.bind<ControllerModel>(TYPES.TransactionController).to(TransactionController)

container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource)

export {container}