import "reflect-metadata";
import App from "app/app";
import UserController from "modules/users/interfaces/controllers/user-controller";
import TransactionController from "modules/transaction/interfaces/controllers/transaction-controller";
import AppDataSource from "./shared/infra/datasources/app-data-source";
import { container } from "shared/infra/di/di-container";
import {TYPES} from "@shared/infra/di/di-types";

const app = new App()

const transaction_controller = container.get<TransactionController>(TYPES.TransactionController)
const user_controller = container.get<UserController>(TYPES.UserController)
const app_datasource = container.get<AppDataSource>(TYPES.AppDataSource)

app
    .register_api_controller(transaction_controller)
    .register_api_controller(user_controller)
    .on('connect', async () => {
        await app_datasource.initialize()
    }).start()