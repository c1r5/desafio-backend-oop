import { CreateUserOptions } from "./create-user-options";

export default interface UserUseCases {
    is_active(user_id: string): Promise<boolean>
    get_user_email(user_id: string): Promise<string>;
    request_email_verification(user_id: string): Promise<void>;
    create_user(data: CreateUserOptions ): Promise<void>;
}