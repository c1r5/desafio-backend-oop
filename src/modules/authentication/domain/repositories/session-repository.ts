import {Repository} from "typeorm";
import {SessionEntity} from "@/modules/authentication/domain/entities/session-entity";

export default interface SessionRepository {
    orm: Repository<SessionEntity>;

    new_session(user_id: string): Promise<SessionEntity>;

    find_session(user_id: string): Promise<SessionEntity>;

    revoke_session(session: SessionEntity): Promise<void>;
}