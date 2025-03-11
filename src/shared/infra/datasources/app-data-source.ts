import TransactionEntity from "@/modules/transaction/domain/entities/transaction-entity";
import UserEntity from "@/modules/users/domain/entities/user-entity";
import {DataSource} from "typeorm";
import {AuthSessionEntity} from "@/modules/auth/domain/entities/auth-session-entity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "sql/db.sqlite",
    entities: [
        AuthSessionEntity,
        TransactionEntity,
        UserEntity
    ],
    synchronize: true,
});
