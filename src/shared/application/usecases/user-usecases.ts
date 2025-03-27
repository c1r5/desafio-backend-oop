import UserEntity from "@/modules/users/domain/entities/user-entity";

export default interface UserUseCases {
    create_user(entity: Partial<UserEntity>): Promise<void>

    update_user(id: string, entity: Partial<UserEntity>): Promise<void>

    is_active(id: string): Promise<boolean>
}