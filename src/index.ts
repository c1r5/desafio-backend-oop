import TransactionController from "modules/transaction/interfaces/controllers/transaction-controller";
import "reflect-metadata";
import App from "app/app";
import { container, TYPES } from "shared/di/di-container";
import UserController from "modules/users/interfaces/controllers/user-controller";

const app = new App()

const transaction_controller = container.get<TransactionController>(TYPES.TransactionController)
const user_controller = container.get<UserController>(TYPES.UserController)

app
  .register_api_controller(transaction_controller)
  .register_api_controller(user_controller)