import TransactionEntity from "modules/transaction/domain/entities/transaction-entity";
import UserEntity from "modules/users/domain/entities/user-entity";
import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "sql/db.sqlite",
  entities: [
    TransactionEntity,
    UserEntity
  ],
  synchronize: true,
});
