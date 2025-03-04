import UserEntity, {UserID} from "@/modules/users/domain/entities/user-entity";

export default interface UserUseCases {
    create_user(entity: Partial<UserEntity>): Promise<UserID>

    authenticate_user(entity: Partial<UserEntity>): Promise<UserEntity | null>

    update_user(id: UserID, entity: Partial<UserEntity>): Promise<UserEntity | null>

    get_user_by_id(id: UserID): Promise<UserEntity | null>
}