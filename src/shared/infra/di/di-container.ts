import TransactionUsecaseImpl from "@/modules/transaction/infra/usecases/transaction-usecase-impl";
import TransactionRepositoryImpl from "@/modules/transaction/infra/repositories/transaction-repository-impl";
import TransactionController from "@/modules/transaction/controllers/transaction-controller";
import {UserController} from "@/modules/users/controllers/user-controller";

import {Container} from "inversify";
import {TYPES} from "./di-types";
import {DataSource} from "typeorm";

import UserRepository from "@/modules/users/domain/repositories/user-repository";
import UserRepositoryImpl from "@/modules/users/infra/repositories/user-repository-impl";
import UserUseCases from "@/modules/users/domain/usecases/user-usecases";
import AppController from "@/shared/domain/controllers/app-controller";
import TransactionRepository from "@/modules/transaction/domain/repositories/transaction-repository";
import {AppDataSource} from "@/shared/infra/datasources/app-data-source";
import UserUseCasesImpl from "@/modules/users/infra/usecases/user-use-cases-impl";
import AuthUsecase from "@/modules/authentication/domain/usecases/auth-usecase";
import AuthRepository from "@/modules/authentication/domain/repositories/auth-repository";
import AuthUsecaseImpl from "@/modules/authentication/infra/usecases/auth-usecase-impl";
import AuthRepositoryImpl from "@/modules/authentication/infra/repositories/auth-repository-impl";
import Application from "@/app";
import AuthController from "@/modules/authentication/controllers/auth-controller";
import TransactionUsecase from "@/modules/transaction/domain/usecases/transaction-usecase";

const container = new Container()

container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource)
container.bind<Application>(TYPES.ApplicationServer).to(Application)

container.bind<AuthUsecase>(TYPES.AuthUsecase).to(AuthUsecaseImpl)
container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepositoryImpl)
container.bind<AppController>(TYPES.AuthController).to(AuthController)

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl)
container.bind<UserUseCases>(TYPES.UserUseCases).to(UserUseCasesImpl)
container.bind<AppController>(TYPES.UserController).to(UserController)

container.bind<TransactionRepository>(TYPES.TransactionRepository).to(TransactionRepositoryImpl)
container.bind<TransactionUsecase>(TYPES.TransactionUseCases).to(TransactionUsecaseImpl)
container.bind<AppController>(TYPES.TransactionController).to(TransactionController)

export {container}