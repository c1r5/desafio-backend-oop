import UserEntity from "@/modules/users/domain/entities/user-entity";
import UserRepository from "../../domain/repositories/user-repository";
import {inject, injectable} from "inversify";
import {DataSource, Repository} from "typeorm";
import {TYPES} from "@/shared/infra/di/di-types";

@injectable()
export default class UserRepositoryImpl implements UserRepository {
    orm_repo: Repository<UserEntity>;
    datasource: DataSource;

    constructor(@inject(TYPES.DataSource) datasource: DataSource) {
        this.datasource = datasource;
        this.orm_repo = datasource.getRepository<UserEntity>(UserEntity)
    }

}