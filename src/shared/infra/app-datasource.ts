import { DataSource } from "typeorm";
import { SessionModel } from "../../modules/session/domain/models/session-model";
import TransactionModel from "../../modules/transaction/domain/models/transaction-model";
import UserModel from "../../modules/users/domain/model/user-model";


export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "sql/db.sqlite",
  entities: [
    SessionModel,
    TransactionModel,
    UserModel
  ],
  synchronize: true,
});
