import { UserEntity } from "@/modules/users/domain/entities/user-entity";

export default interface UserUseCases {
    create_user(entity: UserEntity): Promise<void>
    update_user(user_id: string, value: Partial<UserEntity>): Promise<void>
    is_active(user_id: string): Promise<boolean>
    get_user_email(user_id: string): Promise<string>;
    request_email_verification(user_id: string): Promise<void>;
}