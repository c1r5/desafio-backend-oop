import "reflect-metadata";
import App from "@/app";
import TransactionController from "@/modules/transaction/interfaces/controllers/transaction-controller";
import { container } from "@/shared/infra/di/di-container";
import {TYPES} from "@/shared/infra/di/di-types";
import {UserController} from "@/modules/users/interfaces/controllers/user-controller";

const app = new App()

const transaction_controller = container.get<TransactionController>(TYPES.TransactionController)
const user_controller = container.get<UserController>(TYPES.UserController)

app
    .register_api_controller(transaction_controller)
    .register_api_controller(user_controller)
    .start()

export {
    app
}