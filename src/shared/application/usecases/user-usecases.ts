import { UserCreateRequest } from "@/modules/users/api/schemas/user-create-schemas";
import { UserUpdateRequest } from "@/modules/users/api/schemas/user-update-schemas";

export default interface UserUseCases {
    create_user(vale: UserCreateRequest): Promise<void>
    update_user(user_id: string, value: UserUpdateRequest): Promise<void>
    is_active(user_id: string): Promise<boolean>
}