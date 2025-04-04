import SessionRepository from "@/shared/domain/repositories/session-repository";
import { inject, injectable } from "inversify";
import { TYPES } from "@/shared/infra/di/di-types";
import { DataSource, Repository } from "typeorm";
import { SessionModel } from "@/modules/session/domain/models/session-model";

@injectable()
export default class SessionRepositoryImpl implements SessionRepository {
    orm: Repository<SessionModel>;

    constructor(@inject(TYPES.DataSource) private datasource: DataSource) {
        this.orm = datasource.getRepository(SessionModel);
    }

    async new_session(user_id: string): Promise<SessionModel> {
        let new_session = this.orm.create();

        new_session.userId = user_id;
        new_session.is_active = true;

        return this.orm.save(new_session);
    }

    async find_session(user_id: string): Promise<SessionModel | null> {
        return await this.orm.findOne({
            where: {
                userId: user_id
            },

            order: {
                createdAt: -1
            }
        })
    }

    async revoke_session(session: SessionModel): Promise<void> {
        const result = await this.orm.update(session.session_id, { ...session, is_active: false })

        if (!result.affected) throw new Error('session_not_found')

        if (result.affected >= 1) return
    }
}