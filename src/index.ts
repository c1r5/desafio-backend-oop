import TransactionController from "modules/transaction/interfaces/controllers/transaction-controller";
import "reflect-metadata";
import App from "app/app";
import { container, TYPES } from "shared/di/di-container";

const app = new App()

const transaction_controller = container.get<TransactionController>(TYPES.TransactionController)

app
  .register_api_controller(transaction_controller)