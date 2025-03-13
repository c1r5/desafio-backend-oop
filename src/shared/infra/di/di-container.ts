import TransactionUseCases from "@/modules/transaction/domain/usecases/transaction-usecases";
import TransactionRepositoryImpl from "@/modules/transaction/infra/repositories/transaction-repository-impl";
import TransactionController from "@/modules/transaction/interfaces/controllers/transaction-controller";
import {UserController} from "@/modules/users/interfaces/controllers/user-controller";

import {Container} from "inversify";
import {TYPES} from "./di-types";
import {DataSource} from "typeorm";

import UserRepository from "@/modules/users/domain/repositories/user-repository";
import UserRepositoryImpl from "@/modules/users/infra/repositories/user-repository-impl";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import ControllerModel from "@/shared/domain/models/controller-model";
import TransactionRepository from "@/modules/transaction/domain/models/transaction-repository";
import {AppDataSource} from "@/shared/infra/datasources/app-data-source";
import UserUseCasesImpl from "@/modules/users/infra/usecases/user-use-cases-impl";
import AuthUsecase from "@/modules/auth/domain/usecases/auth-usecase";
import AuthRepository from "@/modules/auth/domain/repositories/auth-repository";
import AuthUsecaseImpl from "@/modules/auth/infra/usecases/auth-usecase-impl";
import AuthRepositoryImpl from "@/modules/auth/infra/repositories/auth-repository-impl";
import Application from "@/app";
import AuthController from "@/modules/auth/controllers/auth-controller";

const container = new Container()

container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource)
container.bind<Application>(TYPES.ApplicationServer).to(Application)

container.bind<AuthUsecase>(TYPES.AuthUsecase).to(AuthUsecaseImpl)
container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepositoryImpl)
container.bind<ControllerModel>(TYPES.AuthController).to(AuthController)

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl)
container.bind<UserUseCases>(TYPES.UserUseCases).to(UserUseCasesImpl)
container.bind<ControllerModel>(TYPES.UserController).to(UserController)

container.bind<TransactionRepository>(TYPES.TransactionRepository).to(TransactionRepositoryImpl)
container.bind<TransactionUseCases>(TYPES.TransactionUseCases).to(TransactionUseCases)
container.bind<ControllerModel>(TYPES.TransactionController).to(TransactionController)

export {container}