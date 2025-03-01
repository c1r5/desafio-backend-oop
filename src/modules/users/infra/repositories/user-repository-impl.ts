import UserEntity from "modules/users/domain/entities/user-entity";
import UserRepository from "../../domain/repositories/user-repository";
import {inject, injectable} from "inversify";
import AppDataSource from "../../../../shared/infra/datasources/app-data-source";
import {Repository} from "typeorm";
import {TYPES} from "@shared/infra/di/di-types";

@injectable()
export default class UserRepositoryImpl implements UserRepository {
    orm_repo: Repository<UserEntity>;

    constructor(@inject(TYPES.AppDataSource) app_datasource: AppDataSource) {
        this.orm_repo = app_datasource.datasource.getRepository<UserEntity>(UserEntity)
    }
}