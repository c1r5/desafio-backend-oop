import UserModel from "@/modules/users/domain/model/user-model";
import UserRepository from "@/shared/domain/repositories/user-repository";
import { inject, injectable } from "inversify";
import { DataSource, QueryRunner, Repository } from "typeorm";
import { TYPES } from "@/shared/infra/di/di-types";
import { UserNotFound } from "@/modules/session/application/errors/login-errors";

@injectable()
export default class UserRepositoryImpl implements UserRepository {
    orm: Repository<UserModel>;

    constructor(@inject(TYPES.DataSource) private datasource: DataSource) {
        this.orm = datasource.getRepository<UserModel>(UserModel)
    }
    async update_user(user_id: string, value: Partial<UserModel>): Promise<{ email: string; phone: string; password: string }> {
        const update_result = await this.orm.update(user_id, value);

        if (!update_result.affected) {
            throw new UserNotFound();
        }

        const user = await this.orm.findOneBy({ user_id });

        if (!user) {
            throw new UserNotFound();
        }

        return {
            email: user.email,
            phone: user.phone,
            password: user.password
        };
    }

    async create_user(value: Partial<UserModel>): Promise<{ email: string; phone: string }> {
        const user = this.orm.create(value);
        await this.orm.save(user);

        return {
            email: user.email,
            phone: user.phone
        };
    }

    get query_runner(): QueryRunner {
        return this.datasource.createQueryRunner()
    }
}