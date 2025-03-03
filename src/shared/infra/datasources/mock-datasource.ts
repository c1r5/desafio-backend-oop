import {DataSource} from "typeorm";
import UserEntity from "@/modules/users/domain/entities/user-entity";
import TransactionEntity from "@/modules/transaction/domain/entities/transaction-entity";

export const MockDatasource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    logging: false,
    entities: [UserEntity, TransactionEntity],
})