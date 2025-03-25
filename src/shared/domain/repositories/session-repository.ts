import {Repository} from "typeorm";
import {SessionEntity} from "@/modules/session/domain/entities/session-entity";

export default interface SessionRepository {
    orm: Repository<SessionEntity>;

    new_session(user_id: string): Promise<SessionEntity>;

    find_session(user_id: string): Promise<SessionEntity | null>;

    revoke_session(session: SessionEntity): Promise<void>;
}