import UserEntity, {UserID, UserType} from "@/modules/users/domain/entities/user-entity";

export default interface UserUseCases {
    create_user(entity: Partial<UserEntity>): Promise<UserID>

    update_user(id: UserID, entity: Partial<UserEntity>): Promise<UserEntity | null>

    get_user_by_id(id: UserID): Promise<UserEntity | null>

    is_active(user_id: string): Promise<boolean>;

    get_user_type_by_id(id: UserID): Promise<UserType | null>
}