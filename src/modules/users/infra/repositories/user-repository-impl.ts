import UserEntity from "@/modules/users/domain/entities/user-entity";
import UserRepository from "@/shared/domain/repositories/user-repository";
import {inject, injectable} from "inversify";
import {DataSource, Repository} from "typeorm";
import {TYPES} from "@/shared/infra/di/di-types";

@injectable()
export default class UserRepositoryImpl implements UserRepository {
    orm: Repository<UserEntity>;

    constructor(@inject(TYPES.DataSource) private datasource: DataSource) {
        this.orm = datasource.getRepository<UserEntity>(UserEntity)
    }
}