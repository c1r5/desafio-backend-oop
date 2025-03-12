import {Repository} from "typeorm";
import {AuthSessionEntity} from "@/modules/auth/domain/entities/auth-session-entity";

export default interface AuthRepository {
    orm: Repository<AuthSessionEntity>;

    new_session(user_id: string): Promise<AuthSessionEntity>;

    find_session(user_id: string): Promise<AuthSessionEntity>;

    revoke_session(session: AuthSessionEntity): void;
}