import AppRepository from "@/shared/domain/repositories/app-repository";
import { Repository } from "typeorm";
import UserModel from "@/modules/users/domain/model/user-model";


export default interface UserRepository extends AppRepository {
    update_user(user_id: string, value: Partial<UserModel>): Promise<UserModel>;
    create_user(value: Partial<UserModel>): Promise<UserModel>;
    get_user_by_id(user_id: string): Promise<UserModel | null>;
    orm: Repository<UserModel>;
}