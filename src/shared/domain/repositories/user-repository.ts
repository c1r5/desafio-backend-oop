import AppRepository from "@/shared/domain/repositories/AppRepository";
import {Repository} from "typeorm";
import UserEntity from "@/modules/users/domain/entities/user-entity";

export default interface UserRepository extends AppRepository {
    orm: Repository<UserEntity>;
}