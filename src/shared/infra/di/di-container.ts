import TransactionUsecaseImpl from "@/modules/transaction/infra/usecases/transaction-usecase-impl";
import TransactionRepositoryImpl from "@/modules/transaction/infra/repositories/transaction-repository-impl";
import TransactionController from "@/modules/transaction/api/controllers/transaction-controller";
import {UserController} from "@/modules/users/api/controllers/user-controller";

import {Container} from "inversify";
import {TYPES} from "./di-types";
import {DataSource} from "typeorm";

import UserRepository from "@/modules/users/domain/repositories/user-repository";
import UserRepositoryImpl from "@/modules/users/infra/repositories/user-repository-impl";
import UserUseCases from "@/modules/users/application/usecases/user-usecases";
import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import TransactionRepository from "@/modules/transaction/domain/repositories/transaction-repository";
import {AppDataSource} from "@/shared/infra/datasources/app-data-source";
import UserUseCasesImpl from "@/modules/users/infra/usecases/user-use-cases-impl";
import SessionRepository from "@/modules/authentication/domain/repositories/session-repository";
import SessionRepositoryImpl from "@/modules/authentication/infra/repositories/session-repository-impl";
import Application from "@/app";
import LoginController from "@/modules/authentication/api/controllers/login-controller";
import TransactionUsecase from "@/modules/transaction/application/usecases/transaction-usecase";
import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import VerifySessionMiddleware from "@/shared/api/middlewares/verify-session-middleware";
import VerifyUserStatusMiddleware from "@/shared/api/middlewares/verify-user-status-middleware";
import VerifyUserTransferAbilityMiddleware
    from "@/modules/transaction/api/middlewares/verify-user-transfer-ability-middleware";
import VerifyJwtMiddleware from "@/shared/api/middlewares/verify-jwt-middleware";
import {SessionUsecase} from "@/modules/authentication/application/usecases/session-usecase";
import SessionUsecaseImpl from "@/modules/authentication/infra/usecases/session-usecase-impl";

const container = new Container()

container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource)
container.bind<Application>(TYPES.ApplicationServer).to(Application)

container.bind<SessionRepository>(TYPES.SessionRepository).to(SessionRepositoryImpl)
container.bind<SessionUsecase>(TYPES.SessionUseCase).to(SessionUsecaseImpl)

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl)
container.bind<UserUseCases>(TYPES.UserUseCases).to(UserUseCasesImpl)

container.bind<TransactionRepository>(TYPES.TransactionRepository).to(TransactionRepositoryImpl)
container.bind<TransactionUsecase>(TYPES.TransactionUseCases).to(TransactionUsecaseImpl)

container.bind<AppControllerV1>(TYPES.UserController).to(UserController)
container.bind<AppControllerV1>(TYPES.LoginController).to(LoginController)
container.bind<AppControllerV1>(TYPES.TransactionController).to(TransactionController)

container.bind<AppMiddleware>(TYPES.VerifyJWTMiddleware).to(VerifyJwtMiddleware)
container.bind<AppMiddleware>(TYPES.VerifyUserSessionMiddleware).to(VerifySessionMiddleware)
container.bind<AppMiddleware>(TYPES.VerifyUserMiddleware).to(VerifyUserStatusMiddleware)
container.bind<AppMiddleware>(TYPES.VerifyUserTransferAbilityMiddleware).to(VerifyUserTransferAbilityMiddleware)
export {container}