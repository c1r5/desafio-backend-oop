import {Repository} from "typeorm";
import UserEntity from "@/modules/users/domain/entities/user-entity";

export default interface UserRepository {
    orm: Repository<UserEntity>
}