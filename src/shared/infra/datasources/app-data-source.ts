import TransactionEntity from "@/modules/transaction/domain/models/transaction-model";
import UserModel from "@/modules/users/domain/model/user-model";
import { DataSource } from "typeorm";
import { SessionModel } from "@/modules/session/domain/models/session-model";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "sql/db.sqlite",
    entities: [
        SessionModel,
        TransactionEntity,
        UserModel
    ],
    synchronize: true,
});
