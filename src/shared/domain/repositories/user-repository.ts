import AppRepository from "@/shared/domain/repositories/app-repository";
import { Repository } from "typeorm";
import UserModel from "@/modules/users/domain/model/user-model";

export default interface UserRepository extends AppRepository {
    update_user(user_id: string, value: Partial<UserModel>): Promise<{ email: string; phone: string }>;
    create_user(value: Partial<UserModel>): Promise<{ email: string; phone: string }>;
    orm: Repository<UserModel>;
}