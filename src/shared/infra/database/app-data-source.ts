import TransactionEntity from "modules/transaction/domain/entities/transaction-entity";
import UserEntity from "modules/users/domain/entities/user-entity";
import { DataSource } from "typeorm";

export default class AppDataSource {
  private datasource: DataSource;

  constructor() {
    this.datasource = new DataSource({
      type: "sqlite",
      database: "/sql/db",
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

  async getRepository<T>(entity: T) {
    return this.datasource.getRepository(typeof entity);
  }
}