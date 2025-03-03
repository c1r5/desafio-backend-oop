import UserRepository from "@/modules/users/domain/repositories/user-repository";
import {DataSource, Repository} from "typeorm";
import UserEntity from "../../domain/entities/user-entity";
import {inject} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";

export default class UserRepositoryMock implements UserRepository {
    orm_repo: Repository<UserEntity>;
    datasource: DataSource;
    constructor(@inject(TYPES.MockDataSource) datasource: DataSource) {
        this.datasource = datasource;
        this.orm_repo = datasource.getRepository(UserEntity)
    }

}