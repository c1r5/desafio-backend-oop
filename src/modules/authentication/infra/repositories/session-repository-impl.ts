import SessionRepository from "@/modules/authentication/domain/repositories/session-repository";
import {inject, injectable} from "inversify";
import {TYPES} from "@/shared/infra/di/di-types";
import {DataSource, Repository} from "typeorm";
import {SessionEntity} from "@/modules/authentication/domain/entities/session-entity";

@injectable()
export default class SessionRepositoryImpl implements SessionRepository {
    orm: Repository<SessionEntity>;

    constructor(@inject(TYPES.DataSource) private datasource: DataSource) {
        this.orm = datasource.getRepository(SessionEntity);
    }

    async new_session(user_id: string): Promise<SessionEntity> {
        let new_session = this.orm.create();

        new_session.userId = user_id;
        new_session.is_active = true;

        return this.orm.save(new_session);
    }

    async find_session(user_id: string): Promise<SessionEntity> {
        let session = await this.orm.find({
            where: {
                userId: user_id
            },

            order: {
                createdAt: -1
            }
        })

        return session[0]
    }

    async revoke_session(session: SessionEntity): Promise<void> {
        await this.orm.update(session.session_id, {...session, is_active: false})
    }
}