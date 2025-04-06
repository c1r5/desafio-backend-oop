import { Repository } from "typeorm";
import { SessionModel } from "@/modules/session/domain/models/session-model";

export default interface SessionRepository {
    orm: Repository<SessionModel>;

    new_session(user_id: string): Promise<SessionModel>;

    find_session(user_id: string): Promise<SessionModel | null>;

    revoke_session(session: SessionModel): Promise<void>;
}