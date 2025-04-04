import AppRepository from "@/shared/domain/repositories/app-repository";
import {Repository} from "typeorm";
import UserEntity from "@/modules/users/domain/entities/user-entity";

export default interface UserRepository extends AppRepository {
    update_user(user_id: string, value: { email?: string | undefined; phone?: string | undefined; }): unknown;
    create_user(value: Partial<UserEntity>): Omit<UserEntity, 'password'>;
    orm: Repository<UserEntity>;
}