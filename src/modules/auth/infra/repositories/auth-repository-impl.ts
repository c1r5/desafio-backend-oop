import AuthRepository from "@/modules/auth/domain/repositories/auth-repository";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import {DataSource, Repository} from "typeorm";
import {AuthSessionEntity} from "@/modules/auth/domain/entities/auth-session-entity";

@injectable()
export default class AuthRepositoryImpl implements AuthRepository {
    orm: Repository<AuthSessionEntity>;

    constructor(@inject(TYPES.DataSource) private datasource: DataSource) {
        this.orm = datasource.getRepository(AuthSessionEntity);
    }

    async new_session(user_id: string): Promise<AuthSessionEntity> {
        let new_session = this.orm.create();

        new_session.userId = user_id;
        new_session.is_active = true;

        return this.orm.save(new_session);
    }
}