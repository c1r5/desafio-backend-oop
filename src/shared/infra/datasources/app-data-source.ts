import TransactionEntity from "modules/transaction/domain/entities/transaction-entity";
import UserEntity from "modules/users/domain/entities/user-entity";
import {DataSource} from "typeorm";
import {injectable} from "inversify";

@injectable()
export default class AppDataSource {
  datasource: DataSource;

  constructor() {
    this.datasource = new DataSource({
      type: "sqlite",
      database: "sql/db",
      entities: [
        TransactionEntity,
        UserEntity
      ],
      synchronize: true,
    });
  }

  async initialize() {
    await this.datasource.initialize()
  }


}