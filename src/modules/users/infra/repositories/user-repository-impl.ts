import UserModel from "@/modules/users/domain/model/user-model";
import { inject, injectable } from "inversify";
import { DataSource, QueryRunner, Repository } from "typeorm";
import { DI_TYPES } from "@/shared/infra/di/di-types";
import { UserNotFound } from "@/shared/application/errors/operation-error";
import UserRepository from "@/shared/modules/user/user-repository";

@injectable()
export default class UserRepositoryImpl implements UserRepository {
    orm: Repository<UserModel>;

    constructor(@inject(DI_TYPES.DataSource) private datasource: DataSource) {
        this.orm = datasource.getRepository<UserModel>(UserModel)
    }

    get query_runner(): QueryRunner {
        return this.datasource.createQueryRunner()
    }

    async update_user(user_id: string, value: Partial<UserModel>): Promise<UserModel> {
        const update_result = await this.orm.update(user_id, value);

        if (!update_result.affected) {
            throw new UserNotFound();
        }

        const user = await this.orm.findOneBy({ user_id });

        if (!user) {
            throw new UserNotFound();
        }

        return user
    }

    async create_user(value: Partial<UserModel>): Promise<UserModel> {
        const user = this.orm.create(value);
        await this.orm.save(user);

        return user
    }

    async get_user_by_id(user_id: string): Promise<UserModel | null> {
        return (await this.orm.findOneBy({ user_id }))
    }
}