import TransactionUsecaseImpl from "@/modules/transaction/application/usecases/transaction-usecase-impl";
import TransactionRepositoryImpl from "@/modules/transaction/infra/repositories/transaction-repository-impl";
import TransactionController from "@/modules/transaction/api/controllers/transaction-controller";

import { Container } from "inversify";
import { DI_TYPES } from "./di-types";
import { DataSource } from "typeorm";

import UserRepository from "@/shared/modules/user/user-repository";
import UserRepositoryImpl from "@/modules/users/infra/repositories/user-repository-impl";
import AppControllerV1 from "@/shared/domain/controllers/app-controller-v1";
import TransactionRepository from "@/shared/modules/transaction/transaction-repository";
import { AppDataSource } from "@/shared/infra/app-datasource";
import SessionRepository from "@/shared/modules/session/session-repository";
import SessionRepositoryImpl from "@/modules/session/infra/repositories/session-repository-impl";
import Application from "@/app";
import LoginController from "@/modules/session/api/controllers/login-controller";
import TransactionUsecase from "@/shared/modules/transaction/transaction-usecase";
import AppMiddleware from "@/shared/domain/middlewares/app-middleware";
import VerifySessionMiddleware from "@/shared/api/middlewares/verify-session-middleware";
import VerifyUserStatusMiddleware from "@/shared/api/middlewares/verify-user-status-middleware";
import VerifyUserTransferAbilityMiddleware from "@/modules/transaction/api/middlewares/verify-user-transfer-ability-middleware";
import VerifyJwtMiddleware from "@/shared/api/middlewares/verify-jwt-middleware";
import { SessionUsecase } from "@/shared/modules/session/session-usecase";
import SessionUsecaseImpl from "@/modules/session/application/usecases/session-usecase-impl";
import LogoutController from "@/modules/session/api/controllers/logout-controller";
import { CreateUserController } from "@/modules/users/api/controllers/create-user-controller";
import UserUsecasesImpl from "@/modules/users/application/usecases/user-usecases-impl";
import UserUseCases from "@/shared/modules/user/user-usecases";
import { MailerClientStrategy } from "@/shared/modules/notification/mailer-client-strategy";
import MailerClientMockImpl from "@/modules/notification/application/mailer-client-mock-impl";

const container = new Container()

container.bind<DataSource>(DI_TYPES.DataSource).toConstantValue(AppDataSource)
container.bind<MailerClientStrategy>(DI_TYPES.MailerClient).to(MailerClientMockImpl)
container.bind<Application>(DI_TYPES.Application).to(Application)

container.bind<SessionRepository>(DI_TYPES.SessionRepository).to(SessionRepositoryImpl)
container.bind<SessionUsecase>(DI_TYPES.SessionUseCase).to(SessionUsecaseImpl)

container.bind<UserRepository>(DI_TYPES.UserRepository).to(UserRepositoryImpl)
container.bind<UserUseCases>(DI_TYPES.UserUseCases).to(UserUsecasesImpl)

container.bind<TransactionRepository>(DI_TYPES.TransactionRepository).to(TransactionRepositoryImpl)
container.bind<TransactionUsecase>(DI_TYPES.TransactionUseCases).to(TransactionUsecaseImpl)

container.bind<AppControllerV1>(DI_TYPES.LoginController).to(LoginController)
container.bind<AppControllerV1>(DI_TYPES.LogoutController).to(LogoutController)
container.bind<AppControllerV1>(DI_TYPES.CreateUserController).to(CreateUserController)
// container.bind<AppControllerV1>(TYPES.UpdateUserController).to(UpdateUserController)

container.bind<AppControllerV1>(DI_TYPES.TransactionController).to(TransactionController)

container.bind<AppMiddleware>(DI_TYPES.VerifyJWTMiddleware).to(VerifyJwtMiddleware)
container.bind<AppMiddleware>(DI_TYPES.VerifySessionMiddleware).to(VerifySessionMiddleware)
container.bind<AppMiddleware>(DI_TYPES.VerifyUserMiddleware).to(VerifyUserStatusMiddleware)
container.bind<AppMiddleware>(DI_TYPES.VerifyUserTransferAbilityMiddleware).to(VerifyUserTransferAbilityMiddleware)

export { container }