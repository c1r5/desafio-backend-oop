import TransactionEntity from "@/modules/transaction/domain/entities/transaction-entity";
import UserEntity from "@/modules/users/domain/entities/user-entity";
import {DataSource} from "typeorm";
import {SessionEntity} from "@/modules/authentication/domain/entities/session-entity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "sql/db.sqlite",
    entities: [
        SessionEntity,
        TransactionEntity,
        UserEntity
    ],
    synchronize: true,
});
